export const getCookie = (cName: string) => {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    if (val.startsWith(name)) res = val.substring(name.length);
  });
  return res;
}
