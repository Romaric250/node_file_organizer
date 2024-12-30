
# File Organiser

File Organiser is a Node.js-based utility to organize files in a specified directory by their extensions. It creates folders for each file type (based on extension) and moves the files into their respective folders.

## Features

- Organizes files in a directory by file type.
- Automatically creates folders for each file type.
- Moves files into their corresponding folders.
- Handles errors gracefully.

## Installation

1. Ensure you have [Node.js](https://nodejs.org/) installed on your system.
2. Clone or download this repository.
3. Navigate to the project directory:

   ```bash
   cd node-file-organiser
   ```
4. Install dependencies if required (none specified in this implementation).

## Usage

1. Set the `path` variable in the script to the directory you want to organize:

   ```javascript
   const path = "C:\\Users\\YourUsername\\Documents"; // Replace with your target directory
   ```

2. Run the script using Node.js:

   ```bash
   node file-organiser.js
   ```

3. The script will create folders for each file extension and move the corresponding files into them. For example:

   ```
   Documents/
   ├── txt-files/
   │   └── example.txt
   ├── js-files/
       └── script.js
   ```

## Code Overview

### Key Components

1. **Directory Reading:**
   The script reads the contents of the specified directory:

   ```javascript
   const data = fs.readdirSync(path);
   ```

2. **File Sorting:**
   Files are categorized by their extensions:

   ```javascript
   const splitfile = file.split('.');
   const doesextensionexist = Object.keys(dirdata).find((extension) => extension === `${splitfile[1]}`);
   ```

3. **Folder Creation:**
   Folders are created dynamically for each file type:

   ```javascript
   fs.mkdir(`${path}/${ext[0]}-files`, { recursive: true });
   ```

4. **File Moving:**
   Files are moved into their respective folders:

   ```javascript
   fs.renameSync(filepath, targetpath);
   ```

### Error Handling

- Errors during directory reading, folder creation, or file movement are logged to the console:

  ```javascript
  if (error) {
      console.log(error.message);
  }
  ```

## Notes

- The script only processes files and ignores directories.
- Files without extensions are skipped.
- Ensure you have proper permissions to read, write, and move files in the target directory.
- Backup your data before running the script to avoid accidental file loss.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue to suggest improvements or report bugs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy organizing! Romaric250
