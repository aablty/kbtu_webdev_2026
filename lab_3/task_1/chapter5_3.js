// 5.3 strings

// Uppercase the first character
function ucFirst(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

// Check for spam
function checkSpam(str) {
  const lowerStr = str.toLowerCase();
  return lowerStr.includes("viagra") || lowerStr.includes("xxx");
}

// Truncate the text
function truncate(str, maxlength) {
  if (str.length <= maxlength) {
    return str;
  }
  return str.slice(0, maxlength - 1) + "…";
}

// Extract the money
function extractCurrencyValue(str) {
  return +str.slice(1);
}
