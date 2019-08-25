const app = require('./app');
const db = require('./db');

db.connect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server runinng on ${PORT}`);
});