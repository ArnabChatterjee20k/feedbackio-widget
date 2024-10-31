import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function generateSecret(length = 16) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// @ts-ignore
import gradient from "random-gradient";
export default function GraidentAvatar({ id , fullRound}: { id: string,fullRound?:boolean }) {
  return <div className={`aspect-square size-8 ${fullRound?"rounded-lg":"rounded-full"}`} style={{ background: gradient(id) }} />;
}

export function Feedbackcard({
  name,
  stars,
  email,
  feedback,
}: {
  name?: string;
  stars?: number;
  email?: string;
  feedback: string;
}) {
  return (
    <figure
      className={cn(
        "relative w-full max-w-sm cursor-pointer overflow-hidden rounded-lg border p-4 transition-colors",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex items-center gap-3">
        <GraidentAvatar id={email || name || generateSecret(8)} />
        <div className="flex flex-col">
          {name ? (
            <figcaption className="text-sm font-medium text-gray-900 dark:text-white">
              {name}
            </figcaption>
          ) : null}
          {email ? (
            <p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
          ) : null}
        </div>
      </div>
      {stars ? (
        <div
          className="mt-2 flex items-center"
          aria-label={`Rated ${stars} out of 5 stars`}
        >
          {[...Array(stars)].map((_, index) => (
            <Star
              key={index}
              className={cn(
                "h-4 w-4",
                index < stars
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              )}
            />
          ))}
        </div>
      ) : null}
      <blockquote className="mt-3 text-sm text-gray-700 dark:text-gray-300">
        {feedback}
      </blockquote>
    </figure>
  );
}
