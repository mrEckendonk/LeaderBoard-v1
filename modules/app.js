import { addScores, addScore, refresh } from './addScore';

addScores()
  .then(() => {
    addScore();
    refresh();
  });
