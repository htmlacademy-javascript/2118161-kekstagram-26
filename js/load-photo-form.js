import {isStringSatisfyMaxLength, isEscapeKey, openErrorLoadMessage, openSuccessLoadMessage} from './util.js';
import {resetEdits, loadEditPhotoFuncs, unloadEditPhotoFuncs} from './edit-photo.js';
import {sendData} from './api.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_SYMBOLS_COUNT = 140;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadFileForm = document.querySelector('.img-upload__form');
const uploadFile = uploadFileForm.querySelector('#upload-file');
const uploadPreview = uploadFileForm.querySelector('.img-upload__preview > img');
const photoEdit = uploadFileForm.querySelector('.img-upload__overlay');
const hashtagsInput = uploadFileForm.querySelector('.text__hashtags');
const descriptionInput = uploadFileForm.querySelector('.text__description');
const cancelButton = photoEdit.querySelector('#upload-cancel');
const submitButton = photoEdit.querySelector('#upload-submit');

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
  return hashtagsArray.filter((hashtag) => hashtag !== '');
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
  return hashtags.length <= MAX_HASHTAGS_COUNT;
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
  const valid = isStringSatisfyMaxLength(description, MAX_DESCRIPTION_SYMBOLS_COUNT);
  return valid;
};
const validateDescriptionSymbolsQuantityErrorMessage = 'Длина комментария не может составлять больше 140 символов';

pristine.addValidator(hashtagsInput, validateHashtagsContent, validateHashtagsContentErrorMessage);
pristine.addValidator(hashtagsInput, validateHashtagsQuantity, validateHashtagsQuantityErrorMessage);
pristine.addValidator(hashtagsInput, validateHashtagsRepeats, validateHashtagsRepeatsErrorMessage);
pristine.addValidator(descriptionInput, validateDescriptionSymbolsQuantity, validateDescriptionSymbolsQuantityErrorMessage);

const onTextInputKeydown = (evt) => {
  evt.stopPropagation();
};

const resetTextFields = () => {
  const errorText = uploadFileForm.querySelectorAll('.input__error');
  if (errorText.length > 0) {
    errorText.forEach((text) => {text.textContent = '';});
  }

  hashtagsInput.value = '';
  descriptionInput.value = '';
};

const closeEditPhotoModal = () => {
  document.body.classList.remove('modal-open');
  photoEdit.classList.add('hidden');

  resetEdits();
  resetTextFields();
  unloadEditPhotoFuncs();

  hashtagsInput.removeEventListener('keydown', onTextInputKeydown);
  descriptionInput.removeEventListener('keydown', onTextInputKeydown);
  uploadFileForm.removeEventListener('submit', onSubmitUploadFileForm);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onCancelButtonClick () {
  closeEditPhotoModal();
}

const openEditPhotoModal = () => {
  document.body.classList.add('modal-open');
  photoEdit.classList.remove('hidden');

  resetEdits();
  loadEditPhotoFuncs();

  hashtagsInput.addEventListener('keydown', onTextInputKeydown);
  descriptionInput.addEventListener('keydown', onTextInputKeydown);
  uploadFileForm.addEventListener('submit', onSubmitUploadFileForm);
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  const openedErrorLoadMessage = document.querySelector('.error');
  const openedSuccessLoadMessage = document.querySelector('.success');
  if (isEscapeKey(evt) && !openedErrorLoadMessage && !openedSuccessLoadMessage) {
    evt.preventDefault();
    closeEditPhotoModal();
  }
}

const onUploadFileChange = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadPreview.src = URL.createObjectURL(file);
  }
  openEditPhotoModal();
};

uploadFile.addEventListener('change', onUploadFileChange);

const onSuccessSubmit = () => {
  unblockSubmitButton();
  closeEditPhotoModal();
  openSuccessLoadMessage();
};

const onErrorSubmit = () => {
  unblockSubmitButton();
  openErrorLoadMessage();
};

function onSubmitUploadFileForm (evt) {
  const isValid = pristine.validate();
  evt.preventDefault();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => onSuccessSubmit(),
      () => onErrorSubmit(),
      new FormData(evt.target),
    );
  }
}

function blockSubmitButton () {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
}

function unblockSubmitButton () {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}
