'use strict';
import { taskerFunctions, uiFunctions, utilFunctions } from './functions.mjs';
import '../styles/style.css';

// import { application } from "express";
// const tasksSaved = [];
// const tasksSaved = JSON.parse(localStorage.getItem('taskStorage') || '[]');
uiFunctions.preloaderHide();
taskerFunctions.resetInputs();
// taskerFunctions.displayStorageData(tasksSaved);
const dataBaseLocalCopy = [];
await taskerFunctions.getStorageDataFetch(dataBaseLocalCopy);
console.log(dataBaseLocalCopy);
if (dataBaseLocalCopy.length > 0) {
  dataBaseLocalCopy.forEach((e) => {
    taskerFunctions.displayTask(e);
  })
}
console.log(dataBaseLocalCopy);

// =======================CLASSES========================================
class Task {
  constructor(header, data, date, time, color, isDone = false) {
    // this.id = utilFunctions.createId('task');
    this.header = header;
    this.data = data;
    this.date = date;
    this.time = time;
    this.color = color;
    this.isDone = isDone;
    this.createdAt = new Date().toLocaleString();
  }
}
// ====================EVENT LISTENERS====================================
$('#invisible-container').on('click', async (e) => {
  const $taskLi = $(e.target.closest('li'));
  const taskId = $taskLi.attr('id');
  const currentTaskIndex = dataBaseLocalCopy.findIndex((t) => t._id === taskId);
  const currentTask = dataBaseLocalCopy.find((t) => t._id === taskId);

  if (e.target.showPicker) {
    return e.target.showPicker();
  }
  if ($(e.target).hasClass('rmv-button')) {
    if(!taskId) {
      return console.error('Task id is missing')
    }
    try {
      const res = await fetch(`http://localhost:2077/tasks/${taskId}`, {
        method: 'DELETE'
      });
      if (res.ok === true) {
        $taskLi.remove();
        dataBaseLocalCopy.splice(currentTaskIndex, 1);
        utilFunctions.consoleSuccess('Task successfully removed!');
      }
    } catch (error) {
      console.error('Couldnt remove task:', error);
    }
  return}
  if ($(e.target).hasClass('done-button')) {
    $(e.target).closest('li').toggleClass('opacity-50');
    taskerFunctions.toggleDone(currentTask);
    taskerFunctions.saveTaskLocal(dataBaseLocalCopy);
    try {
      const res = await fetch(`http://localhost:2077/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDone: currentTask.isDone })
      })
    } catch (error) {
      console.error('An error occured: ', error)
    }

    return;
  }
  if ($(e.target).is('h1, h5')) {
    $('#titleModal').text(currentTask.header);
    $('#textModal').text(currentTask.data);
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
  }
});

$('#task-submit').on('submit', async (e) => {
  e.preventDefault();
  const header = $('#task-heading').val().trim();
  const taskInfo = $('#task-info').val().trim();
  const date = $('#task-date-input').val();
  const time = $('#task-time-input').val();
  const dateTimeCombined = new Date(`${date}T${time}`);
  const dateTimeNow = new Date();
  const color = $('#task-color').val();

  let errors = 0;
  if (header.length <= 3) {
    taskerFunctions.errorInput($('#task-heading'));
    errors++;
    console.log(errors);
  }
  if (taskInfo.length <= 3) {
    taskerFunctions.errorInput($('#task-info'));
    errors++;
  }
  if (dateTimeCombined <= dateTimeNow) {
    taskerFunctions.errorInput($('#task-date-input'));
    taskerFunctions.errorInput($('#task-time-input'));
  }
  if (errors) {
    return;
  }
  const taskCreated = new Task(header, taskInfo, date, time, color, false);
  try {
    const res = await fetch('http://localhost:2077/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskCreated),
    });
    const mongoTask = await res.json();
    taskerFunctions.displayTask(mongoTask);
  } catch (error) {
    console.error('Couldnt proceed task API:', error);
  }
});
