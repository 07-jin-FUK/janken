"use strict";

//ブラウザがページを完全に読みこむまで待つ
addEventListener("load", () => {
  //変数gameに、あなたはゲームですよ、と教える
  const game = new Game(1152, 640);
  //ゲームに使う画像などの素材を先に読み込んでおく（プリロード）
  game.preload(
    "./rpg/img/aru.png",
    "./rpg/img/start.png",
    "./rpg/img/goal.png",
    "./rpg/img/tile.png",
    "./rpg/sound/草ポケ.mp3",
    "./rpg/sound/始まりの音.mp3",
    "./rpg/sound/ライバル発見.mp3"
  );
  //使いたいキーとして、スペースキーを登録する
  game.keybind("space", " ");
  //ゲームを開始する準備ができたあとに実行する
  game.main(() => {
    //タイトルシーン
    const titleScene = () => {
      const scene = new Scene();

      // 最初のテキスト「Welcome PocketMonster World!」
      const titleText = new Text(
        "Welcome PocketMonster World!  Please Press Space key!"
      );
      titleText.center().middle();

      scene.add(titleText);

      // シーンが切り替わったときに、一度だけ呼ばれる
      scene.onchangescene = () => {
        game.sounds["./rpg/sound/ライバル発見.mp3"].stop();
        game.sounds["./rpg/sound/始まりの音.mp3"].start();
      };

      // ループから常に呼び出される
      scene.onenterframe = () => {
        if (game.input.space) game.currentScene = mainScene();
      };

      // 作ったシーンを返す
      return scene;
    };

    //メインシーン
    const mainScene = () => {
      //マップの作成
      const map = [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
          0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 0,
        ],
        [
          0, 11, 11, 11, 11, 10, 10, 10, 10, 11, 11, 11, 11, 10, 10, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 0,
        ],
        [
          0, 11, 11, 11, 10, 5, 5, 5, 5, 10, 11, 11, 11, 5, 5, 11, 10, 10, 10,
          10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 0,
        ],
        [
          0, 11, 11, 10, 5, 5, 11, 11, 5, 5, 11, 11, 11, 5, 11, 11, 5, 5, 5, 5,
          5, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 0,
        ],
        [
          0, 11, 11, 5, 5, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 5, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 0,
        ],
        [
          0, 11, 11, 5, 11, 11, 11, 10, 10, 10, 10, 11, 11, 11, 11, 11, 5, 10,
          10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 0,
        ],
        [
          0, 11, 11, 5, 11, 11, 11, 5, 5, 5, 5, 11, 11, 11, 11, 11, 5, 5, 5, 5,
          5, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 0,
        ],
        [
          0, 11, 11, 5, 10, 11, 11, 11, 10, 5, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 5, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 0,
        ],
        [
          0, 11, 11, 5, 5, 10, 10, 10, 5, 5, 11, 11, 11, 11, 11, 11, 10, 10, 10,
          10, 5, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 0,
        ],
        [
          0, 11, 11, 11, 5, 5, 5, 5, 5, 11, 11, 11, 11, 11, 11, 11, 5, 5, 5, 5,
          5, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 0,
        ],
        [
          0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 0,
        ],
        [
          0, 11, 11, 11, 10, 10, 10, 11, 11, 11, 10, 10, 10, 10, 11, 11, 10, 10,
          10, 11, 11, 10, 10, 10, 10, 11, 11, 10, 10, 10, 10, 10, 11, 10, 10,
          10, 11, 10, 10, 10, 11, 10, 10, 11, 11, 11, 10, 10, 11, 11, 11, 11,
          11, 0,
        ],
        [
          0, 11, 11, 11, 5, 5, 5, 11, 11, 10, 5, 5, 5, 5, 11, 11, 5, 5, 5, 11,
          11, 5, 5, 5, 5, 10, 11, 5, 5, 5, 5, 5, 11, 5, 5, 5, 10, 5, 5, 5, 11,
          5, 5, 10, 11, 10, 5, 5, 11, 11, 11, 11, 11, 0,
        ],
        [
          0, 11, 11, 10, 5, 11, 5, 10, 11, 5, 5, 11, 11, 5, 11, 10, 5, 11, 5,
          10, 11, 5, 11, 11, 5, 5, 11, 5, 11, 11, 11, 11, 11, 5, 11, 5, 5, 5,
          11, 5, 11, 11, 5, 5, 10, 5, 5, 11, 11, 11, 11, 11, 11, 0,
        ],
        [
          0, 11, 11, 5, 5, 11, 5, 5, 11, 5, 11, 11, 11, 11, 11, 5, 5, 11, 5, 5,
          11, 5, 11, 11, 11, 5, 11, 5, 10, 10, 10, 10, 11, 5, 11, 11, 5, 11, 11,
          5, 11, 11, 11, 5, 5, 5, 11, 11, 11, 11, 11, 11, 11, 0,
        ],
        [
          0, 11, 11, 5, 11, 11, 11, 5, 11, 5, 11, 11, 11, 11, 11, 5, 11, 11, 11,
          5, 11, 5, 11, 11, 11, 5, 11, 5, 5, 5, 5, 5, 11, 5, 11, 11, 5, 11, 11,
          5, 11, 11, 11, 11, 5, 11, 11, 11, 11, 11, 11, 11, 11, 0,
        ],
        [
          0, 11, 11, 5, 10, 10, 10, 5, 11, 5, 11, 11, 11, 11, 11, 5, 10, 10, 10,
          5, 11, 5, 11, 11, 11, 5, 11, 5, 11, 11, 11, 11, 11, 5, 11, 11, 11, 11,
          11, 5, 11, 11, 11, 11, 5, 11, 11, 11, 11, 11, 11, 11, 11, 0,
        ],
        [
          0, 11, 11, 5, 5, 5, 5, 5, 11, 5, 10, 11, 11, 10, 11, 5, 5, 5, 5, 5,
          11, 5, 11, 11, 10, 5, 11, 5, 11, 11, 11, 11, 11, 5, 11, 11, 11, 11,
          11, 5, 11, 11, 11, 11, 5, 11, 11, 11, 11, 11, 11, 11, 11, 0,
        ],
        [
          0, 11, 11, 5, 11, 11, 11, 5, 11, 5, 5, 10, 10, 5, 11, 5, 11, 11, 11,
          5, 11, 5, 10, 10, 5, 5, 11, 5, 10, 10, 10, 10, 11, 5, 11, 11, 11, 11,
          11, 5, 11, 11, 11, 11, 5, 11, 11, 11, 11, 11, 11, 11, 11, 0,
        ],
        [
          0, 11, 11, 5, 11, 11, 11, 5, 11, 11, 5, 5, 5, 5, 11, 5, 11, 11, 11, 5,
          11, 5, 5, 5, 5, 11, 11, 5, 5, 5, 5, 5, 11, 5, 11, 11, 11, 11, 11, 5,
          11, 11, 11, 11, 5, 11, 11, 11, 11, 11, 11, 11, 11, 0,
        ],
        [
          0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 0,
        ],
        [
          0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
          11, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0,
        ],
      ];
      //タイルのサイズ
      const TILE_SIZE = 32;

      //歩く速さ
      const WALKING_SPEED = 4;

      //変数sceneに、あなたはシーンですよ、と教える
      const scene = new Scene();

      //変数tilemapに、あなたはタイルマップですよ、と教える
      const tilemap = new Tilemap("./rpg/img/tile.png");
      //tilemap.dataに、どんなマップなのか教える
      tilemap.data = map;
      //マップ全体の位置をずらす
      tilemap.x = TILE_SIZE * 8 - TILE_SIZE / 2;
      tilemap.y = TILE_SIZE * 8 - TILE_SIZE / 2;
      //移動できないタイルを指定する
      tilemap.obstacles = [0, 3, 5, 6, 7, 8, 9, 10];
      //マップを登録する
      scene.add(tilemap);

      //変数startに、あなたはスタートのタイルですよ、と教える
      const start = new Tile("./rpg/img/start.png");
      //マップ左上からの座標を指定する
      start.x = TILE_SIZE * 2;
      start.y = TILE_SIZE * 2;
      //スタートのタイルを、tilemapに追加して、とお願いする
      tilemap.add(start);

      //変数goalに、あなたはゴールのタイルですよ、と教える
      const goal = new Tile("./rpg/img/goal.png");
      //マップ左上からの座標を指定する
      goal.x = TILE_SIZE * 47;
      goal.y = TILE_SIZE * 20;
      //ゴールのタイルを、tilemapに追加して、とお願いする
      tilemap.add(goal);

      //変数yamadaに、あなたは山田先生のタイルですよ、と教える
      const yamada = new CharacterTile("./rpg/img/aru.png");
      //山田先生を画面の中央に配置
      yamada.x = yamada.y = TILE_SIZE * 10 - TILE_SIZE / 2;
      //タイルマップの動きと同期させない
      yamada.isSynchronize = false;
      //tilemapに、山田先生のタイルを追加して、とお願いする
      tilemap.add(yamada);

      //シーンが切り替わったときに、一度だけ呼ばれる
      scene.onchangescene = () => {
        //start.mp3をストップ
        game.sounds["./rpg/sound/始まりの音.mp3"].stop();
        //bgm.mp3をループ再生
        game.sounds["./rpg/sound/草ポケ.mp3"].loop();
      };

      //キャラクターのアニメーションのための変数
      let toggleForAnimation = 0;
      //ゴールのテキストが表示されているかどうかの変数
      let hasDisplayedGoalText = false;
      //移動可能かどうかの変数
      let isMovable = true;

      //sceneに、山田先生のタイルを追加して、とお願いする

      // //変数yamadaに、あなたは山田先生のスプライト画像ですよ、と教える
      // const yamada = new Sprite('./rpg/img/yamada.png');
      // //sceneに、山田先生のスプライト画像を追加して、とお願いする
      // scene.add(yamada); ※※説明なしできえてた。

      //ループから常に呼び出される
      scene.onenterframe = () => {
        //タイルマップの位置がタイルのサイズで割り切れるとき
        if (
          (tilemap.x - TILE_SIZE / 2) % TILE_SIZE === 0 &&
          (tilemap.y - TILE_SIZE / 2) % TILE_SIZE === 0
        ) {
          // タイルマップの移動速度に0を代入する
          tilemap.vx = tilemap.vy = 0;
          //山田先生の画像を切り替える
          yamada.animation = 1;

          //山田先生のタイルがゴールのタイルと重なっているとき、イベントを発生させる
          // if (yamada.isOverlapped(goal)) console.log('ゴールだべ！');
          if (yamada.isOverlapped(goal)) {
            //ゴールのテキストが表示されていないとき
            if (!hasDisplayedGoalText) {
              //変数goalTextに、あなたは「ゴールだべ！」というテキストだよ、と教える
              const goalText = new Text("Battle Start！");
              //テキストサイズを変更
              goalText.size = 50;

              // //テキストの位置（削除）
              // //goalText.x = 15;（削除）
              // //goalText.y = 135;（削除）
              // //テキストを上下左右中央の位置にする
              // goalText.center().middle();

              //テキストの位置
              goalText.x = 180;
              goalText.y = 215;
              //シーンにテキストを追加
              scene.add(goalText);
              //ゴールのテキストが表示されているかどうかの変数にtrueを代入
              hasDisplayedGoalText = true;
              //移動ができないようにする
              isMovable = false;
              //bgm.mp3をストップ
              game.sounds["./rpg/sound/草ポケ.mp3"].stop();
              //clear.mp3を再生
              game.sounds["./rpg/sound/ライバル発見.mp3"].start();
              //６秒たったら、タイトルシーンに切り替える
              setTimeout(() => {
                window.location.replace("../sankou.html");
              }, 6000);
            }
          }
          //方向キーが押されているときは、タイルマップの移動速度と、山田先生の向きに、それぞれの値を代入する
          //移動可能なとき
          if (isMovable) {
            if (game.input.left) {
              tilemap.vx = WALKING_SPEED;
              yamada.direction = 1;
            } else if (game.input.right) {
              tilemap.vx = -1 * WALKING_SPEED;
              yamada.direction = 2;
            } else if (game.input.up) {
              tilemap.vy = WALKING_SPEED;
              yamada.direction = 3;
            } else if (game.input.down) {
              tilemap.vy = -1 * WALKING_SPEED;
              yamada.direction = 0;
            }
            // // キーが押されたとき、山田先生（マップ）が移動する
            // if (game.input.left) tilemap.vx = WALKING_SPEED;
            // else if (game.input.right) tilemap.vx = -1 * WALKING_SPEED;
            // else if (game.input.up) tilemap.vy = WALKING_SPEED;
            // else if (game.input.down) tilemap.vy = -1 * WALKING_SPEED;

            //移動後のマップ座標を求める
            const yamadaCoordinateAfterMoveX =
              yamada.mapX - tilemap.vx / WALKING_SPEED;
            const yamadaCoordinateAfterMoveY =
              yamada.mapY - tilemap.vy / WALKING_SPEED;
            //もし移動後のマップ座標に障害物があるならば、移動量に0を代入する
            if (
              tilemap.hasObstacle(
                yamadaCoordinateAfterMoveX,
                yamadaCoordinateAfterMoveY
              )
            )
              tilemap.vx = tilemap.vy = 0;
          }
        }

        //タイルマップのXとY座標両方がタイルのサイズで割り切れるとき以外で、タイルの半分のサイズで割り切れるとき
        else if (
          (tilemap.x + TILE_SIZE / 2) % (TILE_SIZE / 2) === 0 &&
          (tilemap.y + TILE_SIZE / 2) % (TILE_SIZE / 2) === 0
        ) {
          //0と1を交互に取得できる
          toggleForAnimation ^= 1;
          //toggleForAnimationの数値によって、山田先生の画像を切り替える
          if (toggleForAnimation === 0) yamada.animation = 2;
          else yamada.animation = 0;
        }
        //コンソールにマップ座標を表示（削除）
        //console.log( `${yamada.mapX} ${yamada.mapY}` );（削除）

        // //キーが押されたとき、山田先生（マップ）が移動する
        // if (game.input.left) tilemap.x += WALKING_SPEED;
        // if (game.input.right) tilemap.x -= WALKING_SPEED;
        // if (game.input.up) tilemap.y += WALKING_SPEED;
        // if (game.input.down) tilemap.y -= WALKING_SPEED;
        // }
        // //キーが押されたとき、山田先生が移動する
        // if (game.input.left) yamada.x -= WALKING_SPEED;
        // if (game.input.right) yamada.x += WALKING_SPEED;
        // if (game.input.up) yamada.y -= WALKING_SPEED;
        // if (game.input.down) yamada.y += WALKING_SPEED;
      }; //scene.onenterframe 終了
      //作ったシーンを返す
      return scene;
    }; //mainScene() 終了
    // //常に呼び出される
    // yamada.onenterframe = () => {
    //     //キーが押されたとき、山田先生が移動する
    //     if (game.input.left) yamada.x -= WALKING_SPEED;
    //     if (game.input.right) yamada.x += WALKING_SPEED;
    //     if (game.input.up) yamada.y -= WALKING_SPEED;
    //     if (game.input.down) yamada.y += WALKING_SPEED;
    // } //yamada.onenterframe 終了
    // //sceneに、山田先生のスプライト画像を追加して、とお願いする
    // scene.add(yamada);

    //gameに、シーンを追加して、とお願いする
    game.add(titleScene());
    game.add(mainScene());
    // game.add(scene);
    // //gameに、山田先生のスプライト画像を表示して、とお願いする
    // game.add(yamada);

    //gameに、ゲームをスタートして、とお願いする
    game.start();
  }); //main() 終了
});
