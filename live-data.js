let url10 = "https://api.propublica.org/congress/v1/113/senate/members.json";
let url2 = "https://api.propublica.org/congress/v1/113/house/members.json";

//let data;

let myHeaders = new Headers({
    "X-API-Key": "ml65G61RHEAG2oGuuw1llVZVeaFW5NjnX2MHF7LS"
});

const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors'
};
let selectSenate = document.querySelector("#senate");
if (!selectSenate) {
    fetch(url2, myInit).then(function (response) {
            return response.json();
        })
        .then(function (json) {
            var data = json;
            console.log("aaa");

            if (document.getElementById("parlament-data")) {
                getTable(json);
                activateEventListeners(json);
            } else {
                getTableLoyality("votes_with_party_pct", "total_votes", "leastLoyal", "leastLoyal", json);
                getTableLoyality("votes_with_party_pct", "total_votes", "mostLoyal", "mostLoyal", json);
                getTableAttendance("missed_votes_pct", "missed_votes", "leastAttend", "minAttendance", json);
                getTableAttendance("missed_votes_pct", "missed_votes", "mostAttend", "maxAttendance", json);
                
                getAtGlanceTable(json);
            }
        })
        /*.catch(function (error) {
            console.log("Request failed: " + error.message);
        });*/
} else {
    fetch(url10, myInit)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log("bbb");
            console.log(json);

            if (document.getElementById("parlament-data")) {
                getTable(json);
                activateEventListeners(json);
            } else {
                getAtGlanceTable(json);
                getTableLoyality("votes_with_party_pct", "total_votes", "leastLoyal", "leastLoyal", json);
                getTableLoyality("votes_with_party_pct", "total_votes", "mostLoyal", "mostLoyal", json);
                getTableAttendance("missed_votes_pct", "missed_votes", "leastAttend", "minAttendance", json);
                getTableAttendance("missed_votes_pct", "missed_votes", "mostAttend", "maxAttendance", json);
            }
        })
    .catch(function (error) {
        console.log("Request failed: " + error.message);
    });
}
