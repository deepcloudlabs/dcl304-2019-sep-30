let asianCountry = country => country.continent === 'Antarctica';
let printCountryName = country => console.log(country.name);
fetch('countries.json')
    .then(res => res.json())
    .then(countries => countries.filter(asianCountry).forEach(printCountryName))
    .catch((reason) => console.error(reason))
    .finally(() => console.log("done"));

fetch('countries.json')
    .then(res => res.json())
    .then(countries => countries.map(country => country.continent).reduce((continents, cont) => continents.add(cont), new Set()))
    .then(continents => [...continents])
    .then(continents => {
        continents.sort();
        return continents;
    })
    .then(continents => continents.forEach(cont => console.log(cont)))
    .finally(() => console.log("done."));
