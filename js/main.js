//import { makePosts } from './generate-posts.js';
import { renderThumbnails, clearThumbnails } from './draw-miniatures.js';
//import { POSTS_COUNT } from './constants.js';
import './handle-forms.js';
import './gallery.js';
import './filters.js';
import { getDataFromServer } from './server-api.js';
import { initFilterForm } from './post-filters.js';

//Основная логика
//Запуск основной логики
//renderThumbnails(makePosts(POSTS_COUNT));
const onGetDataError = () => {};

const onGetDataSuccess = (posts) => {
  renderThumbnails(posts);
  initFilterForm(posts, (filteredPosts) => {
    clearThumbnails();
    renderThumbnails(filteredPosts);
  });
};

getDataFromServer(onGetDataSuccess, onGetDataError);
//NB: Пристегнуть работу с комментами на делегаты
