const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
  
   var başarılı = ['**Başarılı!** ✅'];
   var x = başarılı[Math.floor(Math.random() * başarılı.length)];

   var başarısız = ['**Başarısız!** ❌'];
   var x2 = başarısız[Math.floor(Math.random() * başarısız.length)];
  
  if (!message.member.hasPermission('OWNER')) return message.reply(`**${ayarlar.prefix}ban-kanal** isimli komutu kullanabilmek için \`SUNUCUYU YÖNET\` yetkisine sahip olman gerekiyor.`)
    if (!args[0]) return message.reply(`Sistemi kullanabilmek için, .ban-kanal ayarla/sıfırla #kanal yazmalısın.\nDetaylı bilgi için: .yardım ban-kanal`)
    if (args[0] == 'ayarla') {
 let kanal = message.mentions.channels.first() || message.guild.channels.get(args.join(' '))
  if (!kanal)     return message.channel.send(x2 + ` Bir kanal etiketle.`)
    db.set(`bankanal_${message.guild.id}`, kanal.id)
  let bankanal = await db.set(`bankanal_${message.guild.id}`, kanal.id)
  message.channel.send(x + `  Ban kanalı ${kanal} olarak ayarlandı.`)
  } 
  

  if (args[0] == 'sıfırla') {
    

    
    
    db.delete(`bankanal_${message.guild.id}`)

    message.channel.send(x + ` Ban kanalı başarıyla sıfırlandı.`)
  }
};
  
  
    
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['bankanal', 'banlog', 'ban-log'],
 permLevel: 0
};

exports.help = {
 name: 'ban-kanal',
 description: 'Birisi banulunca hangi kanala mesaj gideceğini ayarlarsınız.',
 usage: 'ban-kanal ayarla/sıfırla #kanal',
 kategori: '**AYARLAR**',
 permLvl: '**SUNUCUYU YÖNET**'
};