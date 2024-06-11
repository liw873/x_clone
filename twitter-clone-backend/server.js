import express from 'express';
import mongoose from'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/twitter-clone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Tweet Schema
const tweetSchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Tweet = mongoose.model('Tweet', tweetSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Hello, welcome to the Twitter Clone API');
});

app.get('/tweets', async (req, res) => {
    try {
        const tweets = await Tweet.find().sort({ createdAt: -1 });
        res.json(tweets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/tweets', async (req, res) => {
    const tweet = new Tweet({
        text: req.body.text,
    });

    try {
        const newTweet = await tweet.save();
        res.status(201).json(newTweet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
