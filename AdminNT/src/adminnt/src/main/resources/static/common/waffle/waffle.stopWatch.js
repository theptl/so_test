
(function() {
	
	waffle.StopWatch = class {
		constructor() {
			this.laps = new Array();
			this.startTick = -1;
		}
		
		
		now() {
			return (new Date()).getTime();
		}
		
		
		start() {
			this.startTick = this.now();
			this.lap('start');
		}
		
		
		stop() {
			this.lap('stop');
			this.startTick = -1;
		}
		
		
		lap(name) {
			if (this.startTick == -1) {
				return -1;
			}
			
			if (name == null || typeof name == 'undefined') {
				name = 'lap' + (this.laps.length + 1);
			}
			
			var gap = this.now() - this.startTick;
			var data = {
				name: name,
				time: gap
			};
			
			this.laps.push(data);
			return data.time;
		}
		
		
		toString(newLine) {
			var str = '';
			
			newLine = newLine || '<br/>';
			
			for (var i = 0 ; i < this.laps.length ; ++i) {
				str += this.laps[i].name + ' : ' + this.laps[i].time;
				
				if (i < this.laps.length - 1) {
					str += newLine;
				}
			}
			
			return str;
		}
	}
})();