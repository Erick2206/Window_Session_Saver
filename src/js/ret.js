refLocalStorage
  .get()
  .then((tabs) => {
    const tabList = document.getElementsByClassName("tabList")[0];
    if (!isEmpty(tabs)) {
      Object.keys(tabs).forEach((item, index) => {
        const button = document.createElement("BUTTON");
        button.classList.add("list-group-item");
        button.classList.add("list-group-item-action");
        button.setAttribute("type", "button");
        button.appendChild(document.createTextNode(item));
        button.setAttribute("id", index);
        button.onclick = reloadTabs;
        tabList.appendChild(button);
      });
    } else {
      tabList.innerHTML = `<h5 class="no_session">No sessions saved</h5>`;
    }
  })
  .catch((err) => console.log(err));
