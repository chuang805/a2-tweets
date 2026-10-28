let writtenTweets = [];
function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	const tweet_array = runkeeper_tweets.map(function(tweet) {
        return new Tweet(tweet.text, tweet.created_at);
    });

    writtenTweets = tweet_array.filter(tweet => tweet.written);
	// console.log(writtenTweets.length);
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	document.getElementById("textFilter").addEventListener("input", function() {
        const searchTerm =
            document.getElementById("textFilter").value.toLowerCase();

        document.getElementById("searchText").innerText = searchTerm;
        const table = document.getElementById("tweetTable");
        table.innerHTML = "";

        if (searchTerm === "") {
            document.getElementById("searchCount").innerText = "0";
            return;
        }
        const matches = writtenTweets.filter(tweet =>
            tweet.writtenText.toLowerCase().includes(searchTerm)
        );
        document.getElementById("searchCount").innerText =
            matches.length;

        matches.forEach((tweet, index) => {
            table.innerHTML += tweet.getHTMLTableRow(index + 1);
        });
    });
	
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});