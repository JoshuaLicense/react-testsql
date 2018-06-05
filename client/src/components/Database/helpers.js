import defaultDatabase from "../../default.sqlite";

const getDatabase = async () =>
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

export const saveDatabase = database => {
  localStorage.setItem("__testSQL_Database__", toBinString(database.export()));
};

export function toBinArray(str) {
  var l = str.length,
    arr = new Uint8Array(l);
  for (var i = 0; i < l; i++) arr[i] = str.charCodeAt(i);
  return arr;
}

export function toBinString(arr) {
  return arr.reduce((data, byte) => data + String.fromCharCode(byte), "");
}

export default getDatabase;
