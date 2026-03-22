"use client";
import { useEffect, useState } from "react";

import Api from "@/app/_utils/Api";
import CategoriesSideBar from "@/app/_components/CategoriesSideBar";

function Layout({ children }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const getCategories = () => {
      Api.getCategoryList().then((res) => {
        setCategoryList(res.data.data);
      });
    };

    getCategories();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 lg:px-12 mt-10 mb-10">
      <div>
        <h2 className="font-bold text-lg mb-4 text-lime-600">Search By Categories</h2>
        <CategoriesSideBar categoryList={categoryList} />
      </div>

      <div className="md:col-span-3">{children}</div>
    </div>
  );
}

export default Layout;
