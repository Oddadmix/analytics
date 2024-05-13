import { EVENT_TYPE, captureEvent } from './event.js';

document.addEventListener('DOMContentLoaded', function () {
  captureEvent({
    type: EVENT_TYPE.VIEW,
    label: document.title,
  });
});

document.addEventListener('click', function (event) {
  captureEvent({
    type: EVENT_TYPE.CLICK,
    label: event.target.innerText,
  });
});
