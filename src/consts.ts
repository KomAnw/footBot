import { getScheduledDate } from './utils';
import dayjs from 'dayjs';
import { PollOptions, ScheduledDate } from './types';

export const days = {
  воскресенье: 0,
  понедельник: 1,
  вторник: 2,
  среда: 3,
  четверг: 4,
  пятница: 5,
  суббота: 6,
};

export class Constants {
  pollOptions: PollOptions | null;
  pollTimer: ScheduledDate | null;
  gameTime: string;
  place: string;
  day: keyof typeof days;

  constructor() {
    this.gameTime = '';
    this.place = '';
    this.day = 'среда';
    this.pollOptions = null;
    this.pollTimer = null;
  }

  get consts() {
    return {
      pollOptions: this.getOptions(),
      pollTimer: this.getPollTimer(),
    };
  }

  getOptions = () => {
    console.log(this.gameTime);
    return {
      question: `Игра ${dayjs().format('DD.MM')} в ${this.gameTime}, ${this.place}`,
      options: ['Буду', 'Буду +1', 'Нет'],
      is_anonymous: false,
      allows_multiple_answers: false,
    };
  };

  getPollTimer = () => {
    return (this.pollTimer = {
      second: '5',
      minute: '40',
      hour: '3',
      day_of_week: `${days[this.day]}`,
    });
  };

  setPollOptions(gameTime: string, place: string, day: keyof typeof days) {
    this.gameTime = gameTime;
    this.place = place;
    this.day = day;
  }

  scheduledDate = () => getScheduledDate(this.pollTimer!);
}

export const constsInstance = new Constants();