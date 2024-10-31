import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, CircleX } from "lucide-react";
import GoogleButton from "react-google-button";
import FeedbackForm from "./Feedback";
import { fetchSettings, setLocalStorage } from "./utils";

interface WidgetConfig {
  spaceId: string;
  spaceName?: string;
  spaceDescription?: string;
  spaceImage?: string;
  butonText?: string;
  authRedirect?: string;
}

type FeedbackState =
  | "success"
  | "loading"
  | "error"
  | "auth"
  | "rate limit"
  | "idle";

export default function FeedbackButton({
  spaceId,
  spaceName,
  spaceDescription,
  spaceImage,
  butonText,
  authRedirect,
}: WidgetConfig) {
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = useState<FeedbackState>("idle");
  const [widgetOptions, setWidgetOptions] = useState({});

  const getFeedbackFormSettings = async () => {
    try {
      setState("loading");
      const { settings, error, type } = await fetchSettings(spaceId);

      if (!settings || error) {
        setState(
          type === "auth"
            ? "auth"
            : type === "rate limit"
            ? "rate limit"
            : "error"
        );
        setErrorMessage(error || "Some problem occurred");
        return;
      }

      setWidgetOptions(settings);
      setState("success");
    } catch (error) {
      setState("error");
      setErrorMessage("Failed to load feedback form");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      setLocalStorage(decodeURIComponent(token));
    }

    getFeedbackFormSettings();
  }, [spaceId, spaceName, spaceDescription, spaceImage]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button>{butonText || "Share your valuable feedback"}</Button>
      </DialogTrigger>
      {state === "success" ? (
        <DialogContent className="bg-transparent border-transparent">
          {/* @ts-ignore */}
          <FeedbackForm
            {...widgetOptions}
            spaceDetails={{
              name: spaceName,
              logo: spaceImage,
              message: spaceDescription,
            }}
            spaceId={spaceId}
          />
        </DialogContent>
      ) : (
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogDescription className="flex justify-center">
              {state === "auth" && <Signin authRedirect={authRedirect}/>}
              {state === "loading" && <Loader />}
              {(state === "error" || state === "rate limit") && (
                <Error message={errorMessage} />
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
}

function Loader() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Loader2 size={32} className="animate-spin" />
      <span className="text-xl">Loading feedback form...</span>
    </div>
  );
}

function Error({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center text-red-500 space-y-2">
      <CircleX size={32} />
      <span className="text-xl">
        {message || "Some error occurred loading the form"}
      </span>
    </div>
  );
}

function Signin({ authRedirect }: { authRedirect?: string }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <span className="text-xl">
        Please signin first to submit your feedback
      </span>
      <GoogleButton
        onClick={() => {
          window.location.href = `${
            import.meta.env.VITE_API
          }/api/identity?next=${authRedirect || window.location.href}`;
        }}
      />
    </div>
  );
}
