// ポップアップが開かれた時の初期化
document.addEventListener('DOMContentLoaded', async () => {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const statusText = document.getElementById('status');

  // 現在の状態を取得
  const { grayscaleEnabled } = await chrome.storage.sync.get({ grayscaleEnabled: false });

  // UIを更新
  toggleSwitch.checked = grayscaleEnabled;
  updateStatus(grayscaleEnabled);

  // トグルスイッチのイベントリスナー
  toggleSwitch.addEventListener('change', async (e) => {
    const isEnabled = e.target.checked;

    // ストレージに保存
    await chrome.storage.sync.set({ grayscaleEnabled: isEnabled });

    // ステータステキストを更新
    updateStatus(isEnabled);

    // アクティブなタブにメッセージを送信
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab?.id) {
      chrome.tabs.sendMessage(tab.id, {
        action: 'toggleGrayscale',
        enabled: isEnabled
      }).catch(err => {
        // タブがまだメッセージを受け取れない場合（例：chrome:// ページ）
        console.log('メッセージ送信エラー:', err);
      });
    }
  });

  function updateStatus(enabled) {
    statusText.textContent = enabled ? 'オン' : 'オフ';
    statusText.style.color = enabled ? '#2196F3' : '#999';
  }
});
