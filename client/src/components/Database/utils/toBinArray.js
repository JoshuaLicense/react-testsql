const toBinArray = string => {
  const length = string.length;
  const typedArray = new Uint8Array(length);
  for (let i = 0; i < length; i++) typedArray[i] = string.charCodeAt(i);

  return typedArray;
};

export default toBinArray;
