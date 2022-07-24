import {renderSimilarPhotos} from './render-miniatures.js';
import './load-photo-form.js';
import {getData} from './api.js';
import {openErrorGetDataMessage} from './util.js';


getData(
  (photos) => renderSimilarPhotos(photos),
  () => openErrorGetDataMessage()
);

//setUserFormSubmit
