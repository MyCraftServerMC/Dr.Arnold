package hu.bendi.bot.command.fun;

import hu.bendi.bot.command.listener.OnCommandListener;
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;

public class HelloCommand implements OnCommandListener {
	
	public HelloCommand() {
		
	}
	
	@Override
	public boolean execute(GuildMessageReceivedEvent event) {
		event.getChannel().sendMessage("Hulló " + event.getAuthor().getAsMention() + "! :wave:").queue();;
		return true;
	}
	
}
