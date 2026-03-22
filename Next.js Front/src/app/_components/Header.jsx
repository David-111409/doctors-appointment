import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
function Header() {
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
      <Button>Get Started</Button>
    </div>
  );
}

export default Header;
