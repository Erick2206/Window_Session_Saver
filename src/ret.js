
function update(data){
	var ul=document.getElementById('list');
	console.log(data);
	if(!data.KeyPair){	
		for(var key in data){
			var btn= document.createElement("BUTTON");
			btn.appendChild(document.createTextNode(key));
			ul.appendChild(btn);
		}}
}

browser.storage.local.get().then(update);
