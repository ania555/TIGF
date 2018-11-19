let arrX = [4, 6, 24, 95, 26, 94];

console.log(arrX.indexOf(6));


var app = new Vue({
    el: "#app",
    data: {
        num: 15,
        members: {}
    }
});






var appFilter = new Vue({
    el: "#tableFiltered",
    data: {
        num: 15,
        members: {},
        checkedPartys: [],
        selected: "All",
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




//var vm = new Vue({
//    el: "#",
//    data: {
//        people: [
//            {
//                name: "Bill Gates",
//                category: "Tech"
//            },
//            {
//                name: "Amy Poehler",
//                category: "Entertainment"
//            },
//            {
//                name: "Lady of Lórien",
//                category: "Fictional"
//            },
//            {
//                name: "BB8",
//                category: "Fictional"
//            },
//            {
//                name: "Michael Scott",
//                category: "Fictional"
//            }
//		],
//        selectedCategory: "All"
//    },
//    computed: {
//        filteredPeople: function () {
//            var vm = this;
//            var category = vm.selectedCategory;
//
//            if (category === "All") {
//                return vm.people;
//            } else {
//                return vm.people.filter(function (person) {
//                    return person.category === category;
//                });
//            }
//        }
//    }
//});




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
    fetch(url2, myInit).then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log("congressmen");
            app.members = json.results[0].members;
            appFilter.members = json.results[0].members;
            console.log(appFilter.members);
        })
        .catch(function (error) {
            console.log("Request failed: " + error.message);
        })
}
else {
fetch(url1, myInit).then(function (response) {
        return response.json();
    })
    .then(function (json) {
        console.log("senators");
        app.members = json.results[0].members;
        appFilter.members = json.results[0].members;
        console.log(appFilter.members);
    })
    .catch(function (error) {
        console.log("Request failed: " + error.message);
    })
}