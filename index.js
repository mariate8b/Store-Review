const { blueBright } = require('chalk');
const PORT = process.env.PORT || 3000;
const app = require('./api');
const db = require('./db');


const init = async () => {
  try {
    await db.$connect(); // Connect to the database
    app.listen(PORT, () => {
      console.log(blueBright(`Listening at http://localhost:${PORT}`));
    });
  } catch (error) {
    console.error('Error initializing the server:', error);
  }
};

init();
