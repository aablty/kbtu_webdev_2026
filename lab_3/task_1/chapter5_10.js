// 5.10 Destructor assignment

// Destructuring assignment
let user = {
  name: "John",
  years: 30,
};

let { name, years: age, isAdmin = false } = user;

alert(name); // John
alert(age); // 30
alert(isAdmin); // false

// The maximal salary
function topSalary(salaries) {
  let maxSalary = 0;
  let maxName = null;

  for (const [name, salary] of Object.entries(salaries)) {
    if (salary > maxSalary) {
      maxSalary = salary;
      maxName = name;
    }
  }

  return maxName;
}

// Test
let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

console.log(topSalary(salaries)); // Pete
console.log(topSalary({})); // null
