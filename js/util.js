//Ссылка на источник функции : https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

const isStringSatisfyMaxLength = (string, maxLength) => string.length <= maxLength;

const isEscapeKey = (evt) => evt.key === 'Escape';


const photoEdit = document.querySelector('.img-upload__overlay');

const successLoadMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const openSuccessLoadMessage = () => {
  const successLoadMessage = successLoadMessageTemplate.cloneNode(true);
  const successLoadButton = successLoadMessage.querySelector('.success__button');

  document.body.append(successLoadMessage);
  successLoadButton.addEventListener('click', onSuccessLoadButtonClick);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', onSuccessDocumentClick);
};

const closeSuccessLoadMessage = () => {
  const successLoadMessage = document.querySelector('.success');
  const successLoadButton = successLoadMessage.querySelector('.success__button');

  successLoadButton.removeEventListener('click', onSuccessLoadButtonClick);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('click', onSuccessDocumentClick);
  successLoadMessage.remove();
};

function onSuccessLoadButtonClick () {
  closeSuccessLoadMessage();
}

function onSuccessMessageEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessLoadMessage();
  }
}

function onSuccessDocumentClick (evt) {
  if (evt.target.matches('.success')) {
    closeSuccessLoadMessage();
  }
}

const errorLoadMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const openErrorLoadMessage = () => {
  const errorLoadMessage = errorLoadMessageTemplate.cloneNode(true);
  const errorLoadButton = errorLoadMessage.querySelector('.error__button');

  photoEdit.classList.add('hidden');
  document.body.append(errorLoadMessage);
  errorLoadButton.addEventListener('click', onErrorLoadButtonClick);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onErrorDocumentClick);
};

const closeErrorLoadMessage = () => {
  const errorLoadMessage = document.querySelector('.error');
  const errorLoadButton = errorLoadMessage.querySelector('.error__button');

  errorLoadButton.removeEventListener('click', onErrorLoadButtonClick);
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  document.removeEventListener('click', onErrorDocumentClick);
  errorLoadMessage.remove();
  photoEdit.classList.remove('hidden');
};

function onErrorLoadButtonClick () {
  closeErrorLoadMessage();
}

function onErrorMessageEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorLoadMessage();
  }
}

function onErrorDocumentClick (evt) {
  if (evt.target.matches('.error')) {
    closeErrorLoadMessage();
  }
}

const onErrorGetDataButtonClick = () => {
  location.reload();
};

const openErrorGetDataMessage = () => {
  const errorGetDataMessage = errorLoadMessageTemplate.cloneNode(true);
  const errorGetDataTitle = errorGetDataMessage.querySelector('.error__title');
  const errorGetDataButton = errorGetDataMessage.querySelector('.error__button');

  errorGetDataTitle.textContent = 'Ошибка загрузки данных с сервера!';
  errorGetDataButton.textContent = 'Попробовать еще раз!';
  errorGetDataButton.addEventListener('click', onErrorGetDataButtonClick);

  document.body.append(errorGetDataMessage);
};

//Ссылка на источник функции : https://www.freecodecamp.org/news/javascript-debounce-example
function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;
  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);
    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {getRandomIntInclusive, getRandomArrayElement, isStringSatisfyMaxLength, isEscapeKey, openErrorLoadMessage, openSuccessLoadMessage, openErrorGetDataMessage, debounce};
