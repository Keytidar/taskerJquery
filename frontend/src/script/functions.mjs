'use strict';
// ====================TASKER FUNCTIONS================================
export const taskerFunctions = {
  checkBg: () => {
    $('#tasks-ul').length > 0
      ? $('#tasks-ul').addClass('bg-logo')
      : $('#tasks-ul').removeClass('bg-logo');
  },
  errorInput: (element) => {
    const type = element.attr('type');
    const orig = element.data('origPlaceholder');

    if (type !== 'date' && type !== 'time') {
      element.val('');
      element.addClass('bg-danger');
      element.attr('placeholder', orig ? `Wrong ${orig.toLowerCase()}` : '');

      setTimeout(() => {
        element.removeClass('bg-danger text-white');
        element.attr('placeholder', orig);
      }, 4000);
    }
  },
  resetInputs: () => {
    $('input').val('');
    $('textarea').val('');
    $('#task-date-input').val(new Date().toISOString().slice(0, 10));
    $('#task-time-input').val(new Date().toTimeString().slice(0, 5));
    $('#task-color').val('#000000');
  },

  saveTaskLocal: (taskArray) => {
    localStorage.setItem('taskStorage', JSON.stringify(taskArray));
  },
  createId: (prefix) => {
    const idRandom =
      Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    return (prefix ? prefix + '-' : '') + idRandom;
  },
  changeDone: (task) => {
    task.toggleClass('done');
  },
  displayTask: (task) => {
    const isChecked = task.isDone ? 'checked' : '';
    const doneClass = task.isDone ? 'opacity-50' : '';
    const taskElement = `
            <li id="${
              task._id
            }" class="${doneClass}" style="background-color:${utilFunctions.hexToRgba(
      task.color,
      0.4
    )}">
            <div class="d-flex align-items-center gap-3" >
            <h1>${task.header}</h1>
            <h5 class="mb-0 text-truncate">${task.data}</h5>
            <div class="ms-auto align-text-center d-flex align-items-center gap-3">
              <span style="min-width: 5rem">${task.date}  ${task.time}</span>
                <input type="checkbox" class="btn-check" id="${
                  'checkbox-' + task._id
                }" autocomplete="off" ${isChecked}>
                <label class="btn btn-outline-primary done-button" for="${
                  'checkbox-' + task._id
                }">✔︎</label>
              <button type="button" class="btn btn-dark rmv-button">🗑️</button>
            </div>
        </div>
          </li>`;
    $('#tasks-ul').append(taskElement);
    taskerFunctions.resetInputs();
  },

  displayStorageData: (storage) => {
    if (Array.isArray(storage) && storage.length > 0) {
      try {
        storage.forEach((e) => {
          taskerFunctions.displayTask(e);
        });
      } catch (error) {
        console.error('Storage reading error, clearing storage');
        console.error(error);
      }
    }
  },
  toggleDone(task) {
    task.isDone = !task.isDone;
  },

  // ======================TASKER FUNCTIONS SERVER==========================

  getStorageDataFetch: async (array) => {
    try {
      const res = await fetch('http://localhost:2077/tasks');
      if (!res.ok) throw new Error(`Server response error: ${res.status}`);
      const tasks = await res.json();
      tasks.forEach((e) => {
        array.push(e);
      });
    } catch (error) {
      console.error(`Failed to load tasks:${error}`);
    }
  },
};

// ====================TASKER FUNCTIONS END================================

export const uiFunctions = {
  preloaderHide: () => {
    $(window).on('load', () => {
      $('#preloader').addClass('d-none');
      console.warn('window loading done');
    });
  },
};

export const utilFunctions = {
  createId(prefix) {
    const idRandom =
      Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    return (prefix ? prefix + '-' : '') + idRandom;
  },
  hexToRgba: (hex, opacity = 1) => {
    if (!hex || !/^#([A-Fa-f0-9]{6})$/.test(hex)) {
      console.warn(`Invalid HEX color format: "${hex}", fallback to #000000`);
      hex = '#000000';
    }
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },
  consoleSuccess(message) {
    console.log(`%c${message}`, "color: green; font-weight: bold;");
  }
};
