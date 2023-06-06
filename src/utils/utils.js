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
