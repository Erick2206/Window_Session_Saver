
// Developer : RPzinga
var KeyPair = {};
var key;
function reloadTabs(){
	key=this.id;
	browser.storage.local.get().then(getList);
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
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
function tabStore(tabList){

	if(!isEmpty(tabList)){
		obj=tabList.KeyPair;
		flag=document.querySelector('#input').value;
		obj[flag]=KeyPair[flag];
		KeyPair=obj;
		browser.storage.local.set({KeyPair}).then(setItem);
		browser.storage.local.set({KeyPair}).then(setItem);
	}
	else{
		browser.storage.local.set({KeyPair}).then(setItem);
	}
}
function saveTabs(tabs){

	var arr = new Array;
	let i=0;

	while(i<tabs.length){
		if(tabs[i].url != ''){
			arr.push(tabs[i].url);
			i+=1;
		}
	}

	flag=document.querySelector('#textBox').value;
	//console.log(typeof(flag));
	KeyPair[flag] = arr;

	const gettingStoredSettings = browser.storage.local.get();
	gettingStoredSettings.then(tabStore, onError);

}

function getTabs(){
	var tabList =  browser.tabs.query({currentWindow:true})
	tabList.then(saveTabs)
}

function updateList(){
	var ul = document.getElementById("list");
	var li = document.createElement("li");
	flag=document.querySelector('#textBox').value
	if(!document.getElementById(flag.valueOf())){
		var btn = document.createElement("BUTTON");
		// code to add button with ID as Name entered by User
		//  Onclick : Reload function is called to Load arrays
		btn.appendChild(document.createTextNode(flag));
		btn.classList.add("flag");
		btn.id = flag;
		btn.onclick = reloadTabs;
		li.appendChild(btn);
		ul.appendChild(li);
	}
}

function getList(data){
	if(data.KeyPair){
		try{

			obj = data.KeyPair;
			//console.log(key.valueOf());
			urlArr	= obj[key.valueOf()];
			var creating = browser.windows.create({
    				url: urlArr
  			});
  			creating.then(onCreated, onError);
		}
		catch(e){
			console.log(e);
		}
	}

}

function main(){
	getTabs()
	updateList()
}

document.querySelector('.bttn').addEventListener('click',main)

// Get the input field
var input = document.getElementById("textBox");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("bttn").click();
  }
});
