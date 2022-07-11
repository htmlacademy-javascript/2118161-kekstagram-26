//Ссылка на источник функции : https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

const checkStringMaxLength = (string, maxLength) => string.length <= maxLength;

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomIntInclusive, getRandomArrayElement, checkStringMaxLength, isEscapeKey};
