const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplateElement = document.querySelector('#picture');
const thumbnailTemplate = thumbnailTemplateElement.content;

const clearThumbnails = function () {
  thumbnailsContainer.querySelectorAll('.picture').forEach((thumbnailElement) => {
    thumbnailElement.remove();
  });
};

const renderThumbnails = function (posts) {
  const thumbnailsFragment = document.createDocumentFragment();
  posts.forEach((post) => {
    const thumbnailFragment = thumbnailTemplate.cloneNode(true);
    thumbnailFragment.querySelector('.picture').dataset.postId = post.id;
    thumbnailFragment.querySelector('.picture__img').src = post.url;
    thumbnailFragment.querySelector('.picture__likes').textContent = post.likes;
    thumbnailFragment.querySelector('.picture__comments').textContent = post.comments.length;
    thumbnailsFragment.appendChild(thumbnailFragment);
  });
  thumbnailsContainer.appendChild(thumbnailsFragment);
};

export { renderThumbnails, clearThumbnails };
