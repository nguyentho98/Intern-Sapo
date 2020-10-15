import history from './../utils/history';
import { Slide, toast, Zoom } from 'react-toastify';

export function toastSuccess(message) {
  if (message) {
    toast.dark('✔️ ' + message, { autoClose: 2000, transition: Slide });
  }
}
export function toastError(message) {
  if (message) {
    toast.error(message, { autoClose: 2500, transition: Slide });
  }
}
export function toastErrorServer(error) {
  let toastData = '';
  if (typeof error === 'string') {
    toastData = error;
  } else if (typeof error === 'object' && error.message) {
    toastData = error.message;
  } else if (error && error instanceof Array) {
    toastData = error;
  }
  if (toastData && typeof toastData === 'string' && toastData !== '') {
    toast.error(toastData, { autoClose: 1500 });
  } else if (toastData && toastData instanceof Array) {
    toastData.forEach((err) => {
      toastErrorServer(err);
    });
  }
}
export function toastSocket(body) {
  toast.dark(body.message, {
    position: 'top-right',
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    onClick: () => {
      history.push(body.path);
    },
    progress: undefined,
  });
}
