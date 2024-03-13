const colors = require('colors')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
const File = require('./models/File.js')
const Directory = require('./models/Directory.js')
const show = require('./helpers/show.js')
const messages = require('./helpers/messages.js')


function showOptions() {
    show()
    rl.question('que deseas hacer \n', (response) => {
        switch(response) {
            case('1'):
                // crear documento
                createDocument()
            break
            case('2'):
                // abrir documento
                openDocument(__dirname)
            break
            case('3'):
            // crear carpeta
                createDir()
            break
            case('4'):
            // abrir carpeta
                openDir()
            break
            case('5'):
                // cerrar app
                rl.close()
            break

            default: showOptions()
        }
    })
    
}

showOptions()


function openDir() {
        Directory.showDirectoriesAvailable(__dirname, true)
        rl.question('que directorio deseas abrir '.cyan, (directory) => {
            try{
                let files = fs.readdirSync(directory)
                let dirInstance = new Directory(__dirname, files, directory)
                console.log(dirInstance);
                openDocument(directory)
            }catch(err){
                console.log(`${err}`.bgRed);
                openDir()
            }
        })
    
}

function createDir() {
    const dir = new Directory(__dirname)
    rl.question('escribe el nombre de tu directorio ', (nameDirectory)=> {
        dir.createDirectory(nameDirectory)
        console.log(dir);
        showOptions()
    })
    
}


function createDocument() {
    const file = new File()
    messages()
   // console.log('escribe tu texto'.cyan);
    writeDocument(file)
}

function writeDocument(file) {
    rl.on('line', (target) => {
        saveAsDocument(file, target)
        console.log(file); 
    })
}

function saveAsDocument(file, target) {
    switch(target) {
        case(':sa'):  
            if(file.isSaved()){
            console.log('ya guardaste el archivo'.yellow)
            }else {
                // guardar por primera vez
                rl.question('inserta el nombre de tu archivo y extension '.cyan, (nameFile) => {
                    const dirs =  Directory.showDirectoriesAvailable(__dirname) //file.showDirectoriesAvailable(__dirname)
                    assignLocationForDocument(file, dirs, nameFile)
                })
            }           
        break

        case(':s'):
            // guardar los ultimos cambios
            if(!file.isSaved()){
                console.log(`antes de guardar cambios asegurate de guardar el archivo en una ubicacion`.red);
            }else{
                console.log(`cambios guardados `.magenta);
                file.save()
            }
        break
        
        case(':q'): 
            // salir
            rl.removeAllListeners('line')
            showOptions()
        break

        default: file.insertText(target)
    }
}


function assignLocationForDocument(file, dirs, nameFile) {
    rl.question('donde deseas guardar el archivo '.cyan, (directory) => {
        Directory.verifyDirectoryExist(dirs, directory) ? file.saveAs(nameFile, directory === 'ejerciciofiles'? __dirname : directory) 
        : assignLocationForDocument(file, dirs, nameFile)     
    })
}

function openDocument(dirname) {
    File.showDocumentsAvailable(dirname)
    rl.question('elige tu archivo para abrir ', (name) => {
        try{
            let file = new File()
            file.openFile(dirname, name)
            messages()
            rl.on('line', (target) => {
                saveAsDocument(file, target)
                console.log(file);
            })
        }catch(err) {
            console.log(`${err}`.bgRed);
            console.log(`el archivo no existe`.red);
            openDocument(dirname)
        }
    })
}



/* Todos los objetos que emiten eventos son instancias de la EventEmitterclase. Estos objetos exponen
   una eventEmitter.on()función que permite adjuntar una o más funciones a eventos con nombre emitidos
   por el objeto. esto explica por que aunque no instancie explicitamente el modulo events la readline.
   createInterface si tiene acceso a esos eventos ya que internamente se crea una instancia de EventEmitter
   que se utiliza para manejar eventos relacionados con la entrada de la consola.

*/

   
     





/* fs.stat() se utiliza para obtener información detallada sobre un archivo o directorio, mientras que fs.access() se utiliza principalmente para verificar la existencia y los permisos de acceso a un archivo o directorio.  


*/

