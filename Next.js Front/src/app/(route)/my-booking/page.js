"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Loader2 } from "lucide-react";
import { isBefore, parseISO, setHours, setMinutes } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Api from "@/app/_utils/Api";

import BookingCard from "@/app/_components/BookingCard";
function MyBooking() {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const now = new Date();

  const categorizedBookings = bookingList.reduce(
    (acc, item) => {
      const bookingDate = parseISO(item.date);

     
      const [time, period] = item.time.split(" "); 
      let [hours, minutes] = time.split(":").map(Number);

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      // 4. دمج الوقت مع التاريخ
      const exactBookingDateTime = setMinutes(setHours(bookingDate, hours), minutes);

      // 5. المقارنة باللحظة الحالية
      if (isBefore(exactBookingDateTime, now)) {
        acc.pastBookings.push(item);
      } else {
        acc.upcomingBookings.push(item);
      }

      return acc;
    },
    { upcomingBookings: [], pastBookings: [] },
  );

  const { upcomingBookings, pastBookings } = categorizedBookings;

  const getUserBooking = useCallback(() => {
    if (user && user.email) {
      Api.getUserAppointments(user.email).then((res) => {
        setBookingList(res.data.data);
        setLoading(false);
      });
    }
  }, [user]);

  useEffect(() => {
    getUserBooking();
  }, [getUserBooking,  upcomingBookings, pastBookings]);

  if (loading)
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20">
        <Loader2 className="h-10 w-10 text-lime-600 animate-spin" />
        <p className="text-gray-500 mt-2 animate-pulse">Getting your bookings...</p>
      </div>
    );

  return (
    <div className="px-4 sm:px-10 mt-10">
      <h2 className="font-bold text-2xl">My Bookings</h2>
      <hr className="my-4" />

      <div className="mt-10">
        <Tabs defaultValue="upcoming" className="w-full">
          {/* تصميم أزرار التبديل */}
          <TabsList className="grid w-full grid-cols-2 max-w-100 mb-8 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="upcoming" className="rounded-md transition-all">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past" className="rounded-md transition-all">
              Past
            </TabsTrigger>
          </TabsList>

          {/* محتوى المواعيد القادمة */}
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((item, index) => <BookingCard type={"upcoming"} item={item} key={index} />)
              ) : (
                <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl">
                  <p className="text-gray-500 font-medium">No upcoming bookings found.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* محتوى المواعيد السابقة */}
          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
              {pastBookings.length > 0 ? (
                pastBookings.map((item, index) => <BookingCard item={item} key={index} />)
              ) : (
                <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl">
                  <p className="text-gray-500 font-medium">No history found.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default MyBooking;
