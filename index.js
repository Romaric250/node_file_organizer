
const fs = require('node:fs')



fs.readdir(".node_file_organizer",(error, data) => {
    if(error){
        console.log(error)
        return
    }
    data.forEach(file=> console.log(file))
})