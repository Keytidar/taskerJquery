'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _functions = require("./functions.js");
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
// const tasksSaved = [];
var tasksSaved = JSON.parse(localStorage.getItem('taskStorage') || '[]');
_functions.uiFunctions.preloaderHide();
_functions.taskerFunctions.resetInputs();
_functions.taskerFunctions.displayStorageData(tasksSaved);

// =======================CLASSES========================================
var Task = /*#__PURE__*/_createClass(function Task(header, data, date, time, color) {
  var isDone = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  _classCallCheck(this, Task);
  this.id = _functions.utilFunctions.createId('task');
  this.header = header;
  this.data = data;
  this.date = date;
  this.time = time;
  this.color = color;
  this.isDone = isDone;
  this.createdAt = new Date().toLocaleString();
}); // ====================EVENT LISTENERS====================================
$('#invisible-container').on('click', function (e) {
  var $taskLi = $(e.target.closest('li'));
  var taskId = $taskLi.attr('id');
  var currentTaskIndex = tasksSaved.findIndex(function (t) {
    return t.id === taskId;
  });
  var currentTask = tasksSaved.find(function (t) {
    return t.id === taskId;
  });
  if (e.target.showPicker) {
    return e.target.showPicker();
  }
  if ($(e.target).hasClass('rmv-button')) {
    tasksSaved.splice(currentTaskIndex, 1);
    $taskLi.remove();
    _functions.taskerFunctions.saveTaskLocal(tasksSaved);
    return;
  }
  if ($(e.target).hasClass('done-button')) {
    $(e.target).closest('li').toggleClass('opacity-50');
    _functions.taskerFunctions.toggleDone(currentTask);
    _functions.taskerFunctions.saveTaskLocal(tasksSaved);
    return;
  }
  if ($(e.target).is('h1, h5')) {
    $('#titleModal').text(currentTask.header);
    $('#textModal').text(currentTask.data);
    var modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
  }
});
$('#task-submit').on('submit', function (e) {
  e.preventDefault();
  var header = $('#task-heading').val().trim();
  var taskInfo = $('#task-info').val().trim();
  var date = $('#task-date-input').val();
  var time = $('#task-time-input').val();
  var dateTimeCombined = new Date("".concat(date, "T").concat(time));
  var dateTimeNow = new Date();
  var color = $('#task-color').val();
  var errors = 0;
  if (header.length <= 3) {
    _functions.taskerFunctions.errorInput($('#task-heading'));
    errors++;
    console.log(errors);
  }
  if (taskInfo.length <= 3) {
    _functions.taskerFunctions.errorInput($('#task-info'));
    errors++;
  }
  if (dateTimeCombined <= dateTimeNow) {
    _functions.taskerFunctions.errorInput($('#task-date-input'));
    _functions.taskerFunctions.errorInput($('#task-time-input'));
  }
  if (errors) {
    return;
  }
  var taskCreated = new Task(header, taskInfo, date, time, color, false);
  _functions.taskerFunctions.displayTask(taskCreated);
  tasksSaved.push(taskCreated);
  _functions.taskerFunctions.saveTaskLocal(tasksSaved);
  console.log(taskCreated);
});
