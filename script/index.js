'use strict';
import { taskerFunctions, uiFunctions, utilFunctions } from "./functions.js";
// const tasksSaved = [];
const tasksSaved = JSON.parse(localStorage.getItem('taskStorage') || '[]');
uiFunctions.preloaderHide();
taskerFunctions.resetInputs();
taskerFunctions.displayStorageData(tasksSaved);

// =======================CLASSES========================================
class Task {
  constructor(header, data, date, time, color, isDone = false) {
    this.id = utilFunctions.createId('task');
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
$('#invisible-container').on('click', (e) => {
  const $taskLi = $(e.target.closest('li'));
  const taskId = $taskLi.attr('id');
  const currentTaskIndex = tasksSaved.findIndex((t) => t.id === taskId);
  const currentTask = tasksSaved.find((t) => t.id === taskId);

  if (e.target.showPicker) {
    return e.target.showPicker();
  }
  if ($(e.target).hasClass('rmv-button')) {
    tasksSaved.splice(currentTaskIndex, 1);
    $taskLi.remove();
    taskerFunctions.saveTaskLocal(tasksSaved);
    return;
  }
  if ($(e.target).hasClass('done-button')) {
    $(e.target).closest('li').toggleClass('opacity-50');
    taskerFunctions.toggleDone(currentTask);
    taskerFunctions.saveTaskLocal(tasksSaved);

    return;
  }
  if ($(e.target).is('h1, h5')) {
    $('#titleModal').text(currentTask.header);
    $('#textModal').text(currentTask.data);
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
  }
});

$('#task-submit').on('submit', (e) => {
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
  taskerFunctions.displayTask(taskCreated);
  tasksSaved.push(taskCreated);
  taskerFunctions.saveTaskLocal(tasksSaved);
  console.log(taskCreated);
});