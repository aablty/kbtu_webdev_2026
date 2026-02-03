// 2.11 logical operators

alert(null || 2 || undefined); // 2

alert(alert(1) || 2 || alert(3)); // alert(1), 2

alert(alert(1) && alert(2)); // alert(1), undefined

alert(null || (2 && 3) || 4); // 3

let age = 18;

if (age >= 14 && age <= 90) {
}

if (!(age >= 14 && age <= 90)) {
}
if (age < 14 && age > 90) {
}

if (-1 || 0) alert("first"); // will alert
if (-1 && 0) alert("second"); // won't alert
if (null || (-1 && 1)) alert("third"); // will alert