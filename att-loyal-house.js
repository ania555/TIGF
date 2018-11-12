function getMemAndPrcVoteParty(field1, field2) {
    var allMemBers = data.results[0].members;
    let arMembs = [];
    for (var i = 0; i < allMemBers.length; i++) {
        if (data.results[0].members[i].party == [field1]) {
            arMembs.push(data.results[0].members[i]);
        }
    }
    var sumVote = 0;
    var voteWithPty;
    for (var i = 0; i < arMembs.length; i++) {
        sumVote = sumVote + arMembs[i].votes_with_party_pct;
    }
    if (arMembs.length == 0) {
        voteWithPty = 0
    } else {
        var voteWithPty = sumVote / arMembs.length;
        voteWithPty = voteWithPty.toFixed(2);
    }
    let arrTable1Row = [field2, arMembs.length, voteWithPty];
    return arrTable1Row;
}



//calculate total memb and %votes with party:
function getTotalMemPrcWparty() {
    var allMemBers = data.results[0].members;
    var sumTotal = 0;
    for (var i = 0; i < allMemBers.length; i++) {
        sumTotal = sumTotal + allMemBers[i].votes_with_party_pct;
    }
    var votWPtyTotal = sumTotal / allMemBers.length;
    votWPtyTotal = votWPtyTotal.toFixed(2);
    let arrTable1Row = ["Total", allMemBers.length, votWPtyTotal];
    return arrTable1Row;
}



//identify the members who least:
function getLeast(field) {
    var allMemBers = data.results[0].members;
    var prcTenS = (allMemBers.length - (allMemBers.length % 10)) / 10;
    var arrAsc = allMemBers.sort(function (a, b) {
        return a[field] - b[field]; //votes_with_party_pct
    });
    var arrLeast = [];
    for (var i = 0; i < prcTenS; i++) {
        arrLeast.push(arrAsc[i]);
    }
    return arrLeast;
}


//identify the members who most:
function getMost(field) {
    var allMemBers = data.results[0].members;
    var prcTenS = (allMemBers.length - (allMemBers.length % 10)) / 10;
    var arrAsc = allMemBers.sort(function (a, b) {
        return a[field] - b[field];
    });

    var arrMost = [];
    for (var i = arrAsc.length - 1; i > arrAsc.length - 1 - prcTenS; i--) {
        arrMost.push(arrAsc[i]);
    }
    return arrMost;
}



statistics = {
    "Dem": getMemAndPrcVoteParty("R", "Republican"),
    "Rep": getMemAndPrcVoteParty("D", "Democrat"),
    "Ind": getMemAndPrcVoteParty("I", "Independent"),
    "Total": getTotalMemPrcWparty(),
    "leastLoyal": getLeast("votes_with_party_pct"),
    "mostLoyal": getMost("votes_with_party_pct"),
    "minAttendance": getMost("missed_votes_pct"),
    "maxAttendance": getLeast("missed_votes_pct")
}


//house at glance table
function getAtGlanceRow(field) {
    var container = document.getElementById("atGlance");
    var row = container.insertRow();
    var Party = row.insertCell();
    var NumMembers = row.insertCell();
    var PrVotesparty = row.insertCell();
    var att = document.createAttribute("class");
    att.value = "to-left";
    Party.setAttributeNode(att);
    Party.innerHTML = statistics[field][0];
    NumMembers.innerHTML = statistics[field][1];
    PrVotesparty.innerHTML = statistics[field][2]; 
}

function getAtGlanceTable() {
    getAtGlanceRow("Rep");
    getAtGlanceRow("Dem");
    getAtGlanceRow("Ind");
    getAtGlanceRow("Total");
}
getAtGlanceTable(); 


// loyalty table
function getTableLoyality(field, field2, field3, field4) {
    var container = document.getElementById([field3]);
    if (!container) return;
    statistics[field4].forEach(function (item) {
        var container = document.getElementById([field3]);
        var row = container.insertRow();
        var memName = row.insertCell();
        var NumPatyVotes = row.insertCell();
        var PrPatyVotes = row.insertCell();
        var att = document.createAttribute("class");
        att.value = "to-left";
        memName.setAttributeNode(att);
        memName.innerHTML = item.first_name + " " + item.last_name;
        PrPatyVotes.innerHTML = item[field].toFixed(2);
        NumPatyVotes.innerHTML = (item[field2] * item[field] / 100).toFixed(0);
    })
}

getTableLoyality("votes_with_party_pct", "total_votes", "leastLoyal", "leastLoyal");
getTableLoyality("votes_with_party_pct", "total_votes", "mostLoyal", "mostLoyal");


// attendance table
function getTableAttendance(field, field2, field3, field4) {
    var container = document.getElementById([field3]);
    if (!container) return;
    statistics[field4].forEach(function (item) {
        var container = document.getElementById([field3]);
        var row = container.insertRow();
        var memName = row.insertCell();
        var NumMissedVotes = row.insertCell();
        var PrMissedVotes = row.insertCell();
        var att = document.createAttribute("class");
        att.value = "to-left";
        memName.setAttributeNode(att);
        memName.innerHTML = item.first_name + " " + item.last_name;
        PrMissedVotes.innerHTML = item[field];
        NumMissedVotes.innerHTML = item[field2];
    })
}

getTableAttendance("missed_votes_pct", "missed_votes", "leastAttend", "minAttendance");
getTableAttendance("missed_votes_pct", "missed_votes", "mostAttend",  "maxAttendance");

