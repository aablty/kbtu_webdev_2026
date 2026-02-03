// 5.4 Arrays

// Is array copied?
// Answer: The array is NOT copied. Both variables reference the same array.
let fruits = ["Apples", "Pear", "Orange"];
let shoppingCart = fruits;
shoppingCart.push("Banana");
alert(fruits.length); // 4 (the array is modified through both references)

// Array operations
let styles = ["Jazz", "Blues"];
styles.push("Rock-n-Roll");
styles[Math.floor(styles.length / 2)] = "Classics";
alert(styles.shift());
styles.unshift("Rap", "Reggae");
console.log(styles); // ["Rap", "Reggae", "Classics", "Rock-n-Roll"]

// Calling in an array context
// Answer: It shows the entire array because 'this' refers to the array object
let arr = ["a", "b"];
arr.push(function () {
  alert(this);
});
arr[2](); // Shows: "a,b,function() { alert(this); }"

// Sum input numbers
function sumInput() {
  let numbers = [];

  while (true) {
    let value = prompt("Enter a number", 0);

    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let num of numbers) {
    sum += num;
  }
  return sum;
}

// A maximal subarray
function getMaxSubSum(arr) {
  let maxSum = 0;
  let currentSum = 0;

  for (let item of arr) {
    currentSum += item;
    maxSum = Math.max(maxSum, currentSum);
    if (currentSum < 0) currentSum = 0;
  }

  return maxSum;
}
