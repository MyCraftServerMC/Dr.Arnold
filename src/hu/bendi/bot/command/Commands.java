package hu.bendi.bot.command;

import hu.bendi.bot.Bot;
import hu.bendi.bot.command.fun.HelloCommand;
import hu.bendi.bot.command.info.ServerInfoCommand;
import hu.bendi.bot.command.listener.OnCommandListener;
import hu.bendi.bot.command.moderation.ShutdownCommand;

public class Commands {

	public Bot parent;
	public CommandHandler handler;
	
	public Commands(Bot bot) {
		this.parent = bot;
		handler = new CommandHandler();
		bot.getJDA().addEventListener(handler);
		handler.addCmd("hello", (OnCommandListener)new HelloCommand());
		handler.addCmd("shutdown", (OnCommandListener)new ShutdownCommand());
		handler.addCmd("info", (OnCommandListener)new ServerInfoCommand());
	}
}
