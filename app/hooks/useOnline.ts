import { useEffect } from "react";
import { toast } from "react-toastify";

const useOnline = () => {
  useEffect(() => {
    const online = () => {
      toast("Online");
      window.location.reload();
    };

    const offline = () => {
      toast("Offline");
    };
    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);
};

export { useOnline };
