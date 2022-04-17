// #region Imports
import { isEscapeKey } from './utils/common.js';
// #endregion

// #region Constants
const POST_COMMENTS_CHUNK_MAX_LENGTH = 5;
// #endregion

/**
 * @typedef {Object} UserComment - Пользовательский комментарий
 * @property {string} avatar - Аватар пользователя
 * @property {string} name - Имя пользователя
 * @property {string} message - Текст комментария
 */

/**
 * @typedef {Object} Post - Пост
 * @property {string} url - Ссылка на фоографию
 * @property {number} likes - Количество лайков
 * @property {number} id - Идентификатор
 * @property {string} description - Описание поста
 * @property {UserComment[]} comments - Комментарии пользователей
 */

// #region Variables
const body = document.body;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = document.querySelector('.big-picture img');
const bigPictureCloseButtonElement = document.querySelector('.big-picture__cancel');

const likesCountElement = document.querySelector('.likes-count');

const bigPictureSocialElement = document.querySelector('.big-picture__social');
const socialCaptionElement = document.querySelector('.social__caption');

const socialCommentsShownCountElement = document.querySelector('.comments-shown');
const commentsCountElement = document.querySelector('.comments-count');

let socialCommentsContainerElement = document.querySelector('.social__comments');
const emptyCommentsContainerElement = socialCommentsContainerElement.cloneNode();

const socialCommentElement = document.querySelector('.social__comment');
const commentTemplateElement = socialCommentElement.cloneNode(true);

const commentsLoaderButtonElement = document.querySelector('.comments-loader');

const picturesContainerElement = document.querySelector('.pictures');


/** @type {Post[]} */
let posts = [];

/** @type {UserComment[]} */
let postComments = [];

// #endregion

// #region Functios
/**
 * Инициализация постов полученных от сервера
 * @returns {void}
 */
const initPosts = (postsData) => {
  posts = postsData;
};

/**
 * Генерация разметки комментария, с подстановкой данных
 * @param {Object} comment - Объект комментария пользователя
 * @param {string} comment.avatar - Ссылка на аватар пользователя
 * @param {string} comment.name - Имя пользователя
 * @param {string} comment.message - Текст комментария
 * @return {HTMLElement}
 */
const makeCommentElement = ({ avatar, name, message }) => {
  const commentItemElement = commentTemplateElement.cloneNode(true);
  commentItemElement.querySelector('.social__picture').src = avatar;
  commentItemElement.querySelector('.social__picture').alt = name;
  commentItemElement.querySelector('.social__text').textContent = message;
  return commentItemElement;
};

/**
 * Отрисовка комментариев к посту
 * @param {UserComment[]} - Массив комментариев к посту
 * @returns {void}
 */
const renderPostComments = (comments) => {
  const pictureFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    pictureFragment.append(makeCommentElement(comment));
  });
  socialCommentsContainerElement.append(pictureFragment);
};

/**
 * Скрываем кнопку загрузки комментариев
 * @returns {void}
 */
const showCommentsLoaderElement = () => {
  commentsLoaderButtonElement.classList.remove('hidden');
};

/**
 * Отображаем кнопку загрузки комментариев
 * @returns {void}
 */
const hideCommentsLoaderElement = () => {
  commentsLoaderButtonElement.classList.add('hidden');
};

/**
 * Отрисовка комментариев к посту
 * Если комментарии закончились - прячем кнопку загрузки дополнительных комментариев
 * @returns {void}
 */
const onLoadMorePostComments = () => {
  renderPostComments(postComments.splice(0, POST_COMMENTS_CHUNK_MAX_LENGTH));
  socialCommentsShownCountElement.textContent =
    socialCommentsContainerElement.querySelectorAll('.social__comment').length;

  if (!postComments.length) {
    hideCommentsLoaderElement();
  }
};

/**
 * Удаление отрисованных комментариев
 * @returns {void}
 */
const clearPostCommentsContainer = () => {
  const newSocialCommentsContainerElement = emptyCommentsContainerElement.cloneNode();
  bigPictureSocialElement.replaceChild(
    newSocialCommentsContainerElement,
    socialCommentsContainerElement
  );
  socialCommentsContainerElement = newSocialCommentsContainerElement;
};

/**
 * Скрываем полноэкранное представление поста
 */
const hideFullScreenPostView = () => {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  hideCommentsLoaderElement();
  document.removeEventListener('keydown', onFullPostViewESCKeydown);
};

/**
 * Отображение полной версии поста
 * @returns {void}
 */
const showFullPost = (post) => {
  body.classList.add('modal-open');

  bigPictureElement.classList.remove('hidden');

  postComments = [...post.comments];

  bigPictureImageElement.src = post.url;

  likesCountElement.textContent = post.likes;
  commentsCountElement.textContent = post.comments.length;

  socialCaptionElement.textContent = post.description;

  clearPostCommentsContainer();

  showCommentsLoaderElement();
  onLoadMorePostComments();

  document.addEventListener('keydown', onFullPostViewESCKeydown);
};

function onFullPostViewESCKeydown (evt) {
  if (isEscapeKey (evt)) {
    hideFullScreenPostView();
  }
}


// #endregion

// #regionEventListeners
// Обработчик клика на кнопку закрыть
bigPictureCloseButtonElement.addEventListener('click', () => {
  hideFullScreenPostView();
});

// Обработчик кликов на превьюшки
picturesContainerElement.addEventListener('click', (evt) => {
  const pictureThumbnailElement = evt.target.closest('.picture');
  if (pictureThumbnailElement === null) {
    return;
  }
  evt.preventDefault();
  const postId = parseInt(pictureThumbnailElement.dataset.postId, 10);
  const post = posts.find((postData) => postData.id === postId);
  if (post) {
    showFullPost(post);
  }
});

// Обработчик клика на кнопку загрузки комментариев к посту
commentsLoaderButtonElement.addEventListener('click', onLoadMorePostComments);

// #endregion


export { showFullPost, initPosts };
