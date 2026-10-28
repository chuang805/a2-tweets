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
        const strippedText = this.text.split(" https://")[0]; // take the half before " https://" with [0] index
        return strippedText.includes(" - ");
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        // part 1: c) user-written tweets
        const strippedText = this.text.split(" https://")[0]; // take the half before " https://" with [0] index. split returns string array, need to index below
        return strippedText.split(" - ")[1]; // take the part after " - " with [1] index; [0] is the RunKeeper generated text
    }

    get activityType():string {

        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        // part 2: a) determining activity type. only has to be done for completed tweets
        const words = this.text.split(" "); // turn entire text into array of String elements, split by " "
        let unitIndex; // empty variable for now, will set below
        if (words.indexOf("mi") !== -1) { // indexOf finds the index starting point of the word. indexOf = -1 when it cant find the word. so here, if it finds "mi", then...
            unitIndex = words.indexOf("mi");
        }
        else {
            unitIndex = words.indexOf("km"); // if the unit isnt mi, then it is km
        }

        // console.log(words.indexOf("mi"));
        // console.log(words.indexOf("km"));
        return words[unitIndex + 1]; // out of the word index, return the word right after the measurement unit 
    }
    
    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: parse the distance from the text of the tweet
        // part 2: a) determining distance. only for completed
        const words = this.text.split(" "); 
        let unitIndex;
        if (words.indexOf("mi") !== -1) { // mi doesnt have to be converted. so if this completed tweet is in miles...
            unitIndex = words.indexOf("mi");
            return Number(words[unitIndex - 1]); // convert the string at [1 before the index of mi] into a Number
        }
        else { // it's km, need to convert to miles
            unitIndex = words.indexOf("km");
            return (Number(words[unitIndex - 1]) / 1.609); // 1 mi = 1.609 km
        }
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}