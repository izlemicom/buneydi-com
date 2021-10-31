export function getAllDaysFrom(days: number): Array<string> {
  let list: Array<string> = [];
  for (let i = 0; i < days; days--) {
    const date = new Date();
    const last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
    const day = last.getDate();
    const month = last.getMonth() + 1;
    const year = last.getFullYear();
    const dateLast = day + "-" + month + "-" + year;
    list.push(dateLast);
  }
  return list;
}
