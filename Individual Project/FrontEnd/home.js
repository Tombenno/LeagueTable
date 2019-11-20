window.onload = search();
let main = document.getElementById("main");

function search() {
    fetch("http://localhost:8080/league/all")
        .then(res => res.json())
        .then(json => printLeagues(json))
        .catch(err => console.error(err));
}

function printLeagues(Search) {
    Search.forEach(l => {
        let leagues = document.createElement('button');
        let dropLeagues = document.createElement('button');
        let divider = document.createElement('div');
        leagues.addEventListener('click', () => (localStorage.setItem("leagueID", l.id) + (window.location.href = './league.html')));
        dropLeagues.addEventListener('click', () => (deleteLeague(dropLeagues.id)));
        leagues.className = "btn btn-success btn-lg";
        dropLeagues.className = "btn btn-dark btn-sm";
        leagues.innerText = l.name;
        dropLeagues.innerText = "Delete";
        dropLeagues.id = l.id;
        main.appendChild(leagues);
        main.appendChild(dropLeagues);
        main.appendChild(divider);
    })
}

function addLeague() {
    window.location.href = './addLeague.html'
}

async function deleteLeague(id) {
    console.log(id);
    console.log('http://localhost:8080/league/' + id);
    const leagueResponse = await fetch('http://localhost:8080/league/:' + id, {
        method: 'DELETE',
        body: JSON.stringify({
            id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    window.location.reload();
}