let dataToCopy;

function pasteValue(v) {
  function modifyValue(field, value) {
    var createEvent = function (name) {
      return new Event(name, {"bubbles": true, "cancelable": true});
    };

    field[0].dispatchEvent(createEvent("focus"));
    field.val(value);
    field[0].dispatchEvent(createEvent("change"));
    field[0].dispatchEvent(createEvent("input"));
    field[0].dispatchEvent(createEvent("blur"));
  }

  modifyValue($("[name='APP_Description']"), v.description);
  modifyValue($("[name='USR_Category']"), v.taskId);
}

chrome.runtime.onMessage.addListener((val) => {
  dataToCopy = val;
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: pasteValue,
    args: [dataToCopy],
  });
});
