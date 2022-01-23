// let fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim();

// 3, 6, 12, 24, 48
input = 12;

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

// K 와 bottom을 구한다.
const k = getBaseLog(2, input / 3)
const bottom = Math.pow(2, k) * 5 + Math.pow(2, k) - 1;


const drawmap = []

for (let i = 0; i < input; i++) {
  drawmap.push([])
  for (let j = 0; j < bottom; j++) {
    drawmap[i].push('_')
  }
}

function printMap() {
  for (let i = 0; i < input; i++) {
    console.log(drawmap[i].join(''))
  }
}

printMap();
console.log('===>', k, input, bottom)
rec(k, 0, bottom, 0, input)
printMap();

function rec(k, sm, em, sc, ec) {
  const middle = sm + Math.ceil((em - sm) / 2) - 1;
  const colMiddle = sc + Math.ceil((ec - sc) / 2)
  if (k === 0) {
    console.log(middle, sm, em ,sc, ec)
    // 삼각형 그리기
    for (let i = 0; i < 3; i++) {
      drawmap[sc + i][middle - i] = '*';
      drawmap[sc + i][middle + i] = '*';
      drawmap[sc + 2][middle + i - 1] = '*'
    }
    console.log('=======')
    printMap()
  } else {
    // console.log(middle, col)
    // 가장위 꼭지점이 0 인경우
    // const colMiddle = Math.ceil((ec - sc) / 2)
    rec(k - 1, sm, sm + Math.ceil(em - middle / 2), sc, colMiddle)
    rec(k - 1, sm, middle, colMiddle, ec)
    rec(k - 1, sm + middle + 1, em - sm, colMiddle, ec)
  }
}
