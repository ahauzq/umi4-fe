export function BFS<T extends { children?: any[] }>(data: T[], fn: (item: T) => any) {
  let arr = [...data];
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    fn(item);
    if (item.children) {
      arr.push(...item.children);
    }
  }
}
export function DFS<T extends { children?: any[] }>(data: T[], fn: (item: T) => any) {
  data.forEach((item) => {
    fn(item);
    if (item.children && item.children.length) {
      DFS(item.children, fn);
    }
  });
}
export function deleteObjArrItem(arr: any[], item: any, key: string) {
  let index = arr.findIndex((o) => o[key] === item[key]);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return index > -1;
}
