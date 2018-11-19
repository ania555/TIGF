var appStat = new Vue({
    el: "#statistics",
    data: {
        num: 15,
        members: []
    },
    methods: {
        getRow: function (party, field) {
            let arMembs = [];
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].party == [party]) {
                    arMembs.push(this.members[i]);
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
            let arrAtGlance = [field, arMembs.length, voteWithPty];
            return arrAtGlance;
        },

        getTotal: function () {
            var sumTotal = 0;
            for (var i = 0; i < this.members.length; i++) {
                sumTotal = sumTotal + this.members[i].votes_with_party_pct;
            }
            var votWPtyTotal = sumTotal / this.members.length;
            votWPtyTotal = votWPtyTotal.toFixed(2);
            let arrTable1Row = ["Total", this.members.length, votWPtyTotal];
            return arrTable1Row;
        }
    },
    computed: {
        leastLoyal: function () {
            var prcTenS = (this.members.length - (this.members.length % 10)) / 10;
            var arrSort = this.members.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct);
            var arrLeast = [];
            for (var i = 0; i < prcTenS; i++) {
                arrLeast.push(arrSort[i]);
            }
            return arrLeast;
        },
        mostLoyal: function () {
            var prcTenS = (this.members.length - (this.members.length % 10)) / 10;
            var arrSort = this.members.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct);
            var arrMost = [];
            for (var i = arrSort.length - 1; i > arrSort.length - 1 - prcTenS; i--) {
                arrMost.push(arrSort[i]);
            }
            return arrMost;
        },
        mostAttending: function () {
            var prcTenS = (this.members.length - (this.members.length % 10)) / 10;
            var arrSort = this.members.sort((a, b) => a.missed_votes_pct - b.missed_votes_pct);
            var arrLeast = [];
            for (var i = 0; i < prcTenS; i++) {
                arrLeast.push(arrSort[i]);
            }
            return arrLeast;
        },
        leastAttending: function () {
            var prcTenS = (this.members.length - (this.members.length % 10)) / 10;
            var arrSort = this.members.sort((a, b) => a.missed_votes_pct - b.missed_votes_pct);
            var arrMost = [];
            for (var i = arrSort.length - 1; i > arrSort.length - 1 - prcTenS; i--) {
                arrMost.push(arrSort[i]);
            }
            return arrMost;
        },
        rowRep: function () {
            let arMembs = [];
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].party == "R") {
                    arMembs.push(this.members[i]);
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
            let arrAtGlance = ["Republican", arMembs.length, voteWithPty];
            return arrAtGlance;
        },
        rowDem: function () {
            var arrRowD = appStat.getRow("D", "Democrat");
            return arrRowD;
        },
        rowInd: function () {
            var arrRowI = appStat.getRow("I", "Independent");
            return arrRowI;
        },
        rowTotal: function () {
            var arrRow = appStat.getTotal();
            return arrRow;
        }
    }
});


let url10 = "https://api.propublica.org/congress/v1/113/senate/members.json";
let url2 = "https://api.propublica.org/congress/v1/113/house/members.json";
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
            console.log("congressmen");
            appStat.members = json.results[0].members;
            console.log(appStat.members);
        })
        .catch(function (error) {
            console.log("Request failed: " + error.message);
        })
} else {
    fetch(url10, myInit).then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log("senators");
            appStat.members = json.results[0].members;
            console.log(appStat.members);
        })
        .catch(function (error) {
            console.log("Request failed: " + error.message);
        })
}

