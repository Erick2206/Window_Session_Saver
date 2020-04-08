var refBtn = document.getElementsByClassName('btn-add')[0];

var refLocalStorage = browser.storage.local;

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
document.addEventListener('DOMContentLoaded', ()=>{
	refBtn.addEventListener('click', ()=> {
    browser.tabs.query({
        currentWindow: true
    })
    .then( tabs => {
        var arr =[];
        arr = tabs.map(item => item.url);

        refLocalStorage.get()
            .then( tabsInLocalStorage => {
                const sessionName = document.getElementsByClassName('form-control')[0].value;
                if(!isEmpty(tabsInLocalStorage)) {
                  const flag = Object.keys(tabsInLocalStorage).filter( item => item === sessionName);
                    if( flag.length > 0) {
                      return  console.log('Name already exists');
                    }
                }
                tabsInLocalStorage[sessionName] = arr;
                refLocalStorage.set(tabsInLocalStorage)
								.then(() => {
                  const tabList = document.getElementsByClassName('tabList')[0];
                  const button = document.createElement("BUTTON");
                  button.classList.add("list-group-item");
                  button.classList.add("list-group-item-action");
                  button.setAttribute('type', "button");
                    button.appendChild(document.createTextNode(sessionName));
                    button.setAttribute('id', Object.keys(tabsInLocalStorage).length);
                    // button.onclick = reloadTabs;
                    tabList.appendChild(button);
                });
            })
            .catch( err => console.log(err));
            })
    .catch( err => console.log(err));
	}
	);
})
