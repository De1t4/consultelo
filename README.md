# Consultelo

**Consultelo** es una plataforma moderna diseñada para gestionar y facilitar consultas en línea. Está pensada tanto para profesionales o dueños de negocios (owners) que ofrecen sus servicios, como para los usuarios que buscan respuestas y asesorías.

---

## 🌟 ¿Qué es Consultelo? (Para Usuarios)

Consultelo te permite conectar y resolver tus dudas de forma sencilla.

- **Para usuarios generales:** Encuentra a profesionales, realiza tus preguntas de manera clara y recibe respuestas estructuradas en tiempo real.
- **Para profesionales o negocios:** Gestiona tu perfil, administra las consultas de tus clientes, responde utilizando herramientas avanzadas de texto enriquecido y lleva el control de tu agenda o de tu equipo de empleados.

**Características principales:**

- 📝 **Consultas detalladas:** Creación, categorización y seguimiento de consultas y comentarios.
- ⚡ **Experiencia fluida:** Interfaz extremadamente rápida, dinámica y amigable pensada para usar en cualquier dispositivo.
- 🔒 **Seguridad y privacidad:** Tu información y tus consultas están siempre protegidas.

---

## 💻 Para Desarrolladores

Debajo del capó, el proyecto es una aplicación web full-stack construida sobre el ecosistema moderno de **Next.js** y **React**, priorizando el rendimiento, la seguridad y la experiencia del desarrollador mediante un tipado fuerte de extremo a extremo gracias a TypeScript.

### 🛠️ Tecnologías Principales (Tech Stack)

- **Framework:** [Next.js 14+](https://nextjs.org/) (Usando App Router, Server Actions y Server Components).
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para robustez y prevención de errores.
- **Base de Datos & ORM:** [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM](https://www.prisma.io/) (Acceso a datos Type-Safe).
- **Autenticación:** [NextAuth.js](https://next-auth.js.org/) (Gestión de sesiones segura).
- **Estilos & UI:** [Tailwind CSS v4](https://tailwindcss.com/) y componentes modernos usando Radix/Lucide.
- **Formularios & Validación:** [React Hook Form](https://react-hook-form.com/) + validación estricta con [Zod](https://zod.dev/).
- **Editor de texto:** [Tiptap](https://tiptap.dev/) (Para comentarios y descripciones ricas).
- **Flujo de datos (Data Fetching):** [TanStack React Query](https://tanstack.com/query/latest) para sincronización del estado del servidor.

### 📁 Arquitectura

La arquitectura de carpetas está pensada para ser escalable, separando componentes de UI pura, lógica de negocio y acciones del servidor (Server Actions).

Para un desglose profundo de la estructura de carpetas, reglas del proyecto y decisiones arquitectónicas, por favor revisa el archivo de documentación destinado a esto: **[arquitectura.md](./docs/arquitectura.md)**.

### 🚀 Primeros Pasos (Getting Started)

Para correr este proyecto en tu entorno local, sigue estos pasos:

1. **Clona el repositorio e ingresa a la carpeta:**

   ```bash
   git clone <"https://github.com/De1t4/consultelo">
   cd consultelo
   ```

2. **Instala las dependencias:**
   Recomendamos `pnpm` (aunque `npm` o `yarn` también funcionan).

   ```bash
   pnpm install
   ```

3. **Configura las variables de entorno:**
   Crea tu archivo `.env` en la raíz copiando las variables de un posible archivo de ejemplo. Vas a necesitar conexión a tu DB y algunos secretos:

   ```env
   DATABASE_URL="postgresql://usuario:password@localhost:5432/consultelo"
   NEXTAUTH_SECRET="un_secreto_super_seguro"
   ```

4. **Configura la Base de Datos:**
   Prepara Prisma, sincroniza los modelos con la base de datos PostgreSQL, y corre un posible script de seed (semilla) si está disponible:

   ```bash
   npx prisma generate
   npx prisma db push
   # Si usas flujos de migración rígidos: npx prisma migrate dev
   ```

5. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   # o pnpm dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la página corriendo. Tus cambios en el código se reflejarán instantáneamente!

### 📜 Scripts básicos

- `npm run dev`: Inicia el servidor de desarrollo en modo watch.
- `npm run build`: Compila y empaqueta la app para el entorno de producción.
- `npm run start`: Inicia el servidor sirviendo los archivos optimizados de producción (requiere build previo).
- `npm run lint`: Ejecuta ESLint en todo el proyecto asegurando la calidad del código.
