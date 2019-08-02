const NEPS = 0.0001; // 許容誤差

function newton(c, flag) {
  console.log("ニュートン法による数値計算");
  console.log("B初期値 c=" + c);
  var array = Newton(c, flag);
  console.log("B近似解 x = " + array[array.length - 1]);
  return array;
}

function Newton(c, flag) {
  var array = [c];
  var d;
  var i = 1;
  if (flag == 1) {
    while (1) {
      d = c - func_x(c) / func_xx(c);
      console.log(i++ + " " + d)
      array.push(d);
      if (Math.abs(c - d) < NEPS) break;
      else c = d;
    }
  }
  if (flag == 2) {
    while (1) {
      d = c - func_y(c) / func_yy(c);
      console.log(i++ + " " + d)
      array.push(d);
      if (Math.abs(c - d) < NEPS) break;
      else c = d;
    }
  }
  if (flag == 3) {
    while (1) {
      d = c - func_z(c) / func_zz(c);
      console.log(i++ + " " + d)
      array.push(d);
      if (Math.abs(c - d) < NEPS) break;
      else c = d;
    }
  }
  console.log(array);
  return array;
}
