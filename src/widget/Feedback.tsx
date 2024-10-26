"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

type DetailsProps = {
  name: string;
  logo?: string;
  message?: string;
};

type FeedbackFormProps = {
  authEnabledReview: boolean;
  ipEnabledReview: boolean;
  nameRequired: boolean;
  starRatingRequired: boolean;
  spaceDetails: DetailsProps;
  spaceId: string;
};

export default function FeedbackForm({
  nameRequired,
  starRatingRequired,
  spaceDetails,
}: FeedbackFormProps) {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { name: spaceName, logo, message } = spaceDetails;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Custom validation (uncomment toast code if implemented):
    // if (nameRequired && !name.trim()) {
    //   toast({
    //     title: "Error",
    //     description: "Please enter your name",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    // Additional logic for submitting feedback would go here.

    setIsSubmitting(true);
    try {
      // Replace with your submit feedback function
      // await submitFeedback({
      //   spaceId,
      //   feedback: feedback.trim(),
      //   stars: starRatingRequired ? rating : undefined,
      //   name: nameRequired ? name.trim() : undefined,
      // });

      // Uncomment toast notification:
      // toast({
      //   title: "Success",
      //   description: "Thank you for your feedback!"
      // });

      setName("");
      setFeedback("");
      setRating(1);
    } catch (error) {
      // Handle error (toast example shown):
      // toast({
      //   title: "Error",
      //   description: error instanceof Error ? error.message : "Failed to submit feedback",
      //   variant: "destructive",
      // });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl w-full mx-auto">
      <CardHeader className="text-center">
        <div className="w-20 h-20 mx-auto my-7">
          <Avatar className="rounded-full">
            <AvatarImage src={logo} alt={spaceName} className="rounded-full" />
            <AvatarFallback>{spaceName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-3xl font-bold">{spaceName}</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {nameRequired && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                disabled={isSubmitting}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Please enter your feedback here"
              required
              className="min-h-[100px]"
              disabled={isSubmitting}
            />
          </div>

          {starRatingRequired && (
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                    disabled={isSubmitting}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= rating ? "text-orange-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                Submitting...
              </div>
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
