/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337", // منفذ Strapi الافتراضي
        pathname: "/uploads/**", // السماح فقط بملفات المجلد uploads
      },
      // إذا كنت تستخدم صوراً من مصادر أخرى (مثل Google User Images) أضفها هنا:
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
