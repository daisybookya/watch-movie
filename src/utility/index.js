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
