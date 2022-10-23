import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import uts46 from 'idna-uts46-hx'
import { ethers } from 'ethers';
const csv = require('csvtojson')


// load etherID collections
const json = JSON.parse(fs.readFileSync('etherId-collections.json'));
const csv_file_errors = [];
const logo_file_errors = [];
const csvs_path = './etherIdCollections/';
const logos_path = './logos/';

const collections = [];

for (const collection of json.collections) {
    let slug = collection.slug,
        intended_csv_file = slug + '.csv',
        csv_file = collection.csv;

    //Read in CSV as object and push to collections.
    const data = fs.readFileSync(csv_file);
    console.log(data);

    // const records = parse(input, {
    //     columns: true,
    //     skip_empty_lines: true
    // });


    // check csv file name
    if (csv_file !== intended_csv_file) {
        csv_file_errors.push([intended_csv_file, csv_file]);
    } else if (!fs.existsSync(csvs_path + csv_file)) {
        csv_file_errors.push([intended_csv_file, csv_file, "CSV FILE DOES NOT EXIST: " + csvs_path + csv_file]);
    }
}

// get intended action from first argument
const actions = ['verify'];
let action = 'verify';
if (process.argv[2] !== undefined && actions.includes(process.argv[2])) {
    action = process.argv[2];
}

console.log(['csv_file_errors', csv_file_errors]);
console.log(['logo_file_errors', logo_file_errors]);