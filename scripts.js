document.addEventListener('DOMContentLoaded', () => {
    const tweetButton = document.getElementById('tweetButton');
    const tweetInput = document.getElementById('tweetInput');
    const tweetsContainer = document.getElementById('tweetsContainer');

    tweetButton.addEventListener('click', async () => {
        const tweetText = tweetInput.value.trim();
        if (tweetText) {
            await postTweet(tweetText);
            tweetInput.value = '';
            fetchTweets();
        }
    });

    async function fetchTweets() {
        const response = await fetch('http://localhost:5000/tweets');
        const tweets = await response.json();
        tweetsContainer.innerHTML = '';
        tweets.forEach(tweet => {
            addTweet(tweet.text);
        });
    }

    async function postTweet(text) {
        await fetch('http://localhost:5000/tweets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
    }

    function addTweet(text) {
        const tweetElement = document.createElement('div');
        tweetElement.className = 'tweet';
        tweetElement.innerHTML = `<p>${text}</p>`;
        tweetsContainer.insertBefore(tweetElement, tweetsContainer.firstChild);
    }

    fetchTweets();
});
