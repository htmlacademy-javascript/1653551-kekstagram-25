import { isEscapeKey } from './utils/common.js';

const UploudMessageModalType = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const modalTemplateSelector = {
  [UploudMessageModalType.SUCCESS]: '#success',
  [UploudMessageModalType.ERROR]: '#error'
};

const modalTypes = Object.values(UploudMessageModalType);

const openUploadResultModal = (modalType) => {
  if (!modalTypes.includes(modalType)) {
    return;
  }

  const templateSelector = modalTemplateSelector[modalType];
  const templateElement = document.querySelector(templateSelector);
  const modalElement = templateElement.content.firstElementChild.cloneNode(true);
  const modalContentElement = modalElement.querySelector(`.${modalType}__inner`);
  const modalCloseButtonElement = modalElement.querySelector(`.${modalType}__button`);

  const closeModal = () => {
    modalElement.removeEventListener('click', onOutsideClick);
    modalElement.remove();
  };

  function onOutsideClick (evt) {
    if (evt.composedPath().includes(modalContentElement)) {
      return;
    }
    closeModal();
  }

  const onModalClose = () => {
    closeModal();
  };

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeModal();
    }
  }, { once: true });

  modalElement.addEventListener('click', onOutsideClick);

  modalCloseButtonElement.addEventListener('click', onModalClose, {
    once: true,
  });

  document.body.append(modalElement);
};

export { openUploadResultModal, UploudMessageModalType };
