const { log } = require('node:console');
const fs = require('node:fs');
const paths = require('path');

const dirdata = {};
let filedata = [];

// const path = './tester'
const path = "C:\\Users\\Romaric\\Documents";

const data = fs.readdirSync(path, (error, files) => {
    if (error) {
        console.log(error.message);
    }

    filedata = [...files];
    return filedata;
});

data.map((file) => {
    const splitfile = file.split('.');
    console.log("splitfile here", splitfile);

    if (splitfile.length > 1) {
        console.log('index 1', splitfile[1]);

        const doesextensionexist = Object.keys(dirdata).find((extension) => extension === `${splitfile[1]}`);

        if (doesextensionexist != undefined) {
            const oldata = dirdata[splitfile[1]];
            console.log('old data', oldata);
            console.log('something is cooking');
            // Set and add the new name to the array

            dirdata[splitfile[1]] = [...oldata, splitfile[0]];
            return;
        }

        dirdata[splitfile[1]] = [splitfile[0]];
    }
});

const neset = Object.entries(dirdata);
console.log("some new", Object.entries(dirdata));

neset.map((ext) => {
    fs.mkdir(`${path}/${ext[0]}-files`, { recursive: true }, (error) => {
        if (error) {
            console.log(error.message);
        } else {
            console.log(`folder <${ext[0]}-files> created .....`);
        }
    });

    ext[1].map((file_ext) => {
        const targetpath = paths.join(path, `${ext[0]}-files`, `${file_ext}.${ext[0]}`); // Include filename in target path
        const filepath = paths.join(path, `${file_ext}.${ext[0]}`); // Source file path

        console.log("file path here", filepath);

        try {
            fs.renameSync(filepath, targetpath); // Move the file synchronously
            console.log(`moving ${file_ext}.${ext[0]} to ${targetpath}`);
        } catch (error) {
            console.log(`Error moving file ${file_ext}.${ext[0]}:`, error.message);
        }
    });
});

console.log("dir data here", dirdata);
