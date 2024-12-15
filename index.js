
const fs = require('node:fs')

fs.readdir(".node_file_organizer",(error, data) => {
    if(error){
        console.log("error here", error.message)
        return
    }

    console.log(data)
    

})