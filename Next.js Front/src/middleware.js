import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default function middleware(req) {
  return withAuth(req);
}

// حدد الصفحات التي تريد حمايتها
export const config = {
  matcher: ["/my-booking/:path*", "/dashboard/:path*"],
};