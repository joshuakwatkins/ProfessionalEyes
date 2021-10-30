function copyMe() {
    // Get the text field
    const copyText = document.getElementById('copyEmail');
  
    //Select the text field
    copyText.select();
    navigator.clipboard.writeText(copyText.value);

    //Alert the copied text
  alert("Copied your revised email");
};