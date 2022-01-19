let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split(' ');

const n = parseInt(input)

// n = 4
// console.log(n)
const queue = []
console.log(Math.pow(2, n) - 1)
hanoi(1, 3, 2, n)
function hanoi(start, dest, extra, n) {
    if (n <= 1) {
        queue.push(`${start} ${dest}`)
        // console.log(`${start} ${dest}`);
        return;
    }
    hanoi(start, extra, dest, n - 1)
    // console.log(`${start} ${dest}`)
    queue.push(`${start} ${dest}`)
    hanoi(extra, dest, start, n - 1)
}

console.log(queue.join('\n'))