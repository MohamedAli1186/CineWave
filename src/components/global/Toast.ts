// Toast.tsx
import { toast } from "react-hot-toast";

type ToastStatus = "success" | "error" | "loading";

interface ShowToastProps {
  message: string;
  type?: ToastStatus;
}

export const showToast = ({ message, type = "success" }: ShowToastProps) => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  } else {
    toast(message);
  }
};
