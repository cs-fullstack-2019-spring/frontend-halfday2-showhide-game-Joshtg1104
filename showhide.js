// # JavaScript Show/Hide Game
// Take this simple show/hide game and make it your own.
// The starter project provides a simple example that displays a specified number of targets for the specified time (in ms).
// The player tries to remember where the targets were and click them to get points.
// There are many ways that this game can be improved.
// Not only can you style differently,
// but the starter version is missing several features you would expect in a typical game like this.
// It's up to you to implement them!
// ### YOU MUST IMPLEMENT AT LEAST 1 NEW AND COMMENTED FEATURE TO GET FULL POINTS
// Once complete, edit this README and identify the new feature you implemented AT THE BOTTOM of this README.
// Some Ideas:
// * Use a completely different theme with splash screen, different background(s) and image(s)
// * Add multiple levels with different backgrounds and/or targets
// * Start with 1 target and increment target count after each round and/or decrease the time the
// targets are displayed as rounds/levels are completed
// * Track the score for the player (assign any value to each correct answer you choose)
// * Add sound and other effects
// #### The starter project includes jQuery and BootStrap, but you can enhance the game using any technology that you wish
// ### I IMPLEMENTED THE FOLLOWING NEW FEATURE(S):
//### A timer that  counts down once button to start game is pressed.
//### Borders around clicked targets and all targets that were shown after time is up or click limit is reached.
//### Time's Up alert


let clicks = 0;
let targets = 0;
let hits = 0;
let count = 60;
var intervalID;
let theGo;

// Point of Entry called from HTML when page is loaded
function letsRock() {

    function time() {
        //creates a timer that counts down once the GO button is pressed.
        if (count === 0) {
            console.log("time");
            theGo.innerHTML = "TIME UP!!!";
            alert("TIME'S UP!!!");
            clearInterval(intervalID);
        } else {
            console.log("count");
            theGo.innerHTML = count;
        }
        count--;
    }


    theGo = document.getElementById("goGetIt");
    theGo.onclick = function () {
        // Get random number of targets and do setup
        const targetKount = document.getElementById("numberOfTargets").value;
        // Don't allow more than 50 targets as that's all the TDs we have
        if (targetKount > 50)
        {
            alert("Maximum number of targets is 50!");
            return;
        }
        const targetTime = document.getElementById("displayTime").value;
        // Now start the game!
        intervalID = setInterval(time, 1000);
        setUpTargetsAndPlay(parseInt(targetKount), parseInt(targetTime));
       //assigns number value to count variable
       count = 30;
    };


}

// Utility function to get a random table cell number
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// This function gets called if player hits a target
function clickedTarget(e) {
    console.log(e.target);
    // Let's get the hit item and store in a variable
    let hit = e.target.querySelector("img");

    /*  Do some sanity checks making sure there is an image and it has the 'display' style
        before we try to change the display property.
    */
    if (hit != null && hit.style.display != null) {
        // Make hit target image visible again
        e.target.querySelector("img").style.display = 'block';
    }
    console.log("Got a Hit!");
    // Update their hit score
    hits += 1;
    $(".targetImg").addClass("bang");
}

function testThis(el) {
    console.log(el);
}
// The main function that sets up targets and starts a game
function setUpTargetsAndPlay(numberOfTargets, displayTimeMs) {
    clicks = 0;
    targets = numberOfTargets;
    hits = 0;
    // Clear any target images from prior game (FIXME: Sometimes doesn't remove them all :-(
    $(".targetImg").remove();
    // Setup click detection for the entire table
    $("table").on("click", function () {
        clicks += 1;
        console.log("clicked = " + clicks + " Max = " + targets);
        if (clicks === targets) {  // Player out of clicks!
            clearInterval(intervalID);
            //connects timer function to click limit function
            theGo.innerHTML = "GO!";
            // FIXME: Sometime at end of game hits are more than 5 for some reason which should be impossible
            alert("No more clicks! You got " + hits + " out of " + targets);
            // Turn off click detection
            $("td").off("click");
            $("table").off("click");
            $(".targetImg").show(); // Show where all the targets were hidden
            $(".targetImg").addClass("boom");
        }
    });

    console.log("setting up " + targets + " targets");
    // Get the number of targets specified and randomly picks cells to display them in for the target table
    for (let x = 0; x < targets; x++) {
        let targetNum = getRandomInt(1, 50); // Pick a random table cell
        console.log("Table cell selected for target = " + targetNum);
        let tdID = "td" + targetNum;
        let imgID = "img" + targetNum;


        // Set an IMG for each randomly selected cell along with 'click' event handler
        $('#' + tdID).append("<img id = " + imgID + " class= 'targetImg' src='bird.png'>");
        // $('#' + imgID).delay(2000).show(0); // Wait 2 seconds then show the targets
        $('#' + imgID).delay(displayTimeMs).hide(0); // Setup a callback that will hide the images after the specified time
        $('#' + tdID).on("click", clickedTarget);
    }

}
