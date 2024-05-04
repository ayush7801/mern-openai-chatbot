import app from './app.js';
import { connectToDB } from './db_utilities/connections.js';
const PORT = process.env.PORT || 5000;
connectToDB().then(() => {
    // Listeners
    app.listen(PORT, () => { console.log(`Server is running on port ${PORT}...`); });
}).catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
});
//# sourceMappingURL=index.js.map