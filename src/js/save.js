const refBtn = document.getElementsByClassName("btn-add")[0];
const refLocalStorage = browser.storage.local;
const refInput = document.getElementsByClassName("form-control")[0]; 
const refFeedback = document.getElementsByClassName("feedback")[0];

function reloadTabs() {
  const value = this.innerHTML;
  refLocalStorage
    .get()
    .then((tabList) => {
      if (tabList) {
        browser.windows
          .create({
            url: tabList[value],
          })
          .catch((err) => alert("There are some invalid URL's"));
      }
    })
    .catch((err) => alert("There are some invalid URL's"));
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
document.addEventListener("DOMContentLoaded", () => {
  refBtn.addEventListener("click", () => {
    browser.tabs
      .query({
        currentWindow: true,
      })
      .then((tabs) => {
        var arr = [];
        arr = tabs.map((item) => item.url);

        refLocalStorage
          .get()
          .then((savedTabs) => {
            const sessionName = refInput.value;

            if(sessionName === "" || sessionName === null || sessionName === undefined) {
              refInput.classList.add("is-invalid");
              refFeedback.innerHTML = "Please enter session name";
              
              refInput.addEventListener('change', (event) => {
                if(refInput.classList.contains('is-invalid')){
                  refInput.classList.remove('is-invalid');
                  refFeedback.innerHTML = ""; 
                }
              })

              refInput.removeEventListener('change');
              return;
            }

            if (!isEmpty(savedTabs)) {
              const flag = Object.keys(savedTabs).filter(
                (item) => item === sessionName
              );
              if (flag.length > 0) {
                refInput.classList.add("is-invalid");
                refFeedback.innerHTML = "Name already exists";
                
                refInput.addEventListener('change', (event) => {
                  if(refInput.classList.contains('is-invalid')){
                    refInput.classList.remove('is-invalid');
                    refFeedback.innerHTML = ""; 
                  }
                })

                refInput.removeEventListener('change');               
                return; 
              }
            } else {
              document.getElementsByClassName("tabList")[0].innerHTML = "";
            }
            savedTabs[sessionName] = arr;
            refLocalStorage.set(savedTabs).then(() => {
              const tabList = document.getElementsByClassName("tabList")[0];
              const button = document.createElement("BUTTON");
              button.classList.add("list-group-item");
              button.classList.add("list-group-item-action");
              button.setAttribute("type", "button");
              button.appendChild(document.createTextNode(sessionName));
              button.setAttribute("id", Object.keys(savedTabs).length);
              button.onclick = reloadTabs;
              tabList.appendChild(button);
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
});
