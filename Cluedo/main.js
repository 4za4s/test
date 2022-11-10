Who = {
    "Green": undefined,
    "Mustard": undefined,
    "Peacock": undefined,
    "Plum": undefined,
    "Scarlet": undefined,
    "White": undefined,
}

What = {
    "Wrench": undefined,
    "Candelstick": undefined,
    "Dagger": undefined,
    "Pistol": undefined,
    "LeadPipe": undefined,
    "Rope": undefined,
}

Where = {
    "Bathroom": undefined,
    "Study": undefined,
    "DinningRoom": undefined,
    "GamesRoom": undefined,
    "Garage": undefined,
    "Bedroom": undefined,
    "LivingRoom": undefined,
    "Kitchen": undefined,
    "Courtyard": undefined,
}

var Players = {}
class Player {
    cards = {
        "green": undefined,
        "mustard": undefined,
        "peacock": undefined,
        "plum": undefined,
        "scarlet": undefined,
        "white": undefined,
        "wrench": undefined,
        "candelstick": undefined,
        "dagger": undefined,
        "pistol": undefined,
        "leadpipe": undefined,
        "rope": undefined,
        "bathroom": undefined,
        "study": undefined,
        "dinningroom": undefined,
        "gamesroom": undefined,
        "garage": undefined,
        "bedroom": undefined,
        "livingroom": undefined,
        "kitchen": undefined,
        "courtyard": undefined,
    }
    possibleCards = []
    name = ""
    constructor(name){
        this.name = name
    }

    has(card){
        if (card in this.cards && this.cards[card] == undefined){
            var message = ""
            this.cards[card] = true
            for (const [key, player] in Players){
                if (Players[key].name != this.name){
                    Players[key].notHas(card)
                    message = message + Players[key].notHas([card])
                }
            }
            this.reEvaluate()
            document.getElementById("all").querySelector("#" + card).className = "notmurder"
            document.getElementById(this.name).querySelector("#" + card).className = "playerhas"
            return this.name + " has " + card + message
        }
        return "Invalid card: " + card
    }

    notHas(cards){
        var message = ""
        for (var i = 0; i < cards.length; i++){
            if (cards[i] in this.cards && this.cards[cards[i]] == undefined){
                this.cards[cards[i]] = false
                this.reEvaluate()
                document.getElementById(this.name).querySelector("#" + cards[i]).className = "playernothas"
                message = message +  this.name + " doesn't have " + cards[i]
            } else {
                message = message + "Invalid card: " + cards[i]
            }
        }
        return message
    }

    couldHave(cards){
        var temp = []
        var message = this.name + " could have: "
        for (var z = 0; z < cards.length; z++) {
            if (cards[z] in this.cards){
                temp.push(cards[z])
                message += cards[z] + " "
                if (this.cards[cards[z]] == undefined) {
                    document.getElementById(this.name).querySelector("#" + cards[z]).className = "playercouldhave"
                }
            } else {
                return "Invalid card: " + cards[z]
            }
        }
        this.possibleCards.push(temp)
        this.reEvaluate()
        return message
    }

    reEvaluate(){
        for (const [key, player] in Players){
            for (var i = 0; i < Players[key].possibleCards.length; i++){
                round(Players[key], Players[key].possibleCards[i])
            }
        }
    }
}

function round(player, cards){
    var unknown = 0
    var index = 0
    for (var z = 0; z < cards.length; z++) {
        if (player.cards[cards[z]] == undefined){
            unknown += 1
            index = z
        } else if (player.cards[cards[z]] == true) {
            return
        }
    }
    if (unknown == 1) {
        player.has(cards[index])
    }
}

function createPlayer(name) {
    playerHTML = document.getElementById("all").cloneNode(true)
    playerHTML.id = name
    playerHTML.querySelector("#name").innerText = name
    document.getElementById("players").appendChild(playerHTML)
    Players[name] = new Player(name)
}

function main() {
    function runCommand(command) {
        message = document.createElement('p')
        consoleHTML = document.getElementById("console")
        command = command.split(" ")

        if (command[0] == "help") {
            message.innerText = "Commands: create [name], has [name] [card], nothas [name] [cards], couldhave [name] [cards]"
        } else 

        if (command[0] == "cards") {
            message.innerText = "green\nmustard\npeacock\nplum\nscarlet\nwhite\n\nwrench\ncandelstick\ndagger\npistol\nleadpipe\nrope\n\nbathroom\nstudy\ndinningroom\ngamesroom\ngarage\nbedroom\nlivingroom\nkitchen\ncourtyard\n"
        } else 
        if (command[0] == "create") {
            message.innerText = "created player " + command[1]
            createPlayer(command[1])
        } else 
        if (command[0] == "has") {
            message.innerText = Players[command[1]].has(command[2])
        } else 
        if (command[0] == "nothas") {
            message.innerText = Players[command[1]].notHas(command.slice(2))
        } else 
        if (command[0] == "couldhave") {
            message.innerText = Players[command[1]].couldHave(command.slice(2))
        } else {
            return
        }

        consoleHTML.appendChild(message)
        consoleHTML.scrollTop = consoleHTML.scrollTopMax
    }

    var input = document.getElementById("input");
    input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        runCommand(input.value)
        input.value = ""
    }
    }); 
}

if (typeof window !== "undefined") {
    window.onload = () => {
      main();
    };
  }