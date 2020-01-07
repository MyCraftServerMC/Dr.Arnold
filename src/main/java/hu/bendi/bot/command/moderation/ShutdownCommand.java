package hu.bendi.bot.command.moderation;

import java.awt.Color;

import hu.bendi.bot.command.listener.OnCommandListener;
import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.Permission;
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;

public class ShutdownCommand implements OnCommandListener {
	
	public ShutdownCommand() {
	}
	
	@Override
	public boolean execute(GuildMessageReceivedEvent e) {
		if (e.getGuild().getMember(e.getAuthor()).hasPermission(Permission.ADMINISTRATOR)) {
			EmbedBuilder builder = new EmbedBuilder();
			builder.setAuthor("Kikapcsol�s");
			builder.setColor(Color.RED);
			builder.setDescription("Kikapcsol�s 5 m�sodpercen bel�l.");
			e.getChannel().sendMessage(builder.build()).queue();;
			try {
				Thread.sleep(5000);
			} catch (InterruptedException e1) {
				e1.printStackTrace();
				return false;
			}
			System.exit(5);
			return true;
		}else {
			EmbedBuilder builder = new EmbedBuilder();
			builder.setAuthor("Kikapcsol�s");
			builder.setColor(Color.RED);
			builder.setDescription("Nem vagy jogosult a parancs haszn�lat�ra!");
			e.getChannel().sendMessage(builder.build()).queue();;
			return false;
		}
	}

}
