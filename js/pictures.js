'use strict';

var QUANTITY_IMAGES = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var photosComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var photosDescriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. ', 'Не обижайте всех словами......', 'Вот это тачка!'];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomValue = function (array) {
  var rand = getRandomInt(0, array.length - 1);
  return array[rand];
};

var getComments = function () {
  var randomComments = [];
  var count = getRandomInt(1, 2);
  for (var i = 0; i < count; i++) {
    randomComments.push(getRandomValue(photosComments));
  }
  return randomComments;
};

var getPhoto = function (index) {
  return {
    url: 'photos/' + index + '.jpg',
    likes: getRandomInt(LIKES_MIN, LIKES_MAX),
    comments: getComments(),
    description: getRandomValue(photosDescriptions)
  };
};

var photos = [];
for (var j = 1; j < QUANTITY_IMAGES; j++) {
  photos.push(getPhoto(j));
}

var saveIndex = function (index) {
  return function (evt) {
    evt.preventDefault();
    renderBigPhotos(photos[index]);
    commentsBigPhotos(evt);
    onOpenBigPhotoClick();
  };
};

var renderPhotos = function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var pictureListElement = document.querySelector('.pictures');
  var documentFragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photos[i].url;
    pictureElement.querySelector('.picture__stat--likes').textContent = photos[i].likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = photos[i]['comments'].length;

    pictureElement.addEventListener('click', saveIndex(i));

    documentFragment.appendChild(pictureElement);
  }
  return pictureListElement.appendChild(documentFragment);
};

var renderBigPhotos = function (photo) {
  var pictureBigElement = document.querySelector('.big-picture');
  pictureBigElement.querySelector('.big-picture__img img').src = photo.url;
  pictureBigElement.querySelector('.likes-count').textContent = photo.likes;
  pictureBigElement.querySelector('.comments-count').textContent = photo['comments'].length;
  pictureBigElement.querySelector('.social__caption').textContent = photo.description;
  return;
};

var commentsBigPhotos = function () {

  var commentTemplate = document.querySelector('.social__comment');
  var commentListElement = document.querySelector('.social__comments');
  var commentFragment = document.createDocumentFragment();
  var commentElement = commentTemplate.cloneNode(true);
  var countComment = photos[0].comments.length;

  for (var i = 0; i < countComment; i++) {
    commentListElement.appendChild(commentTemplate);
    var commentImage = document.querySelector('.social__picture');
    commentImage.src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
    commentImage.alt = 'Аватар комментатора фотографии';
    commentImage.width = 35;
    commentImage.height = 35;
    commentElement.querySelector('.social__text').textContent = photos[i].comments;
    commentFragment.appendChild(commentElement);
  }
  return commentListElement.appendChild(commentFragment);
};

var hiddenElement = function () {
  var list = document.querySelectorAll('.social__comment-count, .social__loadmore');
  for (var i = 0; i < list.length; i++) {
    list[i].classList.add('visually-hidden');
  }
  return;
};

renderPhotos();
hiddenElement();

// открытие и закрытие полноэкранного режима по нажатию на ссылку
var bigPhoto = document.querySelector('.big-picture');
var closeBigPhoto = document.querySelector('.big-picture__cancel');
var ESC_KEYCODE = 27;

var onBigPhotoEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onCloseBigPhotoClick();
  }
};

var onOpenBigPhotoClick = function () {
  bigPhoto.classList.remove('hidden');
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onCloseBigPhotoClick();
    }
  });
};

var onCloseBigPhotoClick = function () {
  bigPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onBigPhotoEscPress);
};

closeBigPhoto.addEventListener('click', onCloseBigPhotoClick);

// Загрузка изображения и показ формы редактирования
var uploadPhoto = document.querySelector('#upload-file');
var editPhoto = document.querySelector('.img-upload__overlay');
var closeEditPhoto = document.querySelector('#upload-cancel');

uploadPhoto.addEventListener('change', function () {
  editPhoto.classList.remove('hidden');
});

var onEditPhotoEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onCloseEditPhotoClick();
  }
};

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onCloseEditPhotoClick();
  }
});

var onCloseEditPhotoClick = function () {
  editPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onEditPhotoEscPress);
};

closeEditPhoto.addEventListener('click', function () {
  onCloseEditPhotoClick();
});

// Эффекты
var previewPicture = document.querySelector('.img-upload__preview');

// Интенсивность эффекта
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
      getPicEffect('none', MAX_VALUE_EFFECT);
      scrollBar.classList.toggle('hidden', true);
    } else {
      getPicEffect(getEffectStyle(inputChecked, MAX_VALUE_EFFECT));
      scrollBar.classList.toggle('hidden', false);
    }

    changeEffectIntensity(MAX_VALUE_EFFECT);
  });
};

// передвижение пина - mousedown, mousemove, mouseup
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

// получение имени эффекта и значение фильтра
var getEffectStyle = function (name, value) {
  var max = 1;
  var min = 0;
  var MAX_CHROME = 1;
  var MAX_SEPIA = 1;
  var MAX_PHOBOS = 3;
  var MAX_HEAT = 2;
  var MAX_MARVIN = 100;
  var filterCss = '';
  var filterUnit = '';

  switch (name) {
    case 'chrome':
      max = MAX_CHROME;
      filterCss = 'grayscale';
      break;
    case 'heat':
      min = 1;
      max = MAX_HEAT;
      filterCss = 'brightness';
      break;
    case 'sepia':
      max = MAX_SEPIA;
      filterCss = 'sepia';
      break;
    case 'phobos':
      max = MAX_PHOBOS;
      filterUnit = 'px';
      filterCss = 'blur';
      break;
    case 'marvin':
      max = MAX_MARVIN;
      filterUnit = '%';
      filterCss = 'invert';
      break;
    default:
      filterCss = 'none';
  }

  value = min + (max * value / 100);
  filterCss = filterCss + '(' + value + filterUnit + ')';

  return filterCss;
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
