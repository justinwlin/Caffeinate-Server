# Caffeinate-Server
Keeping Heroku Free Tier Servers Running

https://docs.google.com/forms/d/e/1FAIpQLSfEFuxpWgHSCAvsU4vxSSamS_i33hFPMWgcck0Z4gAw4ake7A/viewform

## Explanation:
Heroku Free Tier servers fall asleep every 30 mins if someone doesn't visit your website. Making it insanely slow.
Thus, created a nodejs server to help keep your servers awake. 

There definitely are other options I've heard of: 
- New Relic Add-On
- Self-Pinging

Though I could never get them to work, I thought this solution would just be a bit more straight forward of copy and paste your URL and you are done.

## Explanation how to use:
1) Go to the Google Form
2) Type in the Base URL for your website (a heroku website). Has to be a **GET route!!**
ex. https://fakewebsite.herokuapp.com/
3) Check box however many you want for hours that you want the bot to ping your servers! CAREFUL THOUGH, free tiers NEED to sleep for 7 hours a day, so if you go beyond 17 boxes, it probably won't work!

Here is the form below to type in the information: 
My server basically goes to the Google Sheet, parses it for the servers, and pings the servers every 5 mins

https://docs.google.com/forms/d/e/1FAIpQLSfEFuxpWgHSCAvsU4vxSSamS_i33hFPMWgcck0Z4gAw4ake7A/viewform

## If you want to build your own:
https://youtu.be/MiPpQzW_ya0

Used this video to help me figure out how to pull from Google Sheet API, and attached the index.js code in my Node.js express server as reference. 

Didn't include the package-json / my keys.json obviously, lol, but you should easily be able to tell what to npm install just based off my require imports.

## Information on Sleep State
https://blog.heroku.com/app_sleeping_on_heroku

## Other Options:
Just found this out! But could always use this service to run free Cron Jobs!
https://cron-job.org/en/

## Reddit Post I made explaining the history of another service I used to use, other options, and a bit of other tricks to keeping your server alive! :) 

https://www.reddit.com/r/Heroku/comments/fyb60t/keeping_free_tier_heroku_servers_alive/
