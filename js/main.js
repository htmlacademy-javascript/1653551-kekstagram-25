const examinationOfLineLength = function (comment, length) {
  const lengthOfComment = comment.length;
  if (lengthOfComment <= length) {
    return true;
  }
  return false;
};

examinationOfLineLength();

const text = 'Пожалуйста, введите два неотрицательных числа для создания диапазона, от меньшего к большему';
const getRandomInteger = function (min, max) {
  if (min >= 0 && min < max) {
    const integer = min + Math.random() * (max + 1 - min);
    return Math.floor(integer);
  }
  return (min === max) ? min : text;
};

getRandomInteger();
