'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  window.util = {
    isEscEvent: isEscEvent
  };

})();
