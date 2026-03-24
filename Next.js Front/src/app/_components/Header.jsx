import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";

async function Header() {
  const { getUser} = getKindeServerSession();
  const user = await getUser();
 
  const Menu = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Explore", path: "/explore" },
    { id: 3, name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <div className="flex justify-between items-center p-3 shadow-sm">
      <div className="flex items-center gap-10">
        <Link href={"/"}>
          <Image src={"/assets/images/img/logo.png"} alt="Logo Image" width={100} height={100} />
        </Link>
        <ul className="hidden md:flex gap-8">
          {Menu.map((item) => (
            <Link href={item.path} key={item.id}>
              <li className="hover:text-lime-600 cursor-pointer hover:scale-105 transition-all">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {user ? (
        /* الحاوية الرئيسية مع خاصية group للتحكم في الـ Hover */
        <div className="relative group cursor-pointer flex items-center gap-2">
          {/* الجزء المرئي دائماً (الصورة والاسم) */}
          <div className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-all">
            {user?.picture ? (
              <Image
                src={user.picture}
                alt="profile"
                width={35}
                height={35}
                className="rounded-full border shadow-sm"
              />
            ) : (
              <div className="bg-blue-100 text-blue-600 w-9 h-9 rounded-full flex items-center justify-center font-bold">
                {user?.given_name?.[0]}
              </div>
            )}
            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:rotate-180 transition-transform" />
          </div>

          {/* القائمة المنسدلة (تظهر فقط عند الـ Hover على الحاوية) */}
          <div
            className="absolute top-full right-0 mt-1 w-52 bg-white border rounded-xl shadow-xl py-2 
                    invisible opacity-0 translate-y-2
                    group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 
                    transition-all duration-200 z-50"
          >
            {/* معلومات المستخدم سريعة */}
            <div className="px-4 py-2 border-b mb-1">
              <p className="text-sm font-bold text-gray-800 truncate">
                {user?.given_name} {user?.family_name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>

            {/* روابط القائمة */}
            <ul className="text-sm text-gray-700">
              <Link href={"/my-booking"}>
                <li className="px-4 py-2 hover:bg-lime-50 flex items-center gap-2 transition-colors">
                  <LayoutDashboard className="w-4 h-4 text-lime-600" />
                  My Appointments
                </li>
              </Link>
              <li className="px-4 py-2 hover:bg-lime-50 flex items-center gap-2 transition-colors">
                <User className="w-4 h-4 text-lime-600" />
                Profile
              </li>
            </ul>

            {/* خط فاصل وزر تسجيل الخروج */}
            <div className="border-t mt-1 pt-1">
              <LogoutLink className="px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-sm text-red-600 transition-colors w-full">
                <LogOut className="w-4 h-4" />
                Logout
              </LogoutLink>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <LoginLink className="text-sm font-semibold text-gray-700 hover:text-lime-600">
            Sign in
          </LoginLink>

          <RegisterLink>
            <Button>Get Started</Button>
          </RegisterLink>
        </div>
      )}
    </div>
  );
}

export default Header;

/**
 *
 *
 */
