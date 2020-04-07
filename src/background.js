
browser.runtime.onInstalled.addListener(function() {
    browser.storage.sync.set({performActionVal: false}, function() {
      console.log("The color is green.");
    });
  });
  