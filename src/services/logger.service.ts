/// <reference path="../../typings/main.d.ts" />

export class Logger {
	public static log(p_message: string) {
		let v_today = Date.now();
		let v_date = new Date(v_today);
		let v_env = process.env.NODE_ENV || "development";
		let Path = require('path');
		let Fs = require('fs');
		let Config = require(Path.join(__dirname, '..', 'config', 'config.json'))[v_env];
		let v_log_file = Path.join(__dirname, '..', '..', 'log', v_date.getFullYear()+'-'+(v_date.getMonth()+1)+'-'+v_date.getDate()+'.log');
		let v_fd = Fs.openSync(v_log_file,'a');
		v_date = new Date(Date.now());
		Fs.writeSync(v_fd,v_date.getHours()+':'+v_date.getMinutes()+':'+v_date.getSeconds()+ ' - ' + p_message + '\n');
		Fs.closeSync(v_fd);
	}
}