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
  - Copy to Clipboard  
  - Share via WhatsApp  
  - Share via Email  

### 3. Public Share Page  
- The `/share/[token]` route publicly renders a read-only table  
- Fetches student data using the token from the URL  
- Includes a built-in **email search filter** to quickly look up students  

### 4. UI & UX  
- Fully responsive across screen sizes  
- Clean layout using **ShadCN** components  
- Consistent theme, smooth interactions, and well-organized code structure  

---

## 🧠 Technical Notes

Originally, the backend API used `Access-Control-Allow-Origin: *`, which made using `credentials: "include"` (for secure cookie-based auth) **impossible** due to CORS restrictions.

### ✅ Final Approach  
To overcome this, we:
- Handled **token storage via client-side cookies** (not `httpOnly`)
- Used a **Next.js `middleware.js`** to protect the admin panel by checking the `accessToken` cookie
- Performed manual cookie parsing on the client when needed
- Implemented token refresh flow using the refresh token cookie

This approach allowed route protection without relying on `localStorage`, while staying within the boundaries of what browsers and the provided backend allow.

---

## 🛠️ Tech Stack

| Feature              | Tech                       |
|----------------------|----------------------------|
| Framework            | Next.js (App Router)       |
| Styling              | Tailwind CSS, ShadCN       |
| Icons                | Lucide-react               |
| Notifications        | Sonner                     |
| Auth                 | Cookie-based (client-managed) |
| Routing Protection   | `middleware.js`            |

---

Thanks to the **DTU T&P Dev Team** for this engaging challenge!
