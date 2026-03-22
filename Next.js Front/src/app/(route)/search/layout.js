"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Api from "@/app/_utils/Api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

function Layout({ children }) {
  const [categoryList, setCategoryList] = useState([]);

  console.log(categoryList);

  const pathname = usePathname(); // لمعرفة القسم المختار حالياً
  const getCategories = () => {
    Api.getCategoryList().then((res) => {
      setCategoryList(res.data.data);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-6 lg:px-12 mt-10">
      <div className="hidden md:block">
        <h2 className="font-bold text-lg mb-4 text-lime-600">Categories</h2>
        <Command className="rounded-lg border shadow-sm">
          <CommandInput placeholder="Search category..." />
          <CommandList className="overflow-visible">
            <CommandGroup>
              {categoryList.map((cat) => (
                <Link href={"/search/" + cat.name} key={cat.id}>
                  <CommandItem
                    onSelect={() => {}}
                    className={`
          cursor-pointer flex gap-2 p-3 rounded-md transition-all
          data-[selected='true']:bg-lime-200 data-[selected='false']:bg-transparent
          ${
            pathname.includes(cat.name)
              ? "bg-lime-200 text-lime-900 font-medium"
              : "hover:bg-gray-100 text-gray-600"
          }
        `}
                  >
                    <Image
                      src={`http://localhost:1337${cat.icon.url}`}
                      alt="icon"
                      width={20}
                      height={20}
                      unoptimized={true}
                    />
                    <span className="text-sm">{cat.name}</span>
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      <div className="md:col-span-3">{children}</div>
    </div>
  );
}

export default Layout;
