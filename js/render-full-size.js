import {isEscapeKey} from './util.js';

const COMMENT_AVATAR_WIDTH = 35;
const COMMENT_AVATAR_HEIGHT = 35;
const VISIBLE_COMMENT_COUNT = 5;

const fullPhotoWindow = document.querySelector('.big-picture');
const cancelButton = fullPhotoWindow.querySelector('.big-picture__cancel');
const commentsCountLabel = fullPhotoWindow.querySelector('.social__comment-count');
const commentsCountVisibleLabel = fullPhotoWindow.querySelector('.comments-visible-count');
const commentsCountAllLabel = fullPhotoWindow.querySelector('.comments-count');
const commentsLoaderButton = fullPhotoWindow.querySelector('.comments-loader');
const bigPictureImg = fullPhotoWindow.querySelector('.big-picture__img > img');
const bigPictureLikesCount = fullPhotoWindow.querySelector('.likes-count');
const bigPictureCommentsCount = fullPhotoWindow.querySelector('.comments-count');
const commentsContainer = fullPhotoWindow.querySelector('.social__comments');
const bigPictureDescription = fullPhotoWindow.querySelector('.social__caption');

const showCommentsAttributes = () => {
  commentsCountLabel.classList.remove('hidden');
  commentsLoaderButton.classList.remove('hidden');
};

const hideCommentsAttributes = () => {
  commentsCountLabel.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');
};


const uploadPhotoAttributes = (similarPhotos, photoIndex) => {
  bigPictureImg.src = similarPhotos[photoIndex].url;
  bigPictureLikesCount.textContent = similarPhotos[photoIndex].likes;
  bigPictureCommentsCount.textContent = similarPhotos[photoIndex].comments.length;
  bigPictureDescription.textContent = similarPhotos[photoIndex].description;
};

const setVisibleCommentsCount = () => {
  const commentsHideCount = commentsContainer.querySelectorAll('.hidden').length;
  const commentsAllCount = commentsContainer.querySelectorAll('.social__comment').length;
  const commentsVisibleCount = commentsAllCount - commentsHideCount;
  commentsCountAllLabel.textContent = commentsAllCount;
  commentsCountVisibleLabel.textContent = commentsVisibleCount;
};

const uploadComments = (similarPhotos, photoIndex) => {
  const commentsContainerFragment = document.createDocumentFragment();
  const commentsAll = similarPhotos[photoIndex].comments;
  const commentsAllCount = commentsAll.length;

  if (commentsAllCount !== 0) {
    if (commentsAllCount <= VISIBLE_COMMENT_COUNT) {
      hideCommentsAttributes();
    }

    commentsAll.forEach(({avatar, name, message}, commentIndex) => {
      const comment = document.createElement('li');
      const commentAvatar = document.createElement('img');
      const commentText = document.createElement('p');

      comment.classList.add('social__comment');
      commentAvatar.classList.add('social__picture');
      commentAvatar.src = avatar;
      commentAvatar.alt = name;
      commentAvatar.width = COMMENT_AVATAR_WIDTH;
      commentAvatar.height = COMMENT_AVATAR_HEIGHT;
      comment.append(commentAvatar);
      commentText.classList.add('social__text');
      commentText.textContent = message;
      comment.append(commentText);

      if (commentIndex >= VISIBLE_COMMENT_COUNT) {
        comment.classList.add('hidden');
      }

      commentsContainerFragment.append(comment);
    });
  } else {
    hideCommentsAttributes();
  }

  commentsContainer.textContent = '';
  commentsContainer.append(commentsContainerFragment);
  setVisibleCommentsCount();
};

const openFullPhotoModal = () => {
  document.body.classList.add('modal-open');
  fullPhotoWindow.classList.remove('hidden');

  commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onFullPhotoEscKeydown);
};

const closeFullPhotoModal = () => {
  document.body.classList.remove('modal-open');
  fullPhotoWindow.classList.add('hidden');

  commentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onFullPhotoEscKeydown);
};

const showMoreComments = () => {
  const commentsHideNodes = commentsContainer.querySelectorAll('.hidden');
  const commentsHideCount = commentsHideNodes.length;

  if (commentsHideCount >= VISIBLE_COMMENT_COUNT) {
    for (let i = 0; i < VISIBLE_COMMENT_COUNT; i++) {
      commentsHideNodes[i].classList.remove('hidden');
    }
  } else {
    if (commentsHideCount !== 0) {
      for (let i = 0; i < commentsHideCount; i++) {
        commentsHideNodes[i].classList.remove('hidden');
      }
      commentsLoaderButton.classList.add('hidden');
    }
  }

  setVisibleCommentsCount();
};

function onCommentsLoaderButtonClick () {
  showMoreComments();
}

function onCancelButtonClick () {
  closeFullPhotoModal();
}

function onFullPhotoEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhotoModal();
  }
}

export {openFullPhotoModal, uploadPhotoAttributes, showCommentsAttributes, uploadComments};
