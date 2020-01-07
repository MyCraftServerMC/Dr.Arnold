package hu.bendi.bot.command;

import java.util.HashMap;

import hu.bendi.bot.DrArnold;
import hu.bendi.bot.command.listener.OnCommandListener;
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

public class CommandHandler extends ListenerAdapter {
	
	private HashMap<String,OnCommandListener> cmds = new HashMap<String,OnCommandListener>();
	
	@Override
	public void onGuildMessageReceived(GuildMessageReceivedEvent event) {
		String cmdFormated;
		if (event.getMessage().getContentRaw().contains(" ")) {
			cmdFormated = event.getMessage().getContentRaw().substring(1).split(" ")[0];
		}else {
			cmdFormated = event.getMessage().getContentRaw().replaceAll("§", "");
		}
		
		if (event.getMessage().getContentRaw().startsWith(DrArnold.bot.PREFIX)) {
			if (cmds.containsKey(cmdFormated)) {
				cmds.get(cmdFormated).execute(event);
			}
		}
	}
	
	public void addCmd(String name,OnCommandListener cmd) {
		cmds.put(name, cmd);
	}

}
