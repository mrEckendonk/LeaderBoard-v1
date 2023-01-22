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
      <li class="text-lg p-2 m-0">${item.user}: ${item.score}</li>
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
    if (!/^[a-zA-Z ]+$/.test(user.value)) {
      form.insertAdjacentHTML(
        'afterend',
        `
<div role="alert" class="remove"> 
        <div class="bg-red-500 text-white  rounded-t px-4 py-2">
          Error!
        </div>
        <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>Name can contain only letters.</p>
        </div>
      `,
      );
      setTimeout(() => {
        document.querySelector('.remove').remove();
      }, 3000);
      user.value = '';
      user.focus();
      return;
    }
    if (/^[a-zA-Z]+$/.test(score.value)) {
      form.insertAdjacentHTML(
        'afterend',
        `
<div role="alert" class="remove"> 
        <div class="bg-red-500 text-white  rounded-t px-4 py-2">
          Error!
        </div>
        <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p> Score must be a number.</p>
        </div>
      `,
      );
      setTimeout(() => {
        document.querySelector('.remove').remove();
      }, 3000);
      score.value = '';
      score.focus();
      return;
    }
    form.insertAdjacentHTML(
      'afterend',
      `
<div role="alert" class="remove"
        <div class="bg-green-500 text-white  rounded-t px-4 py-2">
          Success
        </div>
        <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>Score added and sorted by score.</p>
        </div>
      `,
    );
    setTimeout(() => {
      document.querySelector('.remove').remove();
    }, 3000);

    const addScore = new Score(user.value, score.value);
    await postScoreAndName(addScore);
    user.value = '';
    score.value = '';
  });
};

export { addScore, addScores, refresh };
