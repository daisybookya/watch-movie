import axios from 'axios';
//https://api.watchmode.com/v1/sources/?apiKey=YOUR_API_KEY

const apiKey = 'KcRs8FSyxkyDHg77BQwFwtvnGnZQUBI1lbGSw6zC';
const fetchUrl = axios.create ({
  baseURL: 'https://api.watchmode.com/',
  timeout: 5000,
});

const tempUrl2 = axios.create ({
  baseURL: `${process.env.PUBLIC_URL}`,
  timeout: 3000,
});
export const getRelease = () => {
  return new Promise ((resolve, reject) => {
    fetchUrl
      .get (`v1/releases/?apiKey=${apiKey}`)
      .then (resp => {
        resolve (resp.data);
      })
      .catch (err => reject (err));
  });
};
export const getDetails = id => {
  return new Promise ((resolve, reject) => {
    fetchUrl
      .get (`v1/title/${id}/details/?apiKey=${apiKey}`)
      .then (resp => {
        resolve (resp.data);
      })
      .catch (err => reject (err));
  });
};
export const getReleaseData = () => {
  return new Promise ((resolve, reject) => {
    tempUrl2
      .get (`release-data.json`)
      .then (resp => resolve (resp.data))
      .catch (err => reject (err));
  });
};
export const getDetailsData = () => {
  return new Promise ((resolve, reject) => {
    tempUrl2
      .get (`detail-data.json`)
      .then (resp => resolve (resp.data))
      .catch (err => reject (err));
  });
};
