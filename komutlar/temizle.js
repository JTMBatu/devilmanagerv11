const Discord = require('discord.js');
exports.run = function(client, message, args) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Bu Komutu Kullanmak İçin `Mesajları Yönet` Yetkisine Sahip Olmalısın.");
if (!args[0]) return message.channel.send("**Lütfen Silinicek Mesaj Miktarını Yazın !**");
message.channel.bulkDelete(args[0]).then(() => {
  return message.reply(`**${args[0]} Mesaj Sunucudan Uçuruldu !** <a:xbrave:760880810139582485>`).then(msg => msg.delete(2500));
})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['temizle','clear','sil'],
  permLevel: 0,
  kategori: "moderasyon"
};

exports.help = {
  komut: 'temizle',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'temizle <silinicek mesaj sayısı>'
};

