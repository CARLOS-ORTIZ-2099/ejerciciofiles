const colors = require('colors')
const fs = require('fs')
const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
const File = require('./models/File.js')
const Directory = require('./models/Directory.js')
const path = require('path')

function show() {
    console.log(`1: crear documento`.blue);
    console.log(`2: abrir documento`.blue);
    console.log(`3: crear carpeta`.blue);
    console.log(`4: abrir carpeta`.blue);
    console.log(`5: cerrar app`.blue);
}


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
            // crear carpeta
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
        let directorys = fs.readdirSync(__dirname)
        directorys = directorys.filter(file => {
        return fs.statSync(`${__dirname}/${file}`).isDirectory();
        });

        console.log(directorys);
        rl.question('que directorio deseas abrir '.cyan, (directory) => {
            let files = fs.readdirSync(directory)
            let dirInstance = new Directory(__dirname, files)
            console.log(dirInstance);
           // dirInstance.seeListFiles()
           openDocument(directory)
        })
    
}

function createDir() {
    const dir = new Directory(__dirname)
    rl.question('escribe el nombre de tu directorio', (nameDirectory)=> {
        dir.createDirectory(nameDirectory)
        console.log(dir);
        showOptions()
    })
    
}


function createDocument() {
    const file = new File()
    messages()
    console.log('escribe tu texto'.cyan);
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
                rl.question('inserta el nombre de tu archivo y extension'.cyan, (nameFile) => {
                    let directorys = fs.readdirSync(__dirname)
                    directorys = directorys.filter(file => {
                    return fs.statSync(`${__dirname}/${file}`).isDirectory();
                    });
    
                    console.log([...directorys, path.basename(__dirname)]);
                    rl.question('donde deseas guardar el archivo '.cyan, (directory) => {
                    file.saveAs(nameFile, directory === 'ejerciciofiles'? __dirname : directory)
                    })
                })
            }           
        break

        case(':s'):
            // guardar los ultimos cambios
            console.log(`cambios guardados `.magenta);
            if(!file.isSaved()){
                console.log(`antes de guardas cambio asegurate de guardar el archivo en una ubicacion`.red);
            }else{
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


function openDocument(dirname) {
    let files = fs.readdirSync(dirname, {encoding:'utf-8'})
    files = files.filter((file) => !fs.statSync(`${dirname}/${file}`).isDirectory())
    files.forEach((file) => console.log(`${file}`.cyan))
    rl.question('elige tu archivo para abrir ', (name) => {
        try{
            let file = new File()
            const text = file.openFile(dirname, name)
            console.log(`sigue editando`.yellow);
            file.content = text
            console.log(text);
            messages()
            rl.on('line', (target) => {
                saveAsDocument(file, target)
                console.log(file);
            })
        }catch(err) {
            console.log(`${err}`.bgRed);
            openDocument()
        }
    })
}



function messages() {
    console.log(`
        *********************
        presiona los siguientes comando para : 
        :sa : para guardar por primera vez
        :s para guardar los ultimos cambios
        :q para salir
        *********************
    `.magenta);
}


/* Todos los objetos que emiten eventos son instancias de la EventEmitterclase. Estos objetos exponen
   una eventEmitter.on()función que permite adjuntar una o más funciones a eventos con nombre emitidos
   por el objeto. esto explica por que aunque no instancie explicitamente el modulo events la readline.
   createInterface si tiene acceso a esos eventos ya que internamente se crea una instancia de EventEmitter
   que se utiliza para manejar eventos relacionados con la entrada de la consola.

*/

   
     






/* fs.stat() se utiliza para obtener información detallada sobre un archivo o directorio, mientras que fs.access() se utiliza principalmente para verificar la existencia y los permisos de acceso a un archivo o directorio.  


*/

