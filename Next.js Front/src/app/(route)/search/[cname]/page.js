"use client";
import DoctorCard from "@/app/_components/DoctorCard";
import { useEffect, useState } from "react";
import Api from "@/app/_utils/Api";

export default function Search({ params }) {
  const skeletonAr = [1, 2];

  const [doctors, setDoctors] = useState([]);

  const getName = async () => {
    const { cname } = await params;
    return cname;
  };

  const categoryName = getName();

  console.log(doctors);

  useEffect(() => {
    const getDoctors = async (cat) => {
      await Api.getDoctorByCategory(cat).then((res) => setDoctors(res.data.data));
    };

    getDoctors(categoryName);
  }, [categoryName]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {doctors.length > 0
        ? doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
        : skeletonAr.map((_, index) => (
            <div key={index} className="h-75 bg-slate-200 w-full rounded-lg animate-pulse"></div>
          ))}
    </div>
  );
}
