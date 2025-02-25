const urlParams = new URLSearchParams(window.location.search);
const time = urlParams.get('time');
const day = urlParams.get('day');
const subject = urlParams.get('subject');

// メモデータのロード
function loadMemoData() {
    const savedMemo = localStorage.getItem(`memo-${subject}`);
    return savedMemo || "";
}

// メモを保存
function saveMemoData() {
    const memoText = document.getElementById('memo-text').value;
    localStorage.setItem(`memo-${subject}`, memoText);
}

document.getElementById('subject-name').innerText = `${subject}のメモ`;

// メモの初期化
document.getElementById('memo-text').value = loadMemoData();

// 保存ボタンのイベント
document.getElementById('save-button').addEventListener('click', function () {
    saveMemoData();
    alert('メモを保存しました');
});

// 戻るボタンの処理
function goBack() {
    window.location.href = 'a.html';
}
