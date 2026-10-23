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

	// part 1: a) tweet dates
	const times = tweet_array.map(t => t.time); // creates arrays of all times from all tweets in tweetsarray

	// firstDate & lastDate are placeholders located in index.html. innerText function updates these elements with the newly generated Date objects
	// the dates are found using the math min/max formulas to find the "smallest" date (earliest) and "largest" date (latest).
	// ...times takes the above times array and separates each element (each tweet's time) into its own argument rather than inputting the whole tweet array into the Math function. spread operator
	// the found min/max are then converted into Date objects, and then formatted with toLocaleDateString() for local timezone.
	document.getElementById('firstDate').innerText = new Date(Math.min(...times)).toLocaleDateString();
	document.getElementById('lastDate').innerText = new Date(Math.max(...times)).toLocaleDateString();

	// part 1: b) tweet categories. source getter function in tweet.ts determined categories for tweets
	const allCompletedEvents = tweet_array.filter(tweet => tweet.source == "completed_event"); // create an array with tweets that return completed_event when source getter (function in tweet.ts) is called
	const completedEventsAmt = allCompletedEvents.length; // num of tweets in completedEvents array
	document.getElementsByClassName('completedEvents')[0].innerText = completedEventsAmt; // replace the completedEvents placeholder in index.html with innerText. getElementsByClassName returns array of all elements that match class name, we want to set the first calling ([0])
	document.getElementsByClassName('completedEvents')[1].innerText = completedEventsAmt; // replace the second calling ([1]) of completedEvents in index.html
	
	const completedEventsWholePct = (completedEventsAmt / tweet_array.length) * 100
	document.getElementsByClassName('completedEventsPct')[0].innerText = completedEventsWholePct.toFixed(2)+"%";
	// console.log("% of completed events", (completedEventsAmt / tweet_array.length) * 100);

	const allLiveEvents = tweet_array.filter(tweet => tweet.source == "live_event");
	const liveEventsAmt = allLiveEvents.length;
	document.getElementsByClassName('liveEvents')[0].innerText = liveEventsAmt;
	
	const liveEventsWholePct = (liveEventsAmt / tweet_array.length) * 100;
	document.getElementsByClassName('liveEventsPct')[0].innerText = liveEventsWholePct.toFixed(2) + "%";
	// console.log("% of live events", (liveEventsAmt / tweet_array.length) * 100);

	const allAchievements = tweet_array.filter(tweet => tweet.source == "achievement");
	const achievementsAmt = allAchievements.length;
	document.getElementsByClassName('achievements')[0].innerText = achievementsAmt;
	
	const achievementsWholePct = (achievementsAmt / tweet_array.length) * 100;
	document.getElementsByClassName('achievementsPct')[0].innerText = achievementsWholePct.toFixed(2) + "%";
	// console.log("% of achievements", (achievementsAmt / tweet_array.length) * 100);

	const allMiscellaneous = tweet_array.filter(tweet => tweet.source == "miscellaneous");
	const miscellaneousAmt = allMiscellaneous.length;
	document.getElementsByClassName('miscellaneous')[0].innerText = miscellaneousAmt;
	
	const miscellaneousWholePct = (miscellaneousAmt / tweet_array.length) * 100;
	document.getElementsByClassName('miscellaneousPct')[0].innerText = miscellaneousWholePct.toFixed(2) + "%";
	
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});