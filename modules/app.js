import { addScore, addScores, refresh } from './addScore';

addScores().then(() => {
  addScore();
  refresh();
});
