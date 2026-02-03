// 5.12 JSON methods, toJSON

// Turn the object into JSON and back
let user = {
  name: "John Smith",
  age: 35,
};

let json = JSON.stringify(user);
console.log("JSON:", json); // {"name":"John Smith","age":35}

let userCopy = JSON.parse(json);
console.log("Parsed back:", userCopy); // {name: "John Smith", age: 35}

// Exclude backreferences
let room = {
  number: 23,
};

let meetup = {
  title: "Conference",
  occupiedBy: [{ name: "John" }, { name: "Alice" }],
  place: room,
};

// circular references
room.occupiedBy = meetup;
meetup.self = meetup;

let result = JSON.stringify(meetup, function replacer(key, value) {
  return key != "" && value == meetup ? undefined : value;
});

console.log("Result:", result);
/* Output:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
