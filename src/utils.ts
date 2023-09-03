import { RecurrenceRule } from 'node-schedule';
import { PollOptions, ScheduledDate } from './types';
import { botInstance } from './bot';

export const getScheduledDate = (params: ScheduledDate) => {
  const {
    day_of_week = '*',
    month = '*',
    day_of_month = '*',
    hour = '*',
    minute = '*',
    second = '*',
  } = params;

  return `${second} ${minute} ${hour} ${day_of_month} ${month} ${day_of_week}`;
};

export const createPool = (chatId: string, pollOptions: PollOptions) => {
  const { question, options, is_anonymous, allows_multiple_answers } = pollOptions;

  botInstance.sendPoll(chatId, question, options, {
    is_anonymous,
    allows_multiple_answers,
  });
};
