const config = {
  database: {
    // The maximum amount of database that a user can upload (default: 5)
    limit: 5,
    // The maximum size of database that can be saved (default: 1MB)
    maxSize: (1 * 1000 * 1000)
  },
};

module.exports = config;
