const getCurDate = () => {
  const d = new Date();
  var temp = d.toISOString();
  var subStr = temp.substr(10, temp.length - 1);
  var curDate = temp.replace(subStr, "T00:00:00.000Z");
  return curDate;
};
module.exports = getCurDate;
