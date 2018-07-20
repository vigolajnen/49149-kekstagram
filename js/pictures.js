'use strict';

(function () {

  var hiddenElement = function () {
    var list = document.querySelectorAll('.social__comment-count, .social__loadmore');
    for (var i = 0; i < list.length; i++) {
      list[i].classList.add('visually-hidden');
    }
    return;
  };

  hiddenElement();

  // открытие и закрытие полноэкранного режима по нажатию на ссылку
  var bigPhoto = document.querySelector('.big-picture');
  var closeBigPhoto = document.querySelector('.big-picture__cancel');
  

  var onPopupEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closePopup();
    }
  };

  var closePopup = function () {
    bigPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  closeBigPhoto.addEventListener('click', function () {
    closePopup();
  });

})();