import {isEscapeKey} from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_SYMBOLS_COUNT = 140;

const uploadFileForm = document.querySelector('.img-upload__form');
const uploadFileNode = uploadFileForm.querySelector('#upload-file');
const photoEditNode = uploadFileForm.querySelector('.img-upload__overlay');
const hashtagsInputNode = uploadFileForm.querySelector('.text__hashtags');
const descriptionInputNode = uploadFileForm.querySelector('.text__description');
const cancelButton = photoEditNode.querySelector('#upload-cancel');

const pristine = new Pristine(uploadFileForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper_invalid',
  successClass: 'img-upload__field-wrapper_valid',
  errorTextParent:'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'input__error'
});
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const removeHashtagsExcessSpace = (value) => {
  const hashtagsArray = value.split(' ');
  const hashtags = hashtagsArray.filter((hashtag) => hashtag !== '');
  return hashtags;
};

const validateHashtagsContent = (value) => {
  const hashtags = removeHashtagsExcessSpace(value);
  for (let i = 0; i < hashtags.length; i++) {
    if (!re.test(hashtags[i])) {
      return false;
    }
  }
  return true;
};
const validateHashtagsContentErrorMessage = 'Хэш-тег должен начинаться с символа # (решётка) <br> и состоять из букв и чисел, <br> максимальная длина одного хэш-тега 20 символов, включая решётку';

const validateHashtagsQuantity = (value) => {
  const hashtags = removeHashtagsExcessSpace(value);
  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return false;
  }
  return true;
};
const validateHashtagsQuantityErrorMessage = 'Нельзя указать больше пяти хэш-тегов';

const validateHashtagsRepeats = (value) => {
  const hashtags = removeHashtagsExcessSpace(value);
  for (let i = 0; i < hashtags.length; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
        return false;
      }
    }
  }
  return true;
};
const validateHashtagsRepeatsErrorMessage = 'Один и тот же хэш-тег не может быть использован дважды';

const validateDescriptionSymbolsQuantity  = (description) => {
  if (description.length > MAX_DESCRIPTION_SYMBOLS_COUNT) {
    return false;
  }
  return true;
};
const validateDescriptionSymbolsQuantityErrorMessage = 'Длина комментария не может составлять больше 140 символов';

pristine.addValidator(hashtagsInputNode, validateHashtagsContent, validateHashtagsContentErrorMessage);
pristine.addValidator(hashtagsInputNode, validateHashtagsQuantity, validateHashtagsQuantityErrorMessage);
pristine.addValidator(hashtagsInputNode, validateHashtagsRepeats, validateHashtagsRepeatsErrorMessage);
pristine.addValidator(descriptionInputNode, validateDescriptionSymbolsQuantity, validateDescriptionSymbolsQuantityErrorMessage);

uploadFileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCancelButtonClick();
  }
};

const onTextInputNodeKeydown = (evt) => {
  evt.stopPropagation();
};

const onSubmitUploadFileForm = (evt) => {
  if (!pristine.validate()){
    evt.preventDefault();
  }
};

const closeEditPhotoModal = () => {
  document.body.classList.remove('modal-open');
  photoEditNode.classList.add('hidden');

  uploadFileNode.value = '';
  hashtagsInputNode.value = '';
  descriptionInputNode.value = '';

  hashtagsInputNode.removeEventListener('keydown', onTextInputNodeKeydown);
  descriptionInputNode.removeEventListener('keydown', onTextInputNodeKeydown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onCancelButtonClick () {
  closeEditPhotoModal();
}

const onUploadFileNodeChange = () => {
  document.body.classList.add('modal-open');
  photoEditNode.classList.remove('hidden');

  hashtagsInputNode.addEventListener('keydown', onTextInputNodeKeydown);
  descriptionInputNode.addEventListener('keydown', onTextInputNodeKeydown);
  uploadFileForm.addEventListener('submit', onSubmitUploadFileForm);
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

uploadFileNode.addEventListener('change', onUploadFileNodeChange);
