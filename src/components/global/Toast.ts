// Toast.tsx
import { toast } from "react-hot-toast";

type ToastStatus = "success" | "error" | "loading" | "info";

interface ShowToastProps {
  message: string;
  type?: ToastStatus;
}

export const showToast = ({ message, type = "success" }: ShowToastProps) => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  } else if (type === "info") {
    toast(message, { icon: "info" });
  } else {
    toast(message);
  }
};
