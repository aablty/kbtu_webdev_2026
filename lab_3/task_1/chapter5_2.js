// 5.2 numbers
// Task 1: Sum numbers from the visitor
let num1 = +prompt("Enter first number:", "");
let num2 = +prompt("Enter second number:", "");
alert(num1 + num2);

// Task 2: Why 6.35.toFixed(1) == 6.3?
// Internally, 6.35 is actually 6.34999999999... due to binary representation
// To fix: multiply, round, then divide
alert((6.35 * 10).toFixed(20)); // shows 63.49999...
alert(Math.round(6.35 * 10) / 10); // 6.4

// Task 3: Repeat until the input is a number
function readNumber() {
  let num;
  do {
    num = prompt("Enter a number:", "");
    if (num === null || num === "") return null;
  } while (isNaN(num));
  return +num;
}

// Task 4: An occasional infinite loop
// The loop is infinite because 0.2 cannot be represented precisely in binary
// After accumulation, i will never exactly equal 10
// Fix: use integer comparison or tolerance check
let i = 0;
while (i < 10) {
  i += 0.2;
}

// Task 5: A random number from min to max
function random(min, max) {
  return min + Math.random() * (max - min);
}

// Task 6: A random integer from min to max
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min + 1);
  return Math.floor(rand);
}
