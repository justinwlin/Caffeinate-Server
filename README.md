# Caffeinate-Server
Keeping Heroku Free Tier Servers Running

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
3) Give an hour in UTC time ex. 14, and my server will ping your server between 14 and 15 hours forward, it does wrap!

So: 14 + 15 = 29 - 24 = 5, So 14:00 to 5:00 UTC. 

4) Heroku requires servers to sleep for at minimum 7 hours a day! Which gives you 17 hours of on-time. BUT, i am only doing 15 hours in order to give servers 2 hours of leeway in case someone does come on an off-time and to let the server has some time to wake up. 

Here is the form below to type in the information: 
My server basically goes to the Google Sheet, parses it for the servers, and pings the servers every 5 mins

https://docs.google.com/forms/d/e/1FAIpQLSfEFuxpWgHSCAvsU4vxSSamS_i33hFPMWgcck0Z4gAw4ake7A/viewform

## If you want to build your own:
https://youtu.be/MiPpQzW_ya0

Used this video to help me figure out how to pull from Google Sheet API, and attached the index.js code in my Node.js express server as reference. 

Didn't include the package-json / my keys.json obviously, lol, but you should easily be able to tell what to npm install just based off my require imports.

## Information on Sleep State
https://blog.heroku.com/app_sleeping_on_heroku
