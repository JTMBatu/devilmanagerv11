const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
  
   var başarılı = ['**ROL AYARLANDI!** ✅'];
   var x = başarılı[Math.floor(Math.random() * başarılı.length)];

   var başarısız = ['**ROL AYARLANAMADI!** <a:false:730719526395707462>'];
   var x2 = başarısız[Math.floor(Math.random() * başarısız.length)];
  
  if (!message.member.hasPermission('OWNER')) return message.reply(`**${ayarlar.prefix}ban-yetkilisi** isimli komutu kullanabilmek için \`SUNUCUYU YÖNET\` yetkisine sahip olman gerekiyor.`)
    if (!args[0]) return message.reply(`Sistemi kullanabilmek için, .ban-rol ayarla/sıfırla @rol yazmalısın.\nDetaylı bilgi için: .yardım ban-yetkilisi`)
    if (args[0] == 'ayarla') {
 let rol = message.mentions.roles.first() || message.guild.roles.get(args.join(' '))
  let newRole;
  let tworole;
  if (!rol)     return message.channel.send(x2 + ` Bir rol etiketle.`)
  else newRole = message.mentions.roles.first().id
  let id = message.mentions.roles.first().id  
    db.set(`banyetkilisi_${message.guild.id}`, id)
  let banrol = await db.set(`banyetkilisi_${message.guild.id}`, newRole)
  if (!message.guild.roles.get(newRole)) return message.channel.send(x2 + ` Etiketlediğin rolü bulamadım. Silinmiş olabilir, bi' kontrol et.`)
    message.channel.send(x + ` Ban yetkilisi <@&${newRole}> olarak ayarlandı.`)
  } 

  if (args[0] == 'sıfırla') {
    
    
    db.delete(`banyetkilisi_${message.guild.id}`)

    message.channel.send(x + `<:volantisblue:706947548933390366> Ban yetkilisi başarıyla sıfırlandı.`)
  }
};
  
  
    
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['banyetkilisi'],
 permLevel: 0
};

exports.help = {
 name: 'ban-yetkilisi',
 description: '+ban komutunu hangi role sahip olanların kullanacağını ayarlarsınız.',
 usage: 'ban-yetkilisi ayarla @rol',
 kategori: '**AYARLAR**',
 permLvl: '**SUNUCUYU YÖNET**'
};