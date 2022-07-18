import Score from './helpers/constructor';

const scores = [];

const addScores = () => {
  const scoreList = document.querySelector('.score-list');
  if (scores.length !== 0) {
    scores.sort((a, b) => b.score - a.score);
    scoreList.innerHTML = '';
    scores.forEach((item) => {
      const score = `
      <li class="h4 p-2 m-0">${item.name}: ${item.score}</li>
      `;
      scoreList.insertAdjacentHTML('beforeend', score);
    });
  }
};

const refresh = () => {
  const refresh = document.querySelector('.refresh');
  refresh.addEventListener('click', () => {
    if (scores.length !== 0) {
      refresh.insertAdjacentHTML('afterbegin', `
        <div class="alert alert-success m-0">
          The page will be refreshed.
        </div>
      `);
      setTimeout(() => {
        document.querySelector('.alert').remove();
      }, 3000);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  });
};

const addScore = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { name, score } = form.elements;
    if (!/^[a-zA-Z\s/.]+$/.test(name.value)) {
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
      scores.push(new Score(name.value, score.value));
    }
    name.value = '';
    score.value = '';
    addScores();
  });
};

export { addScore, addScores, refresh };
