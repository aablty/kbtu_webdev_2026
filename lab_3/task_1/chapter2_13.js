let i = 3;

while (i) {
  alert(i--); // 3, 2, 1
}

let j = 0;
while (++j < 5) alert(j); // 1, 2, 3, 4

let k = 0;
while (k++ < 5) alert(k); // 1, 2, 3, 4, 5

for (let i = 0; i < 5; i++) alert(i); // 0, 1, 2, 3, 4
for (let i = 0; i < 5; ++i) alert(i); // 0, 1, 2, 3, 4

for (let i = 2; i <= 10; i++) {
  if (i % 2 == 0) {
    alert(i); // 2, 4, 6, 8, 10
  }
}

// replace 'for' with 'while'
for (let i = 0; i < 3; i++) {
  alert(`number ${i}!`);
}
let l = 0;
while (l < 3) {
  alert(`number ${l}!`);
  l++;
}

let num;
do {
  num = prompt("Enter a number greater than 100", "");
} while (num !== null && num !== "" && num <= 100);

// Output prime numbers from 2 to n
n = 10;

nextPrime: for (let i = 2; i <= n; i++) {
  for (let j = 2; j < i; j++) {
    if (i % j == 0) continue nextPrime;
  }
  alert(i);
}
