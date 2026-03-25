import CardCancel from "./CardCancel";
function BookingCard({ item, type }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm flex flex-col gap-2">
      <h2 className="font-bold text-lg text-lime-600">{item.doctor?.name || "Doctor Name"}</h2>
      <div className="flex gap-2 text-gray-500">
        <span>📅 {item.date}</span>
        <span>⏰ {item.time}</span>
      </div>
      {type === "upcoming" && <CardCancel item={item} />}
    </div>
  );
}

export default BookingCard;
