import {makePost} from './generate-posts';

//Основная логика
//Запуск основной логики
const posts = Array.from({ length: 25 }, makePost);

// Временные запуски утилит на период разработки
// @todo: не забыть удалить
console.log(posts);
