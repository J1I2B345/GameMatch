var usersLol = [
    //mockeo de info para filters
    {
      "username": "Mischief Magma",
      "img": "https://randomwordgenerator.com/img/picture-generator/55e1d4414e51aa14f1dc8460962e33791c3ad6e04e507749772f78d69f4acc_640.jpg",
      "position": "ADC",
      "elo": "Grand Master",
      "rating": "2"
    },
    {
      "username": "Alley Ruffian",
      "img": "https://randomwordgenerator.com/img/picture-generator/55e8d24b4257ac14f1dc8460962e33791c3ad6e04e507440752972d3924cc6_640.jpg",
      "position": "Jungle",
      "elo": "Iron",
      "rating": "4"
    },
    {
      "username": "Major Paranoia",
      "img": "https://randomwordgenerator.com/img/picture-generator/man-1828202_640.jpg",
      "position": "Top",
      "elo": "Bronze",
      "rating": "3"
    },
    {
      "username": "Aplomb Angel",
      "img": "https://randomwordgenerator.com/img/picture-generator/57e7dc4b4251a914f1dc8460962e33791c3ad6e04e5074417c2f7dd6924dc6_640.png",
      "position": "Mid",
      "elo": "Bronze",
      "rating": "1"
    },
    {
      "username": "Hydra Treat",
      "img": "https://randomwordgenerator.com/img/picture-generator/52e4d641495ba414f1dc8460962e33791c3ad6e04e507441722978d69f4ac2_640.jpg",
      "position": "Sup",
      "elo": "Silver",
      "rating": "5"
    },
    {
      "username": "Gold Dahlia",
      "img": "https://randomwordgenerator.com/img/picture-generator/57e8d2464f5bb10ff3d8992cc12c30771037dbf85254794075277ad6954b_640.jpg",
      "position": "ADC",
      "elo": "Silver",
      "rating": "3"
    },
    {
      "username": "Mad Missiles",
      "img": "https://randomwordgenerator.com/img/picture-generator/57e4dd44425bad14f1dc8460962e33791c3ad6e04e50744172287cd09245c7_640.jpg",
      "position": "Sup",
      "elo": "Diamond",
      "rating": "2"
    },
    {
      "username": "Unstoppable Wet",
      "img": "https://randomwordgenerator.com/img/picture-generator/55e1d54b4a54a514f1dc8460962e33791c3ad6e04e507441722973d4914bc5_640.jpg",
      "position": "Mid",
      "elo": "Gold",
      "rating": "4"
    },
    {
      "username": "Diezel Hood",
      "img": "https://randomwordgenerator.com/img/picture-generator/54e1dd47434faa0df7c5d57bc32f3e7b1d3ac3e45659764c7c2672dd92_640.jpg",
      "position": "Top",
      "elo": "Platinum",
      "rating": "5"
    },
    {
      "username": "Herp Raptor",
      "img": "https://randomwordgenerator.com/img/picture-generator/54e7d1434351aa14f1dc8460962e33791c3ad6e04e507440722d72d09045c5_640.jpg",
      "position": "Jungle",
      "elo": "Diamond",
      "rating": "1"
    },
    {
      "username": "Oblivions Life",
      "img": "https://randomwordgenerator.com/img/picture-generator/55e6dc414a54af14f1dc8460962e33791c3ad6e04e5074417c2f7cd3924fc7_640.jpg",
      "position": "ADC",
      "elo": "Master",
      "rating": "2"
    },
    {
      "username": "Taiga Alien",
      "img": "https://randomwordgenerator.com/img/picture-generator/50e7d6464d53b10ff3d8992cc12c30771037dbf85254794074297edc974e_640.jpg",
      "position": "ADC",
      "elo": "Grand Master",
      "rating": "5"
    },
    {
      "username": "Dragon Grey",
      "img": "https://randomwordgenerator.com/img/picture-generator/57e6d6434c57b10ff3d8992cc12c30771037dbf85254784a722e73d6954d_640.jpg",
      "position": "Top",
      "elo": "Challenger",
      "rating": "3"
    },
    {
      "username": "Amazement Axe",
      "img": "https://randomwordgenerator.com/img/picture-generator/57e6dd464d50a414f1dc8460962e33791c3ad6e04e507749712a72dd9545c1_640.jpg",
      "position": "Jungle",
      "elo": "Gold",
      "rating": "1"
    },
    {
      "username": "Legends Traverse",
      "img": "https://randomwordgenerator.com/img/picture-generator/53e0d4404c51af14f1dc8460962e33791c3ad6e04e50744172277fd09448c1_640.jpg",
      "position": "Sup",
      "elo": "Iron",
      "rating": "4"
    }

]
var usersCS = []
var usersR6 = []


function userJoin(user){
    if (user.game === "League of Legends"){
        usersLol = usersLol.filter(e => e._id !== user._id)
        usersLol.push(user)
    }      

    if (user.game === "Tom Clancy's Rainbow Six Siege"){
        usersR6 = usersR6.filter(e => e._id !== user._id)
        usersR6.push(user)
    }    

    if (user.game === "Counter-Strike: Global Offensive"){
        usersCS = usersCS.filter(e => e._id === user._id)
        usersCS.push(user)
    }    
    return user
}

function getGameUsers(game){
    if (game === "League of Legends") {
        return usersLol        
    }

    if (game === "Tom Clancy's Rainbow Six Siege"){
        return usersR6 
    }    

    if (game === "Counter-Strike: Global Offensive"){
        return usersCS
    }    
    
}

function leaveRoom(game, id){
   
    if (game === "League of Legends") { 
        const index = usersLol .findIndex(user => user._id === id)
        if(index!== -1) {
            return usersLol.splice(index, 1)[0];
        }        
        
    }
    if (game === "Tom Clancy's Rainbow Six Siege")  {
        const index = usersR6.findIndex(user => user._id === id)
        if(index!== -1) {
            return usersR6.splice(index, 1)[0];
        }   
    } 

    if (game === "Counter-Strike: Global Offensive"){
        const index = usersCS.findIndex(user => user._id === id)
        if(index!== -1) {
            return usersCS.splice(index, 1)[0];
        }
    }  
}



module.exports = {
    userJoin, getGameUsers, leaveRoom
}