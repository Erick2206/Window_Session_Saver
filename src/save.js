// tablist for currentTabs
var tabList;

// saveDB for handling tabs , and saving it on local storage
function saveDB(){
	
	strList = window.localStorage;

	tablist = browser.tabs.query(
		{
		currentWindow:true 
		}
	);
	console.log('da')	
	console.log(tablist);
	//strList.setItem();
		
	//display(strList);
}
//for popup with data stored in localstorage
 
function display(data){
	if(data.length == 0){
		
	}
	else{
		
	}
}
//onclick action , savDB function is called
browser.browserAction.onClicked.addListener(saveDB);



