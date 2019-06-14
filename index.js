const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const hook = require('./webhook.js');
var dispatcher;

function webhook(channel, title, message, color, avatar) { // This function uses quite a few options. The last 2 are optional.

    // Reassign default parameters - If any are blank.
    if (!channel) return console.log('Channel not specified.');
    if (!title) return console.log('Title not specified.');
    if (!message) return console.log('Message not specified.');
    if (!color) color = 'd9a744'; // This is an optional variable. Therefore the default HEX color will be whatever you post there. Mine will be d9a744
    if (!avatar) avatar = 'https://cdn.discordapp.com/attachments/522147724116885505/565188956782592032/JPEG_20190407_124902.jpg' // This is also an optional variable, you can change the default to any icon.

    // We want to remove spaces from color & url, since they might have it on the sides.
    color = color.replace(/\s/g, '');
    avatar = avatar.replace(/\s/g, '');

    // This is the start of creating the webhook
    channel.fetchWebhooks() // This gets the webhooks in the channel
        .then(webhook => {

            // Fetches the webhook we will use for each hook
            let foundHook = webhook.find('name', 'Webhook'); // You can rename 'Webhook' to the name of your bot if you like, people will see if under the webhooks tab of the channel.

            // This runs if the webhook is not found.
            if (!foundHook) {
                channel.createWebhook('Webhook', 'https://cdn.discordapp.com/attachments/522147724116885505/565188956782592032/JPEG_20190407_124902.jpg') // Make sure this is the same thing for when you search for the webhook. The png image will be the default image seen under the channel. Change it to whatever you want.
                    .then(webhook => {
                        // Finally send the webhook
                        webhook.send('', {
                            "username": title,
                            "avatarURL": avatar,
                            "embeds": [{
                                "color": parseInt(`0x${color}`),
                                "description":message
                            }]
                        })
                            .catch(error => { // We also want to make sure if an error is found, to report it in chat.
                                console.log(error);
                                return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                            })
                    })
            } else { // That webhook was only for if it couldn't find the original webhook
                foundHook.send('', { // This means you can just copy and paste the webhook & catch part.
                    "username": title,
                    "avatarURL": avatar,
                    "embeds": [{
                        "color": parseInt(`0x${color}`),
                        "description":message
                    }]
                })
                    .catch(error => { // We also want to make sure if an error is found, to report it in chat.
                        console.log(error);
                        return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                    })
                }

        })

}

bot.on("ready", async () => {
  console.log('elindultam');
  bot.user.setActivity('a MyCraft szerverén');

});




bot.on('message', message => {
    let msg = message.content.toUpperCase();
    let prefix = botconfig.prefix;
    let sender = message.author;
    let content = message.content.slice(prefix.lenght).split(" ");
    let args = content.slice(1);

    console.log(message.content +' '+ message.author.username);

    if (msg.startsWith(prefix + 'HELLO')) {
        // Create the attachment using Attachment
        // Send the attachment in the message channel
        message.channel.send("Hullo " + message.author);
        console.log(message.author + " üdvözölve");
    }

    if (msg.startsWith(prefix + 'ZENE')) {
      message.member.voiceChannel.join()
          .then(connection => { // Connection is an instance of VoiceConnection
            let args = message.content.slice(prefix.length + 4).split(" ");
            switch (args[1]) {
              case 'monody':
                dispatcher = connection.playFile('C:/Users/Deep Cool/Desktop/dc bot/monody.mp3');
                dispatcher.on('end', () => {
                  connection.disconnect() 
                });
                break;
              case 'feelgood':
                dispatcher = connection.playFile('C:/Users/Deep Cool/Desktop/dc bot/feel good.mp3');
                break;
              case 'rasmussen':
                dispatcher = connection.playFile('C:/Users/Deep Cool/Desktop/dc bot/rasmussen.mp3');
                break;
              default:
                console.log('Hiba');

            }



          });

   }

   if (msg.startsWith(prefix + 'PAUSE')) {

     dispatcher.pause();
   }

   if (msg.startsWith(prefix + 'RESUME')) {
     console.log("Asd");
     dispatcher.resume();
   }

   if (msg.startsWith(prefix + 'VOLUME')) {
     let args = message.content.slice(prefix.length + 4).split(" ");
     dispatcher.setVolume(args[0]);
   }

     if (msg.startsWith(prefix + 'KEZDŐ')) {
       message.member.addRole('536498398904451092')
       message.channel.send( message.author + " megkapta a " + message.author.role + " rangot." );
     }

     if (msg.startsWith(prefix + 'PREFIX')) {
       let hookArgs = message.content.slice(prefix.length + 6).split(" ");
       prefix = hookArgs[1];
     }

     if (msg.includes('FAIN')) {
       message.delete(0);
       message.author.send("Ne írj ijeneket!");
     }

     if (msg.startsWith(prefix + '+18')) {
       message.member.addRole('535097589960278046');
       message.channel.send(message.author + " most már használhatod palit!");
     }

     if (msg.startsWith(prefix + 'HOOK')) {
       // Delete the message that the user sends
      //  message.delete();
        if (msg === prefix + 'HOOK') { // This checks if the only thing they sent was 'Hook'
            return webhook(message.channel, 'Hook Használata', `${prefix}hook <cím>, <üzenet>, [HEXcolor], [avatarURL]\n\n**<> muszály\n[] választható**`,'FC8469','https://cdn4.iconfinder.com/data/icons/global-logistics-3/512/129-512.png') // Remeber that \n means new line. This is also using a custom HEX id, and an image.
        }
        let hookArgs = message.content.slice(prefix.length + 4).split(","); // This slices the first 6 letters (prefix & the word hook) then splits them by 'commas'
        webhook(message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]); // This is where it actually calls the hook.
     }

     if (msg.startsWith(prefix + "VSZÁMOLJ")) {
       if (args === '') return message.channel.send("Hiba!");
       let i = 10;
       message.channel.send("Countdown: " + i + "s").then(message => {
         var countInterval = setInterval(() => {
           if(i === 1) {
             message.edit(i = "Countdown complete.");
             return clearInterval(countInterval);
           }
           message.edit("Countdown: " + (i = i - 1) + "s")
         }, 1000);
       });
       message.delete;

}

    if (msg.startsWith(prefix + "SETGAME")) {
    //  if (message.memeber.role = message.guild.roles('Admin')) {
      let gmArgs = message.content.slice(prefix.length + 7).split(",");
      bot.user.setActivity(gmArgs[0]);
    //}
    }

    if (msg.startsWith(prefix + "SZABAJOK")) {
      message.delete();
      webhook(message.channel,'Szabájok','-Tilos az antiszemitizmus !\n\n-Tilos a rasszizmus ! \n\n-Folytonos káromkodás!(egy kettő nem baj de nem ajánlott)\n\n-Ne spamelj!\n\n-Ne hirdess más szervert,vagy discord csoportot!\n\n-**FONTOS!** A szabályok bármelyikét fölül írhatja egy Admin rangal rendeljező !','FC8469','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0gcx4xAipbECMA5Ve385Ten2XyDjsQH-Xpi1sNW-cUls0l1Y1gw');

    }

});



bot.login(botconfig.token);
