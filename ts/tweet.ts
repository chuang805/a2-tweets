class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        // part 1: b) tweet categories
        if (this.text.includes("Just completed") || this.text.includes("Just posted")) {
            return "completed_event"; // most common, placed this first
        }
        else if (this.text.includes("#RKLive")) {
            return "live_event";
        }
        else if (this.text.includes("#FitnessAlerts") || this.text.includes("just set a goal")) {
            return "achievement";
        }
        return "miscellaneous"; // if none of the above
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        // part 1: c) user-written tweets
        console.log("TEST TEST");
        const strippedText = this.text.split(" https://")[0];
        console.log(strippedText);
        return strippedText.includes(" - ");
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        // part 1: c) user-written tweets
        const strippedText = this.text.split(" https://")[0]; // take the half before " https://" with [0] index
        return strippedText.split(" - ")[1]; // take the part after " - " with [1] index; [0] is the RunKeeper generated text
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}