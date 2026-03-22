"use client";
import Image from "next/image";
import axiosClient from "../_utils/Api";
import { useEffect, useState } from "react";
function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getDoctorsList = async () => {
      await axiosClient.get("/doctors?populate=*").then((res) => {
        setDoctors(res.data.data);
      });
    };
    getDoctorsList();
  }, []);

  return (
    <div className="mb-10 px-8">
      <h2 className="font-bold text-2xl mb-4 text-lime-600">Our Doctors</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {doctors.length > 0
          ? doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="border rounded-lg p-3 hover:shadow-sm transition-all ease-in-out"
              >
                <Image
                  src={`http://localhost:1337${doctor?.image?.url}`}
                  alt={doctor.name}
                  width={500}
                  height={200}
                  className="h-75 w-full object-cover rounded-lg"
                  unoptimized={true}
                  loading="eager"
                />

                <div className="mt-3 items-baseline flex flex-col gap-1">
                  <h2 className="text-[15px] text-lime-600 p-1 rounded-full px-2 bg-lime-200">
                    {doctor.category?.name}
                  </h2>

                  <h2 className="font-bold text-[21px]">{doctor.name}</h2>

                  <h2 className="text-primary text-sm">
                    <strong className="text-lime-600 text-xl">{doctor.experience}</strong> Years of
                    Experience
                  </h2>

                  <h2 className="text-gray-500 text-sm">{doctor.address}</h2>

                  <button className="p-2 px-3 border border-lime-500 text-primary rounded-full w-full text-center text-[15px] mt-2 cursor-pointer hover:bg-lime-500 hover:border-none  hover:text-white transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            ))
          : // Skeleton/Loading State
            [1, 2, 3, 4].map((_, index) => (
              <div key={index} className="h-55 bg-slate-200 w-full rounded-lg animate-pulse"></div>
            ))}
      </div>
    </div>
  );
}

export default DoctorsList;
