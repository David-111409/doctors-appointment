"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import Api from "@/app/_utils/Api";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

function CategoriesSideBar() {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  const pathname = usePathname();
  
  useEffect(() => {
    const getCategories = () => {
      Api.getCategoryList().then((res) => {
        setCategoryList(res.data.data);
        setLoading(false);
      });
    };
    getCategories();
  }, []);
  if (loading)
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20">
        <Loader2 className="h-10 w-10 text-lime-600 animate-spin" />
        <p className="text-gray-500 mt-2 animate-pulse">Fetching Categories...</p>
      </div>
    );

  return (
    <Command className="rounded-lg border shadow-sm h-auto">
      <CommandInput placeholder="Search category..." />
      <CommandList className="overflow-visible">
        <CommandGroup>
          {categoryList.map((cat) => (
            <Link href={"/search/" + cat.name} key={cat.id}>
              <CommandItem
                className={`
    cursor-pointer flex gap-2 p-x-3 rounded-md transition-all
    data-[selected='true']:bg-transparent data-[selected='true']:text-inherit
  `}
              >
                <Image
                  src={`http://localhost:1337${cat.icon.url}`}
                  alt={cat.name}
                  width={20}
                  height={20}
                  className="h-8 w-8  object-cover"
                  unoptimized={true}
                  loading="eager"
                />
                <span className="text-sm">{cat.name}</span>
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default CategoriesSideBar;
