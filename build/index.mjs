/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions.mjs":
/*!***************************!*\
  !*** ./src/functions.mjs ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   taskerFunctions: () => (/* binding */ taskerFunctions),\n/* harmony export */   uiFunctions: () => (/* binding */ uiFunctions),\n/* harmony export */   utilFunctions: () => (/* binding */ utilFunctions)\n/* harmony export */ });\n\n\n// ====================TASKER FUNCTIONS================================\nconst taskerFunctions = {\n  checkBg: () => {\n    $('#tasks-ul').length > 0 ? $('#tasks-ul').addClass('bg-logo') : $('#tasks-ul').removeClass('bg-logo');\n  },\n  errorInput: element => {\n    const type = element.attr('type');\n    const orig = element.data('origPlaceholder');\n    if (type !== 'date' && type !== 'time') {\n      element.val('');\n      element.addClass('bg-danger');\n      element.attr('placeholder', orig ? \"Wrong \".concat(orig.toLowerCase()) : '');\n      setTimeout(() => {\n        element.removeClass('bg-danger text-white');\n        element.attr('placeholder', orig);\n      }, 4000);\n    }\n  },\n  resetInputs: () => {\n    $('input').val('');\n    $('textarea').val('');\n    $('#task-date-input').val(new Date().toISOString().slice(0, 10));\n    $('#task-time-input').val(new Date().toTimeString().slice(0, 5));\n    $('#task-color').val('#000000');\n  },\n  saveTaskLocal: taskArray => {\n    localStorage.setItem('taskStorage', JSON.stringify(taskArray));\n  },\n  createId: prefix => {\n    const idRandom = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);\n    return (prefix ? prefix + '-' : '') + idRandom;\n  },\n  changeDone: task => {\n    task.toggleClass('done');\n  },\n  displayTask: task => {\n    const isChecked = task.isDone ? 'checked' : '';\n    const doneClass = task.isDone ? 'opacity-50' : '';\n    const taskElement = \"\\n            <li id=\\\"\".concat(task.id, \"\\\" class=\\\"\").concat(doneClass, \"\\\" style=\\\"background-color:\").concat(utilFunctions.hexToRgba(task.color, 0.4), \"\\\">\\n            <div class=\\\"d-flex align-items-center gap-3\\\" >\\n            <h1>\").concat(task.header, \"</h1>\\n            <h5 class=\\\"mb-0 text-truncate\\\">\").concat(task.data, \"</h5>\\n            <div class=\\\"ms-auto align-text-center d-flex align-items-center gap-3\\\">\\n              <span>\").concat(task.date, \"  \").concat(task.time, \"</span>\\n                <input type=\\\"checkbox\\\" class=\\\"btn-check\\\" id=\\\"\").concat('checkbox-' + task.id, \"\\\" autocomplete=\\\"off\\\" \").concat(isChecked, \">\\n                <label class=\\\"btn btn-outline-primary done-button\\\" for=\\\"\").concat('checkbox-' + task.id, \"\\\">\\u2714\\uFE0E</label>\\n              <button type=\\\"button\\\" class=\\\"btn btn-dark rmv-button\\\">\\uD83D\\uDDD1\\uFE0F</button>\\n            </div>\\n        </div>\\n          </li>\");\n    $('#tasks-ul').append(taskElement);\n    taskerFunctions.resetInputs();\n  },\n  displayStorageData: storage => {\n    if (Array.isArray(storage) && storage.length > 0) {\n      try {\n        storage.forEach(e => {\n          taskerFunctions.displayTask(e);\n        });\n      } catch (error) {\n        console.error('Storage reading error, clearing storage');\n        console.error(error);\n      }\n    }\n  },\n  toggleDone(task) {\n    task.isDone = !task.isDone;\n  }\n};\n// ====================TASKER FUNCTIONS END================================\n\nconst uiFunctions = {\n  preloaderHide: () => {\n    $(window).on('load', () => {\n      $('#preloader').addClass('d-none');\n      console.warn('window loading done');\n    });\n  }\n};\nconst utilFunctions = {\n  createId(prefix) {\n    const idRandom = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);\n    return (prefix ? prefix + '-' : '') + idRandom;\n  },\n  hexToRgba: function hexToRgba(hex) {\n    let opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;\n    if (!hex || !/^#([A-Fa-f0-9]{6})$/.test(hex)) {\n      console.warn(\"Invalid HEX color format: \\\"\".concat(hex, \"\\\", fallback to #000000\"));\n      hex = '#000000';\n    }\n    const r = parseInt(hex.slice(1, 3), 16);\n    const g = parseInt(hex.slice(3, 5), 16);\n    const b = parseInt(hex.slice(5, 7), 16);\n    return \"rgba(\".concat(r, \", \").concat(g, \", \").concat(b, \", \").concat(opacity, \")\");\n  }\n};\n\n//# sourceURL=webpack:///./src/functions.mjs?\n}");

/***/ }),

/***/ "./src/index.mjs":
/*!***********************!*\
  !*** ./src/index.mjs ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _functions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions.mjs */ \"./src/functions.mjs\");\n\n\n\n// const tasksSaved = [];\nconst tasksSaved = JSON.parse(localStorage.getItem('taskStorage') || '[]');\n_functions_mjs__WEBPACK_IMPORTED_MODULE_0__.uiFunctions.preloaderHide();\n_functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.resetInputs();\n_functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.displayStorageData(tasksSaved);\n\n// =======================CLASSES========================================\nclass Task {\n  constructor(header, data, date, time, color) {\n    let isDone = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;\n    this.id = _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.utilFunctions.createId('task');\n    this.header = header;\n    this.data = data;\n    this.date = date;\n    this.time = time;\n    this.color = color;\n    this.isDone = isDone;\n    this.createdAt = new Date().toLocaleString();\n  }\n}\n// ====================EVENT LISTENERS====================================\n$('#invisible-container').on('click', e => {\n  const $taskLi = $(e.target.closest('li'));\n  const taskId = $taskLi.attr('id');\n  const currentTaskIndex = tasksSaved.findIndex(t => t.id === taskId);\n  const currentTask = tasksSaved.find(t => t.id === taskId);\n  if (e.target.showPicker) {\n    return e.target.showPicker();\n  }\n  if ($(e.target).hasClass('rmv-button')) {\n    tasksSaved.splice(currentTaskIndex, 1);\n    $taskLi.remove();\n    _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.saveTaskLocal(tasksSaved);\n    return;\n  }\n  if ($(e.target).hasClass('done-button')) {\n    $(e.target).closest('li').toggleClass('opacity-50');\n    _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.toggleDone(currentTask);\n    _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.saveTaskLocal(tasksSaved);\n    return;\n  }\n  if ($(e.target).is('h1, h5')) {\n    $('#titleModal').text(currentTask.header);\n    $('#textModal').text(currentTask.data);\n    const modal = new bootstrap.Modal(document.getElementById('myModal'));\n    modal.show();\n  }\n});\n$('#task-submit').on('submit', e => {\n  e.preventDefault();\n  const header = $('#task-heading').val().trim();\n  const taskInfo = $('#task-info').val().trim();\n  const date = $('#task-date-input').val();\n  const time = $('#task-time-input').val();\n  const dateTimeCombined = new Date(\"\".concat(date, \"T\").concat(time));\n  const dateTimeNow = new Date();\n  const color = $('#task-color').val();\n  let errors = 0;\n  if (header.length <= 3) {\n    _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.errorInput($('#task-heading'));\n    errors++;\n    console.log(errors);\n  }\n  if (taskInfo.length <= 3) {\n    _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.errorInput($('#task-info'));\n    errors++;\n  }\n  if (dateTimeCombined <= dateTimeNow) {\n    _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.errorInput($('#task-date-input'));\n    _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.errorInput($('#task-time-input'));\n  }\n  if (errors) {\n    return;\n  }\n  const taskCreated = new Task(header, taskInfo, date, time, color, false);\n  _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.displayTask(taskCreated);\n  tasksSaved.push(taskCreated);\n  _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.saveTaskLocal(tasksSaved);\n  console.log(taskCreated);\n});\n\n//# sourceURL=webpack:///./src/index.mjs?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.mjs");
/******/ 	
/******/ })()
;