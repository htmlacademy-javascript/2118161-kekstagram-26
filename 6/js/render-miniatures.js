import {createPublications} from './data.js';

const otherUsersPhotosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarPhotos = createPublications();

const similarPhotosFragment = document.createDocumentFragment();

similarPhotos.forEach(({url, likes, comments}) => {
  const otherUserPhoto = photoTemplate.cloneNode(true);
  otherUserPhoto.querySelector('.picture__img').src = url;
  otherUserPhoto.querySelector('.picture__likes').textContent = likes;
  otherUserPhoto.querySelector('.picture__comments').textContent = comments.length;
  similarPhotosFragment.append(otherUserPhoto);
});

otherUsersPhotosContainer.append(similarPhotosFragment);

export {similarPhotos};
