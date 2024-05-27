export const EVENT_TYPE = {
  CLICK: 'click',
  VIEW: 'view',
  EXIT: 'exit',
};

//  -> POST

/*

type,
          userAgent,
          ip,
          browserId,
          websiteId,


*/

const URL = import.meta.env.VITE_EVENTS_URL;

const TYPE_MAPPING = {
  click: 1,
  view: 0,
  exit: 2,
};

export function captureEvent({
  type = 'click', // click , view, exit (0,1,2)
  label = '', // text of the button
}) {
  console.log('Event triggered', {
    type,
    label,
  });

  if (window.WEBSITEID === undefined) {
    throw new Error('WEBSITEID is not defined');
  }

  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: TYPE_MAPPING[type],
      userAgent: window.navigator.userAgent || '',
      ip: '127.0.0.1',
      browserId: window.BROWSERID || '',
      websiteId: window.WEBSITEID || '',
    }),
  });
}
