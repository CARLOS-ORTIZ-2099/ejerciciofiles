const fs = require('fs') 
const path = require('path')

class Directory {
    constructor(dirname,files, directoryName) {
        this.name = directoryName
        this.ubication = dirname
        this.content = files || []
    }


    createDirectory(nameDirectory) {
        try {    
            fs.accessSync(nameDirectory)
            console.log(`ya existe el directorio ☹`.red);
        }catch(err){
            fs.mkdirSync(nameDirectory)
            console.log(`creado con exito 😀`)
        }
   
    }

    static showDirectoriesAvailable(dirname, boolean) {
        let directorys = fs.readdirSync(dirname)
        directorys = directorys.filter(file =>  fs.statSync(`${dirname}/${file}`).isDirectory())
        boolean ? console.log([...directorys]) :console.log([...directorys, path.basename(dirname)]);
        let dirs = [...directorys, path.basename(dirname)]
        return dirs
    }

    static verifyDirectoryExist(dirs, directory){
        if(!dirs.includes(directory)){
            console.log('no existe ese directorio ☹'.red)
           return false
        }else{
            return true
        }
    }

}

module.exports = Directory
