const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("**SUNUCUADI Moderation Yardım Menüsü**")
  .setDescription('')
  .setColor('RANDOM')
  .addField("<EMOJI EKLE> **__AFK__**", `**.afk <sebep>**`)
  .addField("<EMOJI EKLE> **__BAN__**", `**.ban @etiket <sebep>**`)
  .addField("<EMOJI EKLE> **__JAIL__**", `**.jail @etiket <sebep> <süre>**`)
  .addField("<EMOJI EKLE> **__KICK__**", `**.kick @etiket <sebep>**`)
  .addField("<EMOJI EKLE> **__GİT__**", `**.git @etiket**`)
  .addField("<EMOJI EKLE> **__GEL__**", `**.gel @etiket**`)
  .addField("<EMOJI EKLE> **__MUTE__**", `**.mute @etiket <sebep> <süre>**`)
  .addField("<EMOJI EKLE> **__SESLİ MUTE__**", `**.vmute @etiket <süre> <sebep>**`)
  .addField("<EMOJI EKLE> **__SAY__**", `**.say**`)
  .setFooter(`Komutu Kullanan Kişi: ${message.author.username}`) 
if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım', 'h', 'help'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};