// @ts-nocheck
import { isEscapeKey, checkStringLength } from './util.js';
import { COMMENT_MAX_LENGTH } from './constants.js';
import { enableFilters, disableFilters, makeScalable, makeUnscalable } from './filters.js';
import { sendDataToServer } from './server-api.js';
import { openUploadResultModal, UploudMessageModalType } from './upload-modals.js';

const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_HASHTAGS = 5;

const bodyElement = document.body;
const uploadInputElement = document.querySelector('#upload-file');
const modalContainer = document.querySelector('.img-upload__overlay');
/** @type {HTMLFormElement} */
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('#upload-submit');
const cancelButton = document.querySelector('#upload-cancel');

const showModalHandler = function () {
  modalContainer.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscPress);
  enableFilters();
  makeScalable();
};

const closeModal = function () {
  modalContainer.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPress);
  disableFilters();
  makeUnscalable();
  uploadForm.reset();
};

function onEscPress (evt) {
  if (isEscapeKey(evt)) {
    closeModal();
  }
}

const pristine = new Pristine(uploadForm, {
  classTo: 'form-group',
  errorClass: 'is-invalid',
  successClass: 'is-valid',
  errorTextParent: 'form-group',
  errorTextTag: 'div',
  errorTextClass: 'form-error'
});

uploadInputElement.addEventListener('change', showModalHandler);

const hashtagInput = document.querySelector('.text__hashtags');
hashtagInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

/** @param {string} value */
const validateHashtagsCount = function (value) {
  const words = value.split(' ');
  return (words.length <= MAX_HASHTAGS);
};

pristine.addValidator(hashtagInput, validateHashtagsCount, 'Не более 5 тегов', 1, false);


/** @param {string} value */
const validateHashtagsLength = function (value) {
  const words = value.split(' ');
  return words.every((word) => word.length <= 20);
};

pristine.addValidator(hashtagInput, validateHashtagsLength, 'Длина хештега не может превышать 20 символов', 1, true);

/** @param {string} value */
const validateHashtags = function (value) {
  if (value === '') {
    return true;
  }
  const words = value.split(' ');
  return words.every((word) => {
    const re = new RegExp(HASHTAG_PATTERN);
    return re.test(word);
  });
};

pristine.addValidator(hashtagInput, validateHashtags, 'Хештеги содержат недопустимые символы', 1, false);

/** @param {string} value */
const validateIsHashtagsUnique = function (value) {
  const words = value.toLowerCase().split(' ');
  const uniqueTag = new Set(words);
  return (uniqueTag.size === words.length);
};

pristine.addValidator(hashtagInput, validateIsHashtagsUnique, 'Хештеги должны быть уникальными', 1, true);

const commentInput = document.querySelector('.text__description');
commentInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

const validateCommentLength = function (value) {
  return (checkStringLength(value, COMMENT_MAX_LENGTH));
};

pristine.addValidator(commentInput, validateCommentLength, 'Длина не должна превышать 140 символов', 1, true);

cancelButton.addEventListener('click', () => {
  closeModal();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isFormValid = pristine.validate();
  if (!isFormValid) {
    return;
  }
  blockSubmitButton();
  const formData = new FormData(uploadForm);
  const onSuccess = function () {
    openUploadResultModal(UploudMessageModalType.SUCCESS);
    unblockSubmitButton();
    closeModal();
  };
  const onFailed = function () {
    openUploadResultModal(UploudMessageModalType.ERROR);
    unblockSubmitButton();
    closeModal();
  };
  sendDataToServer(formData, onSuccess, onFailed );
});

export { bodyElement };
