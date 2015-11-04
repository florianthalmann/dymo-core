describe("a scheduler", function() {
	
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	var audioContext = new AudioContext();
	
	var sourcePath = '../example/sark1.m4a';
	var dymo1, dymo2, dymo3;
	var scheduler;
	
	beforeAll(function(done) {
		scheduler = new Scheduler(audioContext, function() {
			done();
		});
		dymo1 = new DynamicMusicObject("dymo1", scheduler);
		dymo2 = new DynamicMusicObject("dymo2", scheduler);
		dymo3 = new DynamicMusicObject("dymo3", scheduler);
		dymo1.addPart(dymo2);
		dymo1.addPart(dymo3);
		dymo2.setSourcePath(sourcePath);
	});
	
	it("plays a dymo", function(done) {
		expect(scheduler.urisOfPlayingDmos).toEqual([]);
		scheduler.play(dymo1);
		setTimeout(function() {
			expect(scheduler.urisOfPlayingDmos).toEqual(["dymo2", "dymo1"]);
			done();
		}, 1000);
	});
	
	it("reacts to updates", function(done) {
		expect(scheduler.updateAmplitude(dymo2, -0.6)).toEqual(0.4);
		setTimeout(function() {
			expect(scheduler.urisOfPlayingDmos).toEqual(["dymo2", "dymo1"]);
			expect(scheduler.updateAmplitude(dymo2, 0.3)).toEqual(0.7);
			setTimeout(function() {
				done();
			}, 500);
		}, 500);
	});
	
	it("stops a dymo", function(done) {
		expect(scheduler.urisOfPlayingDmos).toEqual(["dymo2", "dymo1"]);
		scheduler.stop(dymo1);
		setTimeout(function() {
			expect(scheduler.urisOfPlayingDmos).toEqual([]);
			done();
		}, 500);
	});
	
});