const getDataFromServer = (onSuccess, onFail) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
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

const sendDataToServer = ( formData, onSuccess, onFail ) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      onFail('Не удалось отправить форму');
    })
    .catch(() => {
      onFail('Не удалось отправить форму');
    });
};

export { getDataFromServer, sendDataToServer };
