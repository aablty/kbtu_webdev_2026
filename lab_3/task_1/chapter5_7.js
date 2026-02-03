// 5.7 Map and Set

// Filter unique array members
function unique(arr) {
  return Array.from(new Set(arr));
}

// Filter anagrams
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    let sorted = word.toLowerCase().split("").sort().join("");
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

// Iterable keys
// The issue is that map.keys() returns an iterator, not an array
// Fix: Convert the iterator to an array using Array.from()
function fixIterableKeys() {
  let map = new Map();
  map.set("name", "John");

  let keys = Array.from(map.keys());
  keys.push("more");

  return keys;
}
