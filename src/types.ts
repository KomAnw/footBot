export type PollOptions = {
  question: string;
  options: string[];
  is_anonymous: boolean;
  allows_multiple_answers: boolean;
};

export type ScheduledDate = {
  second?: string;
  minute?: string;
  hour?: string;
  day_of_month?: string;
  month?: string;
  day_of_week?: string;
};
