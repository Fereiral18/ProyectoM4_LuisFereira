# 🧠 Gestor Estratégico de Tareas

## 📌 Descripción del proyecto

El **Gestor Estratégico de Tareas** es una aplicación web orientada a la organización, planificación y seguimiento de tareas de manera eficiente y escalable.

El sistema permite a los usuarios crear, editar, organizar y gestionar tareas dentro de un entorno colaborativo y seguro. Está diseñado bajo una arquitectura moderna orientada a la escalabilidad, incorporando autenticación de usuarios, persistencia en la nube y notificaciones automáticas por correo electrónico.

El proyecto simula un entorno profesional donde el desarrollador asume el rol de **Full Stack Junior**, aplicando buenas prácticas de desarrollo, arquitectura, testing y despliegue en producción.

---

## 🧱 Tecnologías utilizadas

- **React** – UI basada en componentes
- **TypeScript** – Tipado estático para mayor robustez
- **Firebase** – Autenticación y base de datos en tiempo real
- **Vercel** – Deploy y funciones serverless
- **AWS SES** – Envío de emails automatizados
- **Vitest / Testing Library** – Testing unitario y de componentes

---

## 🏗️ Decisiones arquitectónicas

El proyecto fue estructurado siguiendo una arquitectura modular basada en capas:

- **Capa de presentación (UI):** React con componentes reutilizables.
- **Capa de lógica:** Custom hooks y servicios para separar responsabilidades.
- **Capa de datos:** Firebase como Backend as a Service (BaaS).
- **Capa serverless:** Vercel Functions para integración con AWS SES.

### Justificación técnica

- **React + TypeScript:** permite escalabilidad, mantenibilidad y reducción de errores en tiempo de ejecución.
- **Firebase:** simplifica autenticación y persistencia sin necesidad de un backend complejo.
- **Vercel Functions:** permiten manejar lógica backend ligera sin infraestructura propia.
- **AWS SES:** solución confiable y escalable para envío de emails transaccionales.

---

## ⚙️ Instalación y ejecución local

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPO>
cd gestor-tareas
2. Instalar dependencias
npm install
3. Configurar variables de entorno

Crear un archivo .env basado en .env.example.

4. Ejecutar el proyecto
npm run dev
5. Ejecutar tests
npm run test
🔐 Variables de entorno

El proyecto requiere las siguientes variables:

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
SES_SENDER_EMAIL=

🚀 URL de producción

🔗 Aplicación desplegada en Vercel:
https://proyecto-m4-luis-fereira.vercel.app/

📬 Flujo de envío de emails (AWS SES + Vercel Functions)

El sistema de notificaciones funciona mediante Vercel Functions como capa intermedia entre el frontend y AWS SES.

Flujo:
El usuario realiza una acción (ej: creación de tarea).
El frontend envía una request a una Vercel Function.
La función procesa la información.
AWS SES envía el email al destinatario configurado.
Ventajas del enfoque:
Evita exponer credenciales en el frontend.
Escalabilidad automática.
Separación clara de responsabilidades.
Baja latencia en envíos transaccionales.
🤖 Uso de Inteligencia Artificial
Herramientas utilizadas
ChatGPT
GitHub Copilot
🔄 Integración en el flujo de trabajo

La inteligencia artificial fue utilizada como asistente de desarrollo, principalmente en:

Generación inicial de componentes en React.
Definición de interfaces y tipos en TypeScript.
Ejemplos de integración con Firebase y AWS SES.
Creación de casos de prueba con Vitest.
Debugging de errores complejos en runtime.
⚡ Momentos de mayor efectividad
Setup inicial del proyecto: aceleró la estructuración de carpetas y arquitectura base.
Integraciones externas: Firebase y AWS SES.
Testing: generación de mocks y escenarios de prueba.
Refactorización: mejora de legibilidad y separación de responsabilidades.
🧠 Buenas prácticas adoptadas
Prompt engineering: se iteraron prompts cada vez más específicos para obtener código alineado a la arquitectura del proyecto.
Validación manual del código: todo output generado por IA fue revisado antes de integrarse.
Seguridad: se evitó exponer claves o lógica sensible en el frontend.
Modularidad: la IA se utilizó como apoyo, pero siempre respetando una arquitectura basada en separación de responsabilidades.
📚 Reflexión técnica

El uso de IA permitió reforzar conceptos como:

Diseño de componentes reutilizables en React.
Tipado estricto en TypeScript.
Arquitectura orientada a servicios.
Testing como parte integral del desarrollo.

La IA funcionó como un asistente técnico, no como reemplazo del criterio de diseño, permitiendo acelerar el desarrollo sin comprometer calidad ni comprensión del código.

🧪 Testing

El proyecto incluye tests unitarios y de componentes utilizando:

Vitest
React Testing Library

Ejecutar:

npm run test
🚀 Deploy

El deploy se realiza en Vercel, integrando:

Build automático desde GitHub
Variables de entorno configuradas en Vercel Dashboard
Serverless Functions para backend ligero
📌 Objetivos adicionales implementados / planificados
Filtros avanzados de tareas
Drag & Drop para reorganización
Mejora de UX/UI con feedback visual
Optimización de rendimiento en listas grandes
📎 Conclusión

Este proyecto integra prácticas modernas de desarrollo Full Stack, priorizando escalabilidad, mantenibilidad y seguridad. La combinación de React, TypeScript, Firebase, Vercel y AWS SES permite construir una solución robusta alineada a un entorno productivo real.
