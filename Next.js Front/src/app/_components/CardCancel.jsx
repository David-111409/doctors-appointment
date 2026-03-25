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
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Api from "@/app/_utils/Api";
import { toast } from "sonner";

function CardCancel({ item }) {
  const onDeleteBooking = (item) => {
    const deletePromise = Api.deleteBooking(item.documentId);

    toast.promise(deletePromise, {
      loading: "Deleting Appointment",
      success: () => {
        return `Appointment with ${item.doctor?.name} deleted successfully.`;
      },
      error: (err) => {
        console.error("Delete Error:", err);
        return "Error has happened while deleting appointment";
      },
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="text-red-500 border-red-100 hover:bg-red-50 hover:text-red-600 w-full flex gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Cancel Appointment
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your appointment with{" "}
            <span className="font-medium text-black">{item.doctor?.name}</span>.
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
  );
}

export default CardCancel;
