const render = () => {
  document.getElementsByClassName("tabList")[0].innerHTML = "";
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
          const deleteButton = document.createElement("DIV");
          deleteButton.classList.add("remove-btn");
          deleteButton.innerHTML = `<svg height="15px" width="15px" viewBox="-48 0 407 407" width="407pt" xmlns="http://www.w3.org/2000/svg"><path d="m89.199219 37c0-12.132812 9.46875-21 21.601562-21h88.800781c12.128907 0 21.597657 8.867188 21.597657 21v23h16v-23c0-20.953125-16.644531-37-37.597657-37h-88.800781c-20.953125 0-37.601562 16.046875-37.601562 37v23h16zm0 0"/><path d="m60.601562 407h189.199219c18.242188 0 32.398438-16.046875 32.398438-36v-247h-254v247c0 19.953125 14.15625 36 32.402343 36zm145.597657-244.800781c0-4.417969 3.582031-8 8-8s8 3.582031 8 8v189c0 4.417969-3.582031 8-8 8s-8-3.582031-8-8zm-59 0c0-4.417969 3.582031-8 8-8s8 3.582031 8 8v189c0 4.417969-3.582031 8-8 8s-8-3.582031-8-8zm-59 0c0-4.417969 3.582031-8 8-8s8 3.582031 8 8v189c0 4.417969-3.582031 8-8 8s-8-3.582031-8-8zm0 0"/><path d="m20 108h270.398438c11.046874 0 20-8.953125 20-20s-8.953126-20-20-20h-270.398438c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20zm0 0"/></svg>`;
          deleteButton.onclick = deleteSession;

          button.appendChild(deleteButton);

          tabList.appendChild(button);
        });
      } else {
        tabList.innerHTML = `<h5 class="no_session">No sessions saved</h5>`;
      }
    })
    .catch((err) => console.log(err));
};

const deleteSession = async (event) => {
  event.stopPropagation();
  const sessionName = event.currentTarget.parentNode.innerText;

  const tabList = await refLocalStorage.get();
  if (tabList[sessionName]) {
    delete tabList[sessionName];
  }
  await refLocalStorage.clear();
  await refLocalStorage.set(tabList);
  render();
};
