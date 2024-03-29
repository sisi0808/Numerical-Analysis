class simulator {

  constructor(elm1, elm2, mode) {
    this.elm1 = elm1; // HTML要素を記憶しておく
    this.elm2 = elm2; // （必要な場合のみ）

    this.vc1 = new VCanvas(elm1); // VCanvasの初期化
    this.vc2 = new VCanvas(elm2); // VCanvasの初期化
    this.vc1.scale(-50, 50, 100, -100); // スケールの設定
    this.vc2.scale(-50, 50, 100, -100); // スケールの設定
    this.forflag = 1; //使う関数のflag（入力により変化)
    this.A = 15.0; //aの設定（入力により変化）
    this.B = 5.0; //bの設定（入力により変化）
    this.C = 15.0; //cの設定（入力により変化）
    this.i = 0; //２分法計算回数管理
    this.j = 0; //ニュートン法計算回数管理

    var timer1 = new vbTimer(); // アニメーションする場合，vbTimerを使う
    timer1.interval = 500; // アニメーションの動作間隔
    var nl = new nylon(); // イベントエミッタの初期化

    this.background(); // 背景を描画

    if (mode == "bisection") {
      var result;
      timer1.timer = () => {
        if (this.i == 0)  //timerが始動した一番最初だけ行う処理
          result = bisection(this.A, this.B, this.forflag); //二分法を計算
        this.vc1.cls(); // 一旦画面を消去
        this.vc1.beginPath();
        this.vc1.forecolor(255, 0, 0);
        this.vc1.setFont("bold " + 25 + "px Arial, meiryo, sans-serif");

        if (this.forflag == 1) {
          this.vc1.line(result[this.i].a, 0, result[this.i].a, func_x(result[this.i].a)); //aのライン
          this.vc1.line(result[this.i].b, 0, result[this.i].b, func_x(result[this.i].b)); //bのライン
          this.vc1.print(result[this.i].a - 1.5, 0, "a");
          this.vc1.print(result[this.i].b - 1.5, 0, "b");
        } else if (this.forflag == 2) {
          this.vc1.line(result[this.i].a, 0, result[this.i].a, func_y(result[this.i].a)); //aのライン
          this.vc1.line(result[this.i].b, 0, result[this.i].b, func_y(result[this.i].b)); //bのライン
          this.vc1.print(result[this.i].a - 1.5, 0, "a");
          this.vc1.print(result[this.i].b - 1.5, 0, "b");
        } else if (this.forflag == 3) {
          this.vc1.line(result[this.i].a, 0, result[this.i].a, func_z(result[this.i].a)); //aのライン
          this.vc1.line(result[this.i].b, 0, result[this.i].b, func_z(result[this.i].b)); //bのライン
          this.vc1.print(result[this.i].a - 1.5, 0, "a");
          this.vc1.print(result[this.i].b - 1.5, 0, "b");
        }
        this.vc1.stroke();
        this.i++;
        if (this.i >= result.length) {
            this.vc1.cls(); // 一旦画面を消去
          this.vc1.circle(result[result.length - 1], 0, 10);
          this.vc1.stroke();
          this.i = 0;
          timer1.disable();
        }
      }
    }

    if (mode == "newton") {
      var result;
      timer1.timer = () => {
        if (this.j == 0)  //timerが始動した一番最初だけ行う処理
          result = newton(this.C, this.forflag); //ニュートン法を計算

        this.vc1.cls(); // 一旦画面を消去
        this.vc1.beginPath();
        this.vc1.forecolor(255, 0, 0);
        this.vc1.setFont("bold " + 25 + "px Arial, meiryo, sans-serif");

        if (this.forflag == 1) {
          this.vc1.line(result[this.j], 0, result[this.j], func_x(result[this.j])); //縦のaのライン
          this.vc1.print(result[this.j] - 1.5, 0, "c");
        } else if (this.forflag == 2) {
          this.vc1.line(result[this.j], 0, result[this.j], func_y(result[this.j])); //縦のaのライン
          this.vc1.print(result[this.j] - 1.5, 0, "c");
        } else if (this.forflag == 3) {
          this.vc1.line(result[this.j], 0, result[this.j], func_z(result[this.j])); //縦のaのライン
          this.vc1.print(result[this.j] - 1.5, 0, "c");
        }

      this.vc1.stroke();
      this.j++;
      if (this.j >= result.length) {
          this.vc1.cls(); // 一旦画面を消去
        this.vc1.circle(result[result.length - 1], 0, 10);
        this.vc1.stroke();
        this.j = 0;
        timer1.disable();
      }
    }
  }

  // 例えばstartのイベントが来たらタイマーを動かす
  nl.on("start", (key, params) => {
    timer1.enable();
  });
  // 例えばstopのイベントが来たらタイマーを止める
  nl.on("stop", (key, params) => {
    timer1.disable();
  });
  // 指定のボタンが押されたとき関数を設定する
  nl.on("formura", (key, params) => {
    this.i = this.j = 0;  //timerで使う変数を初期化
    this.forflag = params["F(x)"];
    this.background();
    //timer1.timer();
  });
  // テキストボックスに入力された値を元にaを決定
  nl.on("Aborder", (key, params) => {
    this.A = params["A"];
    this.background();
    //timer1.timer();
  });
  // テキストボックスに入力された値を元にbを決定
  nl.on("Bborder", (key, params) => {
    this.B = params["B"];
    this.background();
    //timer1.timer();
  });
  // テキストボックスに入力された値を元にcを決定
  nl.on("Cborder", (key, params) => {
    this.C = params["C"];
    this.background();
    //timer1.timer();
  });
  // その他のイベントが必要ならばここに書く
}

background() {
  this.vc1.cls(); // 消去
  this.vc2.cls(); // 消去
  // 背景を描画
  this.vc2.beginPath();
  this.vc2.line(-50, 0, 50, 0); //横軸のライン
  for (var i = -50; i <= 50; i += 10) { //横軸の目盛り
    var h = String(i);
    this.vc2.print(i - 1.5, 0, h); //-1.2は文字を座標に合わせるための調整
  }
  this.vc2.line(0, 50, 0, -50); //縦軸のメモリ
  for (var i = -50; i <= 50; i += 10) { //縦軸の目盛り
    var h = String(i);
    this.vc2.print(0, i - 1.5, h); //-1.2は文字を座標に合わせるための調整
  }
  if (this.forflag == 1) {
    this.vc2.lineStart(-50, func_x(-50)); //x=-50から開始
    for (var i = -50; i <= 50; i++) {
      var y = func_x(i); //function_definition.js内で関数を計算
      this.vc2.lineto(i, y);
    }
  } else if (this.forflag == 2) {
    this.vc2.lineStart(-50, func_y(-50)); //x=-50から開始
    for (var i = -50; i <= 50; i++) {
      var y = func_y(i); //function_definition.js内で関数を計算
      this.vc2.lineto(i, y);
    }
  } else if (this.forflag == 3) {
    this.vc2.lineStart(-50, func_z(-50)); //x=-50から開始
    for (var i = -50; i <= 50; i++) {
      var y = func_z(i); //function_definition.js内で関数を計算
      this.vc2.lineto(i, y);
    }
  }

  this.vc2.stroke();
}
}

// ボタンに対するイベントの割り当てはここで
var guisetup = () => {
  var nl = new nylon();
  document.querySelector("#start").addEventListener("click", () => {
    nl.emit("start", null);
  });
  document.querySelector("#stop").addEventListener("click", () => {
    nl.emit("stop", null);
  });
  document.querySelector("#a01").addEventListener("click", () => {
    nl.emit("stop", null);
    nl.emit("Aborder", {
      "A": parseInt(document.getElementById("textbox1").value)
    });
  });
  document.querySelector("#a02").addEventListener("click", () => {
    nl.emit("stop", null);
    nl.emit("Bborder", {
      "B": parseInt(document.getElementById("textbox2").value)
    });
  });
  document.querySelector("#a03").addEventListener("click", () => {
    nl.emit("stop", null);
    nl.emit("Cborder", {
      "C": parseInt(document.getElementById("textbox3").value)
    });
  });
  document.querySelector("#b02").addEventListener("click", () => {
    nl.emit("stop", null);
    nl.emit("formura", {
      "F(x)": 1
    });
  });
  document.querySelector("#b03").addEventListener("click", () => {
    nl.emit("stop", null);
    nl.emit("formura", {
      "F(x)": 2
    });
  });
  document.querySelector("#b04").addEventListener("click", () => {
    nl.emit("stop", null);
    nl.emit("formura", {
      "F(x)": 3
    });
  });
}

window.addEventListener("load", function(e) {
  guisetup(); // ボタンにイベントを割り当てる

  x = new simulator(
    document.querySelector('#graph1'),
    document.querySelector('#graph1b'),
    "bisection"
  );

  x = new simulator(
    document.querySelector('#graph2'),
    document.querySelector('#graph2b'),
    "newton"
  );
});
