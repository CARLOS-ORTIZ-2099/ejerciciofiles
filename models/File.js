const colors = require('colors')
const fs = require('fs')
const os = require('os')
const path = require('path')

class File {
    constructor() {
        this.name = ''
        this.ubication = __dirname
        this.content = ''
        this.saveFile = false
        this.messageWelcome()
    }

    messageWelcome() {
        console.log('escribe tu texto 🖊'.cyan);
    }

    isSaved() {
        return this.saveFile
    }

    // abrir el archivo o leerlo
    openFile(dirname, name) {
        this.ubication = dirname
        this.name = name
        this.saveFile = true
        const text = fs.readFileSync(path.join(dirname, name), 'utf-8')
        this.content = text
        console.log(`sigue editando 🖊`.yellow)
        console.log(this.content);
       // return text
    }

    saveAs(name, ubication) {
        this.name = name
        this.ubication = ubication
        this.createFile()
    }

    save() {
        fs.writeFileSync(path.join(this.ubication, this.name), this.content)
    }

    insertText(text) {
        this.content+=os.EOL+text
    }

    createFile() {
        this.saveFile = true
        fs.writeFileSync(path.join(this.ubication, this.name), this.content)
        console.log(this);
        console.log('creado con exito 😀')
    }

    static showDocumentsAvailable(dirname) {
        let files = fs.readdirSync(dirname, {encoding:'utf-8'})
        files = files.filter((file) => !fs.statSync(`${dirname}/${file}`).isDirectory())
        files.forEach((file) => console.log(`${file}`.cyan))
    }

}

module.exports = File


/* const fx = new File('prueba.php')
console.log(fx.createFile()); */


// este modulo permite comprobar la existencia de un archivo pero me da informacion adicional en formato de objeto
/* fs.stat('./models',(err, stat) => {
    console.log(stat);
}) */


// este modulo tambien comprueba la existencia de un archivo y ademas indica si hay permisos para leerlo escribirlo, etc
/* fs.access('./models', fs.constants.F_OK, (err) => {
    console.log(err);
})
 */


console.log(path.join(__dirname, 'hola.txt'));


