const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Александр',
  'Владимир',
  'Говард',
  'Дарья',
  'Елена',
  'Игорь',
  'Константин',
  'Лариса'
];
const PLACES = [
  'дома.',
  'у окна.',
  'на море.',
  'на улице.',
  'в кафе.',
  'в ресторане.',
  'на работе.',
  'на даче.'
];
const SIMILAR_COMMENT_COUNT = 3;
const SIMILAR_PUBLICATION_COUNT = 25;

//Ссылка на источник функции : https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkStringMaxLength = (string, maxLength) => string.length <= maxLength;

checkStringMaxLength('Hello World!', 10);

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

let commentNumber = 0;
const createComment = () => {
  const avatarNumber = getRandomIntInclusive(1, 6);
  return {
    id: ++commentNumber,
    avatar: `img/avatar-${avatarNumber}.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAMES),
  };
};

let imgNumber = 0;
const createPublication = () => {
  const place = getRandomArrayElement(PLACES);
  return {
    id: ++imgNumber,
    url: `photos/${imgNumber}.jpg`,
    description: `Это я ${place}`,
    likes: getRandomIntInclusive(15, 200),
    comments: Array.from({length: SIMILAR_COMMENT_COUNT}, createComment),
  };
};

// eslint-disable-next-line no-unused-vars
const userPublications = Array.from({length: SIMILAR_PUBLICATION_COUNT}, createPublication);
