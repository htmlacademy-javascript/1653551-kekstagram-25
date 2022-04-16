import { checkStringLength } from './utils/common.js';

const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const HASHTAGS_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'form-group',
  errorClass: 'is-invalid',
  successClass: 'is-valid',
  errorTextParent: 'form-group',
  errorTextTag: 'div',
  errorTextClass: 'form-error',
});

pristine.addValidator(
  hashtagInput,
  (value) => {
    if (value === '') {
      return true;
    }
    const words = value.split(' ');
    return words.every((word) => word.startsWith('#'));
  },
  'Хештеги должны начинаться с символа # и разделяются через один пробел',
  6,
  true
);
pristine.addValidator(
  hashtagInput,
  (value) => {
    if (value === '') {
      return true;
    }
    const words = value.trim().split(' ');
    return words.every((word) => {
      const re = new RegExp(HASHTAG_PATTERN);
      return re.test(word);
    });
  },
  'Хештег должен состоять из символа #, цифр и букв.',
  5,
  true
);

pristine.addValidator(
  hashtagInput,
  /** @param {string} value */
  (value) => {
    const words = value.toLowerCase().split(' ');
    const uniqueTag = new Set(words);
    return uniqueTag.size === words.length;
  },
  'Хештеги должны быть уникальными',
  4,
  true
);

pristine.addValidator(
  hashtagInput,
  /** @param {string} value */
  (value) => {
    const words = value.split(' ');
    return words.length <= HASHTAGS_MAX_COUNT;
  },
  `Не более ${HASHTAGS_MAX_COUNT} тегов`,
  3,
  true
);

pristine.addValidator(
  hashtagInput,
  /** @param {string} value */
  (value) => {
    const words = value.split(' ');
    return words.every((word) => word.length <= HASHTAG_MAX_LENGTH);
  },
  (value) => {
    const longTags = value.split(' ').filter((word) => word.length > HASHTAG_MAX_LENGTH);
    return `Длина хештега не может превышать ${HASHTAG_MAX_LENGTH} символов. Недопустимые теги теги: ${longTags.join(', ')}`;
  },
  7,
  true
);

pristine.addValidator(
  commentInput,
  (value) => checkStringLength(value, COMMENT_MAX_LENGTH),
  `Длина не должна превышать ${COMMENT_MAX_LENGTH} символов`,
  1,
  true
);

export { pristine };
