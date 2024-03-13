const colors = require('colors')
const fs = require('fs')
const os = require('os')
const path = require('path')

class File {
    constructor() {
        this.name = ''
        this.extension = ''
        this.ubication = __dirname
        this.content = ''
        this.saveFile = false
    }

    isSaved() {
        return this.saveFile
    }

    // abrir el archivo o leerlo
    openFile(dirname, name) {
        this.ubication = dirname
        this.name = name
        this.saveFile = true
        const result = fs.readFileSync(path.join(dirname, name), 'utf-8')
       //console.log(result);
       return result
    }

    saveAs(name, ubication) {
        this.name = name
        this.ubication = ubication
        this.createFile()
       /*  try {
            fs.accessSync(path.join(this.ubication, this.name), fs.constants.F_OK);
            console.log('El archivo ya existe.');
            this.save()
            
        } catch (err) {
           // console.error('El archivo no existe o no se puede acceder.');
           this.createFile()
        } */
        
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


