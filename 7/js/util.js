// Утилиты
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

const getArrayRandomElement = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

/**
 * Возвращает перемешанную копию исходного массива
 * @param {Array} array - исходный массив
 * @returns {Array} перемешанная копия массива
 */
const shuffleArray = (array) =>  [...array].sort(() => Math.random() - 0.5);

const generateIntId = function (start = 0, maxStep = 1) {
  let id = start;
  const minStep = 1;
  return () => {
    id += getRandomInteger(minStep, maxStep);
    return id;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const checkStringLength = (string = '', length = 0) => string.length <= length;

export {getRandomInteger, getArrayRandomElement, shuffleArray, generateIntId, isEscapeKey, checkStringLength};
