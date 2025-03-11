
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const welcomeChannelId = '1343748825721864264'; 

        const roleId = '977429504186269697'; 

        const channel = member.guild.channels.cache.get(welcomeChannelId);

        if (!channel) return console.log('Canal de bienvenida no encontrado.');

        const welcomeEmbed = new EmbedBuilder()
            .setColor('Random') 
            .setTitle('¡Bienvenido al servidor!')
            .setThumbnail(member.guild.iconURL())
            .setDescription(`Hola ${member.user.tag}, ¡Gracias por unirte a nuestro servidor! 🎉`)
            .addFields(
                { name: 'Tienda', value: 'tienda.sparkingcraft.com' },
                { name: 'Server Ip', value: 'SparkingCraft.com' },
            )
            .setImage(member.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: `Eres el usuario número ${member.guild.memberCount}` });

        const greetingMessage = await channel.send(`¡Hola ${member}!`);

        setTimeout(async () => {
            await greetingMessage.delete();
        }, 5000);
        await channel.send({ embeds: [welcomeEmbed] });

        try {
            const role = member.guild.roles.cache.get(roleId);
            if (role) {
                await member.roles.add(role);
                console.log(`Rol ${role.name} asignado a ${member.user.tag}.`);
            } else {
                console.log('Rol no encontrado.');
            }
        } catch (error) {
            console.error('Error al asignar rol: ', error);
        }
    }
};