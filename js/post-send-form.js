import { isEscapeKey } from './utils/common.js';
import { enableFilters, disableFilters } from './upload-image-filters.js';
import { sendPost } from './api/services.js';
import { openUploadResultModal, UploudMessageModalType } from './upload-modals.js';
import { resetPreviewScaleControlls } from './post-preview.js';
import formValidator from './post-send-form-validate.js';

const bodyElement = document.body;
const uploadInputElement = document.querySelector('#upload-file');
const modalContainerElement = document.querySelector('.img-upload__overlay');
const uploadFormElement = document.querySelector('.img-upload__form');
const submitButtonElement = uploadFormElement.querySelector('#upload-submit');
const cancelButtonElement = document.querySelector('#upload-cancel');
const hashtagInputElement = document.querySelector('.text__hashtags');
const previewImgElement = document.querySelector('.img-upload__preview img');
const commentInputElement = document.querySelector('.text__description');

// Признак текущей отправки формы создания нового поста
let isUploadFormSending = false;

function onShowPostUploadForm() {
  const file = this.files[0];

  modalContainerElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onEscPress);

  enableFilters();
  resetPreviewScaleControlls();

  const fileReader = new FileReader();
  fileReader.onload = (evt) => {
    previewImgElement.src = evt.target.result;
  };
  fileReader.readAsDataURL(file);
}

const closeModal = () => {
  modalContainerElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPress);
  disableFilters();
  resetPreviewScaleControlls();
  uploadFormElement.reset();
};

function onEscPress(evt) {
  if (isEscapeKey(evt)) {
    closeModal();
  }
}

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const onSendPostSuccess = () => {
  openUploadResultModal(UploudMessageModalType.SUCCESS);
};
const onSendPostFailed = () => {
  openUploadResultModal(UploudMessageModalType.ERROR);
};

const onSendPostFinnaly = () => {
  unblockSubmitButton();
  closeModal();
  isUploadFormSending = false;
};

uploadInputElement.addEventListener('change', onShowPostUploadForm);

hashtagInputElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

commentInputElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

// Слушатель отправки формы загрузки нового поста
uploadFormElement.addEventListener('submit', (evt) => {
  if (isUploadFormSending) {
    return;
  }

  evt.preventDefault();

  const isFormValid = formValidator.validate();
  if (!isFormValid) {
    return;
  }

  const formData = new FormData(uploadFormElement);

  blockSubmitButton();
  isUploadFormSending = true;
  sendPost(formData, onSendPostSuccess, onSendPostFailed, onSendPostFinnaly);
});


cancelButtonElement.addEventListener('click', () => {
  closeModal();
});
