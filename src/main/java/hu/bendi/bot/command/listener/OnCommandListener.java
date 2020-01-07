package hu.bendi.bot.command.listener;

import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;

public interface OnCommandListener {
	
	public boolean execute(GuildMessageReceivedEvent e);

}
