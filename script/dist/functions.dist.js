'use strict';

// ====================TASKER FUNCTIONS================================
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utilFunctions = exports.uiFunctions = exports.taskerFunctions = void 0;
var taskerFunctions = exports.taskerFunctions = {
  checkBg: function checkBg() {
    $('#tasks-ul').length > 0 ? $('#tasks-ul').addClass('bg-logo') : $('#tasks-ul').removeClass('bg-logo');
  },
  errorInput: function errorInput(element) {
    var type = element.attr('type');
    var orig = element.data('origPlaceholder');
    if (type !== 'date' && type !== 'time') {
      element.val('');
      element.addClass('bg-danger');
      element.attr('placeholder', orig ? "Wrong ".concat(orig.toLowerCase()) : '');
      setTimeout(function () {
        element.removeClass('bg-danger text-white');
        element.attr('placeholder', orig);
      }, 4000);
    }
  },
  resetInputs: function resetInputs() {
    $('input').val('');
    $('textarea').val('');
    $('#task-date-input').val(new Date().toISOString().slice(0, 10));
    $('#task-time-input').val(new Date().toTimeString().slice(0, 5));
    $('#task-color').val('#000000');
  },
  saveTaskLocal: function saveTaskLocal(taskArray) {
    localStorage.setItem('taskStorage', JSON.stringify(taskArray));
  },
  createId: function createId(prefix) {
    var idRandom = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    return (prefix ? prefix + '-' : '') + idRandom;
  },
  changeDone: function changeDone(task) {
    task.toggleClass('done');
  },
  displayTask: function displayTask(task) {
    var isChecked = task.isDone ? 'checked' : '';
    var doneClass = task.isDone ? 'opacity-50' : '';
    var taskElement = "\n            <li id=\"".concat(task.id, "\" class=\"").concat(doneClass, "\" style=\"background-color:").concat(utilFunctions.hexToRgba(task.color, 0.4), "\">\n            <div class=\"d-flex align-items-center gap-3\" >\n            <h1>").concat(task.header, "</h1>\n            <h5 class=\"mb-0 text-truncate\">").concat(task.data, "</h5>\n            <div class=\"ms-auto align-text-center d-flex align-items-center gap-3\">\n              <span>").concat(task.date, "  ").concat(task.time, "</span>\n                <input type=\"checkbox\" class=\"btn-check\" id=\"").concat('checkbox-' + task.id, "\" autocomplete=\"off\" ").concat(isChecked, ">\n                <label class=\"btn btn-outline-primary done-button\" for=\"").concat('checkbox-' + task.id, "\">\u2714\uFE0E</label>\n              <button type=\"button\" class=\"btn btn-dark rmv-button\">\uD83D\uDDD1\uFE0F</button>\n            </div>\n        </div>\n          </li>");
    $('#tasks-ul').append(taskElement);
    taskerFunctions.resetInputs();
  },
  displayStorageData: function displayStorageData(storage) {
    if (Array.isArray(storage) && storage.length > 0) {
      try {
        storage.forEach(function (e) {
          taskerFunctions.displayTask(e);
        });
      } catch (error) {
        console.error('Storage reading error, clearing storage');
        console.error(error);
      }
    }
  },
  toggleDone: function toggleDone(task) {
    task.isDone = !task.isDone;
  }
};
// ====================TASKER FUNCTIONS END================================

var uiFunctions = exports.uiFunctions = {
  preloaderHide: function preloaderHide() {
    $(window).on('load', function () {
      $('#preloader').addClass('d-none');
      console.warn('window loading done');
    });
  }
};
var utilFunctions = exports.utilFunctions = {
  createId: function createId(prefix) {
    var idRandom = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    return (prefix ? prefix + '-' : '') + idRandom;
  },
  hexToRgba: function hexToRgba(hex) {
    var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    if (!hex || !/^#([A-Fa-f0-9]{6})$/.test(hex)) {
      console.warn("Invalid HEX color format: \"".concat(hex, "\", fallback to #000000"));
      hex = '#000000';
    }
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(opacity, ")");
  }
};
