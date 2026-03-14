# 🌿 Jivdaya Agro Mart

Full-stack web application for agricultural products - React frontend, Node.js/Express backend, PostgreSQL database.

---

## 📂 Project Structure (Entity-wise)

```
jivdaya-agro-mart/
├── backend/
│   ├── config/          # Database & Cloudinary config
│   ├── entities/        # Entity-wise organization
│   │   ├── auth/        # Auth controller & routes
│   │   └── product/     # Product controller & routes
│   ├── middleware/      # Auth & role middleware
│   ├── uploads/         # Temp uploads (before Cloudinary)
│   ├── database/        # Seed script for default admin
│   ├── app.js
│   ├── server.js
│   └── .env.example
├── frontend/
│   └── src/
│       ├── api/         # Axios instance
│       ├── components/  # Navbar, ProductCard
│       ├── pages/       # All pages (entity-wise)
│       ├── utils/       # WhatsApp helper
│       ├── App.js
│       ├── index.js
│       └── styles.css
├── database/
│   └── schema.sql       # PostgreSQL schema
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- PostgreSQL (v12+)
- npm

---

## 1️⃣ PostgreSQL Setup

### Install PostgreSQL

**Windows (Official Installer):**
1. Download: https://www.postgresql.org/download/windows/
2. Run installer, set password for `postgres` user
3. Remember the port (default: 5432)

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

### Create Database

1. Open **pgAdmin** or **psql** command line
2. Create database:

```sql
CREATE DATABASE jivdaya_db;
```

3. Connect to `jivdaya_db` and run the schema:

```bash
psql -U postgres -d jivdaya_db -f database/schema.sql
```

Or in pgAdmin: Tools → Query Tool → Open `database/schema.sql` → Execute

---

## 2️⃣ Cloudinary Setup (Free Image Storage)

1. Sign up: https://cloudinary.com (free tier)
2. Go to **Dashboard** → copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Add to backend `.env`:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 3️⃣ Environment Variables

### Backend `.env`

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jivdaya_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=change_this_to_a_long_random_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
WHATSAPP_NUMBER=919876543210
```

### Frontend `.env`

```bash
cd frontend
cp .env.example .env
```

Edit `.env`:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WHATSAPP_NUMBER=919876543210
```

---

## 4️⃣ WhatsApp Number

- Use format: country code + number (no + or spaces)
- Example: India `919876543210`, USA `12025551234`
- Add to both backend and frontend `.env` as `WHATSAPP_NUMBER` / `REACT_APP_WHATSAPP_NUMBER`

---

## 5️⃣ Seed Default Admin

After running schema, create admin user:

```bash
cd backend
node database/seed.js
```

**Default Admin:**
- Email: `admin@jivdaya.com`
- Password: `admin123`

---

## 6️⃣ Run the Application

### Terminal 1 - Backend

```bash
cd backend
npm install
npm start
```

Server: http://localhost:5000

### Terminal 2 - Frontend

```bash
cd frontend
npm install
npm start
```

App: http://localhost:3000

---

## 📋 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | No | Login |
| GET | /api/auth/profile | Yes | Get profile |
| GET | /api/products | No | All products |
| GET | /api/products/:id | No | Single product |
| POST | /api/products | Admin | Create product |
| PUT | /api/products/:id | Admin | Update product |
| DELETE | /api/products/:id | Admin | Delete product |

---

## 🔐 User Roles

- **ADMIN** – Dashboard, add/edit/delete products
- **USER** – Browse products, Buy Now via WhatsApp

---

## 📱 Buy Now Flow

1. User clicks **Buy Now** on product
2. Modal asks for **location** (required)
3. Clicks **Open WhatsApp** → opens WhatsApp with pre-filled message
4. Message format ( Gujarati ):

```
Hu aa product order karva mangu chhu:
Product Name: [name]
Price: [price]
Maru Location: [location]
Delivery time confirm kari janavjo.
```

---

## 🌐 Hosting Notes

- **Backend**: Render, Railway, Heroku – set env vars, add PostgreSQL
- **Frontend**: Vercel, Netlify – set `REACT_APP_API_URL` to backend URL
- **PostgreSQL**: Supabase, Railway, Render (free tiers)

---

## 📦 Tech Stack

- **Frontend**: React (JS), React Router, Axios, Plain CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (native `pg`)
- **Auth**: JWT, bcrypt
- **Images**: Cloudinary (Multer for upload)
- **Orders**: WhatsApp link generation
