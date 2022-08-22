let rooms = {};

var usersLol = [
	//mockeo de info para filters
	{
		username: "Mischief Magma",
		img: "https://randomwordgenerator.com/img/picture-generator/55e1d4414e51aa14f1dc8460962e33791c3ad6e04e507749772f78d69f4acc_640.jpg",
		position: "ADC",
		elo: "Grand Master",
		rating: { $numberDecimal: "2" },
	},
	{
		username: "Alley Ruffian",
		img: "https://randomwordgenerator.com/img/picture-generator/55e8d24b4257ac14f1dc8460962e33791c3ad6e04e507440752972d3924cc6_640.jpg",
		position: "Jungle",
		elo: "Iron",
		rating: { $numberDecimal: "4" },
	},
	{
		username: "Major Paranoia",
		img: "https://randomwordgenerator.com/img/picture-generator/man-1828202_640.jpg",
		position: "Top",
		elo: "Bronze",
		rating: { $numberDecimal: "3" },
	},
	{
		username: "Aplomb Angel",
		img: "https://randomwordgenerator.com/img/picture-generator/57e7dc4b4251a914f1dc8460962e33791c3ad6e04e5074417c2f7dd6924dc6_640.png",
		position: "Mid",
		elo: "Bronze",
		rating: { $numberDecimal: "1" },
	},
	{
		username: "Hydra Treat",
		img: "https://randomwordgenerator.com/img/picture-generator/52e4d641495ba414f1dc8460962e33791c3ad6e04e507441722978d69f4ac2_640.jpg",
		position: "Sup",
		elo: "Silver",
		rating: { $numberDecimal: "5" },
	},
	{
		username: "Gold Dahlia",
		img: "https://randomwordgenerator.com/img/picture-generator/57e8d2464f5bb10ff3d8992cc12c30771037dbf85254794075277ad6954b_640.jpg",
		position: "ADC",
		elo: "Silver",
		rating: { $numberDecimal: "3" },
	},
	{
		username: "Mad Missiles",
		img: "https://randomwordgenerator.com/img/picture-generator/57e4dd44425bad14f1dc8460962e33791c3ad6e04e50744172287cd09245c7_640.jpg",
		position: "Sup",
		elo: "Diamond",
		rating: { $numberDecimal: "2" },
	},
	{
		username: "Unstoppable Wet",
		img: "https://randomwordgenerator.com/img/picture-generator/55e1d54b4a54a514f1dc8460962e33791c3ad6e04e507441722973d4914bc5_640.jpg",
		position: "Mid",
		elo: "Gold",
		rating: { $numberDecimal: "4" },
	},
	{
		username: "Diezel Hood",
		img: "https://randomwordgenerator.com/img/picture-generator/54e1dd47434faa0df7c5d57bc32f3e7b1d3ac3e45659764c7c2672dd92_640.jpg",
		position: "Top",
		elo: "Platinum",
		rating: { $numberDecimal: "5" },
	},
	{
		username: "Herp Raptor",
		img: "https://randomwordgenerator.com/img/picture-generator/54e7d1434351aa14f1dc8460962e33791c3ad6e04e507440722d72d09045c5_640.jpg",
		position: "Jungle",
		elo: "Diamond",
		rating: { $numberDecimal: "1" },
	},
	{
		username: "Oblivions Life",
		img: "https://randomwordgenerator.com/img/picture-generator/55e6dc414a54af14f1dc8460962e33791c3ad6e04e5074417c2f7cd3924fc7_640.jpg",
		position: "ADC",
		elo: "Master",
		rating: { $numberDecimal: "2" },
	},
	{
		username: "Taiga Alien",
		img: "https://randomwordgenerator.com/img/picture-generator/50e7d6464d53b10ff3d8992cc12c30771037dbf85254794074297edc974e_640.jpg",
		position: "ADC",
		elo: "Grand Master",
		rating: { $numberDecimal: "5" },
	},
	{
		username: "Dragon Grey",
		img: "https://randomwordgenerator.com/img/picture-generator/57e6d6434c57b10ff3d8992cc12c30771037dbf85254784a722e73d6954d_640.jpg",
		position: "Top",
		elo: "Challenger",
		rating: { $numberDecimal: "3" },
	},
	{
		username: "Amazement Axe",
		img: "https://randomwordgenerator.com/img/picture-generator/57e6dd464d50a414f1dc8460962e33791c3ad6e04e507749712a72dd9545c1_640.jpg",
		position: "Jungle",
		elo: "Gold",
		rating: { $numberDecimal: "1" },
	},
	{
		username: "Legends Traverse",
		img: "https://randomwordgenerator.com/img/picture-generator/53e0d4404c51af14f1dc8460962e33791c3ad6e04e50744172277fd09448c1_640.jpg",
		position: "Sup",
		elo: "Iron",
		rating: { $numberDecimal: "4" },
	},
];
var usersCS = [
	{
		username: "Mischief Magma",
		img: "https://randomwordgenerator.com/img/picture-generator/55e1d4414e51aa14f1dc8460962e33791c3ad6e04e507749772f78d69f4acc_640.jpg",
		position: "IGL",
		elo: "Master Guardian",
		rating: { $numberDecimal: "2" },
	},
	{
		username: "Alley Ruffian",
		img: "https://randomwordgenerator.com/img/picture-generator/55e8d24b4257ac14f1dc8460962e33791c3ad6e04e507440752972d3924cc6_640.jpg",
		position: "any",
		elo: "Nova",
		rating: { $numberDecimal: "4" },
	},
	{
		username: "Major Paranoia",
		img: "https://randomwordgenerator.com/img/picture-generator/man-1828202_640.jpg",
		position: "second awper",
		elo: "Supreme",
		rating: { $numberDecimal: "3" },
	},
	{
		username: "Aplomb Angel",
		img: "https://randomwordgenerator.com/img/picture-generator/57e7dc4b4251a914f1dc8460962e33791c3ad6e04e5074417c2f7dd6924dc6_640.png",
		position: "awper",
		elo: "Nova",
		rating: { $numberDecimal: "4" },
	},
	{
		username: "Hydra Treat",
		img: "https://randomwordgenerator.com/img/picture-generator/52e4d641495ba414f1dc8460962e33791c3ad6e04e507441722978d69f4ac2_640.jpg",
		position: "support",
		elo: "Global Elite",
		rating: { $numberDecimal: "5" },
	},
	{
		username: "Gold Dahlia",
		img: "https://randomwordgenerator.com/img/picture-generator/57e8d2464f5bb10ff3d8992cc12c30771037dbf85254794075277ad6954b_640.jpg",
		position: "second entry",
		elo: "Silver",
		rating: { $numberDecimal: "3" },
	},
	{
		username: "Mad Missiles",
		img: "https://randomwordgenerator.com/img/picture-generator/57e4dd44425bad14f1dc8460962e33791c3ad6e04e50744172287cd09245c7_640.jpg",
		position: "first entry",
		elo: "Silver",
		rating: { $numberDecimal: "2" },
	},
	{
		username: "Unstoppable Wet",
		img: "https://randomwordgenerator.com/img/picture-generator/55e1d54b4a54a514f1dc8460962e33791c3ad6e04e507441722973d4914bc5_640.jpg",
		position: "second awper",
		elo: "Nova",
		rating: { $numberDecimal: "4" },
	},
	{
		username: "Diezel Hood",
		img: "https://randomwordgenerator.com/img/picture-generator/54e1dd47434faa0df7c5d57bc32f3e7b1d3ac3e45659764c7c2672dd92_640.jpg",
		position: "awper",
		elo: "Master Guardian",
		rating: { $numberDecimal: "5" },
	},
	{
		username: "Herp Raptor",
		img: "https://randomwordgenerator.com/img/picture-generator/54e7d1434351aa14f1dc8460962e33791c3ad6e04e507440722d72d09045c5_640.jpg",
		position: "first entry",
		elo: "Legendary Eagle",
		rating: { $numberDecimal: "1" },
	},
	{
		username: "Oblivions Life",
		img: "https://randomwordgenerator.com/img/picture-generator/55e6dc414a54af14f1dc8460962e33791c3ad6e04e5074417c2f7cd3924fc7_640.jpg",
		position: "IGL",
		elo: "Legendary Eagle",
		rating: { $numberDecimal: "2" },
	},
	{
		username: "Taiga Alien",
		img: "https://randomwordgenerator.com/img/picture-generator/50e7d6464d53b10ff3d8992cc12c30771037dbf85254794074297edc974e_640.jpg",
		position: "support",
		elo: "Nova",
		rating: { $numberDecimal: "5" },
	},
	{
		username: "Dragon Grey",
		img: "https://randomwordgenerator.com/img/picture-generator/57e6d6434c57b10ff3d8992cc12c30771037dbf85254784a722e73d6954d_640.jpg",
		position: "any",
		elo: "Silver",
		rating: { $numberDecimal: "3" },
	},
	{
		username: "Amazement Axe",
		img: "https://randomwordgenerator.com/img/picture-generator/57e6dd464d50a414f1dc8460962e33791c3ad6e04e507749712a72dd9545c1_640.jpg",
		position: "second entry",
		elo: "Silver",
		rating: { $numberDecimal: "1" },
	},
	{
		username: "Legends Traverse",
		img: "https://randomwordgenerator.com/img/picture-generator/53e0d4404c51af14f1dc8460962e33791c3ad6e04e50744172277fd09448c1_640.jpg",
		position: "first entry",
		elo: "Master Guardian",
		rating: { $numberDecimal: "4" },
	},
];
var usersR6 = [
	{
		username: "Mischief Magma",
		img: "https://randomwordgenerator.com/img/picture-generator/55e1d4414e51aa14f1dc8460962e33791c3ad6e04e507749772f78d69f4acc_640.jpg",
		position: "any",
		elo: "Gold",
		rating: { $numberDecimal: "2" },
	},
	{
		username: "Alley Ruffian",
		img: "https://randomwordgenerator.com/img/picture-generator/55e8d24b4257ac14f1dc8460962e33791c3ad6e04e507440752972d3924cc6_640.jpg",
		position: "any",
		elo: "Copper",
		rating: { $numberDecimal: "4" },
	},
	{
		username: "Major Paranoia",
		img: "https://randomwordgenerator.com/img/picture-generator/man-1828202_640.jpg",
		position: "any",
		elo: "Bronze",
		rating: { $numberDecimal: "3" },
	},
	{
		username: "Aplomb Angel",
		img: "https://randomwordgenerator.com/img/picture-generator/57e7dc4b4251a914f1dc8460962e33791c3ad6e04e5074417c2f7dd6924dc6_640.png",
		position: "any",
		elo: "Silver",
		rating: { $numberDecimal: "1" },
	},
	{
		username: "Hydra Treat",
		img: "https://randomwordgenerator.com/img/picture-generator/52e4d641495ba414f1dc8460962e33791c3ad6e04e507441722978d69f4ac2_640.jpg",
		position: "any",
		elo: "Gold",
		rating: { $numberDecimal: "5" },
	},
	{
		username: "Gold Dahlia",
		img: "https://randomwordgenerator.com/img/picture-generator/57e8d2464f5bb10ff3d8992cc12c30771037dbf85254794075277ad6954b_640.jpg",
		position: "any",
		elo: "Platinum",
		rating: { $numberDecimal: "3" },
	},
	{
		username: "Mad Missiles",
		img: "https://randomwordgenerator.com/img/picture-generator/57e4dd44425bad14f1dc8460962e33791c3ad6e04e50744172287cd09245c7_640.jpg",
		position: "any",
		elo: "Copper",
		rating: { $numberDecimal: "2" },
	},
	{
		username: "Unstoppable Wet",
		img: "https://randomwordgenerator.com/img/picture-generator/55e1d54b4a54a514f1dc8460962e33791c3ad6e04e507441722973d4914bc5_640.jpg",
		position: "any",
		elo: "Copper",
		rating: { $numberDecimal: "4" },
	},
	{
		username: "Diezel Hood",
		img: "https://randomwordgenerator.com/img/picture-generator/54e1dd47434faa0df7c5d57bc32f3e7b1d3ac3e45659764c7c2672dd92_640.jpg",
		position: "any",
		elo: "Copper",
		rating: { $numberDecimal: "5" },
	},
	{
		username: "Herp Raptor",
		img: "https://randomwordgenerator.com/img/picture-generator/54e7d1434351aa14f1dc8460962e33791c3ad6e04e507440722d72d09045c5_640.jpg",
		position: "any",
		elo: "Silver",
		rating: { $numberDecimal: "1" },
	},
	{
		username: "Oblivions Life",
		img: "https://randomwordgenerator.com/img/picture-generator/55e6dc414a54af14f1dc8460962e33791c3ad6e04e5074417c2f7cd3924fc7_640.jpg",
		position: "any",
		elo: "Silver",
		rating: { $numberDecimal: "2" },
	},
	{
		username: "Taiga Alien",
		img: "https://randomwordgenerator.com/img/picture-generator/50e7d6464d53b10ff3d8992cc12c30771037dbf85254794074297edc974e_640.jpg",
		position: "any",
		elo: "Diamond",
		rating: { $numberDecimal: "5" },
	},
	{
		username: "Dragon Grey",
		img: "https://randomwordgenerator.com/img/picture-generator/57e6d6434c57b10ff3d8992cc12c30771037dbf85254784a722e73d6954d_640.jpg",
		position: "any",
		elo: "Gold",
		rating: { $numberDecimal: "3" },
	},
	{
		username: "Amazement Axe",
		img: "https://randomwordgenerator.com/img/picture-generator/57e6dd464d50a414f1dc8460962e33791c3ad6e04e507749712a72dd9545c1_640.jpg",
		position: "any",
		elo: "Bronze",
		rating: { $numberDecimal: "1" },
	},
	{
		username: "Legends Traverse",
		img: "https://randomwordgenerator.com/img/picture-generator/53e0d4404c51af14f1dc8460962e33791c3ad6e04e50744172277fd09448c1_640.jpg",
		position: "any",
		elo: "Bronze",
		rating: { $numberDecimal: "4" },
	},
];

function userJoin(user) {
	let gameSelected = user.game;
	if (rooms.hasOwnProperty(gameSelected)) {
		rooms[gameSelected].filter((e) => e._id !== user._id);
		rooms[gameSelected].push(user);
	} else {
		rooms[gameSelected] = [user];
	}
	return user;
}

// function userJoin(user) {
// 	if (user.game === "League of Legends") {
// 		usersLol = usersLol.filter((e) => e._id !== user._id);
// 		usersLol.push(user);
// 	}

// 	if (user.game === "Tom Clancy's Rainbow Six Siege") {
// 		usersR6 = usersR6.filter((e) => e._id !== user._id);
// 		usersR6.push(user);
// 	}

// 	if (user.game === "Counter-Strike: Global Offensive") {
// 		usersCS = usersCS.filter((e) => e._id !== user._id);
// 		usersCS.push(user);
// 	}
// 	return user;
// }

function getGameUsers(game) {
	if (rooms[game]) return rooms[game];
	else throw new Error("Rooms is empty");
}

// function getGameUsers(game) {
// 	if (game === "League of Legends") {
// 		return usersLol;
// 	}

// 	if (game === "Tom Clancy's Rainbow Six Siege") {
// 		return usersR6;
// 	}

// 	if (game === "Counter-Strike: Global Offensive") {
// 		return usersCS;
// 	}
// }

function leaveRoom(game, id) {
	if (rooms[game]) {
		const index = rooms[game].findIndex((user) => user._id === id);
		if (index !== -1) {
			return rooms[game].splice(index, 1)[0];
		}
	}
}

// function leaveRoom(game, id) {
// 	if (rooms[game])
// 		if (game === "League of Legends") {
// 			const index = usersLol.findIndex((user) => user._id === id);
// 			if (index !== -1) {
// 				return usersLol.splice(index, 1)[0];
// 			}
// 		}
// 	if (game === "Tom Clancy's Rainbow Six Siege") {
// 		const index = usersR6.findIndex((user) => user._id === id);
// 		if (index !== -1) {
// 			return usersR6.splice(index, 1)[0];
// 		}
// 	}

// 	if (game === "Counter-Strike: Global Offensive") {
// 		const index = usersCS.findIndex((user) => user._id === id);
// 		if (index !== -1) {
// 			return usersCS.splice(index, 1)[0];
// 		}
// 	}
// }

module.exports = {
	userJoin,
	getGameUsers,
	leaveRoom,
};
