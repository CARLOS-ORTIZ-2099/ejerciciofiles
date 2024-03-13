const fs = require('fs') 
const path = require('path')

class Directory {
    constructor(dirname,files) {
        this.name = ''
        this.ubication = dirname
        this.content = files || []
    }

    openDirectory() {}

    createDirectory(nameDirectory) {
        try {
            fs.accessSync(nameDirectory)
            console.log(`ya existe el directorio`.cyan);
        }catch(err){
            //console.log(`${err}`.bgRed);
            fs.mkdirSync(nameDirectory)
        }
   
    }

    seeListFiles() {
        this.content.forEach(file => console.log(file))
    }

}

module.exports = Directory
