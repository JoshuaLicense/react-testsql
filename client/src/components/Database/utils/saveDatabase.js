import toBinString from "./toBinString";

const saveDatabase = database =>
  localStorage.setItem("__testSQL_Database__", toBinString(database.export()));

export default saveDatabase;
