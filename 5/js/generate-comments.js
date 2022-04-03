import { getRandomInteger, shuffleArray, generateIntId, getArrayRandomElement } from './util.js';
import {COMMENT_SENTENCES, COMMENT_AUTHOR_NAMES, USER_AVATAR_MIN_ID, USER_AVATAR_MAX_ID, COMMENT_ID_START, COMMENT_ID_STEP} from './constants.js';

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
