import { getPosts } from './api/services.js';
import { initPreviewScaleControlls } from './post-preview.js';
import { initPosts } from './post-fullscreen-view.js';
import { renderThumbnails, clearThumbnails } from './posts-thumbnails.js';
import { initFilterForm } from './posts-thumbnails-filters.js';
import './post-send-form.js';

const onGetPostsDataSuccess = (posts) => {
  initPosts(posts);
  renderThumbnails(posts);
  initFilterForm(posts, (filteredPosts) => {
    clearThumbnails();
    renderThumbnails(filteredPosts);
  });
};

initPreviewScaleControlls();

getPosts(onGetPostsDataSuccess);
