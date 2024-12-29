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


    if (splitfile.length > 1) {

        console.log('index 1', splitfile[1])


        // if (splitfile[1] in Object.keys(dirdata)) {
        //     const oldata = dirdata[splitfile[1]]
        //     console.log('entered here')
        //     dirdata[splitfile[1]] = [...oldata, splitfile[0]]

        // }

        const doesextensionexist = Object.keys(dirdata).find((extension) => extension === `${splitfile[1]}`)

        if (doesextensionexist != undefined){
            const oldata = dirdata[splitfile[1]]
            console.log('old data', oldata)
            console.log('something is cooking')
            //set and add the new name to the arr

            dirdata[splitfile[1]] = [...oldata, splitfile[0]]
           return
        
        }

        dirdata[splitfile[1]] = [splitfile[0]]

    }

})

console.log("dir data here", dirdata)






