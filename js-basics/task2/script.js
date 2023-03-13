function getCityInfo(textCsv) {
    const citiesInfo = textCsv
        .split('\n')
        .filter(line => /[\d{1,3}.?\d+,]{2}.+,\d+,.*/.test(line))
        .map(line => {
            const [x, y, name, population] = line.split(',')
            return {x, y, name, population};
        })
        .sort((a, b) => b.population - a.population)
        .slice(0, 10)
        .reduce((accumulator, city, index) => {
            accumulator[city.name] = {population: city.population, rating: index + 1};
            return accumulator;
        }, {});
    return cityName => {
        let city = citiesInfo[cityName];
        return `${cityName} ${city.rating} місце в ТОП-10 найбільших міст України, населення ${city.population} людина/людини/людей)`;
    }
}

let cityInfoFinder = getCityInfo(`48.30,32.16,Кропивницький,200000,
44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,

# в цьому файлі три рядки-коментаря :)`);
console.log(cityInfoFinder('Вінниця'));

