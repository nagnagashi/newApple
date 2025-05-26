// スコアの初期化
let score = 0;
const scoreSpan = document.getElementById('score');

// リンゴの要素を取得
const apples = [
    document.getElementById('apple1'),
    document.getElementById('apple2'),
    document.getElementById('apple3'),
    document.getElementById('apple4'),
    document.getElementById('apple5'),
    document.getElementById('apple6')
];


// まず、リンゴの情報を管理するための配列を作成
const appleDataList = apples.map(apple => {
    return {
        element: apple,
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
        speed: 0.02 // 速度係数（調整可能）
    };
});

// 初期位置と目標位置を設定
appleDataList.forEach(data => {
    // 初期位置
    data.currentX = Math.random() * (document.getElementById('orchard').clientWidth - data.element.offsetWidth);
    data.currentY = Math.random() * (document.getElementById('orchard').clientHeight - data.element.offsetHeight);
    data.element.style.left = `${data.currentX}px`;
    data.element.style.top = `${data.currentY}px`;
    // 目標位置も設定
    setNewTarget(data);
});

// 目標位置を設定する関数
function setNewTarget(data) {
    const orchard = document.getElementById('orchard');
    const maxX = orchard.clientWidth - data.element.offsetWidth;
    const maxY = orchard.clientHeight - data.element.offsetHeight;
    data.targetX = Math.random() * maxX;
    data.targetY = Math.random() * maxY;
}

// アニメーションループ
function animate() {
    appleDataList.forEach(data => {
        // 目標に向かって少しずつ動かす
        const dx = data.targetX - data.currentX;
        const dy = data.targetY - data.currentY;

        // 位置を更新
        data.currentX += dx * data.speed;
        data.currentY += dy * data.speed;

        // 位置を反映
        data.element.style.left = `${data.currentX}px`;
        data.element.style.top = `${data.currentY}px`;

        // 目標に近づいたら新しい目標を設定
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
            // 新しい目標位置を設定
            data.targetX = Math.random() * (最大横幅);
            data.targetY = Math.random() * (最大縦幅);
        }
    }
    )
}



// 位置をランダムに設定する関数
function setRandomPosition(apple) {
    const orchard = document.getElementById('orchard');
    const maxX = orchard.clientWidth - apple.offsetWidth;
    const maxY = orchard.clientHeight - apple.offsetHeight;
    const randX = Math.random() * maxX;
    const randY = Math.random() * maxY;
    apple.style.left = `${randX}px`;
    apple.style.top = `${randY}px`;
}

// 初期位置を設定
apples.forEach(apple => {
    setRandomPosition(apple);
    // クリックイベントを追加
    apple.addEventListener('click', () => {
        if (apple.dataset.harvested === 'true') {
            return; // 既に収穫済みの場合は無視
        }
        apple.dataset.harvested = 'true'; // 収穫済みに設定
        apple.style.opacity = 0.5; // 見た目を半透明に
        score += 1; // スコアを増やす
        scoreSpan.textContent = score; // 表示更新
    });
});

// 1.5秒ごとにリンゴの位置を更新
setInterval(() => {
    apples.forEach(apple => {
        setRandomPosition(apple);
        // 収穫済みの場合は再度収穫可能にする
        apple.dataset.harvested = 'false';
        apple.style.opacity = 1;
    });
}, 1500);