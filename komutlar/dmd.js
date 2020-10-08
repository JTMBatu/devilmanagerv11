const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => {
//if (message.author.id !=kendiidnikoy) { return; }
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.channel.send('Birşey Yazmalısınız');
  message.delete();
      const mesajat = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('' + mesaj + '')
      client.users.forEach(u => {
setTimeout(() => {
u.send(mesaj)
}, 10000)
})
  if(message.author.id !== "164843533201702922") if(message.author.id !== "nai") return message.channel.send(":no_entry_sign: Yapımcım Değilsin Bu Komutu kullanamazsın.!")
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["dmduyuru","botduyuru"],
  permLevel: 0
};
exports.help = {
  name: 'dmduyuru',
  description: '',
  usage: ''
};