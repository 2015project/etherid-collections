const parse = require('csv-parse/lib/sync'); //include
const fs = require("fs");

const json = JSON.parse(fs.readFileSync('utils/etherid-collections/etherId-collections.json'));
const csvs_path = 'utils/etherid-collections/etherIdCollections/';

var collections = [];

for (let i = 0; i < json.collections.length; i++) {
    console.log(json.collections[i].name)

    var collectionData = fs.readFileSync(csvs_path + json.collections[i].csv).toString();

    //calling the npm package and save to records
    const records = parse(collectionData, {
        columns: true,
        skip_empty_lines: true
    });

    //map the output from csv-parse to the column
    const domain_column = records.map(rec => rec["domain"]);

    collections.push({
        name: json.collections[i].name,
        domains: domain_column
    })
}

function validCollections(domain) {
    collectionNames = [];
    console.log(domain);

    for (let i = 0; i < collections.length; i++) {

        console.log(collections[i].name);
        console.log(collections[i].domains);

        if (collections[i].domains.includes(domain.toString())) {
            collectionNames.push(collections[i].name);
        }
    }

    return collectionNames;
}

module.exports = validCollections;