import {openFullPhotoModal, uploadPhotoAttributes, showCommentsAttributes, uploadComments} from './render-full-size.js';

let photosData;

const otherUsersPhotosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderSimilarPhotos = (similarPhotos) => {
  photosData = similarPhotos;

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

export {renderSimilarPhotos};
