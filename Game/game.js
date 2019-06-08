var machineArray = [];
//amount, cost, output, where, costScale, name, click increase amount
machineArray.push([0, 0, 0, 0, 1, "0", 0.01]); //points
machineArray.push([0, 1, 0.0001, 0, 1.01, "1", 0.1]); //1
machineArray.push([0, 10, 0.001, 1, 1.005, "2", 1]); //2
machineArray.push([0, 100, 0.01, 2, 1.001, "3", 1]); //3
machineArray.push([0, 1000, 0.1, 3, 1.001, "4", 1]); //4
machineArray.push([0, 10000, 0.1, 4, 1.001, "5", 1]); //5
machineArray.push([0, 100000, 1, 5, 1.001, "6", 1]); //6
machineArray.push([0, 1000000, 1, 6, 1.001, "7", 1]); //7

function press(machine){
	if(machineArray[0][0] >= machineArray[machine][1]){
		machineArray[0][0] = machineArray[0][0] - machineArray[machine][1];
		machineArray[machine][0] = machineArray[machine][0] + machineArray[machine][6];
		machineArray[machine][1] = Math.round(Math.pow(machineArray[machine][1]*1.1, machineArray[machine][4])*10)/10
		machineArray[0][0] = (Math.round(machineArray[0][0]*1000000)/1000000);
		var cost = "cost" + machineArray[machine][5];
		document.getElementById(cost).innerHTML = machineArray[machine][1];
		document.getElementById(machineArray[machine][5]).innerHTML = machineArray[machine][0];
		document.getElementById("0").innerHTML = machineArray[0][0];
	}
};

function loops(){
	for(var i = 1; i < machineArray.length; i++){
		machineArray[machineArray[i][3]][0] = machineArray[machineArray[i][3]][0] + machineArray[i][2]*machineArray[i][0];
		machineArray[0][0] = (Math.round(machineArray[0][0]*1000000)/1000000);
		machineArray[i][0] = (Math.round(machineArray[i][0]*1000000)/1000000)
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
		for(var i = 1; i < machineArray.length; i++){
			document.getElementById(machineArray[i][5]).innerHTML = machineArray[i][0];
			var cost = "cost" + machineArray[i][5];
			document.getElementById(cost).innerHTML = machineArray[i][1];
		}
	}
}

function removeSave(){
	localStorage.removeItem("save");
	window.location.reload();
}

window.setInterval(function(){
	loops();
}, 200);

window.setInterval(function(){
	saver();
}, 50000);

load();


