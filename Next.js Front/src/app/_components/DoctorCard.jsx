import Image from "next/image";

function DoctorCard({ doctor }) {
  return (
    <div className="border rounded-lg p-3 hover:shadow-sm transition-all ease-in-out">
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
          <strong className="text-lime-600 text-xl">{doctor.experience}</strong> Years of Experience
        </h2>

        <h2 className="text-gray-500 text-sm">{doctor.address}</h2>

        <button className="p-2 px-3 border border-lime-500 text-primary rounded-full w-full text-center text-[15px] mt-2 cursor-pointer hover:bg-lime-500 hover:border-none  hover:text-white transition-all">
          Book Now
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;
