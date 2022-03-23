import {checkStringLength} from './util.js';
import {makePost} from './generate-posts';

//Основная логика
//Запуск основной логики
const posts = Array.from({ length: 25 }, makePost);

// Временные запуски утилит на период разработки
// @todo: не забыть удалить
checkStringLength('Тут мог быть ваш комментарий', 140);
console.log(posts);
