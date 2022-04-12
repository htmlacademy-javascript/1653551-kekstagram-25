//import { makePosts } from './generate-posts.js';
import { renderThumbnails } from './draw-miniatures.js';
//import { POSTS_COUNT } from './constants.js';
import './handle-forms.js';
import './gallery.js';
import './filters.js';
import { getDataFromServer } from './server-api.js';

//Основная логика
//Запуск основной логики
//renderThumbnails(makePosts(POSTS_COUNT));
const onGetDataError = () => {};

const onGetDataSuccess = (posts) => {
  renderThumbnails(posts);
};

getDataFromServer(onGetDataSuccess, onGetDataError);

