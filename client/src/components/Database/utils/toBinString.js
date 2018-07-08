const toBinString = typedArray =>
  typedArray.reduce((data, byte) => data + String.fromCharCode(byte), "");

export default toBinString;
