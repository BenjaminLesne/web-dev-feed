import cron from 'node-cron';
import { deleteOldPosts } from '../database/queries.js';

export const deleteOldPostsCronJob = cron.schedule('0 0 1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31 * *', () =>  {
    deleteOldPosts()
}, {
  scheduled: false
});

