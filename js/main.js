const checkStringLength = (comment = '', length = 0) => comment.length <= length;

checkStringLength('Тут мог быть ваш комментарий', 140);

const getRandomInteger = function (min, max) {
  if ((typeof min !== 'number' && typeof max !== 'number')|| (min < 0 && max < 0)) {
    return null;
  }

  if (min < 0) {
    min = 0;
  }

  if (max < 0) {
    max = 0;
  }

  if (min === max) {
    return Math.floor(min);
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(min + Math.random() * (max + 1 - min));
};

getRandomInteger();
