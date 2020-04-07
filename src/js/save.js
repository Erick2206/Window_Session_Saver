var refBtn = document.getElementsByClassName('btn-add');


var refLocalStorage = browser.storage.local;

function isEmpty(obj) {
	console.log('hereee');
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
document.addEventListener('DOMContentLoaded', ()=>{
	refBtn[0].addEventListener('click', ()=> {
	console.log('statrt')
	
    browser.tabs.query({
        currentWindow: true
    })
    .then( tabs => {
        var arr =[];
        arr = tabs.map(item => item.url);
        
        refLocalStorage.get()
            .then( tabsInLocalStorage => {
                // var namesinLocalStorage = tabsInLocalStorage.keyPair;
                var sessionName = document.getElementsByClassName('form-control').value;
                if(!isEmpty(tabsInLocalStorage)) {
                    const flag = Object.keys(localStorage).filter(item => item === sessionName);
                    if(flsag.length !== 0) {
                      return  alert('Name already exists');
                    } 
                } 
                refLocalStorage.set({sessionName: arr});    
                console.log("done")    
            })
            .catch( err => console.log(err));
            })
    .catch( err => console.log(err));
	}
	);
})

