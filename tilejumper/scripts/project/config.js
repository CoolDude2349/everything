const config = {
	BallPrice: 100,
	JumpScoreRange: [1, 5],
	
	GameplayDifficulty: {
		Levels: {
			// The higher the value the harder the gameplay
			Easy: 1,
			Medium: 1.35,
			Hard: 2
		},
		Endless: {
			InitSpeed: 1,         // Starting game speed
			MaxSpeed: 2,          // Maximum game speed
			SpeedInterval: 1,     // Interval (in seconds) for speed increase
			SpeedIncrease: 0.005  // How much speed increases per interval
		}
	},
	
	Tiles: {
		
		Horizontal: {
			Interval: [30, 35],
			Duration: [1, 1]
		},
		
		Movable: {
			Interval: [19, 24],
			Duration: [2, 5]
		},
		
		Trap: {
			Interval: [26, 29],
			Duration: [8, 10]
		},
	},
	
	Collectable: {
		Interval: [10, 15],
		Duration: [1, 1]
	},
	
	Colors: [
		"#478eff",
		"#8a58fe",
		"#5ac24c",
		"#eaa15d",
		"#ea5d5d"
	],
	MusicList: [
		{MusicName: "Bounce!", FileName: "music4", TilesSpeed: 2200},
		{MusicName: "Retrowave", FileName: "music0", TilesSpeed: 2000},
		{MusicName: "Feel My Heart", FileName: "music2", TilesSpeed: 2000},
		{MusicName: "Love Angel", FileName: "music8", TilesSpeed: 2200},
		{MusicName: "Happy Birthday", FileName: "music5", TilesSpeed: 2500},
		{MusicName: "Retro Dance", FileName: "music3", TilesSpeed: 2000},
		{MusicName: "Move it!", FileName: "music9", TilesSpeed: 2500},
		{MusicName: "Arabian Night", FileName: "music6", TilesSpeed: 2500},
		{MusicName: "Happy Friends", FileName: "music7", TilesSpeed: 2500},
		{MusicName: "Sporty Techno", FileName: "music1", TilesSpeed: 2000}
	]
}



export {config} 