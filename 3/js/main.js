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
const POST_MIN_LIKES = 15;
const POST_MAX_LIKES = 200;
const COMMENT_MIN_COUNT = 1;
const COMMENT_MAX_COUNT = 5;
const COMMENT_ID_START = 10;
const COMMENT_ID_STEP = 5;

// Утилиты
const getRandomInteger = function (min, max) {
  if ((typeof min !== 'number' && typeof max !== 'number')|| (min < 0 && max < 0)) {
    return null;
  }

  if (min < 0) {
    min = 0;
  }

  if (max < 0) {
    max = 0;
  }

  if (min === max) {
    return Math.floor(min);
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getArrayRandomElement = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

const checkStringLength = (comment = '', length = 0) => comment.length <= length;

/**
 * Возвращает перемешанную копию исходного массива
 * @param {Array} array - исходный массив
 * @returns {Array} перемешанная копия массива
 */
const shuffleArray = (array) =>  [...array].sort(() => Math.random() - 0.5);

const generateIntId = function (start = 0, maxStep = 1) {
  let id = start;
  const minStep = 1;
  return () => {
    id += getRandomInteger(minStep, maxStep);
    return id;
  };
};

//Основная логика

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

//Посты
const makePost = function (_, index) {
  const id = index + 1;
  return {
    id,
    url: `photos/${id}.jpg`,
    description: 'Фотография няшного котика',
    likes: getRandomInteger(POST_MIN_LIKES, POST_MAX_LIKES),
    comments: Array.from({ length: getRandomInteger(COMMENT_MIN_COUNT, COMMENT_MAX_COUNT) }, makeComment),
  };
};

//Запуск основной логики
const posts = Array.from({ length: 25 }, makePost);

// Временные запуски утилит на период разработки
// @todo: не забыть удалить
checkStringLength('Тут мог быть ваш комментарий', 140);
console.log(posts);
