var hoverStyle = `*:hover {
  border: 2px solid red !important;
}`;
var styles = `
  #captureResult{
    display: none;
    position: fixed;
    font-family: sans-serif;
    width: 100%;
    height: 100%;
    z-index: 99999;
    background-color: rgba(0,0,0,.3);
    top: 0;
    left: 0;
  }
  #captureResultInner{
    background-color: #FFFFFF;
    width: 500px;
    margin: 15px auto;
    border-radius: 6px;
    overflow: hidden;
  }
  #captureResultHeader{
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: #1e87f0;
    color: #FFFFFF;
    font-size: 18px;
  }
  #captureResultHeaderWrapper{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
  }
  #captureResultHeaderWrapper #closeModalTaskManager{
    padding: 12px;
    cursor: pointer;
  }

  // FORM
  #capture_form{
    padding: 32px 90px;
    box-sizing: border-box;
  }
  .capture_input_wrapper{
    position: relative;
    border: 1px solid #eee;
    height: 42px;
    margin-bottom: 16px;
    border-radius: 6px;
    box-sizing: border-box;
  }
  .capture_textarea_wrapper{
    height: 142px;
  }
  .capture_input_wrapper:hover{
    border: 2px solid #ccc;
    height: 42px;
  }
  .capture_input_wrapper label{
    position: absolute;
    left: 6px;
    top: 12px;
    z-index: -1;
    background: #fff;
    padding: 2px 6px;
    transition: top ease .3s;
  }
  .capture_textarea,
  .capture_input{
    min-height: 40px;
    max-height: 40px;
    box-sizing: border-box;
    width: 100%;
    border: 0 !important;
    outline: none !important;
    padding: 12px;
    border-radius: 4px;
  }
  .capture_textarea{
    min-height: 140px;
    max-height: 140px;
  }
  .capture_textarea:hover .capture_input,
  .capture_input_wrapper:hover .capture_input{
    min-height: 38px;
    max-height: 38px;
    padding-left: 11px;
    padding-right: 11px;
  }
  .capture_textarea_wrapper:hover{
    height: 142px;
  }
  .capture_textarea_wrapper:hover > .capture_textarea{
    min-height: 138px;
    max-height: 138px;
    padding: 11px;
  }
  .capture_input:focus + label{
    z-index: 1;
    top: -12px;
    font-size: 13px;
  }

  #captureButton{
    position: fixed;
    width: 76px;
    height: 76px;
    background: #1E87F0;
    z-index: 9999;
    right: 16px;
    top: 35%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`

var addHoverStyle = function(){
  var styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = hoverStyle;
  styleSheet.id = 'hoverStyle';
  document.head.appendChild(styleSheet);
}

var removeHoverStyle = function(){
  var sheet = document.getElementById('hoverStyle');
  sheet.disabled = true;
  sheet.parentNode.removeChild(sheet);
}

var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

window.$ = document.querySelectorAll.bind(document);
var captureHover = false;
var enableCapture = false;
$('body')[0].addEventListener("click", function( event ) {
  event.preventDefault();
  if(!enableCapture) return false;
  if(captureHover) return false;
  event.target.style.border = "";
  captureElm(event);
}, false);

var captureButton = document.createElement('div');
captureButton.id = 'captureButton';
captureButton.style.background = config.icon_colour;
captureButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.6 14.4H14.4V21.6C14.4 22.92 13.32 24 12 24C10.68 24 9.6 22.92 9.6 21.6V14.4H2.4C1.08 14.4 0 13.32 0 12C0 10.68 1.08 9.6 2.4 9.6H9.6V2.4C9.6 1.08 10.68 0 12 0C13.32 0 14.4 1.08 14.4 2.4V9.6H21.6C22.92 9.6 24 10.68 24 12C24 13.32 22.92 14.4 21.6 14.4Z" fill="white"/></svg>`;
document.body.appendChild(captureButton);
captureButton.onclick = function(){
  addHoverStyle();
  captureButton.style.display = 'none';
  setTimeout(function(){
    enableCapture = true;
  }, 600);
}

var captureResult = document.createElement('div');
captureResult.id = 'captureResult';

var captureResultInner = document.createElement('div');
captureResultInner.id = 'captureResultInner';

// --- Header
var captureResultHeader = document.createElement('div');
captureResultHeader.id = 'captureResultHeader';

captureResultHeader.innerHTML = `
  <div id="captureResultHeaderWrapper">
    <span>Create Task</span>
    <span id="closeModalTaskManager">×</span>
  </div>
`;
captureResultInner.appendChild(captureResultHeader);

// --- Image
var captureResultImg = document.createElement('div');
captureResultImg.id = 'captureResultImg';
captureResultInner.appendChild(captureResultImg);

// --- Form
var captureResultForm = document.createElement('div');
captureResultForm.id = 'captureResultForm';
captureResultForm.style.overflow = 'auto';
captureResultForm.style.padding = '32px';
captureResultForm.innerHTML = `
  <form id="capture_form">
    <div class="capture_input_wrapper">
      <input id="formTitle" class="capture_input" placeholder="Title" />
      <label>Title</label>
    </div>
    <div class="capture_input_wrapper">
      <input id="formURL" class="capture_input" placeholder="URL" />
      <label>URL</label>
    </div>
    <div class="capture_input_wrapper">
      <input id="formBrowser" class="capture_input" placeholder="Browser Version" />
      <label>Browser Version</label>
    </div>
    <div id="formDescription" class="capture_input_wrapper capture_textarea_wrapper">
      <textarea class="capture_textarea" placeholder="Description" ></textarea>
      <label>Description</label>
    </div>
    <div style="margin-bottom: 12px; text-align: center;">
      <a id="capturedImgLink" href="" style="text-decoration: outline">Image1234.thebugbubble.com</a>
      <span style="padding:12px; color: orange;" id="capturedImgLinkLoading">Image is loading...</span>
    </div>
    <button id="createTask" style="width: 100%;font-size: 16px;color: #fff;padding: 12px;border-radius: 4px;margin: 10px 0;border: 0;background-color: rgb(30, 135, 240);">
      Submit
    </button>
  </form>
`;
captureResultInner.appendChild(captureResultForm);

captureResult.appendChild(captureResultInner);
$('body')[0].appendChild(captureResult);

$('#captureResult')[0].addEventListener("mouseover", function( event ) {   
  captureHover = true;
}, false);

$('#captureResult')[0].addEventListener("mouseenter", function( event ) {   
  captureHover = true;
}, false);

$('#captureResult')[0].addEventListener("mouseleave", function( event ) {   
  captureHover = false;
}, false);

var base64data = '';
$('#capturedImgLink')[0].addEventListener("click", function( event ) {
  if(base64data){
    var newTab = window.open();
    newTab.document.body.innerHTML = '<img src="' + base64data + '" />';
  }else{
    alert('Image is not loaded yet');
  }
}, false);

$('#closeModalTaskManager')[0].addEventListener("click", function( event ) {
  captureResult.style.display = 'none';
  addHoverStyle();
  event.preventDefault();
}, false);

var _img;
var captureElm = function(event){
  document.getElementById('capturedImgLinkLoading').style.display = 'block';
  removeHoverStyle();
  captureResult.style.display = 'block';
  var {x, y, width, height} = event.target.getBoundingClientRect();
  var y = event.target.getBoundingClientRect().top + window.scrollY;
  var x = event.target.getBoundingClientRect().left + window.scrollX;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      _img = this.responseText;
      base64data = `${config.API_URL}/img/` + this.responseText;
      document.getElementById('capturedImgLinkLoading').style.display = 'none';
    }
  });

  xhr.open("POST", `${config.API_URL}/capture?x=${x}&y=${y}&w=${width}&h=${height}&width=${window.innerWidth}&url=${location.href}`);

  xhr.send();
}

var creating_task = false;
document.getElementById("createTask").onclick = function(){
  if(!base64data){
    alert('Image is not rendered yet please wait');
    return;
  }
  if(creating_task){return}
  creating_task = true;
  document.getElementById("createTask").innerText = 'Loading...';
  var name = document.getElementById('formTitle').value;
  var notes = `
    URL: ${document.getElementById('formTitle').formURL}
    Browser: ${document.getElementById('formTitle').formBrowser}
    Description: ${document.getElementById('formTitle').formDescription}
  `

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      alert('Task is created');
      captureResult.style.display = 'none';
      addHoverStyle();
      event.preventDefault();
      creating_task = false;
      document.getElementById("createTask").innerText = 'Submit';
    }
  });

  xhr.open("POST", `${config.API_URL}/asana/task?personal_access_token=${config.personal_access_token}&workspace=${config.workspace}&name=${name}&notes=${notes}&project=${config.project}&img=${_img}`);

  xhr.send();
}
