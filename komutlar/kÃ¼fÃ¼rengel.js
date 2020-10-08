  const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(` Bu komudu kullanabilmek için "Sunucuyu Yönet" yetkisine sahip olman gerek.`)
  if (!args[0]) return message.channel.send(`:no_entry: Küfür Filtresini Ayarlamak İçin \`p!küfür aç\` | Kapatmak İstiyorsanız \`p!küfür kapat\` Yazabilirsiniz`)
  if (args[0] !== 'aç' && args[0] !== 'kapat') return message.channel.send(`:no_entry: Küfür Filtresini Ayarlamak İçin \`p!küfür aç\` | Kapatmak İstiyorsanız \`+küfür kapat\` Yazabilirsiniz`)

    if (args[0] == 'aç') {
    db.set(`küfürFiltre_${message.guild.id}`, 'acik')
    let i = await db.fetch(`küfürFiltre_${message.guild.id}`)
  message.channel.send(`**Küfür Filtresi Başarıyla Kullanılır Hale Geldi !**`)    
     
  } 

  if (args[0] == 'kapat') {
    
    let üye = await db.fetch(`küfürFiltre_${message.guild.id}`)
    if (!üye) return message.channel.send(`**Küfür Filtresinin Açık Olduğundan Emin Olunuz !**`)
    
    
    db.delete(`küfürFiltre_${message.guild.id}`)
    
    message.channel.send(`**Küfür Filtresini Başarıyla Devre Dışı Bıraktım !**`)
  }
 
};


exports.conf = {
 enabled: true,
 guildOnly: false,
  aliases: ['küfür', 'küfür-filtresi', 'küfürfiltresi', 'küfür-filtre', 'küfürfiltre'],
 permLevel: 0
};

exports.help = {
 name: 'küfür',
 description: 'küfür',
 usage: 'gkanal'
};