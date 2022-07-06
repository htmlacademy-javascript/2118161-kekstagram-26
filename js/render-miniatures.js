import {createPublications} from './data.js';
import {renderFullSize} from './render-full-size.js';

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
  otherUserPhoto.addEventListener('click', (evt) => {
    renderFullSize(evt.currentTarget);
  });
  similarPhotosFragment.append(otherUserPhoto);
});

otherUsersPhotosContainer.append(similarPhotosFragment);
