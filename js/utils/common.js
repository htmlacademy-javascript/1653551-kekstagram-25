/**
 * Проверка на нажатие клавиши ESC
 * @param {KeyboardEvent} - событие
 * @returns {boolean} - Истина, если нажата клавиша ESC
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

/**
 * Результ проверки переданного числа на принадлежность к типу число
 * @returns {boolean} - Истина, если значение типа число
 */
const isNumber = (value) => typeof value === 'number';

/**
 * Приведение числа к диапазону
 * @param {number} value - приводимое значение
 * @param {number} min - минимальное зачение
 * @param {number} [max] - максимальное значение (опционально)
 */
const mathClamp = function (value, min, max) {
  if (value < min) {
    value = min;
  }
  if (isNumber(max) && value > max) {
    value = max;
  }
  return value;
};

/**
 * Возвращает случайным образом булевое значение (истина/ложь)
 * @returns {boolean}
 */
const getRandomBoolean = () => (Math.random() - 0.5) > 0;

/**
 * Возвращает случайное целое число, в заданном диапазоне, или null,
 * Если невозможно получить корректное значение в диапазоне между заданными значениями от и до - возвращает null
 * Если значения равны - вернёт меньшее.
 */
const getRandomInteger = function (from, to) {
  from = mathClamp(from, 0);
  to = mathClamp(to, 0);

  if (from === to) {
    return Math.floor(from);
  }

  if (from > to) {
    [from, to] = [to, from];
  }

  from = Math.ceil(from);
  to = Math.floor(to);
  return Math.floor(from + Math.random() * (to + 1 - from));
};

/**
 * Генератор цифрового идентификатора, с заданного значения, с желаемым максимальным шагом
 * По умолчанию, начальное значение 0, и шаг равен 1.
 */
const generateIntId = function (start = 0, maxStep = 1) {
  let id = start;
  const minStep = 1;
  return () => {
    id += getRandomInteger(minStep, maxStep);
    return id;
  };
};

/**
 * Получение случайного элемента массива
 * Если массив пуст - возвращает null
 * @param {Array} array - Массив элементов
 * @returns {*|null} - Массив элемента
 */
const getArrayRandomElement = (array) => (array.length) ?
  array[getRandomInteger(0, array.length - 1)] : null;

/**
 * Заданное количество уникальных числел, в допустимом диапазоне
 * @param {number} count - количество элементов
 * @param {number} min - минимальное значение диапазона
 * @param {number} max - максимальное значение диапазона
 * @returns {number[]} - Массив чисел в диапазоне
 */
const randomIntegersBetweenRange = function (count, min, max) {
  const results = [];
  while (results.length < count && results.length < max - min) {
    const randomInteger = getRandomInteger(min, max);
    if (!results.includes(randomInteger)) {
      results.push(randomInteger);
    }
  }
  return results;
};

/**
 * Возвращает перемешанную копию исходного массива
 * @param {Array} array - исходный массив
 * @returns {Array} - перемешанная копия массива
 */
const shuffleArray = (array) => [...array].sort(() => getRandomBoolean());

/**
 * Проверка строки на максимальную допустимую длину
 * @param {string} string - Проверяемая строка
 * @param {number} length - Максимальная длина строка
 * @returns {boolean} - флаг соответствия максимально допустимой длины переданной строки
 */
const checkStringLength = (string = '', length = 0) => string.length <= length;

export {
  isEscapeKey,
  generateIntId,
  getArrayRandomElement,
  randomIntegersBetweenRange,
  shuffleArray,
  checkStringLength,
  mathClamp
};
