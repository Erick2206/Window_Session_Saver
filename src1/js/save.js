let btn = document.getElementsByClassName('btn-add');
const refLocalStorage = browser.storage.local;

const onClickAdd = () => {
    browser.tabs.query({
        currentWindow: true
    })
    .then( tabs => {
        let arr = tabs.map( item => {
            arr.push(item.url);
        });

        refLocalStorage.get()
        .then(tabList => {
            if(!isEmpty(tabList)) {
                const obj = tabList.keyPair;
                const flag = document.getElementsByClassName('form-control').value;
                if(obj[flag]) {
                    alert("Name already exists");
                } else{ 
                    obj[flag] = KeyPair[flag];
                    keyPair = obj;
                    refLocalStorage.set({keyPair});
                }
            } else {
                refLocalStorage.set({keyPair});
            }
        })
        .catch( err => console.log(err));
    })
    .catch( err => console.log(err));
};

btn.addEventListener('click', onClickAdd);

