#!/usr/bin/env node
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
rl.question('🌟 Enter the path to organize: ', (inputPath) => {
    const path = inputPath.trim(); // Store path here for later use

    // Read the directory
    fs.readdir(path, (error, files) => {
        if (error) {
            console.log('❌ Error:', error.message);
            rl.close();
            return;
        }

        filedata = files.filter(file => {
            // Skip folders and files without extensions
            return fs.lstatSync(paths.join(path, file)).isFile() && file.includes('.');
        });

        if (filedata.length === 0) {
            console.log('⚠️ No files to organize! Exiting...');
            rl.close();
            return;
        }

        filedata.map((file) => {
            const splitfile = file.split('.');

            // Process only files with an extension
            if (splitfile.length > 1) {
                const ext = splitfile[1];
                const filename = splitfile[0];

                const doesExtensionExist = Object.keys(dirdata).find((extension) => extension === ext);

                if (doesExtensionExist) {
                    dirdata[ext] = [...dirdata[ext], filename];
                } else {
                    dirdata[ext] = [filename];
                }
            }
        });

        // Ask if the user wants to customize folder names
        rl.question('🔧 Do you want to customize folder names for file extensions? (yes to customize, press Enter to use defaults): ', (customizeChoice) => {
            if (customizeChoice.toLowerCase() === 'yes') {
                console.log('🎨 Customization mode: You can change folder names for each file extension.');
                // Proceed with customization
                processExtensionsWithCustomization(path);
            } else {
                console.log('✅ Using default folder names for extensions...');
                // Proceed with default folder names
                processExtensionsWithDefaults(path);
            }
        });
    });
});

// Function to process extensions with default folder names
const processExtensionsWithDefaults = (path) => {
    const extensions = Object.entries(dirdata);

    const processExtensions = (index) => {
        if (index >= extensions.length) {
            console.log('✅ All files have been organized successfully with default folder names! Closing...');
            rl.close();
            return;
        }

        const [ext, files] = extensions[index];
        const folderName = `${ext}-files`; // Default folder name

        fs.mkdir(paths.join(path, folderName), { recursive: true }, (error) => {
            if (error) {
                console.log('❌ Error creating folder:', error.message);
            } else {
                console.log(`📂 Folder "<${folderName}>" created!`);
            }

            files.map((file_ext) => {
                const targetPath = paths.join(path, folderName, `${file_ext}.${ext}`);
                const filePath = paths.join(path, `${file_ext}.${ext}`);

                try {
                    fs.renameSync(filePath, targetPath); // Move the file synchronously
                    console.log(`🚚 Moved ${file_ext}.${ext} to ${targetPath}`);
                } catch (error) {
                    console.log(`❌ Error moving file ${file_ext}.${ext}:`, error.message);
                }
            });

            processExtensions(index + 1);
        });
    };

    processExtensions(0);
};

// Function to process extensions with customized folder names
const processExtensionsWithCustomization = (path) => {
    const extensions = Object.entries(dirdata);

    const processExtensions = (index) => {
        if (index >= extensions.length) {
            console.log('✅ All files have been organized successfully with customized folder names! Closing...');
            rl.close();
            return;
        }

        const [ext, files] = extensions[index];

        rl.question(`🎨 Enter new folder name for extension ".${ext}" (press Enter to keep "${ext}-files"): `, (newFolderName) => {
            const folderName = newFolderName.trim() || `${ext}-files`;

            fs.mkdir(paths.join(path, folderName), { recursive: true }, (error) => {
                if (error) {
                    console.log('❌ Error creating folder:', error.message);
                } else {
                    console.log(`📂 Folder "<${folderName}>" created!`);
                }

                files.map((file_ext) => {
                    const targetPath = paths.join(path, folderName, `${file_ext}.${ext}`);
                    const filePath = paths.join(path, `${file_ext}.${ext}`);

                    try {
                        fs.renameSync(filePath, targetPath); // Move the file synchronously
                        console.log(`🚚 Moved ${file_ext}.${ext} to ${targetPath}`);
                    } catch (error) {
                        console.log(`❌ Error moving file ${file_ext}.${ext}:`, error.message);
                    }
                });

                processExtensions(index + 1);
            });
        });
    };

    processExtensions(0);
};
