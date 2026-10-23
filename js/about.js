function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	

	console.log(document.getElementById('numberTweets'));

	// part 1: a) tweet dates
	const times = tweet_array.map(t => t.time); // creates arrays of all times from all tweets in tweetsarray

	// firstDate & lastDate are placeholders located in index.html. innerText function updates these elements with the newly generated Date objects
	// the dates are found using the math min/max formulas to find the "smallest" date (earliest) and "largest" date (latest).
	// ...times takes the above times array and separates each element (each tweet's time) into its own argument rather than inputting the whole tweet array into the Math function. spread operator
	// the found min/max are then converted into Date objects, and then formatted with toLocaleDateString() for local timezone.
	document.getElementById('firstDate').innerText = new Date(Math.min(...times)).toLocaleDateString();
	document.getElementById('lastDate').innerText = new Date(Math.max(...times)).toLocaleDateString();
	document.getElementById('numberTweets').innerText = "Help Me";
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});