import { Job, scheduleJob } from 'node-schedule';
import { Constants, comands, constsInstance, days } from './consts';
import { createPool } from './utils';
import { onPollSchedulled, onPollExist, onClose, onPollUpdate } from './texts.json';
import { botInstance } from './bot';
import TelegramBot from 'node-telegram-bot-api';

class BotApi {
  chatId: null | string;
  job: null | Job;
  tz: string;
  constsInstance: Constants;

  constructor() {
    this.chatId = null;
    this.job = null;
    this.tz = 'Europe/Moscow';
    this.constsInstance = constsInstance;
  }

  handleStartPolling = (
    msg: TelegramBot.Message,
    match: RegExpExecArray | null,
    updated?: boolean
  ) => {
    const chatId = msg.chat.id.toString();

    if (this.job) {
      // botInstance.sendMessage(chatId, onPollExist);
      return;
    }

    const [_, time, place, day] = match![0].split(' ');
    constsInstance.setPollOptions(time, place, day as keyof typeof days);

    this.job = scheduleJob({ rule: this.constsInstance.scheduledDate(), tz: this.tz }, () =>
      createPool(chatId, this.constsInstance.consts.pollOptions)
    );

    updated
      ? botInstance.sendMessage(chatId, onPollUpdate)
      : botInstance.sendMessage(chatId, onPollSchedulled);
  };

  handleStop = (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id.toString();

    if (this.job) {
      this.job.cancel();
      this.job = null;
      botInstance.sendMessage(chatId, onClose);
    }
  };

  handleNewTimeAndPlace = (msg: TelegramBot.Message, match: RegExpExecArray | null) => {
    this.handleStop(msg);
    this.handleStartPolling(msg, match, true);
  };

  help = (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id.toString();

    botInstance.sendMessage(chatId, comands);
  };

  listners = () => {
    // botInstance.onText(/\/help/, this.help);
    botInstance.onText(/\/start \d{2}:\d{2} [а-яА-ЯёЁ]+ [а-яА-ЯёЁ]+$/iu, this.handleStartPolling);
    // botInstance.onText(/\/stop/, this.handleStop);
    // botInstance.onText(/\/change/, this.handleNewTimeAndPlace);
  };
}

new BotApi().listners();
