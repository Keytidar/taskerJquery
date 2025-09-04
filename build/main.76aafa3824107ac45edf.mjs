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

/***/ "./frontend/src/script/functions.mjs":
/*!*******************************************!*\
  !*** ./frontend/src/script/functions.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   taskerFunctions: () => (/* binding */ taskerFunctions),\n/* harmony export */   uiFunctions: () => (/* binding */ uiFunctions),\n/* harmony export */   utilFunctions: () => (/* binding */ utilFunctions)\n/* harmony export */ });\n\n\n// ====================TASKER FUNCTIONS================================\nconst taskerFunctions = {\n  checkBg: () => {\n    $('#tasks-ul').length > 0 ? $('#tasks-ul').addClass('bg-logo') : $('#tasks-ul').removeClass('bg-logo');\n  },\n  errorInput: element => {\n    const type = element.attr('type');\n    const orig = element.data('origPlaceholder');\n    if (type !== 'date' && type !== 'time') {\n      element.val('');\n      element.addClass('bg-danger');\n      element.attr('placeholder', orig ? \"Wrong \".concat(orig.toLowerCase()) : '');\n      setTimeout(() => {\n        element.removeClass('bg-danger text-white');\n        element.attr('placeholder', orig);\n      }, 4000);\n    }\n  },\n  resetInputs: () => {\n    $('input').val('');\n    $('textarea').val('');\n    $('#task-date-input').val(new Date().toISOString().slice(0, 10));\n    $('#task-time-input').val(new Date().toTimeString().slice(0, 5));\n    $('#task-color').val('#000000');\n  },\n  saveTaskLocal: taskArray => {\n    localStorage.setItem('taskStorage', JSON.stringify(taskArray));\n  },\n  createId: prefix => {\n    const idRandom = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);\n    return (prefix ? prefix + '-' : '') + idRandom;\n  },\n  changeDone: task => {\n    task.toggleClass('done');\n  },\n  displayTask: task => {\n    const isChecked = task.isDone ? 'checked' : '';\n    const doneClass = task.isDone ? 'opacity-50' : '';\n    const taskElement = \"\\n            <li id=\\\"\".concat(task._id, \"\\\" class=\\\"\").concat(doneClass, \"\\\" style=\\\"background-color:\").concat(utilFunctions.hexToRgba(task.color, 0.4), \"\\\">\\n            <div class=\\\"d-flex align-items-center gap-3\\\" >\\n            <h1>\").concat(task.header, \"</h1>\\n            <h5 class=\\\"mb-0 text-truncate\\\">\").concat(task.data, \"</h5>\\n            <div class=\\\"ms-auto align-text-center d-flex align-items-center gap-3\\\">\\n              <span>\").concat(task.date, \"  \").concat(task.time, \"</span>\\n                <input type=\\\"checkbox\\\" class=\\\"btn-check\\\" id=\\\"\").concat('checkbox-' + task._id, \"\\\" autocomplete=\\\"off\\\" \").concat(isChecked, \">\\n                <label class=\\\"btn btn-outline-primary done-button\\\" for=\\\"\").concat('checkbox-' + task._id, \"\\\">\\u2714\\uFE0E</label>\\n              <button type=\\\"button\\\" class=\\\"btn btn-dark rmv-button\\\">\\uD83D\\uDDD1\\uFE0F</button>\\n            </div>\\n        </div>\\n          </li>\");\n    $('#tasks-ul').append(taskElement);\n    taskerFunctions.resetInputs();\n  },\n  displayStorageData: storage => {\n    if (Array.isArray(storage) && storage.length > 0) {\n      try {\n        storage.forEach(e => {\n          taskerFunctions.displayTask(e);\n        });\n      } catch (error) {\n        console.error('Storage reading error, clearing storage');\n        console.error(error);\n      }\n    }\n  },\n  toggleDone(task) {\n    task.isDone = !task.isDone;\n  },\n  // ======================TASKER FUNCTIONS SERVER==========================\n\n  getStorageDataFetch: async array => {\n    try {\n      const res = await fetch('http://localhost:2077/tasks');\n      if (!res.ok) throw new Error(\"Server response error: \".concat(res.status));\n      const tasks = await res.json();\n      tasks.forEach(e => {\n        array.push(e);\n      });\n    } catch (error) {\n      console.error(\"Failed to load tasks:\".concat(error));\n    }\n  }\n};\n\n// ====================TASKER FUNCTIONS END================================\n\nconst uiFunctions = {\n  preloaderHide: () => {\n    $(window).on('load', () => {\n      $('#preloader').addClass('d-none');\n      console.warn('window loading done');\n    });\n  }\n};\nconst utilFunctions = {\n  createId(prefix) {\n    const idRandom = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);\n    return (prefix ? prefix + '-' : '') + idRandom;\n  },\n  hexToRgba: function hexToRgba(hex) {\n    let opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;\n    if (!hex || !/^#([A-Fa-f0-9]{6})$/.test(hex)) {\n      console.warn(\"Invalid HEX color format: \\\"\".concat(hex, \"\\\", fallback to #000000\"));\n      hex = '#000000';\n    }\n    const r = parseInt(hex.slice(1, 3), 16);\n    const g = parseInt(hex.slice(3, 5), 16);\n    const b = parseInt(hex.slice(5, 7), 16);\n    return \"rgba(\".concat(r, \", \").concat(g, \", \").concat(b, \", \").concat(opacity, \")\");\n  },\n  consoleSuccess(message) {\n    console.log(\"%c\".concat(message), \"color: green; font-weight: bold;\");\n  }\n};\n\n//# sourceURL=webpack:///./frontend/src/script/functions.mjs?\n}");

/***/ }),

/***/ "./frontend/src/script/index.mjs":
/*!***************************************!*\
  !*** ./frontend/src/script/index.mjs ***!
  \***************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _functions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions.mjs */ \"./frontend/src/script/functions.mjs\");\n/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/style.css */ \"./frontend/src/styles/style.css\");\n\n\n\n\n// import { json } from 'express';\n// import { application } from \"express\";\n// const tasksSaved = [];\n// const tasksSaved = JSON.parse(localStorage.getItem('taskStorage') || '[]');\n_functions_mjs__WEBPACK_IMPORTED_MODULE_0__.uiFunctions.preloaderHide();\n_functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.resetInputs();\n// taskerFunctions.displayStorageData(tasksSaved);\nconst dataBaseLocalCopy = [];\nawait _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.getStorageDataFetch(dataBaseLocalCopy);\nconsole.log(dataBaseLocalCopy);\nif (dataBaseLocalCopy.length > 0) {\n  dataBaseLocalCopy.forEach(e => {\n    _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.displayTask(e);\n  });\n}\nconsole.log(dataBaseLocalCopy);\n\n// =======================CLASSES========================================\nclass Task {\n  constructor(header, data, date, time, color) {\n    let isDone = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;\n    // this.id = utilFunctions.createId('task');\n    this.header = header;\n    this.data = data;\n    this.date = date;\n    this.time = time;\n    this.color = color;\n    this.isDone = isDone;\n    this.createdAt = new Date().toLocaleString();\n  }\n}\n// ====================EVENT LISTENERS====================================\n$('#invisible-container').on('click', async e => {\n  const $taskLi = $(e.target.closest('li'));\n  const taskId = $taskLi.attr('id');\n  const currentTaskIndex = dataBaseLocalCopy.findIndex(t => t._id === taskId);\n  const currentTask = dataBaseLocalCopy.find(t => t._id === taskId);\n  if (e.target.showPicker) {\n    return e.target.showPicker();\n  }\n  if ($(e.target).hasClass('rmv-button')) {\n    if (!taskId) {\n      return console.error('Task id is missing');\n    }\n    try {\n      const res = await fetch(\"http://localhost:2077/tasks/\".concat(taskId), {\n        method: 'DELETE'\n      });\n      if (res.ok === true) {\n        $taskLi.remove();\n        dataBaseLocalCopy.splice(currentTaskIndex, 1);\n        _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.utilFunctions.consoleSuccess('Task successfully removed!');\n      }\n    } catch (error) {\n      console.error('Couldnt remove task:', error);\n    }\n    return;\n  }\n  if ($(e.target).hasClass('done-button')) {\n    $(e.target).closest('li').toggleClass('opacity-50');\n    _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.toggleDone(currentTask);\n    _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.saveTaskLocal(dataBaseLocalCopy);\n    try {\n      const res = await fetch(\"http://localhost:2077/tasks/\".concat(taskId), {\n        method: 'PATCH',\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify({\n          isDone: currentTask.isDone\n        })\n      });\n    } catch (error) {\n      console.error('An error occured: ', error);\n    }\n    return;\n  }\n  if ($(e.target).is('h1, h5')) {\n    $('#titleModal').text(currentTask.header);\n    $('#textModal').text(currentTask.data);\n    const modal = new bootstrap.Modal(document.getElementById('myModal'));\n    modal.show();\n  }\n});\n$('#task-submit').on('submit', async e => {\n  e.preventDefault();\n  const header = $('#task-heading').val().trim();\n  const taskInfo = $('#task-info').val().trim();\n  const date = $('#task-date-input').val();\n  const time = $('#task-time-input').val();\n  const dateTimeCombined = new Date(\"\".concat(date, \"T\").concat(time));\n  const dateTimeNow = new Date();\n  const color = $('#task-color').val();\n  let errors = 0;\n  if (header.length <= 3) {\n    _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.errorInput($('#task-heading'));\n    errors++;\n    console.log(errors);\n  }\n  if (taskInfo.length <= 3) {\n    _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.errorInput($('#task-info'));\n    errors++;\n  }\n  if (dateTimeCombined <= dateTimeNow) {\n    _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.errorInput($('#task-date-input'));\n    _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.errorInput($('#task-time-input'));\n  }\n  if (errors) {\n    return;\n  }\n  const taskCreated = new Task(header, taskInfo, date, time, color, false);\n  try {\n    const res = await fetch('http://localhost:2077/tasks', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(taskCreated)\n    });\n    const mongoTask = await res.json();\n    _functions_mjs__WEBPACK_IMPORTED_MODULE_0__.taskerFunctions.displayTask(mongoTask);\n  } catch (error) {\n    console.error('Couldnt proceed task API:', error);\n  }\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack:///./frontend/src/script/index.mjs?\n}");

/***/ }),

/***/ "./frontend/src/styles/style.css":
/*!***************************************!*\
  !*** ./frontend/src/styles/style.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./frontend/src/styles/style.css?\n}");

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
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var hasSymbol = typeof Symbol === "function";
/******/ 		var webpackQueues = hasSymbol ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = hasSymbol ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = hasSymbol ? Symbol("webpack error") : "__webpack_error__";
/******/ 		
/******/ 		
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 		
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 		
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			var handle = (deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 		
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}
/******/ 			var done = (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue))
/******/ 			body(handle, done);
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./frontend/src/script/index.mjs");
/******/ 	
/******/ })()
;