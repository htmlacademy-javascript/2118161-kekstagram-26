const userPhotoWindow = document.querySelector('.big-picture');
const commentsCount = userPhotoWindow.querySelector('.social__comment-count');
const commentsLoader = userPhotoWindow.querySelector('.social__loader');
const commentsContainer = userPhotoWindow.querySelector('.social__comments');
const canselButton = userPhotoWindow.querySelector('.big-picture__cancel');

const closeFullSize = () => {
  document.body.classList.remove('modal-open');
  userPhotoWindow.classList.add('hidden');
};

const renderFullSize = (photo) => {
  const commentsContainerFragment = document.createDocumentFragment();

  document.body.classList.add('modal-open');
  userPhotoWindow.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  userPhotoWindow.querySelector('.big-picture__img').src = photo.url;
  userPhotoWindow.querySelector('.likes-count').textContent = photo.likes;
  userPhotoWindow.querySelector('.comments-count').textContent = photo.comments.length;

  photo.comments.forEach(({avatar, name, message}) => {
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
  commentsContainer.append(commentsContainerFragment);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Esc') {
      closeFullSize();
    }
  });

  canselButton.addEventListener('click', () => {
    closeFullSize();
  });
};

export {renderFullSize};
