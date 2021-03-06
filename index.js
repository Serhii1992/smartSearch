var endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
    cities = [];


fetch(endpoint)
    .then(blob => blob.json())
    .then (data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        var regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);

    });
}


function showMatches (){
    var matchArray = findMatches(this.value, cities);
    suggestions.innerHTML = matchArray.map(place => {
        var regex = new RegExp (this.value, 'gi');
        cityName = place.city.replace(regex, `<span class = 'h1'>${this.value}</span>`);
        stateName = place.state.replace(regex, `<span class = 'h1'>${this.value}</span>` );
        this.value === '' ? suggestions.style.display = 'none' : suggestions.style.display = 'block';
    return`
            <li class = 'li'>
            <span class = 'name'>${cityName}, ${stateName}</span>
            </li>
        `;

    }).join('');
}

var suggestions = document.querySelector('.suggestions');
var input =document.querySelector('.search').addEventListener('keyup', showMatches);



