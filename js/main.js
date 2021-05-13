if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_pages.js')
      .then(reg => console.log('Service Worker: Registered (Pages)'))
      .catch(err => console.log(`Service Worker: Error: ${err}`));

    Notification.requestPermission()
    .then(permission => console.log('Notification permission granted') )
    .catch(err => console.log(`Service Worker: Notification Error: ${err}`));
  });
}
