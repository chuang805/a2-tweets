function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	// 2a updating spans for freq activity
	const activityCounts = {}; // will hold num of every acitivity counted, key:value pairs in this object
	tweet_array.forEach(tweet => { // for each tweet, 
		if (tweet.activityType !== 'unknown') {
			if (activityCounts[tweet.activityType]) { // if this activity type already exists in the activityCounts object
				activityCounts[tweet.activityType]++; // then it'll just add 1 more
			}
			else { // activity hasnt been found yet, so this is the first one counted
				activityCounts[tweet.activityType] = 1;
			}
		}
	});
	console.log(activityCounts);

	// turning activityCounts into Vega-Lite data for 2b
	const activityData = Object.entries(activityCounts).map( // Object.entries() turns the activityCounts object into an array, each object in the array is [key, value] array. an array of arrays
		([activity, count]) => ({ // map then turns each array in [key, value] form into objects in key: value format. .map() unpacks each array into an object
			activity: activity,
			count: count
		}) // so after unpacking, this is an array of objects that each contain a key:value pair; vega-lite can read these fields
	)

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activityData // changed from tweet_array to activityData
	  },
	//TODO: Add mark and encoding
	  "mark": "bar",
	  "encoding": {
		"x": {
			"field": "activity",
			"type": "nominal"
			},
		"y": {
			"field": "count",
			"type": "quantitative"
		}
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	// 2b) graphing activities by distance
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});