# Notifications PoC

## Objetivo
Demostrar el sistema de notificaciones en tiempo real para la plataforma 20minCoach.

## Características Implementadas
-  Notificaciones push nativas
-  Notificaciones in-app
-  Sistema de suscripción a eventos
-  Manejo de estados de notificación
-  Notificaciones de disponibilidad de coaches

## Tecnologías Utilizadas
- **Expo Notifications**: Para notificaciones push
- **React Native**: Para notificaciones in-app
- **WebSocket**: Para eventos en tiempo real

## Tipos de Notificaciones
1. **Coach Available**: Cuando un coach está disponible
2. **Session Reminder**: Recordatorio de sesión próxima
3. **Session Started**: Notificación de inicio de sesión
4. **Session Ended**: Notificación de fin de sesión
5. **New Message**: Mensaje del coach

## Estructura del PoC
```
notifications/
├── README.md                 # Este archivo
├── NotificationService.ts    # Servicio principal de notificaciones
├── NotificationScreen.tsx    # Pantalla de configuración de notificaciones
├── InAppNotification.tsx     # Componente de notificación in-app
├── hooks/
│   ├── useNotifications.ts   # Hook para manejo de notificaciones
│   └── usePushToken.ts       # Hook para token de push
└── types/
    └── NotificationTypes.ts  # Tipos de notificaciones
```

## Uso
```typescript
import { NotificationService } from './NotificationService';

// Configurar notificaciones
await NotificationService.requestPermissions();
await NotificationService.subscribeToCoachUpdates('coach123');

// Enviar notificación
await NotificationService.sendNotification({
  title: 'Coach Available',
  body: 'Your preferred coach is now available',
  data: { coachId: 'coach123' }
});
```

## Próximos Pasos
- [ ] Implementar notificaciones programadas
- [ ] Agregar sonidos personalizados
- [ ] Implementar notificaciones de grupo
- [ ] Agregar analytics de notificaciones
