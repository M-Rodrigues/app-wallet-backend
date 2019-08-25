import app from "./app";
import db from "./db";
import Auth from "./models/Auth";

db.connect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server runinng on ${PORT}`);
});