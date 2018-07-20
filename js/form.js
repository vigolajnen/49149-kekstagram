'use strict';

(function () {
  var isFocus = false;
  // Загрузка изображения и показ формы редактирования
  var uploadPhoto = document.querySelector('#upload-file');
  var editPhoto = document.querySelector('.img-upload__overlay');
  var closeEditPhoto = document.querySelector('#upload-cancel');

  uploadPhoto.addEventListener('change', function () {
    editPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onEditPhotoEscPress);
    hashtagInput.addEventListener('focus', onInputFocus);
    hashtagInput.addEventListener('blur', onInputBlur);
    commentTexearea.addEventListener('focus', onInputFocus);
    commentTexearea.addEventListener('blur', onInputBlur);
  });

  var onEditPhotoEscPress = function (evt) {
    if (window.util.isEscEvent(evt) && !isFocus) {
      onCloseEditPhotoClick();
    }
  };

  var onCloseEditPhotoClick = function () {
    editPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onEditPhotoEscPress);
    hashtagInput.removeEventListener('focus', onInputFocus);
    hashtagInput.removeEventListener('blur', onInputBlur);
    commentTexearea.removeEventListener('focus', onInputFocus);
    commentTexearea.removeEventListener('blur', onInputBlur);
  };

  closeEditPhoto.addEventListener('click', function () {
    onCloseEditPhotoClick();
  });

  // Интенсивность эффекта
  var previewPicture = document.querySelector('.img-upload__preview');
  var scrollBar = document.querySelector('.scale');
  var pinScrollBar = scrollBar.querySelector('.scale__pin');
  var levelScrollBar = scrollBar.querySelector('.scale__level');
  var lineScrollBar = scrollBar.querySelector('.scale__line');

  // Наложение эффекта на изображение
  var getEffect = function () {
    var effectList = document.querySelector('.effects__list');

    effectList.addEventListener('click', function (evt) {
      var MAX_VALUE_EFFECT = 100;
      var effectPreview = document.querySelector('.img-upload__preview img');
      var target = evt.target;
      var inputValue = target.value;
      var effectName = 'effects__preview--' + inputValue;
      effectPreview.setAttribute('class', effectName);
      var inputChecked = document.querySelector('input[name="effect"]:checked').value;

      if (effectName === 'effects__preview--none') {
        getPicEffect('none');
        scrollBar.classList.toggle('hidden', true);
      } else {
        getPicEffect(getEffectStyle(inputChecked, MAX_VALUE_EFFECT));
        scrollBar.classList.toggle('hidden', false);
      }
      changeEffectIntensity(MAX_VALUE_EFFECT);
    });
  };

  // передвижение маркера - mousedown, mousemove, mouseup
  scrollBar.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var widthScrollBar = lineScrollBar.clientWidth;
    var inputChecked = document.querySelector('input[name="effect"]:checked').value;
    var startCoords = {
      x: evt.clientX
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };

      var posX = pinScrollBar.offsetLeft - shift.x;
      if (posX <= widthScrollBar) {

        pinScrollBar.style.left = posX + 'px';
        var value = parseInt(100 * (levelScrollBar.offsetWidth - shift.x) / (widthScrollBar), 10);

        getPicEffect(getEffectStyle(inputChecked, value));
        changeEffectIntensity(value);
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var changeEffectIntensity = function (value) {
    pinScrollBar.style.left = value + '%';
    levelScrollBar.style.width = value + '%';
  };

  // получение названия эффекта и значение фильтра
  var getEffectStyle = function (name, value) {
    switch (name) {
      case 'chrome':
        return 'grayscale(' + (value / 100) + ')';
      case 'heat':
        return 'brightness(' + (1 + (2 * value / 100)) + ')';
      case 'sepia':
        return 'sepia(' + (value / 100) + ')';
      case 'phobos':
        return 'blur(' + (3 * value / 100) + 'px)';
      case 'marvin':
        return 'invert(' + value + '%)';
      default:
        return 'none';
    }
  };

  var getPicEffect = function (filter) {
    previewPicture.style.filter = filter;
  };

  getEffect();

  // Масштаб
  var getResize = function () {
    var resize = document.querySelector('.resize');
    var controlMinus = resize.querySelector('.resize__control--minus');
    var controlPlus = resize.querySelector('.resize__control--plus');
    var resizeValue = resize.querySelector('.resize__control--value');
    var resizePicture = document.querySelector('.img-upload__preview');
    var MAX_RESIZE = 100 + '%';
    resizeValue.value = MAX_RESIZE;

    controlPlus.addEventListener('click', function () {
      if (parseInt(resizeValue.value, 10) <= 75) {
        resizeValue.value = parseInt(resizeValue.value, 10) + 25 + '%';
        resizePicture.style.transform = 'scale(' + parseInt(resizeValue.value, 10) / 100 + ')';
      }
    });

    controlMinus.addEventListener('click', function () {
      if (parseInt(resizeValue.value, 10) > 25) {
        resizeValue.value = parseInt(resizeValue.value, 10) - 25 + '%';
        resizePicture.style.transform = 'scale(' + parseInt(resizeValue.value, 10) / 100 + ')';
      }
    });
  };

  getResize();

  // Хэш-теги
  var formUpload = document.querySelector('.img-upload__form');
  var commentTexearea = formUpload.querySelector('.text__description');
  var hashtagInput = formUpload.querySelector('.text__hashtags');

  var onInputValidMess = function () {
    var hashtagsMess = hashtagInput.value.toLowerCase();
    var arrayOfStrings = hashtagsMess.split(' ');
    var repeaHashtags = [];
    var textErrorString;

    if (arrayOfStrings.length > 5) {
      textErrorString = 'нельзя указать больше пяти хэш-тегов';
    } else {
      for (var i = 0; i < arrayOfStrings.length; i++) {
        repeaHashtags = arrayOfStrings.filter(function (n) {
          return n === arrayOfStrings[i];
        });
        var elem = arrayOfStrings[i];
        if (elem.charAt(0) !== '#') {
          textErrorString = 'хэш-тег начинается с символа # (решётка)';
          break;
        } else if ((elem.length === 1) && (elem.charAt(0) === '#')) {
          textErrorString = 'хеш-тег не может состоять только из одной решётки';
          break;
        } else if (elem.length >= 20) {
          textErrorString = 'максимальная длина одного хэш-тега 20 символов, включая решётку';
          break;
        } else if (repeaHashtags.length > 1) {
          textErrorString = 'один и тот же хэш-тег не может быть использован дважды';
          break;
        } else {
          textErrorString = '';
        }
      }
    }
    hashtagInput.setCustomValidity(textErrorString);
    cssInvalidInput(hashtagInput);
  };

  var cssInvalidInput = function (inputSelector) {
    inputSelector.style.borderColor = inputSelector.validity.valid ? 'transparent' : 'red';
  };

  hashtagInput.addEventListener('input', function (evt) {
    onInputValidMess(evt);
  });

  var onInputFocus = function () {
    isFocus = true;
  };

  var onInputBlur = function () {
    isFocus = false;
  };
})();
