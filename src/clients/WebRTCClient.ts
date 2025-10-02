/* eslint-disable no-undef */
/**
 * Resilient WebRTC client with error handling for video/audio devices
 * Implements robust error handling for video calls
 */

import {
  AppError,
  ErrorContext,
  ERROR_CODES,
} from "../middleware/types/AppError";
import { ErrorAdapter } from "../middleware/adapters/ErrorAdapter";
import { logger } from "../middleware/logging/LoggingStrategy";

export interface WebRTCConfig {
  iceServers?: RTCIceServer[];
  audioConstraints?: MediaStreamConstraints;
  videoConstraints?: MediaStreamConstraints;
  connectionTimeout?: number;
  iceConnectionTimeout?: number;
}

export interface MediaDevice {
  deviceId: string;
  label: string;
  kind: "audioinput" | "audiooutput" | "videoinput";
}

export type WebRTCEventHandler = (event: unknown) => void;
export type WebRTCErrorHandler = (error: AppError) => void;

export class WebRTCClient {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private eventHandlers: Map<string, WebRTCEventHandler[]> = new Map();
  private errorHandler: WebRTCErrorHandler | null = null;
  private connectionTimeout: NodeJS.Timeout | null = null;
  private iceConnectionTimeout: NodeJS.Timeout | null = null;

  constructor(private config: WebRTCConfig = {}) {
    this.config = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
      audioConstraints: { audio: true },
      videoConstraints: { video: true },
      connectionTimeout: 30000,
      iceConnectionTimeout: 15000,
      ...config,
    };
  }

  /**
   * Initializes the WebRTC connection
   */
  async initialize(context: ErrorContext = {}): Promise<void> {
    try {
      logger.info(
        "Initializing WebRTC connection",
        { iceServers: this.config.iceServers?.length },
        "WebRTCClient",
      );

      this.peerConnection = new RTCPeerConnection({
        iceServers: this.config.iceServers,
      });

      this.setupPeerConnectionEventHandlers(context);

      // Configurar timeouts
      this.setupTimeouts(context);
    } catch (error) {
      throw ErrorAdapter.toAppError(error, context);
    }
  }

  /**
   * Requests access to media devices
   */
  async requestMediaAccess(
    constraints: MediaStreamConstraints = {},
    context: ErrorContext = {},
  ): Promise<MediaStream> {
    try {
      logger.info("Requesting media access", { constraints }, "WebRTCClient");

      const stream = await navigator.mediaDevices.getUserMedia({
        ...this.config.audioConstraints,
        ...this.config.videoConstraints,
        ...constraints,
      });

      this.localStream = stream;

      // Agregar stream local al peer connection
      if (this.peerConnection) {
        stream.getTracks().forEach((track) => {
          if (this.peerConnection) {
            this.peerConnection.addTrack(track, stream);
          }
        });
      }

      logger.info(
        "Media access granted",
        {
          audioTracks: stream.getAudioTracks().length,
          videoTracks: stream.getVideoTracks().length,
        },
        "WebRTCClient",
      );

      return stream;
    } catch (error) {
      const appError = this.handleMediaError(error as Error, context);
      throw appError;
    }
  }

  /**
   * Creates an offer to start a call
   */
  async createOffer(
    context: ErrorContext = {},
  ): Promise<RTCSessionDescriptionInit> {
    if (!this.peerConnection) {
      throw new AppError(
        ERROR_CODES.RTC_DEVICE,
        "Peer connection not initialized",
        context,
      );
    }

    try {
      logger.info("Creating WebRTC offer", {}, "WebRTCClient");

      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      logger.info(
        "WebRTC offer created successfully",
        { type: offer.type },
        "WebRTCClient",
      );

      return offer;
    } catch (error) {
      throw ErrorAdapter.toAppError(error, context);
    }
  }

  /**
   * Creates an answer to an offer
   */
  async createAnswer(
    offer: RTCSessionDescriptionInit,
    context: ErrorContext = {},
  ): Promise<RTCSessionDescriptionInit> {
    if (!this.peerConnection) {
      throw new AppError(
        ERROR_CODES.RTC_DEVICE,
        "Peer connection not initialized",
        context,
      );
    }

    try {
      logger.info(
        "Creating WebRTC answer",
        { offerType: offer.type },
        "WebRTCClient",
      );

      await this.peerConnection.setRemoteDescription(offer);
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);

      logger.info(
        "WebRTC answer created successfully",
        { type: answer.type },
        "WebRTCClient",
      );

      return answer;
    } catch (error) {
      throw ErrorAdapter.toAppError(error, context);
    }
  }

  /**
   * Sets the remote description
   */
  async setRemoteDescription(
    description: RTCSessionDescriptionInit,
    context: ErrorContext = {},
  ): Promise<void> {
    if (!this.peerConnection) {
      throw new AppError(
        ERROR_CODES.RTC_DEVICE,
        "Peer connection not initialized",
        context,
      );
    }

    try {
      await this.peerConnection.setRemoteDescription(description);

      logger.info(
        "Remote description set successfully",
        { type: description.type },
        "WebRTCClient",
      );
    } catch (error) {
      throw ErrorAdapter.toAppError(error, context);
    }
  }

  /**
   * Adds an ICE candidate
   */
  async addIceCandidate(
    candidate: RTCIceCandidateInit,
    context: ErrorContext = {},
  ): Promise<void> {
    if (!this.peerConnection) {
      throw new AppError(
        ERROR_CODES.RTC_DEVICE,
        "Peer connection not initialized",
        context,
      );
    }

    try {
      await this.peerConnection.addIceCandidate(candidate);

      logger.debug(
        "ICE candidate added successfully",
        { candidate: candidate.candidate },
        "WebRTCClient",
      );
    } catch (error) {
      throw ErrorAdapter.toAppError(error, context);
    }
  }

  /**
   * Gets available media devices
   */
  async getMediaDevices(context: ErrorContext = {}): Promise<MediaDevice[]> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();

      const mediaDevices: MediaDevice[] = devices
        .filter((device) => device.kind !== "audiooutput")
        .map((device) => ({
          deviceId: device.deviceId,
          label:
            device.label || `${device.kind} ${device.deviceId.slice(0, 8)}`,
          kind: device.kind as "audioinput" | "audiooutput" | "videoinput",
        }));

      logger.info(
        "Media devices retrieved",
        { deviceCount: mediaDevices.length },
        "WebRTCClient",
      );

      return mediaDevices;
    } catch (error) {
      throw ErrorAdapter.toAppError(error, context);
    }
  }

  /**
   * Switches video device
   */
  async switchVideoDevice(
    deviceId: string,
    context: ErrorContext = {},
  ): Promise<void> {
    if (!this.localStream) {
      throw new AppError(
        ERROR_CODES.RTC_DEVICE,
        "No local stream available",
        context,
      );
    }

    try {
      const videoTrack = this.localStream.getVideoTracks()[0];
      if (!videoTrack) {
        throw new AppError(
          ERROR_CODES.RTC_DEVICE,
          "No video track available",
          context,
        );
      }

      await videoTrack.applyConstraints({
        deviceId: { exact: deviceId },
      });

      logger.info(
        "Video device switched successfully",
        { deviceId },
        "WebRTCClient",
      );
    } catch (error) {
      throw ErrorAdapter.toAppError(error, context);
    }
  }

  /**
   * Switches audio device
   */
  async switchAudioDevice(
    deviceId: string,
    context: ErrorContext = {},
  ): Promise<void> {
    if (!this.localStream) {
      throw new AppError(
        ERROR_CODES.RTC_DEVICE,
        "No local stream available",
        context,
      );
    }

    try {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (!audioTrack) {
        throw new AppError(
          ERROR_CODES.RTC_DEVICE,
          "No audio track available",
          context,
        );
      }

      await audioTrack.applyConstraints({
        deviceId: { exact: deviceId },
      });

      logger.info(
        "Audio device switched successfully",
        { deviceId },
        "WebRTCClient",
      );
    } catch (error) {
      throw ErrorAdapter.toAppError(error, context);
    }
  }

  /**
   * Closes the WebRTC connection
   */
  close(): void {
    logger.info("Closing WebRTC connection", {}, "WebRTCClient");

    // Limpiar timeouts
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }

    if (this.iceConnectionTimeout) {
      clearTimeout(this.iceConnectionTimeout);
      this.iceConnectionTimeout = null;
    }

    // Detener streams locales
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.localStream = null;
    }

    // Cerrar peer connection
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
  }

  /**
   * Gets the remote stream
   */
  getRemoteStream(): MediaStream | null {
    return this.remoteStream;
  }

  /**
   * Gets the local stream
   */
  getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  /**
   * Gets the connection state
   */
  getConnectionState(): RTCPeerConnectionState | null {
    return this.peerConnection?.connectionState || null;
  }

  /**
   * Registers a handler for WebRTC events
   */
  onEvent(event: string, handler: WebRTCEventHandler): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  /**
   * Registers an error handler
   */
  onError(handler: WebRTCErrorHandler): void {
    this.errorHandler = handler;
  }

  /**
   * Configura los event handlers del peer connection
   */
  private setupPeerConnectionEventHandlers(context: ErrorContext): void {
    if (!this.peerConnection) return;

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.notifyEvent("icecandidate", event);
      }
    };

    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection?.connectionState;
      logger.info("WebRTC connection state changed", { state }, "WebRTCClient");

      if (state === "connected") {
        this.clearTimeouts();
      } else if (state === "failed") {
        const error = new AppError(
          ERROR_CODES.RTC_DEVICE,
          "WebRTC connection failed",
          context,
        );
        this.notifyError(error);
      }

      this.notifyEvent("connectionstatechange", { state });
    };

    this.peerConnection.oniceconnectionstatechange = () => {
      const state = this.peerConnection?.iceConnectionState;
      logger.info(
        "WebRTC ICE connection state changed",
        { state },
        "WebRTCClient",
      );

      this.notifyEvent("iceconnectionstatechange", { state });
    };

    this.peerConnection.ontrack = (event) => {
      this.remoteStream = event.streams[0];
      this.notifyEvent("track", event);

      logger.info(
        "Remote track received",
        {
          audioTracks: this.remoteStream.getAudioTracks().length,
          videoTracks: this.remoteStream.getVideoTracks().length,
        },
        "WebRTCClient",
      );
    };
  }

  /**
   * Configura timeouts para la conexión
   */
  private setupTimeouts(context: ErrorContext): void {
    // Timeout general de conexión
    this.connectionTimeout = setTimeout(() => {
      const error = new AppError(
        ERROR_CODES.RTC_DEVICE,
        "WebRTC connection timeout",
        context,
      );
      this.notifyError(error);
    }, this.config.connectionTimeout);

    // Timeout para ICE connection
    this.iceConnectionTimeout = setTimeout(() => {
      const error = new AppError(
        ERROR_CODES.RTC_DEVICE,
        "ICE connection timeout",
        context,
      );
      this.notifyError(error);
    }, this.config.iceConnectionTimeout);
  }

  /**
   * Limpia los timeouts
   */
  private clearTimeouts(): void {
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }

    if (this.iceConnectionTimeout) {
      clearTimeout(this.iceConnectionTimeout);
      this.iceConnectionTimeout = null;
    }
  }

  /**
   * Maneja errores específicos de media
   */
  private handleMediaError(error: Error, context: ErrorContext): AppError {
    const message = error.message.toLowerCase();

    if (
      message.includes("permission denied") ||
      message.includes("not allowed")
    ) {
      return new AppError(
        ERROR_CODES.RTC_PERMISSION_DENIED,
        "Permisos de cámara/micrófono denegados",
        context,
        error,
      );
    }

    if (message.includes("not found") || message.includes("not available")) {
      return new AppError(
        ERROR_CODES.RTC_DEVICE_UNAVAILABLE,
        "Dispositivo de video/audio no disponible",
        context,
        error,
      );
    }

    return new AppError(
      ERROR_CODES.RTC_DEVICE,
      "Error con el dispositivo de video/audio",
      context,
      error,
    );
  }

  /**
   * Notifica eventos a los handlers registrados
   */
  private notifyEvent(event: string, data: unknown): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(data);
        } catch (error) {
          logger.error(
            `Error in event handler for ${event}`,
            { error: error, event },
            "WebRTCClient",
          );
        }
      });
    }
  }

  /**
   * Notifica errores a los handlers registrados
   */
  private notifyError(error: AppError): void {
    if (this.errorHandler) {
      this.errorHandler(error);
    }
  }
}
