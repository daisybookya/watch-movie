export function handleData (data, row = 5, num = 5) {
  let dataList = [];
  for (let i = 0; i < row; i++) {
    const start = i * num;
    const end = i * num + num;
    const dataSlice = data.slice (start, end);
    dataList.push (dataSlice);
  }
  return dataList;
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
