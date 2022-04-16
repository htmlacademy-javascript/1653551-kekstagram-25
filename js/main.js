import { renderThumbnails, clearThumbnails } from './posts-thumbnails.js';
import { initPreviewScaleControlls } from './post-preview.js';
import { getDataFromServer } from './api/services.js';
import { initFilterForm } from './posts-thumbnails-filters.js';
import { initPosts } from './post-fullscreen-view.js';
import './post-send-form.js';

const onGetDataSuccess = (posts) => {
  initPosts(posts);
  renderThumbnails(posts);
  initFilterForm(posts, (filteredPosts) => {
    clearThumbnails();
    renderThumbnails(filteredPosts);
  });
};


getDataFromServer(onGetDataSuccess, () => {});

initPreviewScaleControlls();
