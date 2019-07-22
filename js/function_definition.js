// 関数 f(x) = x^3/18-5x-10 定義
function func_x( x ) {
    return Math.pow( x, 3.0 )/18 -5*x-10;
}
// f'(x)=x^2/6-5 定義
function func_xx( x ) {
    return Math.pow( x, 2.0 )/6 -5;
}

// 関数 f(x) = x^2/20-5  定義
function func_y( x ) {
    return Math.pow( x, 2.0 )/20-5;
}
// 関数 f'(x) = x/10  定義
function func_yy( x ) {
    return x/10;
}

// 関数 f(x) = (x/6)^3+x/3+1 定義
function func_z( x ) {
    return Math.pow( x/6, 3.0 ) +x/3 +1;
}
// 関数 f'(x) = 2*(x/6)^2+1/3 定義
function func_zz( x ) {
    return 2*Math.pow( x/6, 2.0 ) +1/3;
}
