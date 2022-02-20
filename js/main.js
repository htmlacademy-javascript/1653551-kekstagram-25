const examination = function (comment, length) {
  const lengthOfComment = comment.length;
  const alarm = 'Пожалуйста, введите комментарий';
  if (lengthOfComment <= length) {
    if (comment === '') {
      return alarm;
    }
    return true;
  }
  return false;
};

examination();

const text = 'Пожалуйста, введите два неотрицательных числа для создания диапазона, от меньшего к большему';
const returnInteger = function (min, max) {
  if (min >= 0 && min < max) {
    const integer = min + Math.random() * (max + 1 - min);
    return Math.floor(integer);
  }
  return text;
};

returnInteger();
