var points = 0;
var machines = {
	clicker: {
		name: "Click",
		clicks: 0,
		amount: 0,
		cost: [0, 0, "points"],
		output: ["points", 0.1],
		notThis: 0
	},
	machine1: {
		name: "Machine 1",
		clicks: 0,
		amount: 0,
		cost: [1, 0.07, "points"],
		output: ["points", 0.01]
	},
	machine2: {
		name: "Machine 2",
		clicks: 0,
		amount: 0,
		cost: [10, 0.07, "machine1"],
		output: ["machine1", 0.01]
	},
	machine3: {
		name: "Machine 3",
		clicks: 0,
		amount: 0,
		cost: [100, 0.07, "machine2"],
		output: ["machine2", 0.01]
	},
	machine4: {
		name: "Machine 4",
		clicks: 0,
		amount: 0,
		cost: [1000, 0.07, "machine3"],
		output: ["machine3", 0.01]
	},
	machine5: {
		name: "Machine 5",
		clicks: 0,
		amount: 0,
		cost: [10000, 0.07, "machine4"],
		output: ["machine4", 0.01]
	},
	machine6: {
		name: "Machine 6",
		clicks: 0,
		amount: 0,
		cost: [100000, 0.07, "machine5"],
		output: ["machine5", 0.01]
	},
	machine7: {
		name: "Machine 7",
		clicks: 0,
		amount: 0,
		cost: [1000000, 0.07, "machine6"],
		output: ["machine6", 0.01]
	},
	machine8: {
		name: "Machine 8",
		clicks: 0,
		amount: 0,
		cost: [10000000, 0.07, "machine7"],
		output: ["machine7", 0.01]
	},
	machine9: {
		name: "Machine 9",
		clicks: 0,
		amount: 0,
		cost: [100000000, 0.07, "machine8"],
		output: ["machine8", 0.01]
	},
	machine10: {
		name: "Machine 10",
		clicks: 0,
		amount: 0,
		cost: [1000000000, 0.07, "machine9"],
		output: ["machine9", 0.01]
	},
	machine11: {
		name: "Machine 11",
		clicks: 0,
		amount: 0,
		cost: [10000000000, 0.07, "machine10"],
		output: ["machine10", 0.01]
	},
	save: {
		name: "Save",
		notThis: 0
	},
	removeSave: {
		name: "Remove Save",
		notThis: 0
	}
}
for (var title in machines){
	var btn = document.createElement("BUTTON");
	var br = document.createElement("BR");
	var data = machines[title];
	btn.innerHTML = data.name;
	btn.setAttribute("class", "button");
	btn.setAttribute("class", "button");
	document.body.appendChild(br);
	if(title == 'save'){
		btn.setAttribute("onclick", "save()");
		var br2 = document.createElement("BR");
		document.body.appendChild(br2);
		document.body.appendChild(btn);
	}
	else if(title == 'removeSave'){
		btn.setAttribute("onclick", "removeSave()");
		document.body.appendChild(btn);
	}
	else if(title !== "clicker") {
		document.body.appendChild(btn);
		var dvAmount = document.createElement("DIV");
		var dvCost = document.createElement("DIV");
		var aId = 'amount' + title;
		var cId = 'cost' + title;
		dvCost.innerHTML = 'cost: <span id='+ cId +'>'+ data.cost[0] +'</span>';
		dvAmount.innerHTML = 'amount: <span id='+ aId +'>0</span>';
		dvAmount.setAttribute("class", 'amount');
		dvCost.setAttribute("class", 'cost');
		btn.setAttribute("onclick", "press('"+ title +"')");
		aId.innerHTML = data.amount;
		document.body.appendChild(dvAmount);
		document.body.appendChild(dvCost);
		cId.innerHTML = data.cost[0];
	}
	else {
		document.body.appendChild(btn);
		btn.setAttribute("onclick", "press('"+ title +"')");
	}
}
function press(machine){
	var data = machines[machine];
	var temp = machines[data.cost[2]];
	if ((data.cost[2] == "points") && (points >= data.cost[0])){
		points -= data.cost[0];
		data.clicks += 1;
		data.cost[0] += data.cost[1]*data.clicks;
		data.amount += 1;

		data.cost[0] = Math.round((data.cost[0])*100)/100;
		data.amount = Math.round((data.amount)*100)/100;
		points = Math.round((points)*100)/100;
		if (data.name != "Click"){
			document.getElementById('amount' + machine).innerHTML = data.amount;
			document.getElementById('cost' + machine).innerHTML = data.cost[0];
		}
		document.getElementById('points').innerHTML = points;
	}
	else if (temp.amount >= data.cost[0]){
		temp.amount -= data.cost[0];
		data.clicks += 1;
		data.cost[0] += data.cost[1]*data.clicks;
		data.amount += 1;

		data.cost[0] = Math.round((data.cost[0])*100)/100;
		data.amount = Math.round((data.amount)*100)/100;
		temp.amount = Math.round((temp.amount)*100)/100;
			
		document.getElementById('amount' + machine).innerHTML = data.amount;
		document.getElementById('amount' + machine.cost[2]).innerHTML = temp.amount;
		document.getElementById('cost' + machine).innerHTML = data.cost[0];
	}
}
function save(){
	var save = JSON.stringify(machines);
	var savePoints = JSON.stringify(points);
	localStorage.setItem("save", save);
	localStorage.setItem("savePoints", savePoints);
}
function removeSave(){
	localStorage.removeItem("save");
	localStorage.removeItem("savePoints");
	window.location.reload();
}
function loop(){
	for(var title in machines){
		var data = machines[title];
		if(data.notThis == undefined){
			if(data.output[0] == 'points'){
				points += data.output[1]*data.amount;
				points = Math.round((points)*100)/100;
				document.getElementById('points').innerHTML = points;
			}
			else {
				var temp = machines[data.output[0]];
				temp.amount += data.output[1]*data.amount;
				
				temp.amount = Math.round((temp.amount)*100)/100;
				document.getElementById('amount' + data.output[0]).innerHTML = temp.amount;
			}
		}
	}
}
function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));
	var savePoints = JSON.parse(localStorage.getItem("savePoints"));
	if (savegame !== null){
		machines = savegame;
		for(var title in machines){
			var data = machines[title];
			if(data.amount !== undefined && data.cost !== undefined){
				if(data.amount !== null && data.cost !== null){
					document.getElementById('amount' + title).innerHTML = data.amount;
					document.getElementById('cost' + title).innerHTML = data.cost[0];
				}
			}
		}
	}
	if (savePoints !== null){
		points = savePoints;
		document.getElementById('points').innerHTML = points;
	}
}
load();

window.setInterval(function(){
	save();
	loop();
}, 80);
