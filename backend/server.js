const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
// Handle uncauht error
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandle uncauht!");
    process.exit(1)
})
// config 
dotenv.config({path: 'backend/config/config.env'}); 

// connecting database
connectDatabase();

// CONNECT WITH cloudinary FOR FILE UPLOAD 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

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