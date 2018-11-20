var appFilter = new Vue({
    el: "#tableFiltered",
    data: {
        num: 15,
        members: {},
        checkedPartys: [],
        selected: "All",
    },
    created() {
        let url1 = "https://api.propublica.org/congress/v1/113/senate/members.json";
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
            fetch(url2, myInit).then((response) => {
                    return response.json()
                })
                .then((json) => {
                    console.log("congressmen");
                    this.members = json.results[0].members;
                    console.log(this.members)
                })
                .catch((error) => {
                    console.log("Request failed: " + error.message)
                })
        } else {
            fetch(url1, myInit).then((response) => {
                    return response.json()
                })
                .then((json) => {
                    console.log("senators");
                    this.members = json.results[0].members;
                    console.log(this.members)
                })
                .catch((error) => {
                    console.log("Request failed: " + error.message)
                })
        }

    },
    computed: {
        filteredMembers: function () {
            var aF = this;
            var sTate = aF.selected;
            var paRty = aF.checkedPartys;

            if (sTate === "All" && paRty.length == 0) {
                return aF.members;
            } else if (paRty.length == 0) {
                return aF.members.filter(function (person) {
                    return person.state === aF.selected;
                })
            } else if (sTate === "All" && paRty.length != 0) {
                return aF.members.filter(function (person) {
                    if (aF.checkedPartys.indexOf(person.party) > -1) {
                        return person.party;
                    }

                })
            } else {
                return aF.members.filter(function (person) {
                    if (aF.checkedPartys.indexOf(person.party) > -1 && person.state === aF.selected) {
                        return person;
                    }
                })

            }
        }
    }
});


