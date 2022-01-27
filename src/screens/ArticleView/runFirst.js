

try {

function getSelectionText() {
  var text = "";
  var lengthOfString = window.getSelection().toString().length;
  if (lengthOfString > 0) {
    text = window.getSelection().toString();

    count = count + 1;
    event = setTimeout(() => {
      window.alert('timeout executed!')  
      window.ReactNativeWebView.postMessage(text);
    }, 5000);
  }
}
true; // note: this is required, or you'll sometimes get silent failures

document.addEventListener("selectionchange", (e) => {
  getSelectionText();
});

} catch (e) {
    window.alert('there was an error!', e)
    
}
