import axios from 'axios';
//https://developer.movieglu.com/v2/api-index/setup/
//Format: yyyy-mm-ddThh:mm:ss

const getTime = new Date ().toISOString (); //this must be match date format
const fetchUrl = axios.create ({
  baseURL: 'https://api-gate2.movieglu.com/',
  timeout: 5000,
  headers: {
    client: 'LEAR_11',
    'x-api-key': 'gtO3CVKGny4TpTTGqVXLt1DAy3zkhBJd3YcfK6bS',
    authorization: 'Basic TEVBUl8xMTpPaWFhU2xGNm9HOXI=',
    territory: 'US',
    'api-version': 'v200',
    geolocation: '40.7;-73.9',
    'device-datetime': getTime,
  },
});
//sand box
const tempUrl = axios.create ({
  baseURL: `https://api-gate2.movieglu.com/`,
  timeout: 3000,
  headers: {
    client: 'LEAR_11',
    'x-api-key': 'cGlJKwkLoiWU6eR5jD8174TqsUKyQa9aCTGfkFlg',
    authorization: 'Basic TEVBUl8xMV9YWDp4akw3bkR1ZTJYUG4=',
    territory: 'XX',
    'api-version': 'v200',
    geolocation: '-22.0;14.0',
    'device-datetime': getTime,
  },
});
const tempUrl2 = axios.create ({
  baseURL: `${process.env.PUBLIC_URL}`,
  timeout: 3000,
});
export const getShowFilms = (num = 25) => {
  //`filmsNowShowing/?n=${num}`
  return new Promise ((resolve, reject) => {
    tempUrl2
      .get (`home-data.json`)
      .then (resp => resolve (resp.data))
      .catch (err => reject (err));
  });
};

export const getComingFilms = (num = 15) => {
  //`filmsComingSoon/?n=${num}`
  return new Promise ((resolve, reject) => {
    tempUrl2
      .get (`coming-data.json`)
      .then (resp => resolve (resp.data))
      .catch (err => reject (err));
  });
};
//filmShowTimes/?film_id=12345&date=2018-04-12&n=10
export const getFilmTimes = ({id, date, num = 3}) => {
  return new Promise ((resolve, reject) => {
    fetchUrl
      .get (`filmShowTimes/?film_id=${id}&date=${date}&n=${num}`)
      .then (resp => resolve (resp.data))
      .catch (err => reject (err));
  });
};
export const getFakeFilmTimes = ({id, date, num = 3}) => {
  return new Promise ((resolve, reject) => {
    tempUrl
      .get (`filmShowTimes/?n=${num}&film_id=${id}&date=${date}`)
      .then (resp => resolve (resp.data))
      .catch (err => reject (err));
  });
};
