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

const mathClamp = function (number, min, max) {
  if (number < min) {
    number = min;
  }
  if (number > max) {
    number = max;
  }
  return number;
};

const randomIntegersBetweenRange = function (count, min, max) {
  const results = [];
  for (let i = 0; i < count;) {
    const randomInteger = getRandomInteger(min, max);
    if (!results.includes(randomInteger)) {
      results.push(randomInteger);
      i++;
    }
  }
  return results;
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  getRandomInteger, getArrayRandomElement, shuffleArray,
  generateIntId, isEscapeKey, checkStringLength, mathClamp,
  randomIntegersBetweenRange, debounce
};
