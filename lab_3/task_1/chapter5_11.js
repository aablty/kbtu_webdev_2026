// 5.11 Date and Time

// Create a date
let date1 = new Date(2012, 1, 20, 3, 12);
alert(date1);

// Show a weekday
function getWeekDay(date) {
  const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  return days[date.getDay()];
}

// European weekday
function getLocalDay(date) {
  let day = date.getDay();
  return day === 0 ? 7 : day;
}

// Which day of month was many days ago?
function getDateAgo(date, days) {
  let dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

// Last day of month
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

// How many seconds have passed today?
function getSecondsToday() {
  let now = new Date();
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((now - today) / 1000);
}

// How many seconds till tomorrow?
function getSecondsToTomorrow() {
  let now = new Date();
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return Math.floor((tomorrow - now) / 1000);
}

// Format the relative date
function formatDate(date) {
  let diff = new Date() - date;
  
  if (diff < 1000) {
    return 'right now';
  }
  
  if (diff < 60000) {
    return Math.floor(diff / 1000) + ' sec. ago';
  }
  
  if (diff < 3600000) {
    return Math.floor(diff / 60000) + ' min. ago';
  }
  
  let d = date.getDate().toString().padStart(2, '0');
  let m = (date.getMonth() + 1).toString().padStart(2, '0');
  let y = date.getFullYear().toString().slice(-2);
  let h = date.getHours().toString().padStart(2, '0');
  let min = date.getMinutes().toString().padStart(2, '0');
  
  return `${d}.${m}.${y} ${h}:${min}`;
}