import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

class Bot {
  bot: TelegramBot;
  token: string;

  constructor() {
    this.token = process.env.TOKEN_KEY!;
    this.bot = new TelegramBot(this.token, { polling: true });
  }

  get botInstance() {
    return this.bot;
  }
}

export const botInstance = new Bot().botInstance;
