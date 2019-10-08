const debounce = (wait, immediate, func) => {
  let timeout;
	return (...args) => {
    const context = this;
		const later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

$(document).ready(() => {
  $('floatplane-app').on('DOMNodeInserted', debounce(500, true, () => {
    // check for control bar div without cinema mode button
    const controlBarFound = $('div.vjs-control-bar').length;
    const cinemaModeButtonFound = $('#fpcm-expand-button').length;
    if (controlBarFound && !cinemaModeButtonFound) {
      // add cinema mode button
      $('div.vjs-control-bar').append('<div id="fpcm-expand-button" />');
  
      // add onClick event listener to cinema mode button to toggle class & local storage
      $('#fpcm-expand-button').click(() => {
        const container = $('.video-player-container')
        container.toggleClass('fpcm-container');
        const modeOn = container.hasClass('fpcm-container');
        chrome.storage.sync.set({ 'fpcm-on': modeOn }, () => {
        });
      });
  
      // check local storage for pre-existing state
      chrome.storage.sync.get(['fpcm-on'], store => {
        if (store['fpcm-on']) {
          $('.video-player-container').addClass('fpcm-container');
        }
      });
    }
  }));
});