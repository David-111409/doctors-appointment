"use client";
import { useEffect, useState, use } from "react";
import Api from "@/app/_utils/Api";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
function Details({ params }) {
  const [date, setDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useKindeBrowserClient(); // جلب بيانات المستخدم الحالي

  const saveBooking = async () => {
    setIsDialogOpen(false);
    const formattedDate = date.toLocaleDateString("en-CA");
    const payload = {
      data: {
      
        username: user?.given_name + " " + user?.family_name, // الاسم من Kinde
        date: formattedDate,
        email: user?.email,
        time: selectedTimeSlot,
        doctor: doctor.documentId,
      },
    };

    const bookingPromise = Api.createAppointment(payload);

    toast.promise(bookingPromise, {
      loading: "Booking your appointment...",

      success: () => {
        return "Appointment booked successfully! We look forward to seeing you.";
      },

      error: "Something went wrong. Please try booking again.",
    });
  };

  // توليد أوقات الحجز (مثلاً من 9 صباحاً لـ 5 مساءً)
  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];
  const [doctor, setDoctor] = useState(null);
  const resolvedParams = use(params);
  const doctorId = decodeURIComponent(resolvedParams.id);

  useEffect(() => {
    const getDoctor = async (id) => {
      await Api.getDoctorById(id).then((res) => setDoctor(res.data.data));
    };

    getDoctor(doctorId);
  }, [doctorId]);

  // دالة مساعدة للتحقق من الوقت
  const isTimeInPast = (timeStr) => {
    const now = new Date();
    const isToday = date?.toDateString() === now.toDateString();

    if (!isToday) return false;

    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);

    return slotTime < now;
  };

  return (
    <>
      <h2 className="font-bold text-[22px] mb-4 text-lime-600 border-b-2 border-lime-500 max-w-fit">
        Doctor Details
      </h2>
      {doctor ? (
        <div className="border p-3 rounded-lg  grid grid-cols-1 md:grid-cols-3">
          <Image
            src={`http://localhost:1337${doctor?.image?.url}`}
            alt={doctor?.name}
            width={500}
            height={200}
            className="h-75 w-full object-cover rounded-lg"
            unoptimized={true}
            loading="eager"
          />

          {/* doctor info*/}
          <div className=" md:px-10 col-span-2 flex flex-col gap-2 items-baseline">
            <h2 className="font-bold text-2xl mt-7">{doctor?.name}</h2>

            <h2 className="flex gap-2 text-gray-500">
              {/* <GraduationCap /> */}
              <span>
                <span className="text-lime-600 font-extrabold">{doctor?.experience}</span> Years Of
                Experience
              </span>
            </h2>

            <h2 className="flex gap-2 text-gray-500">
              <span>{doctor?.address} </span>
            </h2>

            <h2 className="bg-lime-200 text-lime-800 rounded-full text-[10px] p-2">
              {doctor?.category?.name}
            </h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              {/* زر فتح الديالوج */}
              {user ? (
                <DialogTrigger asChild>
                  <Button className="mt-3 rounded-full bg-lime-600 hover:bg-lime-700 text-white w-fit">
                    Book Appointment
                  </Button>
                </DialogTrigger>
              ) : (
                <LoginLink postLoginRedirectURL={window.location.href}>
                  <Button className="mt-3 rounded-full bg-lime-600 hover:bg-lime-700 text-white px-4">
                    Login to Book Appointment
                  </Button>
                </LoginLink>
              )}

              <DialogContent className="sm:max-w-150 max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Book an Appointment</DialogTitle>
                  <DialogDescription>
                    Select a convenient date and time to meet with
                    <span className="text-lime-500">{doctor?.name}</span>.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                  {/* الجزء الأيسر: التقويم */}
                  <div className="flex flex-col items-baseline gap-3">
                    <h2 className="flex gap-2 items-center text-gray-700 font-semibold">
                      <CalendarDays className="text-lime-600 h-5 w-5" /> Select Date
                    </h2>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date().setHours(0, 0, 0, 0)} // منع حجز تواريخ قديمة
                      className="rounded-md border shadow-sm"
                    />
                  </div>

                  {/* الجزء الأيمن: الأوقات */}
                  <div className="flex flex-col gap-3">
                    <h2 className="flex gap-2 items-center text-gray-700 font-semibold">
                      <Clock className="text-lime-600 h-5 w-5" /> Select Time Slot
                    </h2>
                    <div className="grid grid-cols-3 md:grid-cols-2 gap-2">
                      {timeSlots
                        .filter((time) => !isTimeInPast(time)) // فلترة الأوقات التي مرت
                        .map((time, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className={`border-lime-200 hover:bg-lime-600 hover:text-white transition-all
                    ${selectedTimeSlot === time && "bg-lime-600 text-white"}`}
                            onClick={() => setSelectedTimeSlot(time)}
                          >
                            {time}
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>

                {/* أزرار التأكيد */}
                <div className="flex justify-end gap-3 mt-5">
                  <DialogClose asChild>
                    <Button variant="ghost" className="text-red-500 hover:bg-red-50">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    disabled={!(date && selectedTimeSlot)}
                    className="bg-lime-600 hover:bg-lime-700 text-white"
                    onClick={() => saveBooking()}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div>
              <h1 className="text-[25px] font-bold">About</h1>
              <p className="text-gray-500"> {doctor?.about}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border p-5 rounded-lg grid grid-cols-1 md:grid-cols-3 animate-pulse">
          {/* 1. Skeleton Image */}
          <div className="h-75 w-full bg-gray-200 rounded-lg"></div>

          {/* 2. Skeleton Info Section */}
          <div className="md:px-10 col-span-2 flex flex-col gap-4 items-baseline w-full">
            {/* Name */}
            <div className="h-8 bg-gray-200 rounded-md w-1/2 mt-7"></div>

            {/* Experience Row */}
            <div className="flex gap-2 w-1/3">
              <div className="h-5 bg-gray-200 rounded-md w-full"></div>
            </div>

            {/* Address Row */}
            <div className="flex gap-2 w-1/2">
              <div className="h-5 bg-gray-200 rounded-md w-full"></div>
            </div>

            {/* Category Tag */}
            <div className="h-8 bg-gray-200 rounded-full w-24"></div>

            {/* Button Placeholder */}
            <div className="h-10 bg-gray-200 rounded-full w-40 mt-2"></div>

            {/* About Section */}
            <div className="w-full mt-4">
              <div className="h-7 bg-gray-200 rounded-md w-20 mb-2"></div> {/* Title "About" */}
              <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Details;
