export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./serviceWorker.js')
        .then(
          (registration) => {
            // eslint-disable-next-line no-console
            console.log(
              'ServiceWorker registration successful with scope: ',
              registration.scope
            );
          },
          (err) => {
            // eslint-disable-next-line no-console
            console.log('ServiceWorker registration failed: ', err);
          }
        )
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    });
  } else {
    // eslint-disable-next-line no-console
    console.log('service worker is not supported');
  }
};
