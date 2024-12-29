const fs = require('node:fs')


const dirdata = {}
let filedata = []


const data = fs.readdirSync('./tester', (error, files) => {
    if (error) {
        console.log(error.message)


    }

    filedata = [...files]
    return filedata

})


data.map((file) => {
    const splitfile = file.split('.')
    console.log("splitfile here", splitfile)


    dirdata[`${splitfile[1]}`] = splitfile[0]
})

console.log("dat here", data)


for (const dat in Object.keys(dirdata)) {

}


console.log("dir data here and more", data, dirdata)





