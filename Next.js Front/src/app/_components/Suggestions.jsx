"use client";
import { useState, useEffect } from "react";
import Api from "@/app/_utils/Api";
import SuggestCard from "./SuggestCard";
import { Loader2 } from "lucide-react";
function Doctoruggestions() {
  const [doctorList, setDoctorList] = useState([]);

  const getDoctorsList = () => {
    Api.getTop5Doctors().then((resp) => {
      console.log("doctors", resp.data.data);
      setDoctorList(resp.data.data);
    });
  };

  useEffect(() => {
    getDoctorsList();
  }, []);
  console.log("suggestions rendering");
  return (
    <div className="grid grid-cols-1 gap-x-1 md:grid-cols-2 p-3">
      {doctorList.length > 0 ? (
        doctorList.map((doctor) => <SuggestCard doctor={doctor} key={doctor.id} />)
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 text-lime-600 animate-spin" />
          <p className="text-gray-500 mt-2 animate-pulse">Fetching Some Suggestions for you...</p>
        </div>
      )}
    </div>
  );
}

export default Doctoruggestions;
