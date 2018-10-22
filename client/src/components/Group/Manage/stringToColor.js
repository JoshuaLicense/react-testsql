const colorCache = {};

const stringToColor = string => {
  if (colorCache[string]) return colorCache[string];

  let hash = 0;

  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;

    color += ("00" + value.toString(16)).substr(-2);
  }

  // Save the cached color for next time.
  colorCache[string] = color;

  return color;
};

export default stringToColor;
