// 5.9 Object.keys, values, entries

// Sum the properties
function sumSalaries(salaries) {
  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }
  return sum;
}

// Count properties
function count(obj) {
  return Object.keys(obj).length;
}

// Test Task 1
let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

console.log(sumSalaries(salaries)); // 650
console.log(sumSalaries({})); // 0

// Test Task 2
let user = {
  name: "John",
  age: 30,
};

console.log(count(user)); // 2
