const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database")
// Handle uncauht error
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandle uncauht!");
    process.exit(1)
})
// config 
dotenv.config({path: 'backend/config/.env'});

// connecting database
connectDatabase() 
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});

// unhandle promise rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandle promise rejection!");

    server.close(() => {
        process.exit(1)
    })
})