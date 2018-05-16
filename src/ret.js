
function update(data){
	var ul=document.getElementById('list');
	var li = document.createElement("li");
	console.log(data);
	try {
		obj = data.KeyPair;
		var count = 0;
		for(let key in obj){
			count++;
			console.log(key);
			var btn = document.createElement("BUTTON");
			btn.appendChild(document.createTextNode(key));
			btn.classList.add("flag");
			btn.id = key;
			btn.onclick = reloadTabs;
			li.appendChild(btn);
			ul.appendChild(li);
		}

		if(count===0){
			document.getElementById("session_header").innerHtml = "No saved sessions";
		}
		else{
			document.getElementById("session_header").innerHtml = "Saved Sessions:";

		}
		console.log("Running");
	}

	catch(e){
		console.log(e);
	}
}

browser.storage.local.get().then(update);
