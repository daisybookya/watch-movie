import routes from '../router';

export const getPageTitle = name => {
  const path = name;
  const title = routes.filter (i => i.path === path);
  return title[0].name;
};
export function handleData (data, row = 5, num = 5) {
  let dataList = [];
  let originData = data.concat (data);
  for (let i = 0; i < row; i++) {
    const start = i * num;
    const end = i * num + num;
    const dataSlice = originData.slice (start, end);
    dataList.push (dataSlice);
  }
  return dataList;
}
export const ageRateColor = {
  NC: '#d7721d',
  PG: '#4e8c34',
  G: '#389fcd',
  R: '#f50',
};
export function getAgeRate (item) {
  if (item.age_rating) {
    const str = item.age_rating[0]['rating'];
    const valList = Object.keys (ageRateColor).join (',');
    const key = str.slice (0, 2).trim ();
    if (valList.includes (key)) {
      return (
        <div className="rate-tag" style={{background: `${ageRateColor[key]}`}}>
          {str}
        </div>
      );
    }
  }
  return false;
}
export function isValidDate (date) {
  const status = Date.parse (date);
  if (isNaN (status)) {
    return false;
  }
  return true;
}

export function getDate (type = 'y') {
  const date = new Date ();
  const allDate = {
    y: () => {
      return date.getFullYear ();
    },
    m: () => {
      return date.getMonth () + 1;
    },
    d: () => {
      return date.getDate ();
    },
  };
  return allDate[type] ();
}
