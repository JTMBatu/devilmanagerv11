const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  if (!message.member.voiceChannel) {
    return message.channel.send("Ses kanalında olman lazım!");
  }
const filter = (reaction, user) => {
        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === kullanıcı.id;
    };
  
  let kullanıcı = message.mentions.members.first();
  if (!kullanıcı) return message.channel.send("**Kullanıcıyı etiketlemelisin.**");

  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);

  if (!member.voiceChannel) return message.channel.send("Etiketlenen kullanıcı bir ses kanalında değil").then(m => m.delete(5000));

  const voiceChannel = message.member.voiceChannel.id;
  if (!voiceChannel) return;
  
      let log = new Discord.RichEmbed()
        .setColor("BLUE")
        .setDescription(`${kullanıcı}, ${message.author} \`${kullanıcı.voiceChannel.name}\` Odasına Gelmek İstiyor. Kabul Ediyormusun ?`)
                .setFooter(
      `${message.author.tag}`,
      `${message.author.displayAvatarURL}`
    )
  
  
    let mesaj = await message.channel.send(log)
    await mesaj.react("✅")
    await mesaj.react("❌")
    mesaj.awaitReactions(filter, {
        max: 1,
        time: 60000,
        errors: ['time']
    }).then(collected => {
        const reaction = collected.first();
        if (reaction.emoji.name === '✅') {
            let kabul = new Discord.RichEmbed()
                .setColor("GREEN")
                .setDescription(`${kullanıcı} Odaya Gelmeni Onayladı.`)
            message.channel.send(kabul)
            message.member.setVoiceChannel(kullanıcı.voiceChannel)
        } else {
            let striga = new Discord.RichEmbed()
                .setColor("RED")
                .setDescription(`${kullanıcı} Odaya Gelmeni Onaylamadı.`)
            message.channel.send(striga)
        }
    })
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["git"],
  permLevel: 0
};
exports.help = {
  name: "git",
  description: "git",
  usage: "git"
};