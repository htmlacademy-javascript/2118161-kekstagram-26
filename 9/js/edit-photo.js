const MAX_ZOOM_VALUE = 100;
const MIN_ZOOM_VALUE = 25;
const STEP_ZOOM_VALUE = 25;
const DEFAULT_ZOOM_VALUE = 100;
const EFFECTS_OPTIONS = {
  none: {
    filterName: '',
    measureUnit: '',
    range: {
      min: 0,
      max: 0,
    },
    start: 0,
    step: 0,
  },
  chrome: {
    filterName: 'grayscale',
    measureUnit: '',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    filterName: 'sepia',
    measureUnit: '',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  marvin: {
    filterName: 'invert',
    measureUnit: '%',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos: {
    filterName: 'blur',
    measureUnit: 'px',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  heat: {
    filterName: 'brightness',
    measureUnit: '',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

const photoPreview = document.querySelector('.img-upload__preview  img');

const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomScaleLabel = document.querySelector('.scale__control--value');

const effectsFieldsetNode = document.querySelector('.img-upload__effects');
const effectsLevelSlider = document.querySelector('.effect-level__slider');
const effectsLevelValue = document.querySelector('.effect-level__value');


let scale = DEFAULT_ZOOM_VALUE;
let selectedEffect = 'none';
zoomScaleLabel.value = '100 %';
photoPreview.classList.add('effects__preview--none');
effectsLevelSlider.style.visibility = 'hidden';
photoPreview.style.filter = '';

const renderScalingPhoto = (evt) => {
  if (evt.target.matches('.scale__control--smaller') && scale > MIN_ZOOM_VALUE) {
    scale -= STEP_ZOOM_VALUE;
  }
  if (evt.target.matches('.scale__control--bigger') && scale < MAX_ZOOM_VALUE) {
    scale += STEP_ZOOM_VALUE;
  }
  zoomScaleLabel.value = `${scale} %`;

  const scaleDecimal = scale / 100;
  photoPreview.style.transform = `scale(${scaleDecimal})`;
};

const onZoomButtonClick = (evt) => {
  renderScalingPhoto(evt);
};


noUiSlider.create(effectsLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

effectsLevelSlider.noUiSlider.on('update', () => {
  const selectedFilterType = EFFECTS_OPTIONS[selectedEffect].filterName;
  const selectedFilterMeasureUnit = EFFECTS_OPTIONS[selectedEffect].measureUnit;
  effectsLevelValue.value = effectsLevelSlider.noUiSlider.get();
  photoPreview.style.filter = `${selectedFilterType}(${effectsLevelValue.value}${selectedFilterMeasureUnit})`;
});

const renderPhotoEffect = (evt) => {
  const effectName = evt.target.value;
  photoPreview.className = '';
  photoPreview.classList.add(`effects__preview--${effectName}`);
  if (effectName === 'none') {
    effectsLevelSlider.style.visibility = 'hidden';
    photoPreview.style.filter = '';
  } else {
    effectsLevelSlider.style.visibility = 'visible';
    selectedEffect = effectName;
    effectsLevelSlider.noUiSlider.updateOptions(EFFECTS_OPTIONS[effectName]);
  }
};

const onEffectsFieldsetNode = (evt) => {
  const clickedEffectRadio = evt.target.closest('.effects__radio');
  if (clickedEffectRadio) {
    renderPhotoEffect(evt);
  }
};

zoomOutButton.addEventListener('click', onZoomButtonClick);
zoomInButton.addEventListener('click', onZoomButtonClick);

effectsFieldsetNode.addEventListener('change', onEffectsFieldsetNode);
