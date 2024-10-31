import { useEffect, useState } from "react";
import { Feedbackcard } from "./FeedbackCard";
import SocialCard from "./SocialCard";
import { getWallOfFame } from "./utils";
import { cn } from "@/lib/utils";

export function WallOfFameWidget({ projectId }: { projectId: string }) {
  const [feedbacks, setFeedbacks] = useState<Record<string, string>[] | null>(
    null
  );
  useEffect(() => {
    getWallOfFame(projectId).then((data) => {
      console.log(data)
      setFeedbacks(data);
    });
  }, []);
  return (
    <WallOfFame
      feedbacks={feedbacks as Record<string, string>[]}
      projectId={projectId}
    />
  );
}

function WallOfFame({
  feedbacks,
  projectId,
}: {
  feedbacks: Record<string, string>[];
  projectId: string;
}) {
  console.log({feedbacks})
  if(!feedbacks) return
  return (
    <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 max-w-[1500px] mx-auto py-5">
        {feedbacks && feedbacks?.map((feedback) => {
          return feedback?.type === "twitter" ||
            feedback?.type === "linkedin" ? (
            <div className="max-w-sm mb-2">
              <SocialCard
                key={feedback.id}
                post={{
                  space_id: projectId,
                  type: feedback.type,
                  content: feedback.content,
                  userProfilePicture: feedback.userProfilePicture,
                  url: feedback.url,
                  contentImage: feedback.contentImage,
                  name: feedback.name,
                  tag: feedback.tag,
                }}
                className={cn(
                  "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                  "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
                )}
              />
            </div>
          ) : (
            <div className="max-w-sm mb-2">
              <Feedbackcard
                key={feedback.id}
                email={feedback.userEmail}
                feedback={feedback.feedback}
                stars={parseInt(feedback.stars)}
                name={feedback.name}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
