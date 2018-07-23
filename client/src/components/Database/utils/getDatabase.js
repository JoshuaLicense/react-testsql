import toBinArray from "./toBinArray";

import defaultDatabase from "./default.sqlite";

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

export default getDatabase;
