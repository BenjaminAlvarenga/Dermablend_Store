# Dermablend Store

Tienda en línea de maquillaje (proyecto final, Módulo 3.8 — Instituto Técnico Ricaldone) construida con **React**, **Node.js/Express** y **MongoDB**. El proyecto tiene tres partes independientes que corren en paralelo:

| Parte | Carpeta | Descripción |
|---|---|---|
| **Backend / API** | `Dermablend/backend` | API REST (Node + Express + Mongoose) con autenticación JWT, CRUD de todas las entidades y envío de correos. |
| **Panel de administración** | `Dermablend/frontend/Dermablend_Admin` | Panel privado para Admin/Empleados: dashboard, gestión de productos, clientes, empleados, órdenes y reseñas. |
| **Tienda pública** | `Dermablend/frontend/Dermablend_Public` | Sitio público para clientes: catálogo, carrito, checkout, perfil, reseñas y personalización de productos. |

---

## Stack tecnológico

- **Frontend**: React 19 + Vite, React Router DOM, React Hook Form, react-hot-toast, TailwindCSS (solo Admin).
- **Backend**: Node.js + Express 5, Mongoose 9 (MongoDB), JWT (`jsonwebtoken`) + cookies `httpOnly`, `bcryptjs` para hash de contraseñas, `nodemailer` para envío de correos (Gmail).
- **Base de datos**: MongoDB (local, `mongodb://localhost:27017/PriceSmartDB` por defecto).

> Nota: no se implementó pasarela de pago real (no es un requisito obligatorio del proyecto); el checkout registra el método de pago elegido pero no procesa el cobro.

---

## Estructura del proyecto

```
Dermablend_Store/
├── Dermablend/
│   ├── backend/
│   │   ├── app.js                # Configuración de Express, middlewares y montaje de rutas
│   │   ├── index.js               # Punto de entrada (levanta el servidor)
│   │   ├── database.js            # Conexión a MongoDB
│   │   └── src/
│   │       ├── models/            # Esquemas de Mongoose (Clients, Employees, Orders, Products, Reviews, Promotions, Customizations)
│   │       ├── controller/        # Lógica de cada endpoint
│   │       ├── routes/            # Definición de rutas de Express (montadas bajo /api/*)
│   │       ├── services/          # Lógica de negocio reutilizable (login, registro, recuperación, correos)
│   │       ├── middlewares/       # authMiddleware (JWT) y roleMiddleware/selfOrRoles (autorización)
│   │       └── validations/       # Validaciones de entrada por ruta
│   └── frontend/
│       ├── Dermablend_Admin/      # Panel administrativo (React + Vite + Tailwind)
│       └── Dermablend_Public/     # Tienda pública (React + Vite)
└── README.md
```

---

## Requisitos previos

- Node.js 18+
- MongoDB corriendo localmente (o una URI de MongoDB Atlas)
- Una cuenta de Gmail con contraseña de aplicación (para el envío de correos de recuperación/verificación) — opcional para probar el resto de la app, pero necesaria para que los correos realmente se envíen.

---

### `Dermablend/frontend/Dermablend_Admin/.env`

```env
VITE_API_URL="http://localhost:3000/api"
```

> La tienda pública (`Dermablend_Public`) apunta al backend con una constante fija (`API_BASE_URL`) en `src/App.jsx`, no usa un archivo `.env`.

---

## Cómo correr el proyecto

Se necesitan **tres terminales** abiertas en paralelo.

### 1. Backend

```bash
cd Dermablend/backend
npm install
npm run dev
```

Levanta la API en `http://localhost:3000/api`. Requiere que MongoDB esté corriendo.

### 2. Panel de administración

```bash
cd Dermablend/frontend/Dermablend_Admin
npm install
npm run dev
```

Disponible en `http://localhost:5173` (o el puerto que asigne Vite).

### 3. Tienda pública

```bash
cd Dermablend/frontend/Dermablend_Public
npm install
npm run dev
```

Disponible normalmente en `http://localhost:5174` (Vite asigna el siguiente puerto libre si el 5173 ya está en uso).

---

## Crear el primer usuario Admin

No hay ninguna cuenta de administrador preexistente. Para crear una, hay dos opciones:

1. Insertarla directamente en Mongo usando el modelo `Employees` (para que la contraseña quede hasheada correctamente), con `role: "Admin"` y `status: "active"`.
2. Registrar un empleado desde el propio backend usando `POST /api/auth/register/employee` una vez que exista al menos un Admin (ruta protegida).

---

## Funcionalidades principales

### Tienda pública (`Dermablend_Public`)
- Catálogo de productos con búsqueda y filtro por categoría.
- Detalle de producto con productos relacionados.
- Registro, inicio de sesión y recuperación de contraseña por correo.
- **Confirmación de cuenta por correo electrónico**: al registrarse se envía un correo con un enlace de verificación; el checkout está bloqueado hasta que la cuenta se confirma.
- Carrito de compras persistente (`localStorage`), con checkout completo (dirección de envío, método de pago, resumen y confirmación de orden).
- El checkout solo puede completarse si el usuario inició sesión.
- Reseñas de productos, restringidas a clientes que efectivamente recibieron ese producto en un pedido entregado.
- Perfil de cliente con historial de pedidos (y cancelación de pedidos pendientes) y fórmulas personalizadas guardadas.
- Enrutamiento real con React Router DOM (`/`, `/catalog`, `/product/:id`, `/customizer`, `/cart`, `/profile`, `/verify-email`, `/reset-password`), con `/profile` protegida para usuarios autenticados.
- Notificaciones visuales (toasts) para confirmar acciones y mostrar errores.

### Panel de administración (`Dermablend_Admin`)
- Dashboard con KPIs (ventas totales, pedidos pendientes, productos activos, nuevos usuarios) y gráficas.
- CRUD completo de Productos, Clientes, Empleados, Órdenes y Reseñas.
- Autenticación separada para empleados (`/auth/login/employee`), con sesión basada en cookie `httpOnly` + JWT.
- Rutas protegidas por rol (Admin/Employee) tanto a nivel de frontend como en el backend.

### Backend
- Autenticación JWT con cookies `httpOnly`, diferenciando roles `Admin`, `Employee` y `Client`.
- Autorización a nivel de recurso: un cliente solo puede ver/editar/cancelar sus propios pedidos, reseñas y personalizaciones (salvo Admin/Employee, que pueden gestionar todo).
- El precio y el total de cada orden se calculan siempre en el servidor a partir del precio real del producto (nunca se confía en el precio enviado por el cliente).
- Control de stock automático al crear, cancelar o eliminar órdenes.

---

## Notas / limitaciones conocidas

- No hay pasarela de pago real conectada (no es requisito del proyecto).
- Las categorías de producto son texto libre en el modelo (no hay una colección de "Categorías" separada).
- El correo de verificación/recuperación requiere credenciales válidas de Gmail en `.env`; si no se configuran, el backend registra la URL en consola como respaldo para poder probar el flujo igualmente.
