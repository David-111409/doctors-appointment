"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosClient from "../_utils/Api";
import { useEffect, useState } from "react";
import Image from "next/image";

function CategorySearch() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategoryList = async () => {
      await axiosClient.get("/categories?populate=*").then((res) => {
        setCategories(res.data.data);
      });
    };
    getCategoryList();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center mb-10">
      <form onSubmit={handleSubmit} className="flex flex-col items-center mb-7">
        <h2 className="font-bold text-4xl mb-7">
          <span className="text-lime-600">Search</span> Categories
        </h2>
        <div className="flex items-center w-full max-w-sm">
          <Input name="customer-email" placeholder="Email" type={"email"} />
          <Button type="submit">Subscribe</Button>
        </div>
      </form>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-5">
        {categories.length > 0
          ? // الحالة الحقيقية: عرض البيانات
            categories.map((cat) => (
              <li
                key={cat.id}
                className="flex gap-2 items-center p-5 hover:scale-110 cursor-pointer transition-all"
              >
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
            ))
          : // حالة الـ Skeleton: تكرار 6 عناصر وهمية
            [1, 2, 3, 4, 5, 6].map((item) => (
              <li key={item} className="flex gap-2 items-center p-5 animate-pulse">
                {/* محاكاة الأيقونة بنفس الحجم 70x70 */}
                <div className="w-17 h-17 bg-slate-200 rounded-lg"></div>

                {/* محاكاة النص بعرض وطول تقريبي */}
                <div className="h-4 w-24 bg-slate-200 rounded-md"></div>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default CategorySearch;
