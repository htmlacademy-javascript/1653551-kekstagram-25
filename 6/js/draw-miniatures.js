import { renderBigPicture } from './gallery.js';

const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplateElement = document.querySelector('#picture');
const thumbnailTemplate = thumbnailTemplateElement.content.querySelector('.picture'); //копируем ссылку с классом picture из шаблона

const renderThumbnails = function (posts) {
  const thumbnailsFragment = document.createDocumentFragment();
  posts.forEach((post) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    thumbnailElement.querySelector('.picture__img').src = post.url;
    thumbnailElement.querySelector('.picture__likes').textContent = post.likes;
    thumbnailElement.querySelector('.picture__comments').textContent = post.comments.length;
    thumbnailsFragment.appendChild(thumbnailElement);

    thumbnailElement.addEventListener('click', () => {
      renderBigPicture(post);
    });
  });
  thumbnailsContainer.appendChild(thumbnailsFragment);
};

export { renderThumbnails };
