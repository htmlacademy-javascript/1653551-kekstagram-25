import { isEscapeKey } from './utils/common.js';

const UploudMessageModalType = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const modalTemplateSelector = {
  [UploudMessageModalType.SUCCESS]: '#success',
  [UploudMessageModalType.ERROR]: '#error'
};

const openUploadResultModal = (modalType) => {
  if (!Object.values(UploudMessageModalType).includes(modalType)) {
    return;
  }

  const templateSelector = modalTemplateSelector[modalType];
  const template = document.querySelector(templateSelector);
  const modal = template.content.firstElementChild.cloneNode(true);
  const innerElement = modal.querySelector(`.${modalType}__inner`);
  const closeButton = modal.querySelector(`.${modalType}__button`);

  const closeModal = function () {
    modal.remove();
  };

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeModal();
    }
  }, { once: true });

  modal.addEventListener('click', (evt) => {
    if (evt.composedPath().includes(innerElement)) {
      return;
    }
    closeModal();
  }, { once: true });

  closeButton.addEventListener('click', closeModal, { once: true });

  document.body.append(modal);
};

export { openUploadResultModal, UploudMessageModalType };
