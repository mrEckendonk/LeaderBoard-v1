import Score from './helpers/constructor';
import getScoreAndName from './API/getAPI';
import postScoreAndName from './API/postAPI';

const addScores = async () => {
  const scoreList = document.querySelector('.score-list');
  const scores = await getScoreAndName().then((result) => result);
  if (scores.length !== 0) {
    scoreList.innerHTML = '';
    scores.result.forEach((item) => {
      const score = `
      <li class="h4 p-2 m-0">${item.user}: ${item.score}</li>
      `;
      scoreList.insertAdjacentHTML('beforeend', score);
    });
  }
};

const refresh = () => {
  const refresh = document.querySelector('.refresh');
  refresh.addEventListener('click', () => {
    window.location.reload();
  });
};

const addScore = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { user, score } = form.elements;
    if (!/^[a-zA-Z\s/.]+$/.test(user.value)) {
      form.insertAdjacentHTML('afterend', `
        <div class="alert alert-danger">
          <strong>Error!</strong> Name can contain only letters.
        </div>
      `);
      setTimeout(() => {
        document.querySelector('.alert').remove();
      }, 3000);
    } else if (/^[a-zA-Z]+$/.test(score.value)) {
      form.insertAdjacentHTML('afterend', `
        <div class="alert alert-danger">
          <strong>Error!</strong> Score must be a number.
        </div>
      `);
      setTimeout(() => {
        document.querySelector('.alert').remove();
      }, 3000);
    } else {
      form.insertAdjacentHTML('afterend', `
        <div class="alert alert-success">
          <strong>Success!</strong> Score was added and sorted by score.
        </div>
      `);
      setTimeout(() => {
        document.querySelector('.alert').remove();
      }, 3000);
    }
    const addScore = new Score(user.value, score.value);
    await postScoreAndName(addScore);
    user.value = '';
    score.value = '';
  });
};

export { addScore, addScores, refresh };
