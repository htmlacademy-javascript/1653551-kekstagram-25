import { getDataFromServer, sendDataToServer } from './network.js';

const getPosts = (onSuccess) =>
  getDataFromServer({
    onSuccess,
    failMessage: 'Не удалось получить посты (=ʘᆽʘ=)',
  });

const sendPost = (formData, onSuccess, onFailed, onFinally) =>
  sendDataToServer(formData, onSuccess, onFailed, onFinally);

export { getPosts, sendPost };
