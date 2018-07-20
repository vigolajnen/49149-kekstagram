'use strict';

(function () {

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
      window.preview.renderBigPhotos(photos[index]);
      window.preview.commentsBigPhotos(evt);
      window.preview.onOpenPopup();
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

  var hiddenElement = function () {
    var list = document.querySelectorAll('.social__comment-count, .social__loadmore');
    for (var i = 0; i < list.length; i++) {
      list[i].classList.add('visually-hidden');
    }
    return;
  };

  renderPhotos();
  hiddenElement();

  window.photos = {
    getRandomInt: getRandomInt,
    photos: photos
  };

})();
