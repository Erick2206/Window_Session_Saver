
function update(data){
	var ul=document.getElementById('list');
	console.log(data);
	if(!data.KeyPair){	
		for(var key in data){
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(key));
			ul.appendChild(li);
		}}
}

browser.storage.local.get().then(update);
