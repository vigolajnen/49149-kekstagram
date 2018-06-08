'use strict';

var QUANTITY_IMAGES = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var photosComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var photosDescriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. ', 'Не обижайте всех словами......', 'Вот это тачка!'];

// случайное значение в интервале
var getRandomNumber = function (min, max) {
  var rand = Math.floor(min + Math.random() * (max + 1 - min));
  return rand;
};

// случайное значение из массива
var getRandomValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var createPhotos = function () {
  return {
    url: 'photos/' + getRandomNumber(1, QUANTITY_IMAGES) + '.jpg',
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: getRandomValue(photosComments),
    description: getRandomValue(photosDescriptions)
  };
};

// 2. На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы
var renderPhotos = function (photo) {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = photo.comments;

  return pictureElement;
};

// 3. Отрисуйте сгенерированные DOM-элементы в блок .pictures
var pictureListElement = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var i = 1; i <= QUANTITY_IMAGES; i++) {
  fragment.appendChild(renderPhotos(createPhotos()));
}
pictureListElement.appendChild(fragment);

// 4. Покажите элемент .big-picture и заполните его данными из первого элемента сгенерированного вами массива
document.querySelector('.big-picture').classList.remove('hidden');

var renderBigPhotos = function (photo) {
  var pictureTemplate = document.querySelector('.big-picture__preview');
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.big-picture__img img').src = photo.url;
  pictureElement.querySelector('.likes-count').textContent = photo.likes;
  pictureElement.querySelector('.comments-count').textContent = photo['comments'].length;

  return pictureElement;
};

var pictureBigElement = document.querySelector('.big-picture');
var fragmentModal = document.createDocumentFragment();
fragmentModal.appendChild(renderBigPhotos(createPhotos(1)));
pictureBigElement.appendChild(fragmentModal);
