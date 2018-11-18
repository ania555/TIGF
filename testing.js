var app = new Vue({
    el: "#app",
    data: {
        num: 15,
        members: {}
    }
});




var appFilter = new Vue({
    el: "#listener",
    data: {
        num: 15,
        members: {},
        message: "cos tam",
        checkedPartys: [],
        selected: "All",
        selectedMembers: {}
    },
    computed: {
        filteredMembers: function () {
            var appFilter = this;
            var state = appFilter.selected;

            if (state === "All") {
                return appFilter.members;
            } else {
                return appFilter.members.filter(function (person) {
                    return person.state === appFilter.selected;
                });
            }
        }
    }
    
})




//var vm = new Vue({
//    el: "#",
//    data: {
//        people: [
//            {
//                name: "Bill Gates",
//                category: "Tech"
//            },
//            {
//                name: "Steve Jobs",
//                category: "Tech"
//            },
//            {
//                name: "Jeff Bezos",
//                category: "Tech"
//            },
//            {
//                name: "George Clooney",
//                category: "Entertainment"
//            },
//            {
//                name: "Meryl Streep",
//                category: "Entertainment"
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









//computed: {
//selectedMembers() {
//    const search = this.checkedPartys
//    if (!search) return this.members;
//    return this.members.filter(m => m.party.indexOf(search) > -1);
//}
//}
//})


//        computed: {
//            selectedMembers() {
//                const search = this.checkedPartys
//
//                if (!search) return this.members;
//
//                return this.members.filter(m => m.party.indexOf(search) > -1);
//            }


////Array witn only the members that accomplish the values inside the filter method.
//var filteredMambers = data.members.filter(function (oneMember) {
//    //        console.log(oneMember.first_name)
//
//    //this var can be only true or false
//    var genderFilter = checkedChaeckboxes.length == 0 || checkedChaeckboxes.includes(oneMember.gender);
//    //        console.log({genderFilter})
//
//    //this var can be only true or false
//    var stateFilter = stateValue == "all" || stateValue == oneMember.state
//    //        console.log({stateFilter})
//    //        
//    //If both vars return true, the member is included in this array.
//    return genderFilter && stateFilter;
//})
////    console.log({filteredMambers})




let url = "https://api.propublica.org/congress/v1/113/senate/members.json";
let myHeaders = new Headers({
    "X-API-Key": "ml65G61RHEAG2oGuuw1llVZVeaFW5NjnX2MHF7LS"
});
const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors'
};
fetch(url, myInit).then(function (response) {
        return response.json();
    })
    .then(function (json) {
        console.log("check");
        app.members = json.results[0].members;
        appFilter.members = json.results[0].members;
        console.log(appFilter.members);
    })
    .catch(function (error) {
        console.log("Request failed: " + error.message);
    })
