let title = document.getElementById("title");
let tableRef = document.getElementById("leagueBody")
let table = document.getElementById("leagueTable")
let col = document.getElementById("pointsColumn")
let lID = localStorage.getItem("leagueID");
let counter = 1;
let homeTeamOptions = document.getElementById("homeTeams");
let awayTeamOptions = document.getElementById("awayTeams");
let homeScoreSelected = document.getElementById("homeScoreSelected");
let awayScoreSelected = document.getElementById("awayScoreSelected");
let submit = document.getElementById("submitButton");
window.onload = search();

let allTeams = [];

function search() {
    fetch("http://localhost:8080/team/all")
        .then(res => res.json())
        .then(json => printLeague(json))
        .catch(err => console.error(err));
}

function printLeague(Search) {
    allTeams = Search;
    allTeams = allTeams.sort(function (a, b) { return a.points - b.points });
    allTeams = allTeams.reverse();


    allTeams.forEach(t => {
        if (lID == t.leagueId) {
            var newRow = tableRef.insertRow();
            newRow.addEventListener('click', () => (localStorage.setItem("teamID", t.id) + (window.location.href = './team.html')));
            var posCell = newRow.insertCell(0);
            var nameCell = newRow.insertCell(1);
            var mPCell = newRow.insertCell(2);
            var winCell = newRow.insertCell(3);
            var drawCell = newRow.insertCell(4);
            var lossCell = newRow.insertCell(5);
            var gFCell = newRow.insertCell(6);
            var gACell = newRow.insertCell(7);
            var gDCell = newRow.insertCell(8);
            var pCell = newRow.insertCell(9);
            // Append a text node to the cell
            var posText = document.createTextNode(counter);
            var nameText = document.createTextNode(t.name);
            var mPText = document.createTextNode(t.matchesPlayed);
            var winText = document.createTextNode(t.wins);
            var drawText = document.createTextNode(t.draws);
            var lossText = document.createTextNode(t.losses);
            var gFText = document.createTextNode(t.goalsFor);
            var GAText = document.createTextNode(t.goalsAgainst);
            var GDText = document.createTextNode(t.goalDifference);
            var pText = document.createTextNode(t.points);

            posCell.appendChild(posText);
            nameCell.appendChild(nameText);
            mPCell.appendChild(mPText);
            winCell.appendChild(winText);
            drawCell.appendChild(drawText);
            lossCell.appendChild(lossText);
            gFCell.appendChild(gFText);
            gACell.appendChild(GAText);
            gDCell.appendChild(GDText);
            pCell.appendChild(pText);

            var addHomeTeam = document.createElement("option")
            var addAwayTeam = document.createElement("option");
            addHomeTeam.value = t.name;
            addHomeTeam.innerHTML = t.name;
            addAwayTeam.value = t.name;
            addAwayTeam.innerHTML = t.name;
            homeTeamOptions.appendChild(addHomeTeam);
            awayTeamOptions.appendChild(addAwayTeam);

            counter++;
        }
    })
    searchLeague();
}

function back() {
    window.location.href = './home.html';
}

function searchLeague() {
    fetch("http://localhost:8080/league/" + lID)
        .then(res => res.json())
        .then(json => printLeagueName(json))
        .catch(err => console.error(err));
}

function printLeagueName(json) {
    let leagueName = document.createElement('h1');
    leagueName.innerText = json.name;
    title.appendChild(leagueName);
}

async function submitResult() {
    var homeSelected = homeTeamOptions.options[homeTeamOptions.selectedIndex].value;
    var awaySelected = awayTeamOptions.options[awayTeamOptions.selectedIndex].value;
    var homeScore = homeScoreSelected.value;
    var awayScore = awayScoreSelected.value;

    homeScore = parseInt(homeScore);
    awayScore = parseInt(awayScore);


    if (homeScore > awayScore) {
        var homeWin = true;
        var awayWin = false;
        var draw = false;
    }
    if (homeScore === awayScore) {
        var homeWin = false;
        var awayWin = false;
        var draw = true;
    }
    if (homeScore < awayScore) {
        var homeWin = false;
        var awayWin = true;
        var draw = false;
    }

    const homeBody = allTeams.find(t => t.name === homeSelected);
    const awayBody = allTeams.find(t => t.name === awaySelected);
    console.log(homeBody.wins)
    if (homeWin === true) {
        homeBody.wins = homeBody.wins + 1;
        awayBody.losses = awayBody.losses + 1;
    }
    if (draw === true) {
        homeBody.draws = homeBody.draws + 1;
        awayBody.draws = awayBody.draws + 1;
    }
    if (awayWin === true) {
        homeBody.losses = homeBody.losses + 1;
        awayBody.wins = awayBody.wins + 1;
    }

    homeBody.goalsFor = homeBody.goalsFor + homeScore;
    awayBody.goalsFor = awayBody.goalsFor + awayScore;
    homeBody.goalsAgainst = homeBody.goalsAgainst + awayScore;
    awayBody.goalsAgainst = awayBody.goalsAgainst + homeScore;

    const homeResponse = await fetch('http://localhost:8080/team/byname/' + homeSelected, {
        method: 'PUT',
        body: JSON.stringify(homeBody),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const awayResponse = await fetch('http://localhost:8080/team/byname/' + awaySelected, {
        method: 'PUT',
        body: JSON.stringify(awayBody),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    window.location.reload();
}

function checkSubmit() {
    if (homeTeamOptions.value != "Choose Team..." && awayTeamOptions.value != "Choose Team..." && homeScoreSelected.value != "" && awayScoreSelected.value != "") {
        submit.disabled = false;
    }
    else {
        submit.disabled = true;
    }
}
