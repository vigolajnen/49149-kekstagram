'use strict';

(function () {

    var ESC_KEYCODE = 27;
    var isFocus = false;

    var isEscEvent = function (evt) {
        return evt.keyCode === ESC_KEYCODE;
    };

    var isEscPress = function (evt) {
        return evt.keyCode === ESC_KEYCODE && !isFocus;
    };

    var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var getRandomValue = function (array) {
        var rand = getRandomInt(0, array.length - 1);
        return array[rand];
    };

    var onOpenPopup = function () {
        document.querySelector('.big-picture').classList.remove('hidden');
        document.addEventListener('keydown', onPopupEscPress);
      };

  window.util = {
    isEscEvent: isEscEvent,
    isEscPress: isEscPress,
    getRandomInt: getRandomInt,
    getRandomValue: getRandomValue,
    onOpenPopup: onOpenPopup
  };

})();
