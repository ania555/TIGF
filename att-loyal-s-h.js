function getMemAndPrcVoteParty(field1, field2, data) {
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
function getTotalMemPrcWparty(data) {
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
function getLeast(field, data) {
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
function getMost(field, data) {
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


/*var statistics = {
    "Dem": getMemAndPrcVoteParty("R", "Republican", data),
    "Rep": getMemAndPrcVoteParty("D", "Democrat", data),
    "Ind": getMemAndPrcVoteParty("I", "Independent", data),
    "Total": getTotalMemPrcWparty(data),
    "leastLoyal": getLeast("votes_with_party_pct", data),
    "mostLoyal": getMost("votes_with_party_pct", data),
    "minAttendance": getMost("missed_votes_pct", data),
    "maxAttendance": getLeast("missed_votes_pct", data)
}*/





//house at glance table
function getAtGlanceRow(field, data) {
    var statistics = {
        "Dem": getMemAndPrcVoteParty("R", "Republican", data),
        "Rep": getMemAndPrcVoteParty("D", "Democrat", data),
        "Ind": getMemAndPrcVoteParty("I", "Independent", data),
        "Total": getTotalMemPrcWparty(data),
        "leastLoyal": getLeast("votes_with_party_pct", data),
        "mostLoyal": getMost("votes_with_party_pct", data),
        "minAttendance": getMost("missed_votes_pct", data),
        "maxAttendance": getLeast("missed_votes_pct", data)
    };
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

function getAtGlanceTable(data) {
    getAtGlanceRow("Rep", data);
    getAtGlanceRow("Dem", data);
    getAtGlanceRow("Ind", data);
    getAtGlanceRow("Total", data);
}



// loyalty table
function getTableLoyality(field, field2, field3, field4, data) {
    var container = document.getElementById([field3]);
    if (!container) return;
    var statistics = {
        "Dem": getMemAndPrcVoteParty("R", "Republican", data),
        "Rep": getMemAndPrcVoteParty("D", "Democrat", data),
        "Ind": getMemAndPrcVoteParty("I", "Independent", data),
        "Total": getTotalMemPrcWparty(data),
        "leastLoyal": getLeast("votes_with_party_pct", data),
        "mostLoyal": getMost("votes_with_party_pct", data),
        "minAttendance": getMost("missed_votes_pct", data),
        "maxAttendance": getLeast("missed_votes_pct", data)
    };
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


// attendance table
function getTableAttendance(field, field2, field3, field4, data) {
    var container = document.getElementById([field3]);
    if (!container) return;
    var statistics = {
        "Dem": getMemAndPrcVoteParty("R", "Republican", data),
        "Rep": getMemAndPrcVoteParty("D", "Democrat", data),
        "Ind": getMemAndPrcVoteParty("I", "Independent", data),
        "Total": getTotalMemPrcWparty(data),
        "leastLoyal": getLeast("votes_with_party_pct", data),
        "mostLoyal": getMost("votes_with_party_pct", data),
        "minAttendance": getMost("missed_votes_pct", data),
        "maxAttendance": getLeast("missed_votes_pct", data)
    };
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
