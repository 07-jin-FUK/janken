
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
            $("#resu").text("あなたの勝ち！")

            // window.alert('TimeUP!あなたの勝ち！');
        } else if (winResult < loseResult) {
            $("#resu").text("残念。あなたの負け！");

            // window.alert('TimeUP！あなたの負け！');
        } else {
            $("#resu").text("TimeUP!引き分け！")

            // window.alert('TimeUP！引き分け！');
        }
    }





    //リセットボタン表示とreload()関数呼び出し
    const resetClick = () => {
        //ボタン要素作成
        const resetBtn = document.createElement('input');
        resetBtn.type = 'button';
        resetBtn.value = 'もう一回';
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

window.addEventListener('DOMContentLoaded', function () {

    const btn_p = document.getElementById("musicbutton");
    const vide = document.querySelector("#music");

    btn_p.addEventListener("click", e => {
        vide.play();
    });

});


// ★初期化
function load() {
    maxhp = 100; // 変更可
    nowhp = maxhp;

    N = document.getElementById("now");
    T = document.getElementById("txt");
    B1 = document.getElementById("btn1");
    B2 = document.getElementById("btn2");

    N.innerHTML = nowhp + "/" + maxhp;
}

// ★ゲージ減少
function attack() {
    random = Math.floor(Math.random() * 11);
    nowhp = nowhp - random;
    if (nowhp >= 0) {
        if (random == 0) {
            str = "勇者に攻撃をかわされた";
        } else {
            str = "勇者に[ " + random + " ]のダメージを与えた";
        }
    } else {
        nowhp = 0;
        str = "勇者は力尽きた";
        B1.style.display = "none";
        B2.style.display = "block";
    }
    T.value = str;
    N.innerHTML = nowhp + "/" + maxhp;
    N.style.width = 200 / maxhp * nowhp + "px";
}

// ★リロード
function reload() {
    nowhp = maxhp;
    B1.style.display = "block";
    B2.style.display = "none";
    T.value = "新たな勇者を見つけた";
    N.innerHTML = nowhp + "/" + maxhp;
    N.style.width = 200 / maxhp * nowhp + "px";
}


/* audio・video 音量初期値の設定 */
const mediasVol_def = function () {
    //範囲： 0〜1 の間　※初期値=1(100%の最大)


    // 特定のidのaudioの音量設定
    const a1 = document.getElementById('music'); //('a1')の a1は例
    a1.volume = 0.3; // 0〜1 の間で
    //2コ以上あるときは下記のように記述していく
    //const a2=document.getElementById('a2');
    //a2.volume=0.7; //例  

}
//ページ読み込み時に処理
window.addEventListener('DOMContentLoaded', function () {
    mediasVol_def();
}, false); 
