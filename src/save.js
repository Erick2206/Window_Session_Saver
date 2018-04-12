var KeyPair = {};

function reloadTabs(){
	var key=this.id;
	getList(key);
}
//function to check the entry of data in storage
function onCreated(windowInfo) {
  console.log(`Created window: ${windowInfo.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}
function setItem(){
	console.log('ok');
}
//Array of Tabs is stored as Key-Pair 
function saveTabs(tabs){
	
	var arr = new Array;
	let i=0;
	
	while(i<tabs.length){		
		arr.push(tabs[i].url);
		i+=1;	
	}

	flag=document.querySelector('#input').value
	KeyPair[flag] = arr;	
	browser.storage.local.set({KeyPair}).then(setItem);
	browser.storage.local.get().then(
		function(data){
			console.log(data.KeyPair);
		}
	);	
}

function getTabs(){
	var tabList =  browser.tabs.query({currentWindow:true})
	tabList.then(saveTabs)
}

function updateList(){
	var ul = document.getElementById("list");
	flag=document.querySelector('#input').value	
	var btn = document.createElement("BUTTON");
	
	// code to add button with ID as Name entered by User
	//  Onclick : Reload function is called to Load arrays
	btn.appendChild(document.createTextNode(flag));
	btn.id = flag;
	btn.onclick = reloadTabs;
	ul.appendChild(btn);
		
}

function getList(key){
	browser.storage.local.get().then(
		function(data){
			var arr = new Array 
			arr=data.KeyPair.key;
			console.log(data.KeyPair);
			
		}
	);					
}

function main(){
	getTabs()
	updateList()
}

document.querySelector('#bttn').addEventListener('click',main)
