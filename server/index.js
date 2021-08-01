const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")
const PORT = 4000;
const mongoDB = 'mongodb://localhost/social';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
app.use(cors());
app.use(express.json())
app.use(helmet())
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter)
app.listen(PORT, () => { console.log(`Server running on ${PORT}`) })