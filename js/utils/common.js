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
const mathClamp = (value, min, max) => {
  if (value < min) {
    value = min;
  }
  if (isNumber(max) && value > max) {
    value = max;
  }
  return value;
};

/**
 * Возвращает перемешанную копию исходного массива
 * @param {Array} array - исходный массив
 * @returns {Array} перемешанная копия массива
 */
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

/**
 * Заданное количество уникальных числел, в допустимом диапазоне
 * @param {number} from - начальное значение диапазона
 * @param {number} to - конечное диапазона
 * @param {number} resultsLimit - количество элементов
 * @returns {number[]} - Массив чисел в диапазоне
 */
const randomIntegersBetweenRange = (from, to, resultsLimit) => {
  const range = Math.abs(from - to);
  if (!range) {
    return [];
  }
  const resultsCount = Math.min(range, resultsLimit);
  const minValue = Math.min(from, to);
  const values = Array.from({ length: range }, (_, index) => minValue + index);
  return shuffleArray(values).splice(0, resultsCount);
};

/**
 * Проверка строки на максимальную допустимую длину
 * @param {string} string - Проверяемая строка
 * @param {number} length - Максимальная длина строка
 * @returns {boolean} - флаг соответствия максимально допустимой длины переданной строки
 */
const checkStringLength = (string = '', length = 0) => string.length <= length;

export {
  isEscapeKey,
  randomIntegersBetweenRange,
  checkStringLength,
  mathClamp
};
