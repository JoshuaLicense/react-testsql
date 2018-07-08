import defaultDatabase from "../../default.sqlite";

const getDatabase = () =>
  new Promise(async (resolve, reject) => {
    const cachedDatabase = localStorage.getItem("__testSQL_Database__");

    let typedArray;

    if (cachedDatabase) {
      typedArray = toBinArray(cachedDatabase);
    } else {
      // No cached database, load the default database.
      await fetch(defaultDatabase)
        .then(res => res.arrayBuffer())
        .then(arrayBuffer => {
          typedArray = new Uint8Array(arrayBuffer);
        });
    }

    return resolve(typedArray);
  });

export const saveDatabase = database =>
  localStorage.setItem("__testSQL_Database__", toBinString(database.export()));

export const toBinArray = string => {
  const length = string.length;
  const typedArray = new Uint8Array(length);
  for (let i = 0; i < length; i++) typedArray[i] = string.charCodeAt(i);

  return typedArray;
};

export const toBinString = typedArray =>
  typedArray.reduce((data, byte) => data + String.fromCharCode(byte), "");

export default getDatabase;
