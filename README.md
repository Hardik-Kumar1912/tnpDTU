# DTU TnP Data Share App

This is my submission for the **DTU Training and Placement Department Development Team Recruitment Challenge 2025**. The app enables the admin to generate secure, shareable links that allow external recruiters to view selected student data — no login required on their end.

---

## 🚀 Features Implemented

### 1. Admin Login  
- Clean and responsive login page built with **Next.js** and **Tailwind CSS**  
- Real-time feedback using **Sonner** toast notifications  
- DTU branding with logo and consistent theme  
- On successful login, tokens are stored in cookies  

### 2. Protected Admin Panel  
- Home page (`/`) functions as the admin panel  
- Authenticated using a **Next.js middleware** that checks for an access token cookie  
- Admins can generate a **secure shareable link** using the provided backend API  
- The generated link includes:
  - ✅ Copy to Clipboard  
  - ✅ Share via WhatsApp  
  - ✅ Share via Email  
  - ✅ **Custom Expiry Option** (e.g., 5m, 1h, 1d)  
  - ✅ **Admin Note Attachment** to guide recruiters  

### 3. Public Share Page (`/share/[token]`)  
- Renders a read-only table of selected student data  
- Token is extracted from the URL and validated via API  
- Features:
  - ✅ **Email search filter**  
  - ✅ **Admin note display** (if provided)  
  - ✅ **Link expiration check** using localStorage metadata  
  - ✅ **Export Options**: Download data as Excel and PDF  
  - 🔒 Shows expiry error if the token is no longer valid  

### 4. DTU Branded Loading Animation  
- Custom loader featuring DTU logo appears on loading states  
- Uses global `LoadingContext` and `DtuLoader` component for centralized control  

### 5. UI & UX  
- Fully responsive across screen sizes  
- Clean layout using **ShadCN** components  
- Consistent theme, shadows, spacing, and smooth transitions  

---

### ✅ Final Approach  
To overcome this, we:
- Handled **token storage via client-side cookies** (not `httpOnly`)  
- Used a **Next.js `middleware.js`** to protect the admin panel by checking the `accessToken` cookie  
- Performed manual cookie parsing on the client when needed  
- Implemented **custom link expiry and metadata** using `localStorage`  
- Enabled safe **admin-only access** to sensitive functionality  

---

## 🛠️ Tech Stack

| Feature              | Tech                       |
|----------------------|----------------------------|
| Framework            | Next.js (App Router)       |
| Styling              | Tailwind CSS, ShadCN       |
| Icons                | Lucide-react               |
| Notifications        | Sonner                     |
| Auth                 | Cookie-based (client-managed) |
| Route Protection     | `middleware.js`            |
| Loader Animation     | DTU logo + context-based spinner |
| Export               | `xlsx` + `jspdf-autotable` |

---

## ✅ Bonus Features

- ⏰ Expiry control per link  
- 📝 Custom admin notes for recruiters  
- 📄 Export to Excel and PDF  
- 📱 Fully responsive UI  
- 🌀 DTU-branded loading spinner  
- 🔐 Middleware-protected routes using cookie logic  

---

Thanks to the **DTU T&P Dev Team** for this engaging challenge!
