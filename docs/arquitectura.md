# Arquitectura y Estructura del Proyecto

Este documento describe la arquitectura, las convenciones y los patrones de diseño utilizados en **Consultelo**. Está dirigido a desarrolladores que necesitan entender cómo está estructurado el código, cómo interactúan las distintas capas y cómo se manejan aspectos clave del sistema.

## 📁 Estructura de Carpetas (Project Structure)

El proyecto sigue una arquitectura modular y escalable, diseñada para aplicaciones robustas en el ecosistema Next.js. Las separaciones claras permiten un mantenimiento y lectura más sencillos.

```text
└── root/
    ├── prisma/          # Configuración del ORM, esquema de BD y migraciones.
    │   └── schema.prisma
    ├── public/          # Recursos estáticos (imágenes, iconos asstes, etc).
    ├── docs/            # Documentación técnica y general del proyecto.
    └── src/
        ├── actions/     # Server Actions de Next.js. Lógica de mutación/query ejecutada exclusivamente en el servidor.
        ├── app/         # Next.js App Router (Rutas de UI, layouts, rutas de API).
        │   ├── (auth)/  # Grupo lógico de rutas para la autenticación (Login, Registro).
        │   ├── (owner)/ # Grupo lógico de rutas para el manejo de dueños/profesionales.
        │   ├── api/     # Rutas RESTful (Endpoints nativos si son necesarios fuera de Server Actions).
        │   └── layout.tsx
        ├── components/  # Componentes UI compartidos y globales (separados de la lógica de negocio dura).
        │   ├── ui/      # Componentes atómicos (generalmente basados base Radix UI o shadcn/ui).
        │   └── layout/  # Componentes estructurales (Headers, Footers, Sidebars).
        ├── hooks/       # Custom Hooks globales de React encapsulando ciclos de vida o lógicas UI complejas.
        ├── modules/     # Dominios principales / Características del negocio agrupadas.
        │   ├── core/
        │   └── auth/
        ├── schemas/     # Esquemas de definición y validación de Zod garantizando tipado estricto (cliente/servidor).
        ├── services/    # Lógica de negocio core y abstracción al acceso a bases de datos (llamados por actions o APIs).
        ├── shared/      # Módulos y utilidades genéricas de uso global en la aplicación.
        │   ├── lib/     # Instancias singleton preconfiguradas y wrappers de librerías externas (ej. client Prisma).
        │   ├── types/   # Interfaces y Tipos de TypeScript globales genéricos.
        │   └── utils/   # Utilidades puras, formateadores de fechas, cálculos lógicos, etc.
        └── middleware.ts# Interceptor global para middlewares en las respuestas (redirecciones, sesiones, auth, i18n).
```

## 🔄 Flujo de Datos y Peticiones (Data Fetching & Requests)

En **Consultelo**, seguimos las convenciones modernas de Next.js **App Router**, utilizando React Server Components (RSC) y Server Actions combinados para un rendimiento óptimo. De esta forma le quitamos gran carga al cliente.

1.  **Componentes de Servidor (Server Components):**
    Por defecto, los componentes dentro del directorio `app/` son procesados en el lado del servidor. El **Data Fetching (consultas de solo lectura)** lo realizamos directamente desde la capa asíncrona de estos componentes, o conectando al Servicio directamente e inyectándolo al HTML virtual. Esto evita un *spinner* en pantalla del cliente y una rápida indexación base.
2.  **Acciones de Servidor (Server Actions - `src/actions`):**
    Usamos Server Actions marcadas bajo `"use server"` para las **mutaciones** de datos (Submit de formularios, POST, PUT, DELETE). Las *Server Actions* interactúan con la lógica expuesta en el directorio `src/services/` de forma segura, y se pueden llamar sin una ruta REST (sin fetch) tradicional desde el cliente.
3.  **Sincronización Interactiva en el Cliente (React Query):**
    Cuando un componente necesita ser marcadamente interactivo, tener scroll-loading infinitos, polling o necesita datos que varían intensamente basados en la acción humana, definimos el componente bajo la directiva `"use client"` y utilizamos **TanStack React Query**. React Query se encarga de manejar el caché global, el control de la re-validación optimista y estados de espera. Sus fetchers apuntan a ejecutar las *Server Actions*.

## 🗄️ El Servidor y la Lógica de Negocio (`src/services`)

El directorio `services/` aísla de la vista y de la ruta toda la complejidad transaccional, comunicación a base de datos externa o servicios a terceros.

- **Evitar Prisma en vistas:** Intentamos mantener la lógica lo más limpia posible. Salvo que sea un query muy tonto para listado base, el acceso transaccional mediante Prisma u otro sistema a los datos debe empaquetarse en un método dentro de un `Service`. Por ende, los componentes y hooks de cliente interpelan a los `actions`, los `actions` y peticiones api llaman a un `Service`.

## 📄 Formularios y Validación End-to-End (`src/schemas`)

La consistencia de los inputs es obligatoria en nuestra arquitectura. Un formulario transita el siguiente sistema:

1.  **Single Source of Truth con Zod:**
    La validación nunca se hace en duplicado (escribiendo un sistema en frontend y otro backend manual). En la carpeta `src/schemas/` creamos los esquemas y contratos transaccionales en esquemas **Zod** (`schema-consultation.ts`).
2.  **React Hook Form:**
    Utilizamos RHF para capturar los eventos y administrar el estado general del formulario, sin aburguesar de renderizados al componente React padre.
3.  **El Resolver Front-End:**
    Se inyectan las validaciones usando el objeto `@hookform/resolvers/zod` en el Hook de formulario usando el esquema proveído. Esto evita que los datos viajen de la PC cliente al servidor previniendo pérdida de recursos si el tipo de string/longitud estaba mal.
4.  **La Validación Doble Check en Servidor:**
    Un usuario agresivo puede esquipear restricciones de su propio navegador, por esto toda data que entre finalmente al `Server Action` usa ese mismo esquema Zod que usamos en Frontend, aplicando `[SchemaZod].safeParse(formData)`. Si no cumple los tipos exactos o restricciones, el servidor rechaza la consulta nativamente sin romper la app.

## 💾 Base de Datos

- **Motor Central:** Principalmente motores robustos relacionales (como **PostgreSQL**).
- **Controlador Transaccional (ORM):** Instanciamos un **Prisma Client** (usualmente alojado como exportable global en `src/shared/lib/prisma`). Gracias a TypeScript embebido en Prisma, cuando modificas el `schema.prisma` y empujas los cambios, Typescript detecta la nueva forma de las tablas y arroja alerta si rompiste alguna consulta.
- Los cambios en la base de datos se orquestan siempre modificando el `prisma/schema.prisma` y aplicando flujos para subidas como `npx prisma db push` o `npx prisma migrate`.

## ⚙️ Estándares Generales de la Arquitectura

1.  **Prohibido el uso de `any`:** Tratar toda variable tipándala correctamente. En casos abstractos genéricos utilizar variables reservadas dinámicas `<T>` y en caso de datos no identificables apelar a la estrictez de usar `unknown`.
2.  **Paths Alias:** Para no marear leyendo `../../../`, están configuradas las importaciones absolutas a nivel root como el `@/`, ej. `import { Button } from '@/components/ui/Button'`.
