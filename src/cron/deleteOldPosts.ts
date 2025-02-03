import cron from 'node-cron';
import { deleteOldPosts } from '../database/queries.js';

export const deleteOldPostsCronJob = cron.schedule('0 0 1/2 * *', () =>  {
    deleteOldPosts()
}, {
  scheduled: false
});

