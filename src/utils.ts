import schedule, { Job, RecurrenceRule } from 'node-schedule';
import { POLL_OPTIONS, POLL_QUESTION, TIMEZONE, WEDNESDAY_HOUR, WEDNESDAY_MINUTE } from './consts';
import { Bot } from 'grammy';

const logMessage = `Bot will send a poll every Wednesday in ${WEDNESDAY_HOUR}:${String(
  WEDNESDAY_MINUTE
).padStart(2, '0')} (${TIMEZONE}).`;

export const makeRule = (): RecurrenceRule => {
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = 2;
  rule.tz = TIMEZONE;
  rule.hour = WEDNESDAY_HOUR;
  rule.minute = WEDNESDAY_MINUTE;
  return rule;
};

export const scheduleWeeklyPoll = async (
  bot: Bot,
  chatId: number,
  scheduledJobs: Map<number, Job>
) => {
  const prev = scheduledJobs.get(chatId);
  if (prev) prev.cancel();

  const job = schedule.scheduleJob(makeRule(), async () => {
    try {
      await bot.api.sendPoll(chatId, POLL_QUESTION, POLL_OPTIONS, {
        is_anonymous: false,
        allows_multiple_answers: false,
      });
    } catch (e) {}
  });

  scheduledJobs.set(chatId, job);
  console.info(`⏰ Job scheduled for chat ${chatId}.`);
  console.info(`📊 ${logMessage}`);
};
