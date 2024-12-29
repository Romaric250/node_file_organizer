const { log } = require('node:console')
const fs = require('node:fs')


const dirdata = {}
let filedata = []

const path = './tester'

const data = fs.readdirSync(path, (error, files) => {


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







// fs.mkdir('./path1',(error) => {
//     if (error){
//         console.log('error', error.message)
//     }
//     console.log('dir created successfully')
// })


const neset = Object.entries(dirdata)
console.log("some new", Object.entries(dirdata));

neset.map((ext) => {
    fs.mkdir(`${path}/${ext[0]}-files`, (error) => {
        if(error){
            console.log(error.message)
        }
        console.log(`folder <${ext[0]}-files> created .....`)
    })

    ext[1].map((file_ext) => {
        fs.rename(`${path}/${file_ext}.${ext[0]}`,`${path}/${ext[0]}-files`,(error) => {
            if(error){
                console.log(error.message)
            }
            console.log(`moving ${file_ext}.${ext[0]} to ${path}/${ext[0]}-files/`)

        })

    })


    // console.log(ext[1])

})




console.log("dir data here", dirdata)






