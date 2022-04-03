const usersPictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture');
const picturesFragment = document.createDocumentFragment();

const drawMiniatures = function (picturesArray) {
  for (let i = 0; i < picturesArray.length; i++) {
    const miniature = pictureTemplate.cloneNode(true);
    miniature.querySelector('.picture__img').src = url;
    miniature.querySelector('.picture__likes').textContent = likes;
    miniature.querySelector('.picture__comments').textContent = comments;
    picturesFragment.appendChild(miniature);
  }
  usersPictures.appendChild(picturesFragment);
};

export { drawMiniatures };
