const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
const prefix = ayarlar.prefix

exports.run = async(client, message, args) => {
  
   var başarılı = ['**Başarılı!** ✅'];
   var x = başarılı[Math.floor(Math.random() * başarılı.length)];

   var başarısız = ['**Başarısız!** ❌'];
   var x2 = başarısız[Math.floor(Math.random() * başarısız.length)];
  
if (!message.member.hasPermission('OWNER')) return message.reply(`**${ayarlar.prefix}jail-yetkilisi ayarla/sıfırla** isimli komutu kullanabilmek için \`SUNUCUYU YÖNET\` yetkisine sahip olman gerekiyor.`)
if (!args[0]) return message.reply(`Sistemi kullanabilmek için, ${prefix}jail-yetkilisi ayarla/sıfırla @rol yazmalısın.\nDetaylı bilgi için: ${prefix}yardım sustur-kanal`)
   
  
  if (args[0] == 'ayarla') {
  
  let yetkilirol = message.mentions.roles.first() || message.guild.roles.find(c => c.name === args[1].join(' '))
  if (!yetkilirol) return message.channel.send(x2 + ` Bir rol etiketle.`)
  
  db.set(`jailyetkilisi_${message.guild.id}`, yetkilirol.id)
  message.channel.send(x + ` Jail yetkilisi ${yetkilirol} olarak ayarlandı.`)
  } 
  

  if (args[0] == 'sıfırla') {
    db.delete(`jailyetkilisi_${message.guild.id}`)
    message.channel.send(x + ` Jail yetkilisi başarıyla sıfırlandı.`)
  }
  
  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['jailyetkilisi'],
 permLevel: 0
};

exports.help = {
 name: 'jail-yetkilisi',
 description: 'Hangi role sahip kişilerin jaile atabileceğini ayarlarsınız.',
 usage: 'jail-yetkilisi ayarla/sıfırla @rol',
 kategori: '**MODERASYON**',
 permLvl: '**SUNUCUYU YÖNET**'
};