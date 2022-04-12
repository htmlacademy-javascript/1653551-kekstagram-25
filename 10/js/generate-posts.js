import {getRandomInteger} from './util.js';
import {makeComment} from './generate-comments.js';

const POST_MIN_LIKES = 15;
const POST_MAX_LIKES = 200;
const COMMENT_MIN_COUNT = 10;
const COMMENT_MAX_COUNT = 25;

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

const makePosts = function (postCount) {
  return Array.from({ length: postCount }, makePost);
};

export {makePosts};
