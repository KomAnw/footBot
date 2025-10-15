import { config } from 'dotenv';
import dayjs from 'dayjs';

config();

export const TOKEN = process.env.TOKEN_KEY;

export const WEDNESDAY_HOUR = 9;
export const WEDNESDAY_MINUTE = 3;
export const TIMEZONE = 'Europe/Moscow';
export const POLL_QUESTION = `Игра ${dayjs().format('DD.MM')} в 21:00, Коломяги`;
export const POLL_OPTIONS = ['Буду', 'Буду +1', 'Нет', 'Пока думаю'];
