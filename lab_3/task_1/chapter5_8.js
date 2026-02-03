// 5.8 weakmap and weakset

// Store "unread" flags using WeakSet
let messages = [
  { text: "Hello", from: "John" },
  { text: "How goes?", from: "John" },
  { text: "See you soon", from: "Alice" },
];

let readMessages = new WeakSet();

// Mark messages as read
readMessages.add(messages[0]);
readMessages.add(messages[1]);

// Check if a message was read
console.log("Was message 0 read?", readMessages.has(messages[0])); // true
console.log("Was message 2 read?", readMessages.has(messages[2])); // false

// When a message is removed from the array, it will be automatically
// removed from WeakSet when garbage collected

// Store read dates using WeakMap
let readDates = new WeakMap();

// Store when messages were read
readDates.set(messages[0], new Date(2023, 0, 1));
readDates.set(messages[1], new Date(2023, 0, 2));

// Check when a message was read
console.log("Message 0 read on:", readDates.get(messages[0]));
console.log("Message 1 read on:", readDates.get(messages[1]));
console.log("Message 2 read on:", readDates.get(messages[2])); // undefined

// When a message is removed from the array, the date entry will be
// automatically removed from WeakMap when garbage collected
