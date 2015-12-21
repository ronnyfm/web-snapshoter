/* global phantom,require,setTimeout,setInterval,clearInterval */

var system = require("system");
var args = system.args;

if(length === 1){
    console.log("Usage: phantomjs batch-video.js --config <config.json>");
    end();
}else{
    // Iterate over URLs
    console.log("Reading config file...");
    
    args.forEach(function(arg, i) {
        if(i > 0){
            //read file
            urls = [
                {
                    url: "http://www.google.com"
                },
                {
                    url: "http://www.yahoo.com",
                    user: "test",
                    password: "my password"
                }
            ];
            
            var LENGTH = urls.length;
            var FRAMES = 100;//config.frames;
        }
    });
        
    urls.forEach(function(url, i) {
        var page = require("webpage").create();

        // For debugging purposes
        page.onResourceError = function(resourceError) {
            page.reason = resourceError.errorString;
        };
        console.log(i + ': ' + url);

        getCredentials(page);

        //Open URL
        page.open(url, function(status){
            if (status !== "success") {
                console.log("Address: " + url + ", " + page.reason + " status: " + status);

                if(length === (i+1)){
                    end();//end program
                }
            }else{
                // Add a little delay before capturing the image
                setTimeout(function(){
                    // Initial frame
                    var frame = 0;
                    // Add an interval every 25th second
                    var intervalId = setInterval(function(){
                        page.render("frames/" + i + "/screenshot-" + (frame < 10 ? "0"+frame : frame) + ".png", {format: "png"});

                        if(frame >= FRAMES){
                            if(length === (i+1)){
                                end();//end program
                            }
                            stopInterval(intervalId);//stop interval
                        }
                        frame++;
                    }, 20);
                }, 2000);
            }
        });
    });
}

/**
 * Ends the program
 */
function end(){
    phantom.exit();
}

/**
 * Clears a given interval
 * @param 
 */
function stopInterval(intervalId){
    clearInterval(intervalId);
}

/**
 * Reads the config 
 * @param page page object
 */
function getCredentials(page){

    
    page.settings.userName = user;
    page.settings.password = password;
}