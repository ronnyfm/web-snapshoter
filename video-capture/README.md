# Instructions

__Pre-requisites__

- Phantomjs
- ffmpeg

__Running__

First run phantomjs

You will be asked for user/password for each URL, if required. Otherwise, just press enter to continue

If you encounter issues, specially if accessing https (SSL handshake failed), then run:

phantomjs --ignore-ssl-errors=true --ssl-protocol=any video.js http://yoururl.com

It will create frames/1/screenshot-01.png, frames/2/screenshot-01.png, etc.

Then run ffmpeg, like this:

ffmpeg -i frames/i/screenshot-%02d.png -c:v libx264 -r 25 -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2"  out.mp4
