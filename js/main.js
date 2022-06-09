//Ссылка на источник функции : https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive(2, 10);

const checkStringMaxLength = (string, maxLength) => string.length <= maxLength;

checkStringMaxLength('Hello World!', 10);
