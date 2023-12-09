let CryptoJS = require("crypto-js");
console.log(CryptoJS.HmacSHA1("Message", "Key"));

function abtab() {
    var url = document.location.href
    var win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    var iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    iframe.src = url;
    window.location.replace("https://classroom.google.com/h")
    win.document.body.appendChild(iframe);
}
// Hide the spinner element after the page is loaded
document.querySelector('.spinner').style.display = 'none';

// Function to get the main save data
function getMainSave() {
  var mainSave = {};

  // List of items in localStorage that should not be saved
  var localStorageDontSave = ['theme', 'tab', 'nebelung'];

  // Convert localStorage to an array of key-value pairs and remove the items that should not be saved
  localStorageSave = Object.entries(localStorage);

  for (let entry in localStorageSave) {
    if (localStorageDontSave.includes(localStorageSave[entry][0])) {
      localStorageSave.splice(entry, 1);
    }
  }

  // Convert the localStorage array to a base64-encoded JSON string
  localStorageSave = btoa(JSON.stringify(localStorageSave));

  // Add the localStorage data to the mainSave object
  mainSave.localStorage = localStorageSave;

  // Get the cookies data and add it to the mainSave object
  cookiesSave = document.cookie;
  cookiesSave = btoa(cookiesSave);
  mainSave.cookies = cookiesSave;

  // Convert the mainSave object to a base64-encoded JSON string
  mainSave = btoa(JSON.stringify(mainSave));

  // Encrypt the mainSave data using AES encryption with the key 'save'
  mainSave = CryptoJS.AES.encrypt(mainSave, 'save').toString();

  // Return the encrypted mainSave data
  return mainSave;
}

// Function to download the main save data as a file
function downloadMainSave() {
  var data = new Blob([getMainSave()]);
  var dataURL = URL.createObjectURL(data);
  var fakeElement = document.createElement('a');
  fakeElement.href = dataURL;
  fakeElement.download = 'games.save';
  fakeElement.click();
  URL.revokeObjectURL(dataURL);
}

// Function to get the main save data from an uploaded file
function getMainSaveFromUpload(data) {
  // Decrypt the uploaded data using AES decryption with the key 'save'
  data = CryptoJS.AES.decrypt(data, 'save').toString(CryptoJS.enc.Utf8);

  // Parse the decrypted data as JSON
  var mainSave = JSON.parse(atob(data));
  var mainLocalStorageSave = JSON.parse(atob(mainSave.localStorage));
  var cookiesSave = atob(mainSave.cookies);

  // Set the items in localStorage using the uploaded data
  for (let item of mainLocalStorageSave) {
    localStorage.setItem(item[0], item[1]);
  }

  // Set the cookies using the uploaded data
  document.cookie = cookiesSave;
}

// Function to handle the file upload
function uploadMainSave() {
  var hiddenUpload = document.querySelector('.hiddenUpload');
  hiddenUpload.click();

  // Listen for the change event on the file input element
  hiddenUpload.addEventListener('change', function (e) {
    var files = e.target.files;
    var file = files[0];
    if (!file) {
      return;
    }

    // Read the contents of the uploaded file as text and call getMainSaveFromUpload with the result
    var reader = new FileReader();

    reader.onload = function (e) {
      getMainSaveFromUpload(e.target.result);

      // Show a success message to the user
      var uploadResult = document.querySelector('.uploadResult');
      uploadResult.innerText = 'Uploaded save!';
      uploadResult.style.display = 'initial';
      setTimeout(function () {
        uploadResult.style.display = 'none';
      }, 3000);
    };

    reader.readAsText(file);
  });
}