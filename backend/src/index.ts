import app from './app.js';
import { connectToDB } from './db_utilities/connections.js';

console.log("process.env", process.env.GEMINI_API_KEY);
const PORT = process.env.PORT || 3000;
connectToDB().then(() => {
  // Listeners
  app.listen(PORT, () => {console.log(`Server is running on port ${PORT}...`)});
}).catch((error) => {
  console.log("Error connecting to MongoDB: ", error);
});
