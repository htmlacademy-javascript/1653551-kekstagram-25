import { BACKEND_URL } from './config.js';
import { showNetworkError } from './network-error-message.js';

/**
 * Получение данных от сервера.
 * Получаем список постов.
 * @param {() => void} onSuccess - Обработчик успешного ответа от сервера.
 * @param {() => void} [onFailed] - Обработчик ошибки при запросе.
 * @returns {void}
 */
const getDataFromServer = ({ onSuccess, onFailed, failMessage }) => {
  fetch(`${BACKEND_URL}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      if (onFailed) {
        return onFailed(error);
      }
      if (failMessage) {
        showNetworkError(failMessage);
      }
      showNetworkError(error);
    });
};

/**
 * Отправка данных на сервер.
 * Создаём новыый пост.
 * @param {FormData} formData - Обработчик успешного ответа от сервера.
 * @param {() => void} onSuccess - Обработчик успешного ответа от сервера.
 * @param {() => void} onFailed - Обработчик успешного ответа от сервера.
 * @param {() => void} [onFinally] - Обработчик ошибки при запросе.
 * @returns {void}
 */
const sendDataToServer = (formData, onSuccess, onFailed, onFinally) => {
  fetch(BACKEND_URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      if (onFailed) {
        onFailed(error.message);
      }
    })
    .finally(() => {
      if (onFinally) {
        onFinally();
      }
    });
};

export { getDataFromServer, sendDataToServer };
