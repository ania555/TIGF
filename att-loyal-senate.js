 var allMemBers = data.results[0].members;
 var arRepS = [];
 var arDemS = [];
 var arIndS = [];
 for (var i = 0; i < allMemBers.length; i++) {
     if (data.results[0].members[i].party == "R") {
         arRepS.push(data.results[0].members[i]);
     } else if (data.results[0].members[i].party == "D") {
         arDemS.push(data.results[0].members[i]);
     } else {
         arIndS.push(data.results[0].members[i]);
     }
 }
 console.log(arRepS.length);
 console.log(arDemS.length);
 console.log(arIndS.length);
 console.log(arRepS);



 //calculate % votes with party Republicans:
 var sumVoteRep = 0;
 for (var i = 0; i < arRepS.length; i++) {
     sumVoteRep = sumVoteRep + arRepS[i].votes_with_party_pct;
 }
 var voteWithPtyRep = sumVoteRep / arRepS.length;
voteWithPtyRep = voteWithPtyRep.toFixed(2);
 console.log(sumVoteRep);
 console.log(voteWithPtyRep);



 //calculate % votes with party Democrats:
 var sumVoteDem = 0;
 for (var i = 0; i < arDemS.length; i++) {
     sumVoteDem = sumVoteDem + arDemS[i].votes_with_party_pct;
 }
 var voteWithPtyDem = sumVoteDem / arDemS.length;
voteWithPtyDem = voteWithPtyDem.toFixed(2);
 console.log(sumVoteDem);
 console.log(voteWithPtyDem);


 //calculate % votes with party Independents:
 var sumVoteInd = 0;
 for (var i = 0; i < arIndS.length; i++) {
     sumVoteInd = sumVoteInd + arIndS[i].votes_with_party_pct;
 }
 var voteWithPtyInd = sumVoteInd / arIndS.length;
voteWithPtyInd = voteWithPtyInd.toFixed(2);
 console.log(sumVoteInd);
 console.log(voteWithPtyInd);
 console.log("------------------");



 //calculate total %votes with party:
 var sumVoteTotal = sumVoteDem + sumVoteRep + sumVoteInd;
 var votWPtyTotal = sumVoteTotal / allMemBers.length;
 votWPtyTotal = votWPtyTotal.toFixed(2);
 console.log(votWPtyTotal);
 console.log("------------------");


 //identify the members who least/most often vote with their party:
 var allMemBers = data.results[0].members;
 var prcTenS = (allMemBers.length - (allMemBers.length % 10)) / 10;
 var arrPrcVtPtyAsc = allMemBers.sort(function (a, b) {
     return a.votes_with_party_pct - b.votes_with_party_pct;
 });
 var leastPrcVtPty = [];
 for (var i = 0; i < prcTenS; i++) {
     leastPrcVtPty.push(arrPrcVtPtyAsc[i]);
 }
 console.log(leastPrcVtPty);
 var mostPrcVtPty = [];
 for (var i = arrPrcVtPtyAsc.length -1; i > arrPrcVtPtyAsc.length -1 - prcTenS; i--) {
     mostPrcVtPty.push(arrPrcVtPtyAsc[i]);
 }
 console.log(mostPrcVtPty);



//members least/most number of votes with party
var lestNumVotPty = leastPrcVtPty.map(oneInput => oneInput.total_votes *oneInput.votes_with_party_pct / 100);
var mostNumVotPty = mostPrcVtPty.map(oneInput => oneInput.total_votes *oneInput.votes_with_party_pct / 100)    
console.log(lestNumVotPty);
console.log(mostNumVotPty);




//members least/most attendance   missed_votes_pct
var arrPrcMissVoteAsc = allMemBers.sort(function (a, b) {
     return a.missed_votes_pct - b.missed_votes_pct;});
var leastPrcMissVote = [];
var mostPrcMissVote = [];
for (var i = 0; i < prcTenS; i++) {
     leastPrcMissVote.push(arrPrcMissVoteAsc[i]);
 }
for (var i = arrPrcMissVoteAsc.length -1; i > arrPrcMissVoteAsc.length -1 - prcTenS; i--) {
     mostPrcMissVote.push(arrPrcMissVoteAsc[i]);
 }
 console.log(mostPrcMissVote);
 console.log(leastPrcMissVote);


//members least/most attendance   missed_votes
var leastNumMissVote = leastPrcMissVote.map(oneInput => oneInput.missed_votes);
var mostNumMissVote = mostPrcMissVote.map(oneInput => oneInput.missed_votes);
console.log(mostNumMissVote);
console.log(leastNumMissVote);

 statistics = {
     "NumDem": arDemS.length,
     "NumRep": arRepS.length,
     "NumInd": arIndS.length,
     "NumTotal": allMemBers.length,
     "PrVotePatyR": voteWithPtyRep,
     "PrVotePatyD": voteWithPtyDem,
     "PrVotePatyI": voteWithPtyInd,
     "PrVoteTotal": votWPtyTotal,
     "leastLoyal": leastPrcVtPty,
     "mostLoyal": mostPrcVtPty,
     "leastLoyalNum": lestNumVotPty,
     "mostLoyalNum": mostNumVotPty,
     "minAttendance": mostPrcMissVote,
     "maxAttendance": leastPrcMissVote
 }

 console.log("------------------");
 

//senate at glance table

var Republican = document.getElementById("Republican");
Republican.lastElementChild.previousElementSibling.innerHTML = statistics.NumRep;
Republican.lastElementChild.innerHTML = statistics.PrVotePatyR;

var Democrat = document.getElementById("Democrat");
Democrat.lastElementChild.previousElementSibling.innerHTML = statistics.NumDem;
Democrat.lastElementChild.innerHTML = statistics.PrVotePatyD;

var Independent = document.getElementById("Independent");
Independent.lastElementChild.previousElementSibling.innerHTML = statistics.NumTotal;
Independent.lastElementChild.innerHTML = statistics.PrVotePatyI;

var Total = document.getElementById("Total");
Total.lastElementChild.previousElementSibling.innerHTML = statistics.NumInd;
Total.lastElementChild.innerHTML = statistics.PrVoteTotal;


//least loyal table

var container1 = document.getElementById("leastLoyal");
statistics.leastLoyal.forEach(function(item) {
var container1 = document.getElementById("leastLoyal");    
var row = container1.insertRow();
var memName = row.insertCell();   
var NumPatyVotes = row.insertCell();   
var PrPatyVotes = row.insertCell();
var att = document.createAttribute("class");
att.value = "to-left";
memName.setAttributeNode(att);    
memName.innerHTML = item.first_name + " " + item.last_name;    
PrPatyVotes.innerHTML = item.votes_with_party_pct.toFixed(2);
NumPatyVotes.innerHTML = (item.total_votes * item.votes_with_party_pct / 100).toFixed(0);
})
                             

//most loyal table

var container2 = document.getElementById("mostLoyal");
statistics.mostLoyal.forEach(function(item) {
var row = container2.insertRow();
var memName = row.insertCell();   
var NumPatyVotes = row.insertCell();   
var PrPatyVotes = row.insertCell();
var att = document.createAttribute("class");
att.value = "to-left";
memName.setAttributeNode(att);    
memName.innerHTML = item.first_name + " " + item.last_name;    
PrPatyVotes.innerHTML = item.votes_with_party_pct;
NumPatyVotes.innerHTML = (item.total_votes * item.votes_with_party_pct / 100).toFixed(0);
})

var att = document.createAttribute("class");
att.value = "to-left";
memName.setAttributeNode(att);

// lowest attendance members








