$(document).ready(() => {
  // find video player control bar div & add cinema mode button
  const controlBar = $('div.vjs-control-bar');
  controlBar.append('<div id="fpcm-expand-button" />');

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
});