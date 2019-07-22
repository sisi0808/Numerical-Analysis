const NEPS = 0.0001;    // 許容誤差

function newton(c,flag) {
    console.log("ニュートン法による数値計算");
    console.log("初期値 c=" + c);
    var x=Newton(c,flag);
    console.log("近似解 x = " + x);
    return x;
}

function Newton(c,flag){
  var d;
  var i=1;
  if(flag == 1){
    while(1){
      d=c-func_x(c)/func_xx(c);
      console.log(i+++" "+d)
      if(Math.abs(c-d)<NEPS) break;
      else c=d;
    }
  }
  if(flag == 2){
    while(1){
      d=c-func_y(c)/func_yy(c);
      console.log(i+++" "+d)
      if(Math.abs(c-d)<NEPS) break;
      else c=d;
    }
  }
  if(flag == 3){
    while(1){
      d=c-func_z(c)/func_zz(c);
      console.log(i+++" "+d)
      if(Math.abs(c-d)<NEPS) break;
      else c=d;
    }
  }
  return d;
}
