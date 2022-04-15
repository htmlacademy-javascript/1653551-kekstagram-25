import { renderThumbnails, clearThumbnails } from './post-thumbnails.js';
import './handle-forms.js';
import { getDataFromServer } from './server-api.js';
import { initFilterForm } from './post-filters.js';
import { initPosts } from './gallery.js';

const onGetDataSuccess = (posts) => {
  initPosts(posts);
  renderThumbnails(posts);
  initFilterForm(posts, (filteredPosts) => {
    clearThumbnails();
    renderThumbnails(filteredPosts);
  });
};

getDataFromServer(onGetDataSuccess, () => {});
