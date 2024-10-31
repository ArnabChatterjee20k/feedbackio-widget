interface RESPONSE {
  success: boolean;
  message: string;
  status: number;
  token?: string;
  settings?: Record<string, boolean>;
  type?: string;
}
interface FETCHRESULT {
  settings: null | Record<
    | "authEnabledReview"
    | "ipEnabledReview"
    | "nameRequired"
    | "starRatingRequired",
    boolean
  >;
  error?: string;
  type?: string;
}

export async function fetchSettings(spaceId: string): Promise<FETCHRESULT> {
  const host = import.meta.env.VITE_API!;
  const token = getLocalStorage();
  const url = `${host}/api/${spaceId}/feedback${
    token ? `?token=${token}` : ""
  }`;

  const res = await fetch(url);
  const data: RESPONSE = await res.json();
  if (res.status !== 200 || !data.settings) {
    console.log({ message: data.message });
    return { settings: null, error: data.message, type: data?.type };
  }
  return { settings: data.settings };
}

const TOKEN_NAME = "feedback-token";
export function setLocalStorage(token: string) {
  localStorage.setItem(TOKEN_NAME, token);
}

export function getLocalStorage() {
  return localStorage.getItem(TOKEN_NAME) || "";
}

// api/feedback.ts
type FeedbackParams = {
  spaceId: string;
  feedback: string;
  stars?: number;
  name?: string;
  userEmail?: string;
  userID?: string;
};

export async function submitFeedback({
  spaceId,
  feedback,
  stars,
  name,
  userEmail,
  userID,
}: FeedbackParams) {
  try {
    const token = getLocalStorage();
    const host = import.meta.env.VITE_API;
    const url = `${host}/api/${spaceId}/feedback${
      token ? `?token=${token}` : ""
    }`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feedback,
        stars,
        name,
        userEmail,
        userID,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit feedback");
    }

    return data;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
}

export async function getWallOfFame(spaceId: string) {
  const host = import.meta.env.VITE_API!;
  const url = `${host}/api/${spaceId}/wall-of-fame`;

  const res = await fetch(url);
  const data = await res.json();
  if (res.status !== 200) {
    return { feedbacks: null };
  }
  return data.feedbacks;
}
