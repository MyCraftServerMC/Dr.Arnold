package hu.bendi.bot;

import javax.security.auth.login.LoginException;

import hu.bendi.bot.command.CommandHandler;
import hu.bendi.bot.command.Commands;
import hu.bendi.bot.utils.Logger;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Activity;

public class Bot {

	private String TOKEN = "NTY0ODA5NDc4NjcxNjk1OTAy.XsZ1Ew.GonlsNa0H8gPmvUqwXYQ_K2M2aw";
	private String NAME = "Bot";
	public final String PREFIX = "§";
	private Logger log;
	
	private JDA bot;
	
	public Bot(String name) {
		NAME = name;
		log = DrArnold.instance.getLogger();
	}
	
	public String getName() {
		return NAME;
	}

	public void setName(String n) {
		NAME = n;
	}

	private void build() {
		try {
			bot = new JDABuilder(TOKEN).build();
		} catch (LoginException e) {
			e.printStackTrace();
			log.err("ERROR!! " + e.getMessage());
		}
	}
	
	public void registerCmds() {
		bot.addEventListener(new CommandHandler());
		new Commands(this);
	}
	
	public JDA getJDA() {
		return bot;
	}
	
	public void init() {
		build();
		registerCmds();
		bot.getPresence().setActivity(Activity.playing(" a SkyVillage szerverén"));
	}
	
	
	
}
