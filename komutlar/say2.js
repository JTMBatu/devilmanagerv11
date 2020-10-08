const Discord = require("discord.js");
exports.run = function(client, message, args) {

let tag = "TAGINIZ"

  const mapping = {
  "0": "",
  "1": "",
  "2": "",
  "3": "",
  "4": "",
  "5": "",  //EMOJİLERİNİZ
  "6": "",
  "7": "",
  "8": "",
  "9": "",
};

    let cetoplam = message.guild.memberCount
    let ceonline = message.guild.members.filter(o => o.user.presence.status !== "offline").size
    let cesesli = message.guild.members.filter(s => s.voiceChannel).size 
    let cetagli = message.guild.members.filter(t => t.user.username.includes(tag)).size

let toplam =  
    `${cetoplam}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
let online =  
    `${ceonline}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")

let sesli =  
    `${cesesli}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
let tagli =  
    `${cetagli}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")

const embed = new Discord.RichEmbed()
.setTitle("**__SunucuAdı İstatistik__**")
.setDescription(`**Sunucumuz Toplam ${toplam} Kişidir !**\n\n**Sunucumuzdaki Aktif Üye Sayısı ${online} Kişidir !**\n\n**Ses Kanallarında Toplam ${sesli} Kişi Bulunmaktadır !**\n\n**Sunucumuzda Toplam ${tagli} Tane Taglı Üye Bulunmaktadır !**`)
message.channel.send(embed)        

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'say',
  description: 'taslak',
  usage: 'say',
};