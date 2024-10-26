import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
  } from "@/components/ui/dialog"
import FeedbackForm from "./Feedback"
import { Button } from "@/components/ui/button"

export default function FeedbackButton() {
    return (
        <Dialog>
        <DialogTrigger>
            <Button>Share your valuable feedback</Button>
        </DialogTrigger>
        <DialogContent className="bg-transparent border-transparent">
          <DialogHeader>
            <DialogDescription>
            <FeedbackForm authEnabledReview ipEnabledReview nameRequired spaceDetails={{name:"arnab",logo:"",message:"ldsf"}} spaceId='12' starRatingRequired/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }
  