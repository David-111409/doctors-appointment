"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Api from "@/app/_utils/Api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function MyBooking() {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(true);


  const onDeleteBooking = (item) => {
    // 1. تعريف الوعد (Promise) الخاص بالحذف
    const deletePromise = Api.deleteBooking(item.documentId);

    // 2. استخدام toast.promise للتعامل مع كافة الحالات (تحميل، نجاح، خطأ)
    toast.promise(deletePromise, {
      loading: "Deleting Appointment",
      success: (res) => {
        // 3. تحديث القائمة في الواجهة "فقط" بعد نجاح الحذف في السيرفر
        setBookingList((prev) => prev.filter((booking) => booking.documentId !== item.documentId));
        return `Appointment with ${item.doctor?.name} deleted successfully.`;
      },
      error: (err) => {
        console.error("Delete Error:", err);
        return "Error has happened while deleting appointment";
      },
    });
  };
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
  }, [getUserBooking]);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {bookingList.length > 0 ? (
          bookingList.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm flex flex-col gap-2">
              <h2 className="font-bold text-lg text-lime-600">
                {item.doctor?.name || "Doctor Name"}
              </h2>
              <div className="flex gap-2 text-gray-500">
                <span>📅 {item.date}</span>
                <span>⏰ {item.time}</span>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600 w-full"
                  >
                    Cancel Appointment
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your appointment
                      with <span className="font-medium text-black">{item.doctor?.name}</span>.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Go Back</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => onDeleteBooking(item)}
                    >
                      Yes, Cancel it
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default MyBooking;
