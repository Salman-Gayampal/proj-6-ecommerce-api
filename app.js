// EXPRESS SET UP
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// MAIN URIs
app.use("/users", userRoutes);
app.use("/products", productRoutes);

// MONGOOSE CONNECTION
mongoose.connect(`mongodb+srv://.jn16nn2.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', () => console.error('Connection Error'));
db.once('open', () => console.log('Connected to MongoDB!'));

app.listen(port, () => console.log(`API is now online at port ${port}`));