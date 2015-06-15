var counter = 0;
var tBody = document.querySelector('tbody');

function firstAdd(event){
    if(event.keyCode === 13){
    	event.preventDefault();
        addItem();
    } else {
    	return false;
    }
}

function addItem () {
	var form = document.querySelector("form");
	var listItem = form.listInput.value;
	
	var tr = document.createElement("tr");
	tr.setAttribute('id', 'tr' + counter);
	tBody.appendChild(tr);

	var td = document.createElement("td");
	td.textContent = listItem;
	td.setAttribute('id', 'item' + counter);
	tr.appendChild(td);

	var td1 = document.createElement("td");
	td1.innerHTML = '<input type="checkbox" id="complete' + counter + '">';
	tr.appendChild(td1);

	var td2 = document.createElement("td");
	td2.innerHTML = '<a href="#" class="button secondary tiny" id="edit' + counter + '"><i class="fi-pencil"></i></a>';
	tr.appendChild(td2);

	var td3 = document.createElement("td");
	td3.innerHTML = '<a href="#" class="button alert tiny" id="delete' + counter + '"><i class="fi-minus-circle"></i></a>';
	tr.appendChild(td3);

	var completeID = document.querySelector('#complete' + counter);
	completeID.addEventListener("click", function() {
		var findCompleteID = this.getAttribute('id');
		var checkClass = td.getAttribute('class');
		if (checkClass === "green") {
			td.removeAttribute('class');
			unComplete(findCompleteID);
		} else {
			td.setAttribute('class', 'green');
			itemComplete(findCompleteID);
		}
	});

	var editID = document.querySelector('#edit' + counter);
	editID.addEventListener("click", function() {
		var findID = this.getAttribute('id');
		editItem(findID);
	});

	var deleteID = document.querySelector('#delete' + counter);
	deleteID.addEventListener("click", function() {
		var answer = confirm("Are you sure you want to delete this item?");
		if (answer) {
			var findTrID = this.getAttribute('id');
			deleteItem(findTrID);
		} else {
			return false;
		}
	});

	form.reset();
	counter++;
};

function itemComplete(ID) {
	var numID = Number(ID.slice(-1));
	var getEdit = document.querySelector('#edit' + numID);
	getEdit.setAttribute('class', 'delete');
};

function unComplete(ID) {
	var numID = Number(ID.slice(-1));
	var getEdit = document.querySelector('#edit' + numID);
	getEdit.setAttribute('class', 'button secondary tiny');
};

function editItem(findID) {
	var numID = Number(findID.slice(-1));
	var hold = document.querySelector('#item' + numID).innerHTML;

	var getTD = document.querySelector('#item' + numID);

	getTD.innerHTML = '<input type="text" id="newInput'+ numID +'"><a href="#" class="button" id="newSubmit'+ numID +'">Save</a>';
	var testing = document.querySelector('#newInput' + numID);
	testing.value = hold;

	var newInput = document.querySelector('#newInput' + numID);
	newInput.addEventListener('keypress', function() {
		if(event.keyCode === 13){
			var newInputID = document.querySelector('#newInput' + numID).value;
			getTD.innerHTML = newInputID;
	    } else {
	    	return false;
	    }
	});

	var submitID = document.querySelector('#newSubmit' + numID);
	submitID.addEventListener("click", function() {
		var newInputID = document.querySelector('#newInput' + numID).value;
		getTD.innerHTML = newInputID;
	});
};

function deleteItem(findTrID) {
	var numID = Number(findTrID.slice(-1));
	var getTR = document.querySelector('#tr' + numID);
	tBody.removeChild(getTR);
};