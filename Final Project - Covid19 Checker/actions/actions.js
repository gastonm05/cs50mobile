import * as types from './actionTypes';

const API_HOST = 'covid-19-tracking.p.rapidapi.com';
const API_KEY = '466acf5602msh4c4254ae7dedd10p1bbc63jsn60fa25f4cf90';

function url() {
  return 'https://covid-19.dataflowkit.com/v1/argentina';
}

export function receiveStuff(json) {
  return {type: types.RECEIVE_STUFF, stuff: json.stuff};
}

export function fetchStuff() {
  return dispatch => {
    return fetch(url(), {
      method: 'GET',
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY,
      }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveStuff(json)));
  };
}

