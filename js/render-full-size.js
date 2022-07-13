import {similarPhotos} from './render-miniatures.js';
import {isEscapeKey} from './util.js';

const fullPhotoWindow = document.querySelector('.big-picture');
const cancelButton = fullPhotoWindow.querySelector('.big-picture__cancel');
const commentsCount = fullPhotoWindow.querySelector('.social__comment-count');
const commentsLoader = fullPhotoWindow.querySelector('.comments-loader');
const bigPictureImg = fullPhotoWindow.querySelector('.big-picture__img > img');
const bigPictureLikesCount = fullPhotoWindow.querySelector('.likes-count');
const bigPictureCommentsCount = fullPhotoWindow.querySelector('.comments-count');
const commentsContainer = fullPhotoWindow.querySelector('.social__comments');
const bigPictureDescription = fullPhotoWindow.querySelector('.social__caption');

const usersPhotosContainer = document.querySelectorAll('.picture');

const hideUnusedElements = () => {
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};
hideUnusedElements();

const uploadPhotoAttributes = (photoIndex) => {
  bigPictureImg.src = similarPhotos[photoIndex].url;
  bigPictureLikesCount.textContent = similarPhotos[photoIndex].likes;
  bigPictureCommentsCount.textContent = similarPhotos[photoIndex].comments.length;
  bigPictureDescription.textContent = similarPhotos[photoIndex].description;
};

const uploadComments = (photoIndex) => {
  const commentsContainerFragment = document.createDocumentFragment();

  similarPhotos[photoIndex].comments.forEach(({avatar, name, message}) => {
    const comment = document.createElement('li');
    const commentAvatar = document.createElement('img');
    const commentText = document.createElement('p');

    comment.classList.add('social__comment');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentAvatar.width = 35;
    commentAvatar.height = 35;
    comment.append(commentAvatar);
    commentText.classList.add('social__text');
    commentText.textContent = message;
    comment.append(commentText);

    commentsContainerFragment.append(comment);
  });
  commentsContainer.textContent = '';
  commentsContainer.append(commentsContainerFragment);
};

const onFullPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhotoModal();
  }
};

function closeFullPhotoModal () {
  document.body.classList.remove('modal-open');
  fullPhotoWindow.classList.add('hidden');

  cancelButton.removeEventListener('click', closeFullPhotoModal);
  document.removeEventListener('keydown', onFullPhotoEscKeydown);
}

const openFullPhotoModal = (photoIndex) => {
  document.body.classList.add('modal-open');
  fullPhotoWindow.classList.remove('hidden');
  uploadPhotoAttributes(photoIndex);
  uploadComments(photoIndex);

  cancelButton.addEventListener('click', closeFullPhotoModal);
  document.addEventListener('keydown', onFullPhotoEscKeydown);
};

usersPhotosContainer.forEach((photo, index) => {
  photo.addEventListener('click', openFullPhotoModal.bind(null, index));
});
