 WebFont.load({
    google: {
      families: ['Bungee']
    },
    active:e=>{
    	console.log("font loaded!");
    	// pre-load the images
		PIXI.loader.
		add(["images/Spaceship.png"]).
		on("progress",e=>{/*console.log(`progress=${e.progress}`)*/}).
		load(setup);
    }
  });