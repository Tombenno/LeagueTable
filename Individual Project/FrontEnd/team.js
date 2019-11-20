let title = document.getElementById("title");
let list = document.getElementById("teamStats");
let lID = localStorage.getItem("leagueID");
let tID = localStorage.getItem("teamID");
window.onload = searchLeague();

function back() {
    window.location.href = './league.html';
}

function searchLeague() {
    fetch("http://localhost:8080/league/" + lID)
        .then(res => res.json())
        .then(jsonLeague => printLeagueName(jsonLeague))
        .catch(err => console.error(err));
}

function printLeagueName(jsonLeague) {
    let leagueName = document.createElement('li');
    leagueName.className = "list-group-item list-group-item-secondary text-dark";
    leagueName.innerText = "League: " + jsonLeague.name;
    list.appendChild(leagueName);
    searchTeam();
}

function searchTeam() {
    fetch("http://localhost:8080/team/" + tID)
        .then(res => res.json())
        .then(json => printTeamStats(json))
        .catch(err => console.error(err));
}

function printTeamStats(json) {
    let teamName = document.createElement('h1');
    var matchesPlayed = document.createElement("li");
    var wins = document.createElement("li");
    var draws = document.createElement("li");
    var losses = document.createElement("li");
    var goalsFor = document.createElement("li");
    var goalsAgainst = document.createElement("li");
    var goalDifference = document.createElement("li");
    matchesPlayed.className = "list-group-item list-group-item-light text-dark";
    wins.className = "list-group-item list-group-item-secondary text-dark";
    draws.className = "list-group-item list-group-item-light text-dark";
    losses.className = "list-group-item list-group-item-secondary text-dark";
    goalsFor.className = "list-group-item list-group-item-light text-dark";
    goalsAgainst.className = "list-group-item list-group-item-secondary text-dark";
    goalDifference.className = "list-group-item list-group-item-light text-dark";
    teamName.innerText = json.name;
    matchesPlayed.innerText = "Matches Played: " + json.matchesPlayed;
    wins.innerText = "Wins: " + json.wins;
    draws.innerText = "Draws: " + json.draws;
    losses.innerText = "Losses: " + json.losses;
    goalsFor.innerText = "Goals Scored: " + json.goalsFor;
    goalsAgainst.innerText = "Goals Conceded: " + json.goalsAgainst;
    goalDifference.innerText = "Goal Difference: " + json.goalDifference;
    title.appendChild(teamName);
    list.appendChild(matchesPlayed);
    list.appendChild(wins);
    list.appendChild(draws);
    list.appendChild(losses);
    list.appendChild(goalsFor);
    list.appendChild(goalsAgainst);
    list.appendChild(goalDifference);
}

