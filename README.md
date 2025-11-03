# gerency-jokes-api

Api made to manage the best jokes of the world!

This is a Node.js project built using **TypeScript**, **Solid architecture**, **unit tests**, **design patterns** (Factory and In-Memory), **Docker**, and **Prisma ORM**.

## 🧱 Stack

- **Node.js** `v20.14.0`
- **TypeScript**
- **Fastify**
- **Prisma**
- **Docker / Docker Compose**
- **Vitest** (for unit tests)
- **SOLID principles**
- **Design Patterns** (Factory, In-Memory Repository)

---

## 🚀 How to Run the Project

### 1. Clone the repository and install dependencies

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install
```

### 2. Setup environment variables

Rename the `.env-example` file to `.env` and fill in the required environment variables.

```bash
cp .env-example .env
```

> Example of needed variables: `DATABASE_URL`, `PORT`, etc.

---

### 3. Start containers using Docker Compose

```bash
docker-compose up -d
```

This will start your application and its dependencies (e.g. database).

---

### 4. Run database migrations (Prisma)

```bash
npx prisma migrate dev
```

This will apply the current Prisma schema and generate the client.

---

### 5. Start the development server

```bash
npm run dev
```

Your API should now be running at `http://localhost:3000` (or as defined in your `.env` file).

---

## 🧪 Running Automated Tests

To run unit tests:

```bash
npm run test
```

Tests are implemented using **Vitest**, and cover services, use cases, and repositories using in-memory databases and factory design patterns.

---

## 📚 API Routes

### 📁 Categories

| Method | Endpoint              | Description             |
|--------|------------------------|-------------------------|
| POST   | `/categories`          | Create a new category   |
| GET    | `/categories`          | Get all categories      |
| GET    | `/categories/:id`      | Get category by ID      |
| PUT    | `/categories/:id`      | Update category by ID   |
| DELETE | `/categories/:id`      | Delete category by ID   |

### 🃏 Jokes

| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| POST   | `/jokes`         | Create a new joke  |
| GET    | `/jokes`         | Get all jokes      |
| GET    | `/jokes/:id`     | Get joke by ID     |
| DELETE | `/jokes/:id`     | Delete joke by ID  |

---

## 🛑 Stopping the Application

To stop and remove containers:

```bash
docker-compose down
```

---

## ✅ License

This project is open-source and free to use.
