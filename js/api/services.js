import { BACKEND_URL } from './config.js';

const getDataFromServer = (onSuccess, onFail) => {
  fetch(`${BACKEND_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch((err) => {
      onFail(err);
    });
};

const sendDataToServer = (formData, onSuccess, onFail, onFinally) => {
  fetch(BACKEND_URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      onFail('Не удалось отправить форму');
    })
    .catch(() => {
      onFail('Не удалось отправить форму');
    })
    .finally(() => {
      onFinally();
    });
};

export { getDataFromServer, sendDataToServer };
