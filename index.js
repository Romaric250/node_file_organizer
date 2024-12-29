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



    console.log("test")



    if (splitfile.length > 1) {

        console.log('index 1', splitfile[1])

        

        // if (splitfile[1] in Object.keys(dirdata)) {
        //     const oldata = dirdata[splitfile[1]]
        //     console.log('entered here')
        //     dirdata[splitfile[1]] = [...oldata, splitfile[0]]

        // }
        

        dirdata[splitfile[1]] = [splitfile[0], 2]

    }


})


console.log("dat here", data)

const obj = Object.keys(dirdata)

const fi = obj.find((el) => el === 'txt')

console.log("found", fi)




console.log("dir data", Object.keys(dirdata))







