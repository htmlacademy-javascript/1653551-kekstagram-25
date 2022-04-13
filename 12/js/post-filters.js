// @ts-nocheck
import { randomIntegersBetweenRange, debounce } from './util.js';
// @ts-nocheck
const filterFormButtonClass = 'img-filters__button';
const filterFormActiveButtonClass = 'img-filters__button--active';
/** @type {HTMLFormElement} */
const filterForm = document.querySelector('.img-filters');
const filterButtons = filterForm.querySelectorAll(`.${filterFormButtonClass}`);
filterForm.classList.remove('img-filters--inactive');

const filterPostsDefault = function (posts) {
  return posts;
};

const filterPostsRandom = function (posts, maxCount) {
  const indexes = randomIntegersBetweenRange(Math.min(posts.length, maxCount), 0, posts.length - 1);
  return indexes.map((index) => posts[index]);
};

const filterPostsDiscussed = function (posts) {
  return [...posts].sort((prevPost, nextPost) => nextPost.comments.length - prevPost.comments.length);
};

const filterChange = function (evt, posts, cb) {
  const target = evt.target;

  const filterName = target.id;

  let filteredPosts = [];
  switch (filterName) {
    case 'filter-default':
      filteredPosts = filterPostsDefault(posts);
      break;

    case 'filter-random':
      filteredPosts = filterPostsRandom(posts, 10);
      break;

    case 'filter-discussed':
      filteredPosts = filterPostsDiscussed(posts);
      break;
  }

  cb(filteredPosts);
};
const onFilterChange = debounce(filterChange);
const initFilterForm = function (posts, cb) {
  const onFilterButtonClick = function (evt) {
    if (!evt.target.classList.contains(filterFormButtonClass)) {
      return;
    }
    filterButtons.forEach((filterButton) => {
      filterButton.classList.remove(filterFormActiveButtonClass);
    });
    evt.target.classList.add(filterFormActiveButtonClass);
    onFilterChange.call(this, evt, posts, cb);
  };
  filterForm.removeEventListener('click', onFilterButtonClick);
  filterForm.addEventListener('click', onFilterButtonClick);
};

export { initFilterForm };
