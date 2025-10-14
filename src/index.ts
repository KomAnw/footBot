import { Bot, Context, GrammyError, HttpError } from 'grammy';
import { Job } from 'node-schedule';
import { scheduleWeeklyPoll } from './utils';
import { TOKEN } from './consts';

if (!TOKEN) {
  throw new Error('BOT_TOKEN is required in .env');
}

const bot = new Bot<Context>(TOKEN);

const activatedChats = new Set<number>();
const scheduledJobs = new Map<number, Job>();

bot.command('start', async (ctx) => {
  const chat = ctx.chat;
  if (!chat) return;

  if (chat.type !== 'group' && chat.type !== 'supergroup') {
    return ctx.reply(
      'This bot works only in group chats. Add the bot to the group and send /start.'
    );
  }

  const chatId = chat.id;

  if (!activatedChats.has(chatId)) {
    activatedChats.add(chatId);

    console.info(`🚀 Bot started for this chat.`);

    await scheduleWeeklyPoll(bot, chatId, scheduledJobs);
  }
});

bot.on('message', async (ctx, next) => {
  const chatId = ctx.chat?.id;
  if (chatId && activatedChats.has(chatId)) {
    return;
  }

  console.info(`📨 Bot accepted message from this chat.`);

  return next();
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`⚠️ Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error('🔴 GrammyError:', e.description);
  } else if (e instanceof HttpError) {
    console.error('🔴 HttpError:', e);
  } else {
    console.error('❓ Unknown error:', e);
  }
});

bot.start().then(() => {
  console.info(`👂 Bot listening for messages in this chat.`);
});

function shutdown() {
  console.info('🛑 Shutting down…');
  for (const [, job] of scheduledJobs) job.cancel();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
