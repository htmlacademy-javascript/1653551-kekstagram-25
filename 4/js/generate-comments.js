import {getRandomInteger, shuffleArray, generateIntId, getArrayRandomElement} from './util.js';

// Константы
const COMMENT_SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENT_AUTHOR_NAMES = [
  'Марьяна',
  'Олег',
  'Никита',
  'Елена',
  'Борис',
  'Ядвига',
  'Кристина',
  'Стефан',
  'Роман',
  'Григорий',
  'Марк',
  'Таисия',
  'Егор',
  'Андрей',
  'Анеля'
];

const USER_AVATAR_MIN_ID = 1;
const USER_AVATAR_MAX_ID = 6;
const COMMENT_ID_START = 10;
const COMMENT_ID_STEP = 5;

//Комменты
const makeCommentMessage = function () {
  const sentencesMinCount = 1;
  const sentencesMaxCount = 2;
  const sentencesCount = getRandomInteger(sentencesMinCount, sentencesMaxCount);
  return shuffleArray(COMMENT_SENTENCES).slice(0, sentencesCount).join(' ');
};

const getCommentNextId = generateIntId (COMMENT_ID_START, COMMENT_ID_STEP);

function makeComment() {
  return {
    id: getCommentNextId(),
    avatar: `img/avatar-${getRandomInteger(USER_AVATAR_MIN_ID, USER_AVATAR_MAX_ID)}.svg`,
    message: makeCommentMessage(),
    name: getArrayRandomElement(COMMENT_AUTHOR_NAMES),
  };
}

export {makeComment};
