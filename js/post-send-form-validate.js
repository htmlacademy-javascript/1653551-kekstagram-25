import { checkStringLength } from './utils/common.js';

const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const HASHTAGS_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;

const HASHTAG_REGEXP = new RegExp(HASHTAG_PATTERN);

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');

const formValidator = new Pristine(uploadFormElement, {
  classTo: 'form-group',
  errorClass: 'is-invalid',
  successClass: 'is-valid',
  errorTextParent: 'form-group',
  errorTextTag: 'div',
  errorTextClass: 'form-error',
});

/*
 * Валидация хэш-тегов
 */

formValidator.addValidator(
  hashtagInputElement,
  (value) => {
    if (value === '') {
      return true;
    }
    return value.startsWith('#');
  },
  'Строка должна начинаться с хэш-тега',
  9,
  true
);

formValidator.addValidator(
  hashtagInputElement,
  (value) => {
    if (value === '') {
      return true;
    }
    return !value.endsWith(' ');
  },
  'Конец строки не должен содержать пробелов',
  8,
  true
);

formValidator.addValidator(
  hashtagInputElement,
  (value) => {
    if (value === '') {
      return true;
    }
    const words = value.split(' ');
    return !words.some((word) => word === '');
  },
  'Хэш-теги разделяются одним пробелом',
  7,
  true
);

formValidator.addValidator(
  hashtagInputElement,
  (value) => {
    if (value === '') {
      return true;
    }
    const words = value.split(' ');
    return words.every((word) => word.startsWith('#'));
  },
  'Хэш-теги должны начинаться с символа #',
  6,
  true
);

formValidator.addValidator(
  hashtagInputElement,
  /** @param {string} value */
  (value) => {
    if (value === '') {
      return true;
    }
    const words = value.split(' ');
    return words.every((word) => word.length <= HASHTAG_MAX_LENGTH);
  },
  (value) => {
    const longTags = value
      .split(' ')
      .filter((word) => word.length > HASHTAG_MAX_LENGTH);
    return `Длина хештега не может превышать ${HASHTAG_MAX_LENGTH} символов. Недопустимые теги: ${longTags.join(
      ', '
    )}`;
  },
  5,
  true
);

formValidator.addValidator(
  hashtagInputElement,
  (value) => {
    if (value === '') {
      return true;
    }
    const words = value.trim().split(' ');
    return words.every((word) => HASHTAG_REGEXP.test(word));
  },
  'Хештег должен состоять из символа #, цифр и букв.',
  4,
  true
);

formValidator.addValidator(
  hashtagInputElement,
  /** @param {string} value */
  (value) => {
    if (value === '') {
      return true;
    }
    const words = value.toLowerCase().split(' ');
    const uniqueTags = new Set(words);
    return uniqueTags.size === words.length;
  },
  'Хештеги должны быть уникальными',
  3,
  true
);

formValidator.addValidator(
  hashtagInputElement,
  /** @param {string} value */
  (value) => {
    if (value === '') {
      return true;
    }
    const words = value.split(' ');
    return words.length <= HASHTAGS_MAX_COUNT;
  },
  `Не более ${HASHTAGS_MAX_COUNT} тегов`,
  2,
  true
);


/*
 * Валидация комментариев
 */

formValidator.addValidator(
  commentInputElement,
  (value) => checkStringLength(value, COMMENT_MAX_LENGTH),
  `Длина не должна превышать ${COMMENT_MAX_LENGTH} символов`,
  1,
  true
);

export default formValidator;
