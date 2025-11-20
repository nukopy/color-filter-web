// ページ読み込み時に保存された状態を適用
(async function initGrayscale() {
  const { grayscaleEnabled } = await chrome.storage.sync.get({ grayscaleEnabled: false });
  applyGrayscale(grayscaleEnabled);
})();

// ポップアップからのメッセージを受信
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleGrayscale') {
    applyGrayscale(message.enabled);
    sendResponse({ success: true });
  }
  return true;
});

// ストレージの変更を監視
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes.grayscaleEnabled) {
    applyGrayscale(changes.grayscaleEnabled.newValue);
  }
});

// グレースケールフィルターを適用/解除する関数
function applyGrayscale(enabled) {
  const html = document.documentElement;

  if (enabled) {
    html.classList.add('grayscale-filter');
  } else {
    html.classList.remove('grayscale-filter');
  }
}
