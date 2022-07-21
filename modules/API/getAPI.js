import { urlAPI, gameIdAPI } from './API_Data';

const getScoreAndName = async () => {
  const response = await fetch(`${urlAPI}/${gameIdAPI}/scores`);
  const data = await response.json();
  data.result.sort((a, b) => b.score - a.score);
  return data;
};

export { getScoreAndName as default };