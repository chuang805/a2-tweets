function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	// console.log(tweet_array[0].text);
	// console.log(tweet_array[0].source);
	// console.log(tweet_array[0].activityType);
	// console.log(tweet_array[0].distance);
	
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
	// testing for tweets that say Just w/o distance, or activities with 2 words
	// tweet_array.forEach(tweet => {
    // if (
    //     // tweet.activityType === "Just" 
	// 	// ||
    //     tweet.activityType === "chair"
    // ) {
    //     console.log(tweet.text);
    // }
	// });

	// write num of activities on activities html
	const numActivityTypes = Object.keys(activityCounts).length;
	document.getElementById('numberActivities').innerText = numActivityTypes;

	// turning activityCounts into Vega-Lite data for 2b plot 1
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
	const sortedActivities = Object.entries(activityCounts).sort((a, b) => b[1] - a[1]);
	const topThree = [
    sortedActivities[0][0],
    sortedActivities[1][0],
    sortedActivities[2][0]
	];

	// from plot 1: write 3 most logged tweets on activities page
	document.getElementById('firstMost').innerText = topThree[0];
	document.getElementById('secondMost').innerText = topThree[1];
	document.getElementById('thirdMost').innerText = topThree[2];

	// plot 2
	const activityDistanceData = tweet_array
    .filter(tweet => topThree.includes(tweet.activityType))
    .map(tweet => ({
        activity: tweet.activityType,
        distance: tweet.distance,
        day: tweet.time.toLocaleDateString('en-US', {
            weekday: 'short'
        })
    }));
	
	distance_vis_spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

    "description": "Distances by weekday for top three activities",

    "data": {
        "values": activityDistanceData
    },

    "mark": "point",
    "encoding": {
        "x": {
            "field": "day",
            "type": "nominal",
            "sort":	
				[
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
			"title": "time (day)"
        },
        "y": {
            "field": "distance",
            "type": "quantitative"
        },
        "color": {
            "field": "activity",
            "type": "nominal"
        	}
    	}
	};
	vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});

	// // from plot 2: write what people did the longest and shortest distance out of those 3 on activities page (can be hardcoded?)
	// document.getElementById('longestActivityType').innerText = "idk";
	// document.getElementById('shortestActivityType').innerText = "idk";

	// plot 3
	mean_distance_spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

    "data": {
        "values": activityDistanceData
    },

    "mark": "point",

    "encoding": {
        "x": {
            "field": "day",
            "type": "nominal",
            "sort": [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            "title": "time (day)"
        },
        "y": {
            "field": "distance",
            "type": "quantitative",
            "aggregate": "mean",
            "title": "Mean of distance"
        },
        "color": {
            "field": "activity",
            "type": "nominal"
        	}
    	}
	};

	// button that switches between distances of top 3 for whole week vs aggregated by mean
	let showMeans = false;
	document.getElementById("aggregate").addEventListener("click", () => {
		if (showMeans) {
			vegaEmbed('#distanceVis', distance_vis_spec, { actions: false });
			document.getElementById("aggregate").innerText = "Show means";
		} else {
			vegaEmbed('#distanceVis', mean_distance_spec, { actions: false });
			document.getElementById("aggregate").innerText = "Show all activities";
		}
		showMeans = !showMeans;
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});