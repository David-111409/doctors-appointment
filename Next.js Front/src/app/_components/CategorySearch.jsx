"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Api from "../_utils/Api";

function CategorySearch() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategoryList = async () => {
      await Api.getCategoryList().then((res) => {
        setCategories(res.data.data);
      });
    };
    getCategoryList();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center mb-7">
        <h2 className="font-bold text-4xl mb-7">
          <span className="text-lime-600">Search</span> Categories
        </h2>
        <div className="flex items-center w-full max-w-sm relative">
          <Input name="customer-email" placeholder="Email" type="email" />
          <Button type="submit" className="absolute inset-e-0">Subscribe</Button>
        </div>
      </form>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-5">
        {categories.length > 0
          ? categories.map((cat) => (
              <Link key={cat.id} href={"/search/" + cat.name}>
                <li className="flex gap-2 items-center p-5 hover:scale-110 transition-all">
                  <Image
                    src={`http://localhost:1337${cat.icon.url}`}
                    alt={cat.name}
                    width={70}
                    height={70}
                    className="h-20 w-20"
                    unoptimized={true}
                    loading="eager"
                  />
                  <span>{cat.name}</span>
                </li>
              </Link>
            ))
          : [1, 2, 3, 4, 5, 6].map((item) => (
              <li key={item} className="flex gap-2 items-center p-5 animate-pulse">
                <div className="w-17 h-17 bg-slate-200 rounded-lg"></div>
                <div className="h-4 w-24 bg-slate-200 rounded-md"></div>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default CategorySearch;
