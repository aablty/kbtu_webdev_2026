// 2.17 arrow functions

// Rewrite with arrow functions
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
  function () {
    alert("You agreed.");
  },
  function () {
    alert("You canceled the execution.");
  },
);

ask(
  "Do you agree?",
  () => alert("You agreed."),
  () => alert("You canceled the execution."),
);
