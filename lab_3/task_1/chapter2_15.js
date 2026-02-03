// 2.15 functions

function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    // ...
    return confirm("Did parents allow you?");
  }
}
// Will the function work differently if else is removed?
function checkAge(age) {
  if (age > 18) {
    return true;
  }
  // ...
  return confirm("Did parents allow you?");
} // No, both versions behave the same way.

// Rewrite the function using '?' or '||'
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm("Did parents allow you?");
  }
}

function checkAge(age) {
  return age > 18 ? true : confirm("Did parents allow you?");
}
function checkAge(age) {
  return age > 18 || confirm("Did parents allow you?");
}

function min(a, b) {
  return a < b ? a : b;
}

function pow(x, n) {
  let result = x;
  for (let i = 1; i < n; i++) {
    result *= x;
  }
  return result;
}
