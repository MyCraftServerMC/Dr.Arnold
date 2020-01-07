package hu.bendi.bot.command.info;

import java.awt.Color;

import hu.bendi.bot.command.listener.OnCommandListener;
import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;

public class ServerInfoCommand implements OnCommandListener {

	@Override
	public boolean execute(GuildMessageReceivedEvent e) {
		EmbedBuilder builder = new EmbedBuilder();
		builder.setColor(Color.GREEN);
		builder.setTitle("Running on:");
		builder.addField("OS", System.getProperties().getProperty("os.name"), false);
		builder.addField("OS Version", System.getProperties().getProperty("os.version"), false);
		builder.addField("Java Version", System.getProperties().getProperty("java.version"), false);
		builder.addField("Memory", (Runtime.getRuntime().maxMemory()/1024000)+"", false);
		builder.addField("Memory Free", (Runtime.getRuntime().freeMemory()/1024000)+"", false);
		builder.addField("Processor Cores", Runtime.getRuntime().availableProcessors()+"", false);
		e.getChannel().sendMessage(builder.build()).queue();
		return false;
	}

}
