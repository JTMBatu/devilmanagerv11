const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix;

module.exports.run = async (client, message, args) => {
let db = require('quick.db')
let botisim = message.guild.members.get(client.user.id).displayName
let data = await db.fetch(`jailrol_${message.guild.id}`)
if(!data)  return message.channel.send(`Jail rolünü bulamadım.`)
let data2 = await db.fetch(`jailyetkilisi_${message.guild.id}`)
if(!data2)  return message.channel.send(`Jail yetkilisi rolünü bulamadım.`)
let data3 = await db.fetch(`jailkanal_${message.guild.id}`)
if(!data3)  return message.channel.send(`Jail kanalını bulamadım.`)
let rol = message.guild.roles.get(data)
if(!rol) return message.channel.send(`Jail rolü ayarlı değil.`)
let yetkili = message.guild.roles.get(data2)
if(!yetkili) return message.channel.send(`Jail yetkilisi ayarlı değil.`)
let kanal = message.guild.channels.get(data3)
if(!kanal) return message.channel.send(`Jail log kanalı ayarlı değil.`)

  if (!message.member.roles.has(`${yetkili.id}`)) return message.channel.send(`**${ayarlar.prefix}jail** isimli komutu kullanabilmek için ${yetkili} rolüne sahip olman gerekiyor.`)
  let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kişi) return message.channel.send(`Kimi Jail'a Atıcaksın ? Etiketlemeyi unutma.`)
  if(kişi.hasPermission("MANAGE_GUILD")) return message.channel.send(`Olmaz. Bu kişiyi jail'a atamam.`)
  
  let zaman = args[1]
  if(!args[1]) return message.channel.send(`Ne kadar süre jailde duracağını belirtmelisin.\nÖrnek: ${prefix}jail kişi süre sebep`)

let sebep = args.join(' ').slice(args[1].length+args[0].length + 1)
if(!sebep) sebep = 'Sebep belirtilmemiş.'
  
  const wasted = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setColor(`RANDOM`)
  .setDescription(`**__Bir Kullanıcı Cezalandırıldı !__**`)
  .addField(`<EMOJI EKLE> **Ceza Alan:**`, kişi, true)
  .addField(`<EMOJI EKLE> **Yetkili:**`, `<@${message.author.id}>`, true)
  .addField(`<EMOJI EKLE> **Sebep:**`, sebep, true)
  .addField(`<EMOJI EKLE> **Süre:**`, zaman.replace(/d/, ' Gün').replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, 'Saat'), true)
  .setImage('https://images-ext-2.discordapp.net/external/GFDzmFva48_HXuap5Yjvt_laIzmYBZI2Eqw1WRdHnZU/https/i.pinimg.com/originals/b2/84/33/b28433c392959f923ff0d736cd89dcbd.gif')
  .setTimestamp()
  .setFooter(`${message.channel.name} kanalında kullanıldı !`)
  .setThumbnail(message.author.avatarURL)
  
  const bitti = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setDescription(`**__Kullanıcının Cezası Bitti !__**`)
  .addField(`<EMOJI EKLE> **Cezası Biten:**`, kişi, true)
  .addField(`<EMOJI EKLE> **Yetkili:**`, `<@${message.author.id}>`, true)
  .setTimestamp()
  .setColor(`RANDOM`)
  .setFooter(`Jail süresi bitti ! | ${message.channel.name} kanalında kullanıldı !`)
  .setThumbnail(message.author.avatarURL)
  
  kişi.addRole(rol.id);
    kişi.roles.forEach(r => {
kişi.removeRole(r.id)
db.set(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
    kanal.send(wasted)
    message.channel.send(`**${kişi} isimli kişi başarıyla hapishaneye gönderildi !**`)
    setTimeout(async () =>{
    kişi.removeRole(rol.id)
    kanal.send(bitti)
  }, ms(zaman));
            setTimeout(async () =>{
message.guild.roles.forEach(async r => {
const i = await db.fetch(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}` )
if(i != r.id)  return ;
if(i){kişi.addRole(i)}
db.delete(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}`)
})
              }, ms(zaman));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['uçur'],
    permLevel: 0
  };
  
exports.help = {
 name: 'jail',
 description: 'Bir kişiyi belirlediğiniz rol ile jaile yollarsınız.',
 usage: 'jail @üye <10s,10m,10h,10d> sebep',
 kategori: '**MODERASYON**',
 permLvl: '**Bulunmuyor.** (+sustur-yetkilisi ayarla)'
};