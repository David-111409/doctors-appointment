import Link from "next/link";
import Image from "next/image";
function SuggestCard({doctor}) {
  return (
    <Link  href={`/details/${doctor?.documentId}`}>
      <div className="border rounded-lg p-3 mt-3 flex flex-col ">
        <div className="items-baseline flex flex-col">
          <span className="text-lime-600 mt-3 bg-lime-200 rounded-full p-1 text-[12px] text-bold">
            {doctor?.category?.name}
          </span>
          <span className="mt-2"> {doctor?.name}</span>
          <h2 className="text-primary text-sm">
            <strong className="text-lime-600 text-xl">{doctor.experience}</strong> Years Experience
          </h2>
        </div>
        <Image
          src={`http://localhost:1337${doctor?.image?.url}`}
          alt={doctor.name}
          width={50}
          height={20}
          className="h-45 w-full object-cover rounded-xl mt-2"
          unoptimized={true}
          loading="eager"
        />
      </div>
    </Link>
  );
}

export default SuggestCard;
