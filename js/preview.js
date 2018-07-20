'use strict';

(function () {

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
    var countComment = window.photos.photos[0].comments.length;

    for (var i = 0; i < countComment; i++) {
      commentListElement.appendChild(commentTemplate);
      var commentImage = document.querySelector('.social__picture');
      commentImage.src = 'img/avatar-' + window.photos.getRandomInt(1, 6) + '.svg';
      commentImage.alt = 'Аватар комментатора фотографии';
      commentImage.width = 35;
      commentImage.height = 35;
      commentElement.querySelector('.social__text').textContent = window.photos.photos[i].comments;
      commentFragment.appendChild(commentElement);
    }
    return commentListElement.appendChild(commentFragment);
  };

  // открытие и закрытие полноэкранного режима по нажатию на ссылку
  var bigPhoto = document.querySelector('.big-picture');
  var closeBigPhoto = document.querySelector('.big-picture__cancel');
  var ESC_KEYCODE = 27;

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    bigPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    bigPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  closeBigPhoto.addEventListener('click', function () {
    closePopup();
  });

  var onOpenPopup = function () {
    openPopup();
  };

  window.preview = {
    renderBigPhotos: renderBigPhotos,
    commentsBigPhotos: commentsBigPhotos,
    onOpenPopup: onOpenPopup
  };

})();
