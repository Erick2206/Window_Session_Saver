
var btn = document.getElementById('bttn');
var text = document.getElementById('input');

function saveTabs(tabs,f){
	for(let tab in tabs){
		console.log(tab.url);
	}
}

function getTabs(){
	return browser.tabs.query({currentWindow:true,active:true});
}

function main(){
	console.log('da');
	var flag = txt.value;
	getTabs().then(saveTabs,flag);
}

