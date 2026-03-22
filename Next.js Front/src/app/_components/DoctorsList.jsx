"use client";
import Api from "../_utils/Api";
import { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";

function DoctorsList() {
  const skeletonAr = [1, 2, 3, 4]; 

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getDoctorsList = async () => {
      await Api.getAllDoctors().then((res) => setDoctors(res.data.data));
    };
    getDoctorsList();
  }, []);

  return (
    <div className="my-10 px-8">
      <h2 className="font-bold text-2xl mb-4 text-lime-600">Our Popular Doctors</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {doctors.length > 0
          ? doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
          : skeletonAr.map((_, index) => (
              <div key={index} className="h-75 bg-slate-200 w-full rounded-lg animate-pulse"></div>
            ))}
      </div>
    </div>
  );
}

export default DoctorsList;
