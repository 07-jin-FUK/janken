
'use strict';

(() => {
    const hands = ['フシギダネ', 'ヒトカゲ', 'ゼニガメ'];
    const resultText = ['『効果はバツグンだ』', '『効果はいまひとつのようだ、、、反撃される』', '『相打ちだ！』'];

    // 値を取得する
    const count = document.getElementById('gameCount');
    let countResult = count.innerHTML;
    const rock = document.getElementById('rock');
    const scissors = document.getElementById('scissors');
    const paper = document.getElementById('paper');
    const myHandType = document.getElementById('myHand');
    const enemyHandType = document.getElementById('enemyHand');
    const result = document.getElementById('result');
    const reset = document.getElementById('reset');
    const winCount = document.getElementById('winCount')
    const loseCount = document.getElementById('loseCount')
    const winRate = document.getElementById('winRate');

    //試合数、勝ち数、負け数
    let gameCount = 0;
    let winResult = 0;
    let loseResult = 0;

    //試合数書き換え
    const gameCountReplace = (gameCount) => {
        countResult = countResult.replace(countResult, gameCount);
        count.textContent = countResult;
    }

    const alert = (winResult, loseResult) => {
        if (winResult > loseResult) {
            window.alert('TimeUP!あなたの勝ち！');
        } else if (winResult < loseResult) {
            window.alert('TimeUP！あなたの負け！');
        } else {
            window.alert('TimeUP！引き分け！');
        }
    }





    //リセットボタン表示とreload()関数呼び出し
    const resetClick = () => {
        //ボタン要素作成
        const resetBtn = document.createElement('input');
        resetBtn.type = 'button';
        resetBtn.value = '更新';
        reset.appendChild(resetBtn); //親要素(reset)の子要素にボタンを配置する

        resetBtn.addEventListener('click', () => { //更新ボタンを押下後、画面リロードする
            location.reload();
        })
    }

    //10回到達したらボタンを非活性にする
    const inactive = () => {
        rock.disabled = true;
        scissors.disabled = true;
        paper.disabled = true;
    }

    //勝率計算
    const winRateCalc = (gameCount, winCount) => {
        const winRateResult = (winCount / gameCount) * 100;
        winRate.textContent = `${winRateResult}%`;
    }

    //ボタン押下関数
    const onClick = (event) => {
        const min = 0
        const max = 3
        const myHand = Number(event.target.value); //取得するvalue値はstring型のため、Number型に変換
        const enemyHand = Math.floor(Math.random() * (max - min));
        console.log(enemyHand);

        myHandType.textContent = `自分の出した手：${hands[myHand]}`;
        enemyHandType.textContent = `相手の出した手：${hands[enemyHand]}`;

        //勝敗判定
        const handResult = (myHand - enemyHand + 3) % hands.length;

        if (handResult === 2) {
            result.textContent = resultText[1];
            gameCount++;
            winResult++;
            gameCountReplace(gameCount);

        } else if (handResult === 1) {
            result.textContent = resultText[0];
            gameCount++;
            loseResult++;
            gameCountReplace(gameCount);

        } else {
            result.textContent = resultText[2];
        }

        if (gameCount === 10) { //試合数が１０回に到達したら実行される処理
            winCount.textContent = `${winResult}回`;
            loseCount.textContent = `${loseResult}回`;
            winRateCalc(gameCount, winResult);
            alert(winResult, loseResult)
            inactive();
            resetClick();
        }
        $("#btnall").on("click", function () {
            const n = enemyHand
            const v = n + 1
            let tekinogazo = "images/img" + v + ".png";
            document.getElementById("area1").src = tekinogazo;
            console.log(v);
        });
    }

    // クリックした時の挙動はどのボタンも同じなので、関数を共通化
    rock.addEventListener('click', onClick);
    scissors.addEventListener('click', onClick);
    paper.addEventListener('click', onClick);

})();
