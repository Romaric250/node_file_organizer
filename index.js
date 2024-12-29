
const fs = require('node:fs')


let files_in_dir = []
fs.stat('./tester', (error, data) => {
   if(error){
    console.log(error)

   }
   console.log("data here", data)
}
)

const dirdata = {}

dirdata['romy'] = "30px"

fs.readdir('./tester', (error, files)=> {
    if(error){
            console.log(error)
        }

        console.log('files here', files)

        files_in_dir = files


        files_in_dir.forEach((file) => 
{
            file_extension = file.split('.')

            console.log('some data', file_extension)


            // console.log('extensions', file_extension[1])
}
        
        
        
        )

        

})


console.log("dir data here", dirdata)





