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

var createPhotos = function () {
  return {
    url: 'photos/' + getRandomInt(1, QUANTITY_IMAGES) + '.jpg',
    likes: getRandomInt(LIKES_MIN, LIKES_MAX),
    comments: getRandomValue(photosComments),
    description: getRandomValue(photosDescriptions)
  };
};

var photos = [];
for (var j = 0; j < QUANTITY_IMAGES; j++) {
  photos.push(createPhotos());
}

// 2. На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы
// 3. Отрисуйте сгенерированные DOM-элементы в блок .pictures

var renderPhotos = function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var pictureListElement = document.querySelector('.pictures');
  var documentFragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photos[i].url;
    pictureElement.querySelector('.picture__stat--likes').textContent = photos[i].likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = photos[i]['comments'].length;

    documentFragment.appendChild(pictureElement);
  }
  return pictureListElement.appendChild(documentFragment);
};

// 4. Покажите элемент .big-picture и заполните его данными из первого элемента сгенерированного вами массива
document.querySelector('.big-picture').classList.remove('hidden');

var renderBigPhotos = function () {
  var pictureTemplate = document.querySelector('.big-picture__preview');
  var pictureBigElement = document.querySelector('.big-picture');
  var fragmentModal = document.createDocumentFragment();
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.big-picture__img img').src = photos[0].url;
  pictureElement.querySelector('.likes-count').textContent = photos[0].likes;
  pictureElement.querySelector('.comments-count').textContent = photos[0]['comments'].length;
  pictureElement.querySelector('.social__caption').textContent = photos[0].description;

  fragmentModal.appendChild(pictureElement);

  return pictureBigElement.appendChild(fragmentModal);
};

var commentsBigPhotos = function () {
  var commentTemplate = document.querySelector('.social__comment');
  var commentListElement = document.querySelector('.social__comments');
  var commentFragment = document.createDocumentFragment();
  var commentElement = commentTemplate.cloneNode(true);
  var countComment = photos[0].comments.length;

  for (var i = 0; i < countComment; i++) {
    commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
    commentElement.querySelector('.social__text').textContent = photos[0].comments[i];

    commentFragment.appendChild(commentElement);
  }
  return commentListElement.appendChild(commentFragment);
};
// console.log(commentsBigPhotos());
// 5. Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .social__loadmore, добавив им класс .visually-hidden.
var hiddenElement = function () {
  var list = document.querySelectorAll('.social__comment-count, .social__loadmore');
  for (var i = 0; i < list.length; i++) {
    list[i].classList.add('visually-hidden');
  }
  return;
};

renderPhotos();
renderBigPhotos();
commentsBigPhotos();
hiddenElement();
