function addRow(i) {
    var container = document.getElementById("parlament-data");
    var row = container.insertRow();
    var ordNumber = row.insertCell();
    var wholeName = row.insertCell();
    var paTy = row.insertCell();
    var stateName = row.insertCell();
    var senRty = row.insertCell();
    var votesPerc = row.insertCell();
    var liNk = document.createElement("a");
    wholeName.appendChild(liNk);
    var att = document.createAttribute("class");
    att.value = "to-left";
    wholeName.setAttributeNode(att);

    ordNumber.innerHTML = i + 1;
    var myString = data.results[0].members[i].first_name;
    var aString = data.results[0].members[i].middle_name;
    var bString = data.results[0].members[i].last_name;
    if (aString != null) {
        liNk.innerHTML = myString + " " + aString + " " + bString;
    } else {
        liNk.innerHTML = myString + " " + bString;
    }
    liNk.href = data.results[0].members[i].url;
    paTy.innerHTML = data.results[0].members[i].party;
    stateName.innerHTML = data.results[0].members[i].state;
    senRty.innerHTML = data.results[0].members[i].seniority;
    votesPerc.innerHTML = data.results[0].members[i].votes_with_party_pct;
}


function myFilter() {
    var myState = document.getElementById("selectState").value;
    console.log(myState);
    var myCheckedBoxes = Array.from(document.querySelectorAll("input[name = myParty]:checked"));
    var selectedPartys = myCheckedBoxes.map(oneInput => oneInput.value);
    console.log(selectedPartys);
    var isRepublic = selectedPartys.indexOf("R");
    var isDemocrat = selectedPartys.indexOf("D");
    var isIndepend = selectedPartys.indexOf("I");
    console.log(isRepublic);
    console.log(isDemocrat);
    console.log(isIndepend);


    var allMemBers = data.results[0].members;
    var container = document.getElementById("parlament-data");
    container.innerHTML = "";

    var firstRow = container.insertRow();
    var memBer = document.createElement("th");
    memBer.innerHTML = "#";
    firstRow.appendChild(memBer);

    var wholeName = document.createElement("th");
    wholeName.innerHTML = "Congressman";
    var att = document.createAttribute("class");
    att.value = "to-left";
    wholeName.setAttributeNode(att);
    firstRow.appendChild(wholeName);

    var pT = document.createElement("th");
    pT.innerHTML = "Party affiliation";
    firstRow.appendChild(pT);

    var stat = document.createElement("th");
    stat.innerHTML = "State";
    firstRow.appendChild(stat);

    var senior = document.createElement("th");
    senior.innerHTML = "Seniority";
    firstRow.appendChild(senior);

    var votePc = document.createElement("th");
    votePc.innerHTML = "Votes with party (%)";
    firstRow.appendChild(votePc);

    if (isRepublic > -1) {
        for (var i = 0; i < allMemBers.length; i++) {
            if (data.results[0].members[i].party == "R") {
                if (myState === "All") {
                    addRow(i);                    
                } 
                else {
                    if (data.results[0].members[i].state === myState) {
                        addRow(i);
                    }
                }
            }
        }
    }
    if (isDemocrat > -1) {
        for (var i = 0; i < allMemBers.length; i++) {
            if (data.results[0].members[i].party == "D") {
                if (myState === "All") {
                    addRow(i);
                } 
                else {
                    if (data.results[0].members[i].state === myState) {
                        addRow(i);
                    }
                }
            }
        }
    }
    if (isIndepend > -1) {
        for (var i = 0; i < allMemBers.length; i++) {
            if (data.results[0].members[i].party == "I") {
                if (myState === "All") {
                    addRow(i);
                } 
                else {
                    if (data.results[0].members[i].state === myState) {
                        addRow(i);
                    }
                }
            }
        }
    }
    if (isRepublic == -1 && isDemocrat == -1 && isIndepend == -1) {
        for (var i = 0; i < allMemBers.length; i++) {
            if (myState === "All") {
              addRow(i);
            } 
            else {
                if (data.results[0].members[i].state === myState) {
                    addRow(i);
                }
            }
        }
    }
}


