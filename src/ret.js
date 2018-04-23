
function update(data){
	var ul=document.getElementById('list');	
	console.log(data);
	try {
		obj = data.KeyPair;
		for(let key in obj){
			var btn = document.createElement("BUTTON");
			btn.appendChild(document.createTextNode(key));
			btn.id = key;
			btn.onclick = reloadTabs;
			ul.appendChild(btn);
		}
	}
	catch(e){
		console.log(e);
	}	
}

browser.storage.local.get().then(update);
