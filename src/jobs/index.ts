import schedule from 'node-schedule';
import { setTodaysTasks } from './trello';
import logger from '../utils/logger';

export function scheduleJobs() {
  console.log('scheduling job');

  schedule.scheduleJob('0 0 * * *', () => {
    logger.info('executing trello/setTodaysTasks...');
    setTodaysTasks();
  });
}
