import { urlAPI, gameIdAPI } from './API_Data';

const postScoreAndName = async (addScore) => {
  const score = fetch(`${urlAPI}/${gameIdAPI}/scores/`, {
    method: 'POST',
    body: JSON.stringify(addScore),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return score.json;
};

export { postScoreAndName as default };
