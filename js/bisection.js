const BEPS = 0.0001; // constは定数の定義

function bisection(a,b,flag) {
  var x = nibun(a, b, flag); // 解
  console.log("2分法による数値計算");
  console.log("初期値 a=" + a);
  console.log("初期値 b=" + b);
  console.log("近似解 x = " + x);
  return x;
}

function nibun(a, b, flag) {
  var c;
  var i = 1;
  if (flag == 1) {
    do {
      c = (a + b) / 2.0; // 2分計算
      console.log(i++ + " " + c); //実行回数とcの途中経過
      if ((func_x(c) * func_x(a)) < 0) b = c; // 式(1.2)
      else a = c; // 式(1.3)
    } while (Math.abs(a - b) > BEPS); // 収束判別　式(1.4)の変形
  }
  else if (flag == 2) {
    do {
      c = (a + b) / 2.0; // 2分計算
      console.log(i++ + " " + c); //実行回数とcの途中経過
      if ((func_y(c) * func_y(a)) < 0) b = c; // 式(1.2)
      else a = c; // 式(1.3)
    } while (Math.abs(a - b) > BEPS); // 収束判別　式(1.4)の変形
  }
  else if (flag == 3) {
    do {
      c = (a + b) / 2.0; // 2分計算
      console.log(i++ + " " + c); //実行回数とcの途中経過
      if ((func_z(c) * func_z(a)) < 0) b = c; // 式(1.2)
      else a = c; // 式(1.3)
    } while (Math.abs(a - b) > BEPS); // 収束判別　式(1.4)の変形
  }
  return c;
}
