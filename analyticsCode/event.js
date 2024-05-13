export const EVENT_TYPE = {
  CLICK: 'click',
  VIEW: 'view',
  EXIT: 'exit',
};

export function captureEvent({
  type = 'click', // click , view, exit
  label = '', // text of the button
}) {
  console.log('Event triggered', {
    type,
    label,
  });
}
