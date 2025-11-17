# 📘 **Employees Dashboard**

A lightweight employee management system built with a modern stack:

-   **NestJS + Prisma + PostgreSQL** (Neon) for the backend API\
-   **Next.js App Router** for the frontend dashboard\
-   **API Key Authentication** for simple and secure access\
-   **Vercel-ready** monorepo deployment (frontend + backend in one
    repo)

Designed to be clean, fast, and minimal --- ideal as a teaching project,
starter kit, or internal tool.

---

## 🚀 **Features**

### **Backend (NestJS + Prisma + PostgreSQL)**

-   CRUD for employees\
-   API Key authentication (bearer token)\
-   Prisma ORM with Neon Postgres\
-   Modular structure (PrismaModule, ApiKeyModule, AuthModule,
    EmployeesModule)\
-   Includes seed script for initial API key + user\
-   Typed DTOs and services\
-   Ready for Vercel Serverless Functions (via nest build)

### **Frontend (Next.js)**

-   Dashboard to view, create, update, delete employees\
-   Side panel UI for Add/Edit forms\
-   Client-side updates without page reload\
-   Clean, modern UI components\
-   API proxy routes protecting the API key\
-   Fully responsive layout

### **Dev Experience**

-   Single GitHub repo for both API + Dashboard\
-   Easy environment setup\
-   Simple Vercel deployment\
-   Hot reload with `npm run dev`

---

## 🏗️ **Tech Stack**

### **Frontend**

-   Next.js (App Router)
-   React
-   TailwindCSS
-   Fetch API with `/api/employees` route proxy
-   SidePanel & reusable form components

### **Backend**

-   NestJS\
-   Prisma ORM\
-   Neon Postgres\
-   API Key Auth Guard\
-   Modular architecture\

---

## 📁 **Monorepo Structure**

    root/
    │
    ├── api/                     # NestJS backend
    │   ├── prisma/
    │   ├── src/
    │   ├── .gitignore
    │   ├── package.json
    │   └── tsconfig.json
    │
    ├── app/                     # Next.js frontend
    │   ├── app/
    │   ├── lib/
    │   ├── ui/components
    │   ├── ui/styles
    │   ├── public/
    │   ├── .gitignore
    │   ├── package.json
    │   └── next.config.js
    │
    └── README.md

---

## ⚙️ **Environment Variables**

Create a `.env` file:

```env
# API
DATABASE_URL="postgresql://..."
PORT=your-desired-port

# Frontend
EMPLOYEES_API_BASE_URL="https://your-nest-api-url"
EMPLOYEES_API_KEY="your-seeded-api-key"
```

---

## 🧪 **Development**

### Install dependencies:

```bash
npm install
```

### Run the API:

```bash
cd employees-api
npx prisma migrate dev
npm run start:dev
```

### Seed initial API key

```bash
npx ts-node prisma/seed.ts
```

### Run the Next.js Dashboard:

```bash
cd employees-app
npm run dev
```

Open:

    http://localhost:3000

---

## 📦 **Build**

### Build API:

```bash
cd api
npm run build
```

### Build App:

```bash
cd app
npm run build
```

---

## ☁️ **Deploy to Vercel**

This repo is designed to deploy easily:

### Deploy frontend:

-   Connect repo to Vercel\
-   Set build output to: `app/.next`\
-   Add env variables\
-   Deploy

### Deploy Nest API to Vercel Serverless Functions:

Inside `api/` folder:

-   Set `"build": "nest build"`\
-   Vercel will detect serverless functions inside `api/dist/main.js`

Set environment variables in Vercel dashboard.

---

## 🧹 **API Routes**

### **GET /employees**

Returns all employees

### **POST /employees**

Create an employee

### **PATCH /employees/:id**

Update an employee

### **DELETE /employees/:id**

Delete an employee

Authentication is via:

    Authorization: Bearer <API_KEY>

---

## 🎨 **Screenshots (Optional)**

_Add your Sora hero image or dashboard screenshots here._

---

## 📌 **Roadmap**

-   Role-based permissions\
-   File uploads (profile pictures)\
-   Activity logging\
-   Team/Department management\
-   Invite system\
-   Dark mode

---

## 📝 **License**

MIT License --- free to use, modify, and distribute.
