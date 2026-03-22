import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
function CategoriesSideBar({ categoryList }) {
  const pathName = usePathname();
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
                {pathName.split("/").at(-1) === cat.name && <Check />}
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default CategoriesSideBar;
