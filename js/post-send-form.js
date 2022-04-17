import { isEscapeKey } from './utils/common.js';
import {
  enableFilters,
  disableFilters,
} from './upload-image-filters.js';
import { sendPost } from './api/services.js';
import { openUploadResultModal, UploudMessageModalType } from './upload-modals.js';
import { resetPreviewScaleControlls } from './post-preview.js';
import formValidator from './post-send-form-validate.js';

const bodyElement = document.body;
const uploadInputElement = document.querySelector('#upload-file');
const modalContainer = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('#upload-submit');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const previewImgElement = document.querySelector('.img-upload__preview img');
const commentInput = document.querySelector('.text__description');

// Признак текущей отправки формы создания нового поста
let isUploadFormSending = false;

const onShowPostUploadForm = function () {
  const file = this.files[0];
  modalContainer.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscPress);
  enableFilters();
  resetPreviewScaleControlls();
  const fileReader = new FileReader();
  fileReader.onload = (evt) => {
    previewImgElement.src = evt.target.result;
  };
  fileReader.readAsDataURL(file);
};

const closeModal = function () {
  modalContainer.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPress);
  disableFilters();
  resetPreviewScaleControlls();
  uploadForm.reset();
};

function onEscPress(evt) {
  if (isEscapeKey(evt)) {
    closeModal();
  }
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onSendPostSuccess = function () {
  openUploadResultModal(UploudMessageModalType.SUCCESS);
};
const onSendPostFailed = function () {
  openUploadResultModal(UploudMessageModalType.ERROR);
};

const onSendPostFinnaly = () => {
  unblockSubmitButton();
  closeModal();
  isUploadFormSending = false;
};

uploadInputElement.addEventListener('change', onShowPostUploadForm);

hashtagInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

commentInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

// Слушатель отправки формы загрузки нового поста
uploadForm.addEventListener('submit', (evt) => {
  if (isUploadFormSending) {
    return;
  }
  evt.preventDefault();
  const isFormValid = formValidator.validate();
  if (!isFormValid) {
    return;
  }
  const formData = new FormData(uploadForm);

  blockSubmitButton();
  isUploadFormSending = true;
  sendPost(formData, onSendPostSuccess, onSendPostFailed, onSendPostFinnaly);
});


cancelButton.addEventListener('click', () => {
  closeModal();
});
