package hu.bendi.bot;

import hu.bendi.bot.utils.Logger;

public class DrArnold {
	
	public static Bot bot;
	public static Logger logger;
	public static DrArnold instance;

	public DrArnold() {
		instance = this;
		instance.run();
	}
	
	public static void main(String[] args) {
		new DrArnold();
	}
	
	public void run() {
		bot = new Bot("Dr.Arnold");
		bot.init();
	}
	
	public Logger getLogger() {
		return logger;
	}
	
	public DrArnold getInstance() {
		return this;
	}

}
