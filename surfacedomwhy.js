function newProject(mod) {closeDialog("claseallbgdiv");if (mod == 1) {openMenu();}let id = "newProDiag";let ttr = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", globalLang[41]);let header = creatanelemn("div", "diaghead", "", "", "", "", "", "", ttr, "", "", "");let clsfun = "closeDialog('"+id+"')";let clsbtn = creatanelemn("input", "clsbtn", "", "", "", "", "button", "X", "", clsfun, "", "");header.appendChild(clsbtn);let condiv = creatanelemn("div", "condiv", "", "", "", "", "", "", header, "", "", "");let frow = creatanelemn("div", "diagrow", "", "", "", "", "", "", "", "", "", "");let nmttl = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", globalLang[42]);let nameinp = creatanelemn("input", "", "proNameInp", "", "", "", "text", "", "", "", "", "");frow.appendChild(nmttl);frow.appendChild(nameinp);let btrttl = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", globalLang[43]);let trow = creatanelemn("div", "diagcol", "", "", "", "", "", "", btrttl, "", "", "");let hbat = creatanelemn("input", "", "hbat1", "", "width:50px;", "", "text", "", "", "", "", "");hbat.setAttribute("placeholder", "#Y");let subrow = creatanelemn("div", "diagrow", "", "", "", "", "", "", hbat, "", "", "");let xbat = creatanelemn("p", "batteriescount", "", "", "", "", "", "", "", "", "", " X ");let wbat = creatanelemn("input", "", "wbat1", "", "width:50px;", "", "text", "", "", "", "", "");wbat.setAttribute("placeholder", "#X");subrow.appendChild(xbat);subrow.appendChild(wbat);trow.appendChild(subrow);let frrow = creatanelemn("div", "diagrow", "addBatDiv", "", "", "", "", "", "", "", "", "");let adbat = creatanelemn("input", "submitBtn", "", "", "", "", "button", globalLang[44], "", "addBatteries()", "", "");frrow.appendChild(adbat);let hdiv = creatanelemn("div", "hdiv", "newProHDiv", "", "", "", "", "", frow, "", "", "");hdiv.appendChild(trow);hdiv.appendChild(frrow);condiv.appendChild(hdiv);let subbtn = creatanelemn("input", "submitBtn", "", "", "", "", "button", globalLang[45], "", "createProject()", "", "");let footer = creatanelemn("div", "diaghead", "", "", "", "", "", "", subbtn, "", "", "");condiv.appendChild(footer);let bgdiv = creatanelemn("div", "bgdiv", id, "", "", "", "", "", condiv, "", "", "");document.getElementsByTagName('body')[0].appendChild(bgdiv);document.getElementById('proNameInp').select();}
function createProject() {
  let nameOfPro = document.getElementById('proNameInp').value;
  let batRun = document.getElementsByClassName('batteriescount').length;
  let projects = new Object();
  let onlineProjectsLen = Object.keys(onlineProjects).length;
  let proID = nameOfPro.replaceAll(" ", "") + onlineProjectsLen;
  onlineProjects[proID] = new Object();
  projects[proID] = new Object();
  onlineProjects[proID]["name"] = nameOfPro;
  onlineProjects[proID]["#bat"] = batRun;
  projects[proID]["name"] = nameOfPro;
  projects[proID]["#bat"] = batRun;
  let batrray = new Array();
  for (var i = 0; i < batRun; i++) {
    let y = i + 1;
    let tHlen = document.getElementById('hbat' + y).value;
    let tWlen = document.getElementById('wbat' + y).value;
    let bat = [tHlen, tWlen];
    batrray.push(bat);
  }
  onlineProjects[proID]["batlen"] = batrray;
  projects[proID]["batlen"] = batrray;
  onlineProjects[proID]["pilesData"] = new Object();
  projects[proID]["pilesData"] = new Object();
  setProjectInView(proID);
  let h = globalUrls["stPurl"];
  let WEB_APP_URL = "https://script.google.com/macros/s/passkey/exec";
  WEB_APP_URL = WEB_APP_URL.replace("passkey", decoderX(pasValInp, h));
  const formData = new FormData();
  formData.append('jsonPayload', JSON.stringify(projects));
  fetch(WEB_APP_URL, {
    method: 'POST',
    mode: 'cors',
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    if (result.status === 'success') {
      ayanotifiys(globalLang[64], globalLang[67], "shoenotiynow");
      let stringedProjects = JSON.stringify(onlineProjects);
      window.localStorage.setItem("ProjectsData", stringedProjects);
    }
    else {
      ayanotifiys("ERR - 02", result.message, "shoenotiynow");
    }
  })
  .catch(error => {
    ayanotifiys("ERR - 03", error, "shoenotiynow");
  });
  try {
    document.getElementById('nProjet').remove();
  } catch (e) {} finally {}
  let onclk = "viewProject('"+proID+"', 1)";
  let mnuBtnId = proID + "proBtn";
  let btn0 = creatanelemn("button", "projectsBtns", mnuBtnId, "", "", "", "", "", "", onclk, "", nameOfPro);
  let btn1 = creatanelemn("button", "", "nProjet", "", "", globalLang[46], "", "", "", "newProject(1)", "", globalLang[47]);
  let mainDiv = document.getElementById('projectsDiv');
  try {
    document.getElementById('npy').remove();
  } catch (e) {} finally {}
  mainDiv.appendChild(btn0);mainDiv.appendChild(btn1);
  closeDialog("newProDiag");
}
function addBatteries() {let batNum = document.getElementsByClassName('batteriescount').length;document.getElementById('addBatDiv').remove();let batnm = globalLang[48] + (batNum + 1);let btrttl = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", batnm);let trow = creatanelemn("div", "diagcol", "", "", "", "", "", "", btrttl, "", "", "");let hbatn = "hbat" +(batNum + 1) , wbatn = "wbat" + (batNum + 1);let hbat = creatanelemn("input", "", hbatn, "", "width:50px;", "", "text", "", "", "", "", "");hbat.setAttribute("placeholder", "#Y");let subrow = creatanelemn("div", "diagrow", "", "", "", "", "", "", hbat, "", "", "");let xbat = creatanelemn("p", "batteriescount", "", "", "", "", "", "", "", "", "", " X ");let wbat = creatanelemn("input", "", wbatn, "", "width:50px;", "", "text", "", "", "", "", "");wbat.setAttribute("placeholder", "#X");subrow.appendChild(xbat);subrow.appendChild(wbat);trow.appendChild(subrow);let frrow = creatanelemn("div", "diagrow", "addBatDiv", "", "", "", "", "", "", "", "", "");let adbat = creatanelemn("input", "submitBtn", "", "", "", "", "button", globalLang[49], "", "addBatteries()", "", "");frrow.appendChild(adbat);document.getElementById("newProHDiv").appendChild(trow);document.getElementById("newProHDiv").appendChild(frrow);}
function setterPiles(idetion) {closeDialog("claseallbgdiv");let id = "pileSetPlatform";let pileName = idetion.replace("%", "'");pileName = pileName.replace("#", "\"");let ttr = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", pileName);let header = creatanelemn("div", "diaghead", "", "", "", "", "", "", ttr, "", "", "");let clsfun = "closeDialog('"+id+"')";let clsbtn = creatanelemn("input", "clsbtn", "", "", "", "", "button", "X", "", clsfun, "", "");header.appendChild(clsbtn);let condiv = creatanelemn("div", "condiv", "", "", "", "", "", "", header, "", "", "");let nmttl = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", globalLang[28]);let frow = creatanelemn("div", "diagcol", "", "", "", "", "", "", nmttl, "", "", "");let subrow = creatanelemn("div", "diagrowPro", "", "", "", "", "", "", "", "", "", "");let cords = ["X", "Y", "Z"];for (var i = 0; i < cords.length; i++) {let txt = cords[i] + ": ";let corttl = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", txt);let ssrow = creatanelemn("div", "diagrow", "", "", "", "", "", "", corttl, "", "", "");let cordInp = creatanelemn("input", "", cords[i], "", "width:100px;", "", "text", "", "", "", "", "");ssrow.appendChild(cordInp);subrow.appendChild(ssrow);}frow.appendChild(subrow);let typettl = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", globalLang[50]);let sRow = creatanelemn("div", "diagrow", "", "", "", "", "", "", typettl, "", "", "");let select = creatanelemn("select", "", "pileType", "", "", "", "", "", "", "", "", "");let typsPile = [globalLang[51], globalLang[52], globalLang[53], globalLang[54], globalLang[55], globalLang[56]];for (var i = 0; i < typsPile.length; i++) {let option = creatanelemn("option", "", "", "", "", "", "", "", "", "", "", typsPile[i]);select.appendChild(option);}sRow.appendChild(select);let hdiv = creatanelemn("div", "hdiv", "newProHDiv", "", "", "", "", "", frow, "", "", "");hdiv.appendChild(sRow);let titling = [globalLang[29], globalLang[30], globalLang[31]];let functiling = [["SD", "SH"], ["ED", "EH"]];let funsOfDH = ["date", "time"];let namiling = [[globalLang[32], globalLang[33]], [globalLang[34], globalLang[35]]];for (var i = 0; i < titling.length; i++) {let titlttl = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", titling[i]);let tRow = creatanelemn("div", "diagcol", "", "", "", "", "", "", titlttl, "", "", "");for (var y = 0; y < namiling.length; y++) {  let ssRow = creatanelemn("div", "diagrowPro", "", "", "", "", "", "", "", "", "", "");  for (var x = 0; x < namiling[y].length; x++) {    let tSubTtl = namiling[y][x] + ": ";    let subtitl = creatanelemn("p", "", "", "", "font-size:18px;", "", "", "", "", "", "", tSubTtl);    let sssRow = creatanelemn("div", "diagrow", "", "", "", "", "", "", subtitl, "", "", "");    let idsz = titling[i] + functiling[y][x];    let inpX = creatanelemn("input", "", idsz, "", "width:120px;font-size:16px;", "", funsOfDH[x], "", "", "", "", "");    sssRow.appendChild(inpX);ssRow.appendChild(sssRow);  }  tRow.appendChild(ssRow);}hdiv.appendChild(tRow);}condiv.appendChild(hdiv);let onclk = "setPileData('"+idetion+"')";let subbtn = creatanelemn("input", "submitBtn", "", "", "", "", "button", globalLang[57], "", onclk, "", "");let footer = creatanelemn("div", "diaghead", "", "", "", "", "", "", subbtn, "", "", "");condiv.appendChild(footer);let bgdiv = creatanelemn("div", "bgdiv", id, "", "", "", "", "", condiv, "", "", "");document.getElementsByTagName('body')[0].appendChild(bgdiv);}
function setPileData(idetion) {let iDs = ["X", "Y", "Z", "pileType"        , (globalLang[29]+"SD"), (globalLang[29]+"SH"), (globalLang[29]+"ED"), (globalLang[29]+"EH")        , (globalLang[30]+"SD"), (globalLang[30]+"SH"), (globalLang[30]+"ED"), (globalLang[30]+"EH")        , (globalLang[31]+"SD"), (globalLang[31]+"SH"), (globalLang[31]+"ED"), (globalLang[31]+"EH")];let kYs = ["X", "Y", "Z", "pT", "DSD", "DSH", "DED", "DEH"        , "RSD", "RSH", "RED", "REH", "CSD", "CSH", "CED", "CEH"];let tempObj = new Object();isItEmpty = true;for (var i = 0; i < iDs.length; i++) {let val = document.getElementById(iDs[i]).value;tempObj[kYs[i]] = val;if (iDs[i] == (globalLang[29]+"SD") && val == "") {  let todays = new Date();  let artt = [todays.getFullYear(), (todays.getMonth()+1), todays.getDate()];  for (var u = 0; u < artt.length; u++) {    if (artt[u] < 10) {      artt[u] = "0" + artt[u];    }  }  let today = artt[0] + "-" + artt[1] + "-" + artt[2];  tempObj[kYs[i]] = today;}if (val != "") {  isItEmpty = false;}}if (!isItEmpty) {if (tempProject == undefined) {  tempProject = new Object();  tempProject[selectedProjectIV] = new Object();  tempProject[selectedProjectIV][idetion] = tempObj;}else {  if (tempProject[selectedProjectIV] == undefined) {    tempProject[selectedProjectIV] = new Object();    tempProject[selectedProjectIV][idetion] = tempObj;  }  else {    tempProject[selectedProjectIV][idetion] = tempObj;  }}let stringedNSProjects = JSON.stringify(tempProject);window.localStorage.setItem("ProjectsNotSavedData", stringedNSProjects);if (onlineProjects[selectedProjectIV]["pilesData"] == undefined) {  onlineProjects[selectedProjectIV]["pilesData"] = new Object();  onlineProjects[selectedProjectIV]["pilesData"][idetion] = tempObj;}else {  onlineProjects[selectedProjectIV]["pilesData"][idetion] = tempObj;}let stringedProjects = JSON.stringify(onlineProjects);window.localStorage.setItem("ProjectsData", stringedProjects);closeDialog("pileSetPlatform");let theItem = document.getElementById(idetion);theItem.removeAttribute("class");theItem.removeAttribute("onclick");theItem.setAttribute("class", "eleypro");theItem.setAttribute("onclick", "viewerPiles(this.id)");projectAnalyzer();}else {ayanotifiys("Err - 01", "No Data Entred", "shoenotiynow");}presentSubmitEditBtn();}
function submitEditingsNeo() {
  let stringedData = window.localStorage.getItem("ProjectsNotSavedData");
  let h = globalUrls["stItem"];
  let WEB_APP_URL = "https://script.google.com/macros/s/passkey/exec";
  WEB_APP_URL = WEB_APP_URL.replace("passkey", decoderX(pasValInp, h));
  const formData = new FormData();
  formData.append('jsonPayload', stringedData);
  fetch(WEB_APP_URL, {
    method: 'POST',
    mode: 'cors',
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    if (result.status === 'success') {
      ayanotifiys(globalLang[64], globalLang[68], "shoenotiynow");
      window.localStorage.removeItem("ProjectsNotSavedData");
      document.getElementById('submitDeitBtn').remove();
    }
    else {
      ayanotifiys("ERR - 07", result.message, "shoenotiynow");
    }
  })
  .catch(error => {
    ayanotifiys("ERR - 08", error, "shoenotiynow");
  });
}
function confirmDelete(id) {
  let kYs = ["X", "Y", "Z", "pT", "DSD", "DSH", "DED", "DEH"
            , "RSD", "RSH", "RED", "REH", "CSD", "CSH", "CED", "CEH"];
  let tempObj = new Object();
  for (var i = 0; i < kYs.length; i++) {
    tempObj[kYs[i]] = "REMOVE";
  }
  delete onlineProjects[selectedProjectIV]["pilesData"][id];
  try {
    delete tempProject[selectedProjectIV]["pilesData"][id];
  } catch (e) {} finally {}
  closeDialog("deleteDiag");
  closeDialog("pileViewPlatform");
  let theItem = document.getElementById(id);
  theItem.removeAttribute("class");
  theItem.removeAttribute("onclick");
  theItem.setAttribute("class", "eley");
  theItem.setAttribute("onclick", "setterPiles(this.id)");
  projectAnalyzer();
  let stringedProjects = JSON.stringify(onlineProjects);
  window.localStorage.setItem("ProjectsData", stringedProjects);
  let stringedNSProjects = JSON.stringify(tempProject);
  window.localStorage.setItem("ProjectsNotSavedData", stringedNSProjects);
  let h = globalUrls["dlItem"];
  let WEB_APP_URL = "https://script.google.com/macros/s/passkey/exec";
  WEB_APP_URL = WEB_APP_URL.replace("passkey", decoderX(pasValInp, h));
  let deleteProjects = new Object();
  deleteProjects[selectedProjectIV] = [id];
  const formData = new FormData();
  formData.append('jsonPayload', JSON.stringify(deleteProjects));
  fetch(WEB_APP_URL, {
    method: 'POST',
    mode: 'cors',
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    if (result.status === 'success') {
      ayanotifiys(globalLang[64], globalLang[69], "shoenotiynow");
    }
    else {
      ayanotifiys("ERR - 10", result.message, "shoenotiynow");
    }
  })
  .catch(error => {
    ayanotifiys("ERR - 11", error, "shoenotiynow");
  });
}
function deletPile(idetion) {let onclk = "confirmDelete('"+idetion+"')";let id = "deleteDiag";let ttr = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", globalLang[58]);let header = creatanelemn("div", "diaghead", "", "", "", "", "", "", ttr, "", "", "");let clsfun = "closeDialog('"+id+"')";let clsbtn = creatanelemn("input", "clsbtn", "", "", "", "", "button", "X", "", clsfun, "", "");header.appendChild(clsbtn);let condiv = creatanelemn("div", "condiv", "logingCon", "", "", "", "", "", header, "", "", "");let nmttl = creatanelemn("p", "", "", "", "margin-bottom: 10px;", "", "", "", "", "", "", CompenyName);let frow = creatanelemn("div", "diagrow", "", "", "", "", "", "", nmttl, "", "", "");let idetionX = idetion.replace("%", "'");idetionX = idetionX.replace("#", "\"");let txt = globalLang[59] + idetionX + globalLang[60];let psdttl = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", txt);let srow = creatanelemn("div", "diagrow", "", "", "color:red;fon-size:2rem;", "", "", "", psdttl, "", "", "");let hdiv = creatanelemn("div", "hdiv", "logInHDiv", "", "justify-content:center;", "", "", "", frow, "", "", "");hdiv.appendChild(srow);condiv.appendChild(hdiv);let yesbtn = creatanelemn("input", "submitBtn", "", "", "", "", "button", globalLang[61], "", onclk, "", "");let footer = creatanelemn("div", "diaghead", "", "", "", "", "", "", yesbtn, "", "", "");let nobtn = creatanelemn("input", "submitBtn", "", "", "", "", "button", globalLang[62], "", clsfun, "", "");footer.appendChild(nobtn);condiv.appendChild(footer);let bgdiv = creatanelemn("div", "bgdiv", id, "", "", "", "", "", condiv, "", "", "");document.getElementsByTagName('body')[0].appendChild(bgdiv);}
function editPile(idetion) {closeDialog("claseallbgdiv");let id = "pileEditPlatform";let pileName = idetion.replace("%", "'");pileName = pileName.replace("#", "\"");let ttr = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", pileName);let header = creatanelemn("div", "diaghead", "", "", "", "", "", "", ttr, "", "", "");let clsfun = "closeDialog('"+id+"')";let clsbtn = creatanelemn("input", "clsbtn", "", "", "", "", "button", "X", "", clsfun, "", "");header.appendChild(clsbtn);let condiv = creatanelemn("div", "condiv", "", "", "", "", "", "", header, "", "", "");let nmttl = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", globalLang[28]);let frow = creatanelemn("div", "diagcol", "", "", "", "", "", "", nmttl, "", "", "");let subrow = creatanelemn("div", "diagrowPro", "", "", "", "", "", "", "", "", "", "");let tempPileData = onlineProjects[selectedProjectIV]["pilesData"][idetion];let cords = ["X", "Y", "Z"];for (var i = 0; i < cords.length; i++) {let txt = cords[i] + ": ";let corttl = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", txt);let ssrow = creatanelemn("div", "diagrow", "", "", "", "", "", "", corttl, "", "", "");let cordInp = creatanelemn("input", "", cords[i], "", "width:100px;", "", "text", tempPileData[cords[i]], "", "", "", "");ssrow.appendChild(cordInp);subrow.appendChild(ssrow);}frow.appendChild(subrow);let typettl = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", "Pile Type: ");let sRow = creatanelemn("div", "diagrow", "", "", "", "", "", "", typettl, "", "", "");let select = creatanelemn("select", "", "pileType", "", "", "", "", tempPileData["pT"], "", "", "", "");let typsPile = [globalLang[51], globalLang[52], globalLang[53], globalLang[54], globalLang[55], globalLang[56]];for (var i = 0; i < typsPile.length; i++) {let option = creatanelemn("option", "", "", "", "", "", "", "", "", "", "", typsPile[i]);select.appendChild(option);}sRow.appendChild(select);let hdiv = creatanelemn("div", "hdiv", "newProHDiv", "", "", "", "", "", frow, "", "", "");hdiv.appendChild(sRow);let titling = [globalLang[29], globalLang[30], globalLang[31]];let functiling = [["SD", "SH"], ["ED", "EH"]];let funsOfDH = ["date", "time"];let namiling = [[globalLang[32], globalLang[33]], [globalLang[34], globalLang[35]]];let drc_det = [[["DSD", "DSH"], ["DED", "DEH"]]            , [["RSD", "RSH"], ["RED", "REH"]]            , [["CSD", "CSH"], ["CED", "CEH"]]];for (var i = 0; i < titling.length; i++) {let titlttl = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", titling[i]);let tRow = creatanelemn("div", "diagcol", "", "", "", "", "", "", titlttl, "", "", "");for (var y = 0; y < namiling.length; y++) {  let ssRow = creatanelemn("div", "diagrowPro", "", "", "", "", "", "", "", "", "", "");  for (var x = 0; x < namiling[y].length; x++) {    let tSubTtl = namiling[y][x] + ": ";    let subtitl = creatanelemn("p", "", "", "", "font-size:18px;", "", "", "", "", "", "", tSubTtl);    let sssRow = creatanelemn("div", "diagrow", "", "", "", "", "", "", subtitl, "", "", "");    let idsz = titling[i] + functiling[y][x];    let inpX = creatanelemn("input", "", idsz, "", "width:120px;font-size:16px;", "", funsOfDH[x], tempPileData[drc_det[i][y][x]], "", "", "", "");    sssRow.appendChild(inpX);ssRow.appendChild(sssRow);  }  tRow.appendChild(ssRow);}hdiv.appendChild(tRow);}condiv.appendChild(hdiv);let onclk = "setPileData('"+idetion+"')";let subbtn = creatanelemn("input", "submitBtn", "", "", "", "", "button", globalLang[57], "", onclk, "", "");let footer = creatanelemn("div", "diaghead", "", "", "", "", "", "", subbtn, "", "", "");condiv.appendChild(footer);let bgdiv = creatanelemn("div", "bgdiv", id, "", "", "", "", "", condiv, "", "", "");document.getElementsByTagName('body')[0].appendChild(bgdiv);}
function confirmDeleteProj(pro) {let onclk = "deleteProjectFun('"+pro+"')";let id = "deleteDiag";let ttr = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", globalLang[58]);let header = creatanelemn("div", "diaghead", "", "", "", "", "", "", ttr, "", "", "");let clsfun = "closeDialog('"+id+"')";let clsbtn = creatanelemn("input", "clsbtn", "", "", "", "", "button", "X", "", clsfun, "", "");header.appendChild(clsbtn);let condiv = creatanelemn("div", "condiv", "logingCon", "", "", "", "", "", header, "", "", "");let nmttl = creatanelemn("p", "", "", "", "margin-bottom: 10px;", "", "", "", "", "", "", CompenyName);let frow = creatanelemn("div", "diagrow", "", "", "", "", "", "", nmttl, "", "", "");let txt = globalLang[66] + onlineProjects[pro]["name"] +" ?";let psdttl = creatanelemn("p", "", "", "", "", "", "", "", "", "", "", txt);let srow = creatanelemn("div", "diagrow", "", "", "color:red;fon-size:2rem;", "", "", "", psdttl, "", "", "");let hdiv = creatanelemn("div", "hdiv", "logInHDiv", "", "justify-content:center;", "", "", "", frow, "", "", "");hdiv.appendChild(srow);condiv.appendChild(hdiv);let yesbtn = creatanelemn("input", "submitBtn", "", "", "", "", "button", globalLang[61], "", onclk, "", "");let footer = creatanelemn("div", "diaghead", "", "", "", "", "", "", yesbtn, "", "", "");let nobtn = creatanelemn("input", "submitBtn", "", "", "", "", "button", globalLang[62], "", clsfun, "", "");footer.appendChild(nobtn);condiv.appendChild(footer);let bgdiv = creatanelemn("div", "bgdiv", id, "", "", "", "", "", condiv, "", "", "");document.getElementsByTagName('body')[0].appendChild(bgdiv);}
function deleteProjectFun(pro) {
  delete onlineProjects[pro];
  try {
    delete tempProject[pro];
  } catch (e) {} finally {}
  let h = globalUrls["dlProj"];
  let WEB_APP_URL = "https://script.google.com/macros/s/passkey/exec";
  WEB_APP_URL = WEB_APP_URL.replace("passkey", decoderX(pasValInp, h));
  let deleteProjects = new Object();
  deleteProjects["DELETE"] = [pro];
  const formData = new FormData();
  formData.append('jsonPayload', JSON.stringify(deleteProjects));
  fetch(WEB_APP_URL, {
    method: 'POST',
    mode: 'cors',
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    if (result.status === 'success') {
      ayanotifiys(globalLang[64], globalLang[70], "shoenotiynow");
    }
    else {
      ayanotifiys("ERR - 12", result.message, "shoenotiynow");
    }
  })
  .catch(error => {
    ayanotifiys("ERR - 13", error, "shoenotiynow");
  });
  let stringedProjects = JSON.stringify(onlineProjects);
  window.localStorage.setItem("ProjectsData", stringedProjects);
  let stringedNSProjects = JSON.stringify(tempProject);
  window.localStorage.setItem("ProjectsNotSavedData", stringedNSProjects);
  document.getElementById('karive').innerHTML = "";
  builder();
}
