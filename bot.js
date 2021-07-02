const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
const PREFIX = "+";

client.on('ready', () => {
    console.log(`${client.user.tag} logged in.`)
});

client.on('message', (message) => {
    if (message.author.bot) return;

    console.log(`[${message.author.tag}]: ${message.content}`);

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);

        if (CMD_NAME === 'kick') {
            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply('you do not have permission to use that command');
            if (args.length === 0)
                return message.reply('please provide a user ID');

            const member = message.mentions.members.first();

            if (member) {
                member.kick()
                .then((member) => message.channel.send(`${member} was kicked.`))
                .catch((err) => message.channel.send('Could not kick that user'));
            } else {
                message.channel.send('Member not found');
            }
        }

        if (CMD_NAME === 'help') {
            const helpMessage = new Discord.MessageEmbed()
                .setTitle('Commands')
                .setColor([Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)])
                .setDescription(`${PREFIX}dice\n
                ${PREFIX}coin\n
                ${PREFIX}number`);
            
            message.channel.send(helpMessage);
        }

        if (CMD_NAME === 'dice') {
            let number = Math.floor(Math.random() * 6) + 1;

            const diceMessage = new Discord.MessageEmbed()
                .setTitle('Rolling a die')
                .setColor([Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)])
                .setDescription(`You rolled a [${number}]`);
            
            message.channel.send(diceMessage);
        }

        if (CMD_NAME === 'coin') {
            var coinResult;

            let coin = Math.floor(Math.random() * 2);

            if (coin === 1) {
                coinResult = 'HEADS';
            } else {
                coinResult = 'TAILS';
            }

            const coinMessage = new Discord.MessageEmbed()
                .setTitle('Flipping a coin')
                .setColor([Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)])
                .setDescription(`You flipped a [${coinResult}]`);
            
            message.channel.send(coinMessage);
        }

        if (CMD_NAME === 'number') {
            var number;

            if (args.length === 2) {
                number = Math.floor(Math.random() * (args[1] - args[0] + 1) + args[0]);
            } else {
                number = Math.floor(Math.random() * 100);
            }

            const numberMessage = new Discord.MessageEmbed()
                .setTitle('Generating a random number')
                .setColor([Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)])
                .setDescription(`Number: ${number}`);
            
            message.channel.send(numberMessage);
        }

        if (CMD_NAME === 'disco') {
            message.channel.send("https://youtu.be/zrsBjYukE8s");
        }
    }

    if (message.content.toLowerCase() === 'ping') {
        message.channel.send('pong!');
    } else if (message.content.toLowerCase() === 'pong') {
        message.channel.send('ping?');
    }
})

client.login(config.token)