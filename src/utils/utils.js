export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function shuffle(oldArray) {
  const array = oldArray;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function floatToPercentageString(value) {
  if (!value && value !== 0) {
    return null;
  }
  let percentage = (value * 100).toFixed(0);
  return percentage + "%";
}

const intervals = [
  { start: 0.51, color: "text-green-50" },
  { start: 0.53, color: "text-green-100" },
  { start: 0.55, color: "text-green-200" },
  { start: 0.57, color: "text-green-300" },
  { start: 0.59, color: "text-green-400" },
  { start: 0.41, color: "text-red-400" },
  { start: 0.43, color: "text-red-300" },
  { start: 0.45, color: "text-red-200" },
  { start: 0.47, color: "text-red-100" },
  { start: 0.49, color: "text-red-50" },
];

export function getWinRateClassName(value) {
  if (value > 0.49 && value < 0.51) {
    return "text-white";
  }
  if (value < 0.41) {
    return "text-red-500";
  }
  if (value > 0.59) {
    return "text-green-500";
  }
  let className = "text-blue-500";

  intervals.forEach((i) => {
    if (i.start < value && i.start + 0.02 >= value) {
      className = i.color;
    }
  });

  return className;
}

export function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return (
      Math.floor(interval) +
      (Math.floor(interval) === 1 ? " day ago" : " days ago")
    );
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return (
      Math.floor(interval) +
      (Math.floor(interval) === 1 ? " hour ago" : " hours ago")
    );
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return "";
}

export function convertSecondsToMinutesAndSeconds(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  return formattedMinutes + ":" + formattedSeconds;
}

export function convertSecondsToMinutesAndSeconds2(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  return formattedMinutes + "m  " + formattedSeconds + "s";
}

export function getKDA(obj) {
  return ((obj.kills + obj.assists) / obj.deaths).toFixed(1) || null;
}

export function formatNumber(number) {
  return new Intl.NumberFormat().format(number);
}

export function getTop3Rank(ranks) {
  const { top, jungle, mid, adc, support } = ranks;
  const arr = [top, jungle, mid, adc, support];
  arr.sort((a, b) => b - a);
  const top3 = arr.slice(0, 3);
  const sum = top3.reduce((acc, val) => acc + val, 0);
  return (sum / top3.length).toFixed(1);
}
