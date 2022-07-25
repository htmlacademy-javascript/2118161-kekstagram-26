import {renderSimilarPhotos, setDefaultFilter, setRandomFilter, setDiscussedFilter, getFixedCountOfPhotos, compareComments} from './render-miniatures.js';
import './load-photo-form.js';
import {getData} from './api.js';
import {openErrorGetDataMessage, debounce} from './util.js';

const RANDOM_PHOTOS_COUNT = 10;

const filtersPanel = document.querySelector('.img-filters');

getData(
  (photos) => {
    renderSimilarPhotos(photos.slice());
    setDefaultFilter(debounce(
      () => renderSimilarPhotos(photos.slice()),
    ));
    setRandomFilter(debounce(
      () => renderSimilarPhotos(getFixedCountOfPhotos(photos.slice(), RANDOM_PHOTOS_COUNT)),
    ));
    setDiscussedFilter(debounce(
      () => renderSimilarPhotos(photos.slice().sort(compareComments)),
    ));
    filtersPanel.classList.remove('img-filters--inactive');
  },
  () => openErrorGetDataMessage()
);
