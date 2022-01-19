let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim();

// input = '2 3 1'
const [n, r, c] = input.split(' ').map(v => parseInt(v))
// const n = 3, r = 7, c = 7

let count = 0

function z(n, rs, ec) {
    
    if (n === 1) {
        if (r === rs && c === ec) return true;
        count++;
        if (r === rs && c === ec + 1) return true;
        count++;
        if (r === rs + 1 && c === ec) return true;
        count++;
        if (r === rs + 1 && c === ec + 1) return true;
        count++;
    } else {
        const nmVal = Math.pow(2, n - 1);
        // r,c의 사각형 영역찾기 n =4 일때 영역, n=3일때 영역
        if (r < rs + nmVal && c < ec + nmVal) {
            z(n-1, rs, ec)
        } else if (r < rs + nmVal  && c < ec + nmVal * 2) {
            count += nmVal * nmVal
            z(n-1, rs, ec + nmVal)
        } else if (r < rs + nmVal * 2 && c < ec + nmVal) {
            count += nmVal * nmVal * 2
            z(n-1, rs + nmVal, ec)
        } else {
            count += nmVal * nmVal * 3
            z(n-1, rs + nmVal, ec + nmVal)
        }
    }
}

z(n, 0, 0)
console.log(count)