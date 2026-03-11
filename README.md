# 🥗 NutriTrace Backend — Supply Chain Transparency App

Backend service untuk **NutriTrace**, platform pelacakan rantai pasok pangan yang menghadirkan transparansi dari asal bahan hingga distribusi akhir ke konsumen. Dibangun menggunakan **Express.js** + **Prisma** dengan PostgreSQL.

🔗 **Live Backend:** -
🔗 **Frontend Repository:** https://github.com/bayufadayan/nutri-trace-app-frontend  
🔗 **Backend Repository:** https://github.com/bayufadayan/nutri-trace-app-backend

---

## 📘 Project Title
**NutriTrace Backend**

---

## 📝 Description
NutriTrace adalah solusi digital untuk meningkatkan **transparansi pangan bergizi**. Pengguna dapat menelusuri asal bahan, proses pengolahan, informasi gizi, hingga distribusi produk melalui batch dan QR code unik. Tujuannya: meningkatkan kepercayaan publik terhadap program pangan sekolah (MBG) dan memudahkan pengawasan kualitas pangan.

---

## 🧰 Technologies Used
- **Express.js** — web framework Node.js ringan & cepat  
- **Prisma ORM** — schema-first ORM untuk PostgreSQL  
- **PostgreSQL** — basis data relasional yang andal  
- **JWT Authentication** — otentikasi berbasis token  
- **dotenv** — manajemen konfigurasi environment  
- **Nodemon** (dev) — autoreload saat pengembangan  
- **IBM Granite 3.3:2b via Ollama** — mendukung generasi & optimisasi kode (AI Assisted)

---

## ✨ Features
| Fitur | Deskripsi |
| --- | --- |
| **Role Management System** | Hak akses per peran (admin / distributor / produsen) |
| **Food Traceability** | Lacak asal bahan, proses, hingga distribusi |
| **Nutrition Analysis** | Info gizi (kalori, protein, karbo, lemak) per produk |
| **QR Code Tracking** | Batch & QR unik untuk setiap produk |
| **REST API** | Endpoint CRUD terstruktur & scalable |

Contoh response singkat:
```json
{
  "id": "batch_001",
  "name": "Nasi Ayam Sehat",
  "nutrition": { "calories": 520, "protein": 22 },
  "trace": { "producer": "PT Makanan Sehat", "distributor": "Dinas Pendidikan Bogor" }
}
```

---
## ⚙️ Setup Instructions
### 1. Clone repository
```bash
git clone https://github.com/bayufadayan/nutri-trace-app-backend.git
cd nutri-trace-app-backend
npm install

```
### 2. Environment Variables
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="your_postgre_uri"

JWT_ACCESS_SECRET=rahasia_access
JWT_REFRESH_SECRET=rahasia_refresh
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

```
### 3. Prisma & Database
```env
npx prisma validate
npx prisma generate
npx prisma db push

```

### 4. Run the app
```bash
# Development
npm run dev

# Production
npm start

```
Server default: http://localhost:5000

---

## 🔌 Quick API Glimpse (contoh)
```pgsql
POST    /api/auth/login       -> login (JWT)
POST    /api/auth/register    -> register account
POST    /api/auth/logout      -> logout account
GET     /api/users            -> CRUD user
GET     /api/batches          -> list All Batch
POST    /api/batches          -> Create new Batch and generate QR
PUT     /api/batches/:id      -> Update Batch
GET     /api/batches/:id      -> Get by Id Batch
DELETE  /api/batches/:id      -> Delete Batch and QR Code

#Another Path
GET    /api/distributions     -> Get all distribution
GET    /api/nutritions        -> Get all nutrition
GET    /api/products          -> Get all product

```
Catatan: Skema & daftar endpoint lengkap dapat dilihat pada https://nanti.com

---
## 🧠 AI Support Explanation
Pengembangan backend dibantu IBM Granite 3.3:2b via Ollama untuk:
- Menghasilkan boilerplate CRUD yang konsisten
- Merancang skema database dengan Prisma
- Membantu debugging & optimisasi saat pengembangan

---

## 🖥️ Deployment
- SSL diaktifkan untuk akses aman
- Live Backend: https://nutri-trace-backend.bayufadayan.my.id/

---

## 📝 License
MIT License

---

## 🔗 Related Links
- Frontend Live: https://nutri-trace.vercel.app/
- Frontend Repo: https://github.com/bayufadayan/nutri-trace-app-frontend
  
- Backend Live: https://nutri-trace-backend.bayufadayan.my.id/
- Backend Repo: https://github.com/bayufadayan/nutri-trace-app-backend
  
- Dokumentasi/Media: https://drive.google.com/drive/folders/1otM2QtGHR8jDnluKCaphZTZsuhg5tpsp?usp=sharing

---

<p align="center"> </p> <p align="center"> <a href="https://github.com/bayufadayan"> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/> </a> <a href="https://www.linkedin.com/in/muhamad-bayu-fadayan/"> <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/> </a> <a href="https://bayufadayan.my.id/"> <img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white"/> </a> <a href="https://drive.google.com/file/d/1fPClIxWKbeaKyArwL9cSIDmOFeT-tBt2/view?usp=drive_link"> <img src="https://img.shields.io/badge/CURICULUM%20VITAE-4285F4?style=for-the-badge&logo=googledrive&logoColor=white"/> </a> </p> <p align="center"> Made with ❤️ by <a href="https://github.com/bayufadayan">Bayu Fadayan</a><br/> <img src="https://img.shields.io/badge/Year-2025-blue?style=flat-square"/> <img src="https://img.shields.io/badge/Role-Backend%20Developer-purple?style=flat-square"/><br/><br/> <a href="https://github.com/bayufadayan/nutri-trace-app-backend"> <img src="https://img.shields.io/badge/Go%20to%20this%20repository-000000?style=flat-square&logo=github&logoColor=white"/> </a> </p>
