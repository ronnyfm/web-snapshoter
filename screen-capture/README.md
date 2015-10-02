# Instructions

__Pre-requisites__

- Phantomjs

__Running__

phantomjs screenshot.js http://yoururl.com

You will be asked for user/password for each URL, if required. Otherwise, just press enter to continue

If you encounter issues, specially if accessing https (SSL handshake failed), then run:

phantomjs --ignore-ssl-errors=true --ssl-protocol=any screenshot.js http://yoururl.com

It will create screenshot-1.png, screenshot-2.png, etc.