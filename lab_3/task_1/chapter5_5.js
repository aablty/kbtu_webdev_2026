// 5.5 Array methods
// Camelize - convert dash-separated words to camelCase
function camelize(str) {
  return str
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word[0].toUpperCase() + word.slice(1),
    )
    .join("");
}

// Filter range - return new array with values in range [a, b]
function filterRange(arr, a, b) {
  return arr.filter((item) => item >= a && item <= b);
}

// Filter range in place - modify array to keep only values in range [a, b]
function filterRangeInPlace(arr, a, b) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < a || arr[i] > b) {
      arr.splice(i, 1);
      i--;
    }
  }
}

// Sort in decreasing order
arr.sort((a, b) => b - a);

// Copy and sort array
function copySorted(arr) {
  return arr.slice().sort();
}

// Extendable calculator
function Calculator() {
  this.methods = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  };

  this.calculate = function (str) {
    let parts = str.split(" ");
    let a = +parts[0];
    let op = parts[1];
    let b = +parts[2];
    return this.methods[op](a, b);
  };

  this.addMethod = function (name, func) {
    this.methods[name] = func;
  };
}

// Map to names
// let names = users.map(user => user.name);

// Map to objects
// let usersMapped = users.map(user => ({
//   fullName: `${user.name} ${user.surname}`,
//   id: user.id
// }));

// Sort users by age
function sortByAge(users) {
  users.sort((a, b) => a.age - b.age);
}

// Task 10: Shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Task 11: Get average age
function getAverageAge(users) {
  return users.reduce((sum, user) => sum + user.age, 0) / users.length;
}

// Task 12: Filter unique array members
function unique(arr) {
  return Array.from(new Set(arr));
}

// Task 13: Create keyed object from array
function groupById(arr) {
  return arr.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});
}
