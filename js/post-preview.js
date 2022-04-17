import { mathClamp } from './utils/common.js';

const PREVIEW_SCALE_STEP = 25;
const PREVIEW_MIN_SCALE = 25;
const PREVIEW_MAX_SCALE = 100;
const PREVIEW_DEFAULT_SCALE = 100;

const uploadImageScaleControllsContainerElement =
  document.querySelector('.img-upload__scale');
const previewImgElement = document.querySelector('.img-upload__preview img');
const scaleValueInputElement = document.querySelector('.scale__control--value');

function getCurrentScale() {
  return parseInt(scaleValueInputElement.value, 10);
}

function setPreviewScale(scale) {
  scale = mathClamp(scale, PREVIEW_MIN_SCALE, PREVIEW_MAX_SCALE);
  scaleValueInputElement.value = `${scale}%`;
  previewImgElement.style.transform = `scale(${scale / 100})`;
}

function onChangeScaleClick(evt) {
  const currentScale = getCurrentScale();
  if (evt.target.classList.contains('scale__control--smaller')) {
    setPreviewScale(currentScale + PREVIEW_SCALE_STEP * -1);
    return;
  }
  if (evt.target.classList.contains('scale__control--bigger')) {
    setPreviewScale(currentScale + PREVIEW_SCALE_STEP);
  }
}

const resetPreviewScaleControlls = () => {
  setPreviewScale(PREVIEW_DEFAULT_SCALE);
};

const initPreviewScaleControlls = () => {
  resetPreviewScaleControlls();
  uploadImageScaleControllsContainerElement.addEventListener('click', onChangeScaleClick);
};

export { initPreviewScaleControlls, resetPreviewScaleControlls };
