import { debounce } from './utils/debounce.js';
import { randomIntegersBetweenRange } from './utils/common.js';

const POSTS_RANDOM_MAX_COUNT = 10;

const filterFormActiveButtonClass = 'img-filters__button--active';

const filterFormContainerElement = document.querySelector('.img-filters');
const filterFormElement = document.querySelector('.img-filters__form');

const filterPostsDefault = (posts) => posts;

const filterPostsRandom = (posts, maxCount) => {
  const startIndex = 0;
  const lastIndex = posts.length - 1;
  const elementsCount = Math.min(posts.length, maxCount);
  const randomPostsIndexes = randomIntegersBetweenRange(startIndex, lastIndex, elementsCount);
  return randomPostsIndexes.map((index) => posts[index]);
};

const filterPostsDiscussed = (posts) =>
  [...posts].sort((prevPost, nextPost) => nextPost.comments.length - prevPost.comments.length);

const filterChange = (evt, posts, cb) => {
  const target = evt.target;

  const filterName = target.id;

  let filteredPosts = [];
  switch (filterName) {
    case 'filter-default':
      filteredPosts = filterPostsDefault(posts);
      break;

    case 'filter-random':
      filteredPosts = filterPostsRandom(posts, POSTS_RANDOM_MAX_COUNT);
      break;

    case 'filter-discussed':
      filteredPosts = filterPostsDiscussed(posts);
      break;
  }
  cb(filteredPosts);
};
const onFilterChange = debounce(filterChange);

const initFilterForm = (posts, cb) => {
  const onFilterButtonClick = (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const activeButtonElement = filterFormElement.querySelector(`.${filterFormActiveButtonClass}`);
    if (activeButtonElement) {
      activeButtonElement.classList.remove(filterFormActiveButtonClass);
    }

    evt.target.classList.add(filterFormActiveButtonClass);

    onFilterChange.call(this, evt, posts, cb);
  };

  filterFormElement.removeEventListener('click', onFilterButtonClick);
  filterFormElement.addEventListener('click', onFilterButtonClick);

  filterFormContainerElement.classList.remove('img-filters--inactive');
};

export { initFilterForm };
