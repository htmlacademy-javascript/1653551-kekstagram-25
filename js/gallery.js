// @ts-nocheck
import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture img');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const socialCaption = document.querySelector('.social__caption');
const socialComment = document.querySelector('.social__comment');
const socialComments = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
let postComments = [];
const socialCommentsShownCountElement = document.querySelector('.comments-shown');
const picturesContainer = document.querySelector('.pictures');
let posts = [];

const initPosts = function (postsData) {
  posts = postsData;
};

const renderComments = function (comments) {
  const pictureFragment = document.createDocumentFragment();

  comments.forEach(({ avatar, name, message }) => {
    const commentItem = socialComment.cloneNode(true);

    commentItem.querySelector('.social__picture').src = avatar;
    commentItem.querySelector('.social__picture').alt = name;
    commentItem.querySelector('.social__text').textContent = message;

    pictureFragment.appendChild(commentItem);
  });

  socialComments.append(pictureFragment);
};

const loadComments = function () {
  renderComments(postComments.splice(0, 5));
  socialCommentsShownCountElement.textContent = socialComments.querySelectorAll('.social__comment').length;
  if (!postComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const renderBigPicture = function (post) {
  commentsLoader.classList.remove('hidden');
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  postComments = post.comments;
  bigPictureImage.src = post.url;
  likesCount.textContent = post.likes;
  commentsCount.textContent = post.comments.length;
  socialCaption.textContent = post.description;
  socialComments.innerHTML = '';
  loadComments();
};

bigPictureCloseButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey (evt)) {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

commentsLoader.addEventListener('click', loadComments);

picturesContainer.addEventListener('click', (evt) => {
  const pictureThumbnailElement = evt.target.closest('.picture');
  if ( pictureThumbnailElement === null ) {
    return;
  }
  evt.preventDefault();
  const postId = parseInt(pictureThumbnailElement.dataset.postId, 10);
  const post = posts.find((postData) => postData.id === postId);
  if (post) {
    renderBigPicture(post);
  }
});

export { renderBigPicture, initPosts };
