import {openFullPhotoModal, uploadPhotoAttributes, showCommentsAttributes, uploadComments} from './render-full-size.js';
import {getRandomArrayElement} from './util.js';

let photosData;

const otherUsersPhotosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const filterForm = document.querySelector('.img-filters__form');
const defaultFilter = filterForm.querySelector('#filter-default');
const randomFilter = filterForm.querySelector('#filter-random');
const discussedFilter = filterForm.querySelector('#filter-discussed');

const compareComments = (photoA, photoB) => {
  const rankA = photoA.comments.length;
  const rankB = photoB.comments.length;

  return rankB - rankA;
};

const getFixedCountOfPhotos = (photos, photosCount) => {
  const randomPhotos = [];
  for (let i = 0; i < photosCount; i++) {
    let newRandomPhoto = getRandomArrayElement(photos);
    while (randomPhotos.includes(newRandomPhoto)) {
      newRandomPhoto = getRandomArrayElement(photos);
    }
    randomPhotos.push(newRandomPhoto);
  }

  return randomPhotos;
};

const setNewSelectedFilter = (newSelectedFilter) => {
  const oldSelectedFilter = filterForm.querySelector('.img-filters__button--active');
  oldSelectedFilter.classList.remove('img-filters__button--active');
  newSelectedFilter.classList.add('img-filters__button--active');
};

const setDefaultFilter = (cb) => {
  defaultFilter.addEventListener('click', (evt) => {
    setNewSelectedFilter(evt.target);
    cb();
  });
};

const setRandomFilter = (cb) => {
  randomFilter.addEventListener('click', (evt) => {
    setNewSelectedFilter(evt.target);
    cb();
  });
};

const setDiscussedFilter = (cb) => {
  discussedFilter.addEventListener('click', (evt) => {
    setNewSelectedFilter(evt.target);
    cb();
  });
};

const renderSimilarPhotos = (similarPhotos) => {
  photosData = similarPhotos;

  const allPhotosNodes = otherUsersPhotosContainer.querySelectorAll('.picture');
  if (allPhotosNodes.length !== 0) {
    allPhotosNodes.forEach ((photoNode) => {
      photoNode.remove();
    });
  }

  const similarPhotosFragment = document.createDocumentFragment();

  similarPhotos.forEach(({url, likes, comments}) => {
    const otherUserPhoto = photoTemplate.cloneNode(true);
    otherUserPhoto.querySelector('.picture__img').src = url;
    otherUserPhoto.querySelector('.picture__likes').textContent = likes;
    otherUserPhoto.querySelector('.picture__comments').textContent = comments.length;
    similarPhotosFragment.append(otherUserPhoto);
  });

  otherUsersPhotosContainer.append(similarPhotosFragment);
  otherUsersPhotosContainer.addEventListener('click', onPhotoMiniatureClick);
};

const openFullSize = (photoMiniature) => {
  const clickedPhotoNode = photoMiniature.closest('.picture');
  if (clickedPhotoNode) {
    const clickedPhotoIndex = photosData.findIndex( (photo) => clickedPhotoNode.children[0].src.endsWith(photo.url));
    openFullPhotoModal();
    uploadPhotoAttributes(photosData, clickedPhotoIndex);
    showCommentsAttributes();
    uploadComments(photosData, clickedPhotoIndex);
  }
};

function onPhotoMiniatureClick (evt) {
  openFullSize(evt.target);
}

export {renderSimilarPhotos, setDefaultFilter, setRandomFilter, setDiscussedFilter, getFixedCountOfPhotos, compareComments};
