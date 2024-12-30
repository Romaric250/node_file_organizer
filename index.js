const { log } = require('node:console');
const fs = require('node:fs');
const paths = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dirdata = {};
let filedata = [];

// Prompt the user for the path
rl.question('Enter the path to organize: ', (inputPath) => {
    const path = inputPath.trim();

    // Read the directory
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

    const processExtensions = (index) => {
        if (index >= neset.length) {
            rl.close();
            return;
        }

        const [ext, files] = neset[index];

        rl.question(`Enter new folder name for extension ".${ext}" (press Enter to keep "${ext}-files"): `, (newFolderName) => {
            const folderName = newFolderName.trim() || `${ext}-files`;

            fs.mkdir(`${path}/${folderName}`, { recursive: true }, (error) => {
                if (error) {
                    console.log(error.message);
                } else {
                    console.log(`folder <${folderName}> created .....`);
                }

                files.map((file_ext) => {
                    const targetpath = paths.join(path, folderName, `${file_ext}.${ext}`); // Include filename in target path
                    const filepath = paths.join(path, `${file_ext}.${ext}`); // Source file path

                    console.log("file path here", filepath);

                    try {
                        fs.renameSync(filepath, targetpath); // Move the file synchronously
                        console.log(`moving ${file_ext}.${ext} to ${targetpath}`);
                    } catch (error) {
                        console.log(`Error moving file ${file_ext}.${ext}:`, error.message);
                    }
                });

                processExtensions(index + 1);
            });
        });
    };

    processExtensions(0);
});
