var onlyUsedOnce = 0;
var machineArray = [];
//amount, cost, output, where, costScale, name, click increase amount
machineArray.push([0, 0, 0, 0, 1, "0", 0.1]); //points
machineArray.push([0, 1, 0.01, 0, 1.1, "1", 0.1]); //1
machineArray.push([0, 10, 0.01, 1, 1.005, "2", 1]); //2
machineArray.push([0, 100, 0.01, 2, 1.001, "3", 1]); //3
machineArray.push([0, 1000, 0.01, 3, 1.001, "4", 1]); //4
machineArray.push([0, 10000, 0.01, 4, 1.001, "5", 1]); //5
machineArray.push([0, 100000, 0.01, 5, 1.001, "6", 1]); //6
machineArray.push([0, 1000000, 0.01, 6, 1.001, "7", 1]); //7

function press(machine){
	//checks if you can afford cost
	if(machineArray[0][0] >= machineArray[machine][1]){
		machineArray[0][0] = machineArray[0][0] - machineArray[machine][1];
		machineArray[machine][0] = machineArray[machine][0] + machineArray[machine][6];
		
		//kill the rogue decimals
		machineArray[machine][1] = Math.round(machineArray[machine][1]*1.07*100)/100;
		machineArray[0][0] = (Math.round(machineArray[0][0]*1000)/1000);
		//set new cost
		machineArray[machine][0] = (Math.round(machineArray[machine][0]*1000)/1000);
		
		var cost = "cost" + machineArray[machine][5];
		document.getElementById(cost).innerHTML = machineArray[machine][1];
		document.getElementById(machineArray[machine][5]).innerHTML = machineArray[machine][0];
		document.getElementById("0").innerHTML = machineArray[0][0];
	}
};

function loops(){
	//boosts machine 1 when you purchase machine 7
	if(machineArray[7][0] === 1 && onlyUsedOnce === 0){
		machineArray[1][2] = 1;
		onlyUsedOnce = 10;
	}
	for(var i = 1; i < machineArray.length; i++){
		
		machineArray[machineArray[i][3]][0] = machineArray[machineArray[i][3]][0] + machineArray[i][2]*machineArray[i][0];
		machineArray[0][0] = (Math.round(machineArray[0][0]*1000)/1000);
		machineArray[i][0] = (Math.round(machineArray[i][0]*1000)/1000);
		document.getElementById(machineArray[i][5]).innerHTML = machineArray[i][0];
		document.getElementById("0").innerHTML = machineArray[0][0];
	}
}

function saver(){
	var save = JSON.stringify(machineArray);
	localStorage.setItem("save", save);
}

function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (savegame !== null){
		machineArray = savegame;
	}
	for(var i = 1; i < machineArray.length; i++){
		//sets cost for each machine on load
		document.getElementById(machineArray[i][5]).innerHTML = machineArray[i][0];
		var cost = "cost" + machineArray[i][5];
		document.getElementById(cost).innerHTML = machineArray[i][1];
	}
}

function removeSave(){
	localStorage.removeItem("save");
	window.location.reload();
}

window.setInterval(function(){
	loops();
}, 80);

window.setInterval(function(){
	saver();
}, 5000);

load();


