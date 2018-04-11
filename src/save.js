
var KeyPair = {};
function setItem(){
	console.log('ok');
}

function saveTabs(tabs){
	
	var arr = new Array;
	let i=0;
	//console.log(tabs[1].url);
	while(i<tabs.length){
		//console.log(tabs[i].url);
		arr.push(tabs[i].url);
		i+=1;	
	}
	flag=document.querySelector('#input').value
	KeyPair[flag] = arr;
	console.log(KeyPair);	
	browser.storage.local.set({KeyPair}).then(setItem);	
}

function getTabs(){
	var tabList =  browser.tabs.query({currentWindow:true})
	//console.log('in')
	tabList.then(saveTabs)
}
function updateList(data){
	var ul = document.getElementById("list");
	flag=document.querySelector('#input').value	
	var btn = document.createElement("BUTTON");
	btn.appendChild(document.createTextNode(flag));
	ul.appendChild(btn);	
}

function getList(){
	//ul.innerHTML="";
	browser.storage.local.get().then(updateList);			
}

function main(){
	//console.log(flag)
	getTabs()
	getList()
}



document.querySelector('#bttn').addEventListener('click',main)
