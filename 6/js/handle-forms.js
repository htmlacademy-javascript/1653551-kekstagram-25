// @ts-nocheck
import {isEscapeKey} from './util.js';

/* Выбор изображения для загрузки осуществляется с помощью стандартного контрола загрузки файла #upload-file,
 который стилизован под букву «О» в логотипе. После выбора изображения (изменения значения поля #upload-file),
  показывается форма редактирования изображения.
   У элемента .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open.*/
const uploadInputElement = document.querySelector('#upload-file');

const modalContainer = document.querySelector('.img-upload__overlay');

const bodyElement = document.body;

/* Закрытие формы редактирования изображения производится либо нажатием на кнопку #upload-cancel, либо нажатием клавиши Esc.
 Элементу .img-upload__overlay возвращается класс hidden. У элемента body удаляется класс modal-open. */
const closeModal = function () {
  modalContainer.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

const cancelButton = document.querySelector('#upload-cancel');
cancelButton.addEventListener('click', () => {
  closeModal();
});

document.addEventListener('keydown',(evt) => {
  if (isEscapeKey(evt)) {
    closeModal();
  }
});

const uploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(uploadForm, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isFormValid = pristine.validate();
  console.log(isFormValid);
});

uploadInputElement.addEventListener('change', () => {
  modalContainer.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
});

export { bodyElement };
