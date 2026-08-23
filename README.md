# AnimeFlix - انیمه فلیکس

پلتفرم پخش آنلاین انیمه، منگا و مانهوا

## 🚀 شروع سریع

### پیش‌نیازها
- Node.js (v18 یا بالاتر)
- npm یا yarn

### نصب بک‌اند

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

بک‌اند در آدرس `http://localhost:5000` اجرا می‌شود.

### نصب فرانت‌اند

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

فرانت‌اند در آدرس `http://localhost:5173` اجرا می‌شود.

## 📁 ساختار پروژه

```
animeflix/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   ├── styles/
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🔧 ویژگی‌ها

- ✅ پخش ویدیو انیمه
- ✅ خواندن منگا و مانهوا
- ✅ جستجو و فیلتر
- ✅ لیست تماشا
- ✅ احراز هویت کاربران
- ✅ پنل مدیریت
- ✅ طراحی واکنش‌گرا و RTL

## 🛠 تکنولوژی‌ها

**بک‌اند:**
- Node.js + Express
- SQLite + Sequelize
- JWT Authentication
- Multer (آپلود فایل)

**فرانت‌اند:**
- React + Vite
- React Router
- Axios
- Tailwind CSS
- Vazirmatn Font

## 📝 License

MIT
