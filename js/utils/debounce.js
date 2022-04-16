/**
 * Откладывает выполнение функции обратного вызова на указанное значение,
 * если коллбек вызывался в течении данного отрезка времени
 * @param {() => void} callback - функция обратного вызова
 * @param {number} [timeoutDelay] - задержка отложенного вызова (по умолчанию 500)
 */
function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  debounce,
};
