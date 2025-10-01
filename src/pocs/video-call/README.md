# Video Call PoC

## Objetivo
Demostrar la funcionalidad de videollamadas de 20 minutos usando WebRTC.

## Características Implementadas
-  WebRTC para comunicación peer-to-peer
-  Timer de 20 minutos con notificaciones
-  Manejo de permisos de cámara/micrófono
-  Interfaz de usuario para controles de llamada
-  Reconexión automática en caso de pérdida de conexión

## Tecnologías Utilizadas
- **WebRTC**: Para comunicación de video/audio
- **React Native**: Para la interfaz de usuario
- **Expo**: Para manejo de permisos nativos

## Estructura del PoC
```
video-call/
├── README.md                 # Este archivo
├── VideoCallScreen.tsx       # Pantalla principal de videollamada
├── WebRTCManager.ts          # Gestor de WebRTC
├── TimerComponent.tsx        # Componente de timer de 20 minutos
├── ControlsComponent.tsx     # Controles de llamada (mute, video, etc.)
└── hooks/
    ├── useWebRTC.ts         # Hook para WebRTC
    └── useTimer.ts           # Hook para el timer
```

## Uso
```typescript
import { VideoCallScreen } from './VideoCallScreen';

// En tu navegación
<VideoCallScreen 
  coachId="coach123"
  sessionId="session456"
  onCallEnd={(duration) => console.log(`Call ended after ${duration}ms`)}
/>
```

## Próximos Pasos
- [ ] Implementar grabación de sesión
- [ ] Agregar chat durante la llamada
- [ ] Implementar pantalla compartida
- [ ] Agregar indicadores de calidad de conexión
