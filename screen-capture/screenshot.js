/* global phantom,require,setTimeout */

var system = require("system");
var args = system.args;
var length = args.length;

if(length === 1){
    console.log("Usage: phantomjs screenshot.js <URL1 URL2 URL3...>");
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
            
            getUserInput(page);
            
            //Open URL
            page.open(arg, function(status) {
                if (status !== "success") {
                    console.log("Address: " + arg + ", " + page.reason + " status: " + status);
                    
                    if(length === (i+1)){
                            end();//end program
                    }
                }else{
                    // Add a little delay before capturing the image
                    setTimeout(function() {
                        page.render("screenshot-" + i + ".png", {format: "png"});
                        
                        if(length === (i+1)){
                            end();//end program
                        }
                    }, 2000);
                }
            });
        }
    });
}

/**
 * Asks for user/password, leave them empty if not required
 * @param page page object
 */
function getUserInput(page){
    system.stdout.writeLine("User:");
    var user = system.stdin.readLine();
    
    system.stdout.writeLine("Password:");
    var password = system.stdin.readLine();
    
    page.settings.userName = user;
    page.settings.password = password;
}

/**
 * Ends the program
 */
function end(){
    phantom.exit();
}
