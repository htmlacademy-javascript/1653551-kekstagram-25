import { makePosts } from './generate-posts.js';
import { renderThumbnails } from './draw-miniatures.js';
import { POSTS_COUNT } from './constants.js';

//Основная логика
//Запуск основной логики
renderThumbnails(makePosts(POSTS_COUNT));
