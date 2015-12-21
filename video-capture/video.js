/* global phantom,require,setTimeout,setInterval,clearInterval */

var system = require("system");
var args = system.args;
var length = args.length;

if(length === 1){
    console.log("Usage: phantomjs video.js <URL1 URL2 URL3...>");
    end();
}else{
    // Iterate over URLs
    console.log("Processing...");
    args.forEach(function(arg, i) {
        var page = require("webpage").create();
        
        if(i > 0){
            // For debugging purposes
            page.onResourceError = function(resourceError) {
                page.reason = resourceError.errorString;
            };
            console.log(i + ': ' + arg);
            
            getCredentials(page);
            
            //Open URL
            page.open(arg, function(status){
                if (status !== "success") {
                    console.log("Address: " + arg + ", " + page.reason + " status: " + status);
                    
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
                            
                            if(frame > 100){
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
        }
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
 * Asks for user/password, leave them empty if not required
 * @param page page object
 */
function getCredentials(page){
    system.stdout.writeLine("User:");
    var user = system.stdin.readLine();
    
    system.stdout.writeLine("Password:");
    var password = system.stdin.readLine();
    
    page.settings.userName = user;
    page.settings.password = password;
}