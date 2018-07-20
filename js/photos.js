'use strict';

(function () {
    var QUANTITY_IMAGES = 25;
    var LIKES_MIN = 15;
    var LIKES_MAX = 200;
    var photosComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
    var photosDescriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. ', 'Не обижайте всех словами......', 'Вот это тачка!'];

    var saveIndex = function (index) {
        return function (evt) {
            evt.preventDefault();
            renderBigPhotos(photos[index]);
            commentsBigPhotos(evt);
            window.util.onOpenPopup();
        };
    };

    var getComments = function () {
        var randomComments = [];
        var count = window.util.getRandomInt(1, 2);
        for (var i = 0; i < count; i++) {
        randomComments.push(window.util.getRandomValue(photosComments));
        }
        return randomComments;
    };
    
    var getPhoto = function (index) {
        return {
        url: 'photos/' + index + '.jpg',
        likes: window.util.getRandomInt(LIKES_MIN, LIKES_MAX),
        comments: getComments(),
        description: window.util.getRandomValue(photosDescriptions)
        };
    };
    
    var photos = [];
    for (var j = 1; j < QUANTITY_IMAGES; j++) {
        photos.push(getPhoto(j));
    }

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
          commentImage.src = 'img/avatar-' + window.util.getRandomInt(1, 6) + '.svg';
          commentImage.alt = 'Аватар комментатора фотографии';
          commentImage.width = 35;
          commentImage.height = 35;
          commentElement.querySelector('.social__text').textContent = photos[i].comments;
          commentFragment.appendChild(commentElement);
        }
        return commentListElement.appendChild(commentFragment);
      };

    renderPhotos();

})();