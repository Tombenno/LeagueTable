let numOfTeams = document.getElementById("numOfTeams");
let main = document.getElementById("main");
let pickedNumber;
let teamInputs = [];

function refreshForm() {
    let counter = 1
    main.innerHTML = '';
    teamInputs = [];
    pickedNumber = numOfTeams.value;
    for (i = 0; i < pickedNumber; i++) {
        let div1 = document.createElement('div');
        let div2 = document.createElement('div');
        let span = document.createElement('span');
        div1.className = "input-group mb-3";
        div2.className = "input-group-prepend";
        span.className = "input-group-text";
        let newTeam = document.createElement('input');
        teamInputs.push(newTeam);
        newTeam.className = "form-control";
        newTeam.type = "text";
        newTeam.placeholder = "Choose Team Name... ";
        newTeam.id = "team" + counter;
        span.innerText = counter + ": ";

        //let invalidDiv = document.createElement('div');
        main.appendChild(div1);
        div1.appendChild(div2);
        div2.appendChild(span);
        div1.appendChild(newTeam);
        counter++;
    }
}

function back() {
    window.location.href = './home.html';
}

async function completeForm() {
    const leagueName = document.getElementById("leagueName");
    console.log(leagueName.value, teamInputs);
    console.log('http://localhost:8080/league/' + leagueName.value);
    const leagueResponse = await fetch('http://localhost:8080/league', { 
        method: 'POST',
        body: JSON.stringify({
            name: leagueName.value,
            teams: teamInputs.map(input => input.value)
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}