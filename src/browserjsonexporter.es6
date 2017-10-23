class browserjsonExporterClass {
    support() {
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob || !window.JSON) {
            //unsupported
            return false;
        }
        return true;
    }
    import () {
        const self = this;
        return new Promise(function (resolve, reject) {
            if (!self.support()) {
                reject(new Error("This Web Browser is Unsupported"));
                return;
            }
            let input = document.createElement('input');
            input.type = "file";
            input.accept = "application/json";
            input.onchange = (event) => {
                if (typeof event.target.files === "undefined" || event.target.files.length > 1) {
                    reject(new Error("Invaild Upload Type"));
                    return;
                }
                let file = event.target.files[0];
                if (typeof file === "undefined" || file.type !== "application/json") {
                    reject(new Error("Invaild Upload File"));
                    return;
                }
                let reader = new FileReader();
                reader.onload = () => {
                    try{
                        const jsobject = JSON.parse(reader.result);
                        resolve(jsobject);
                    }catch(e){
                        reject(e);
                    }
                };
                reader.readAsText(file);
            };
            document.body.appendChild(input);
            input.click();
            document.body.removeChild(input);
        });
    }
    /**
     * 
     * @param {Object} jsobject 
     * @param {string} fileName 
     * @param {string} charset 
     */
    export (jsobject, fileName = "file.json", charset = "utf-8") {
        const self = this;
        return new Promise(function (resolve, reject) {
            if (!self.support()) {
                reject(new Error("This Web Browser is Unsupported"));
                return;
            }
            if (typeof jsobject === "undefined") {
                reject(new TypeError("Javascript Object is undefined"));
                return;
            }
            let jsonData = JSON.stringify(jsobject, null, 4);
            let dataUri = 'data:application/json;charset=' + charset + ',' + encodeURIComponent(jsonData);
            let link = document.createElement('a');
            link.download = fileName;
            link.href = dataUri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            resolve(true);
        });
    }
}
let browserJsonExporterClass = new browserjsonExporterClass();

//for ES6 Module
export default browserJsonExporterClass;

//for <script>
if (window) {
    window.browserJsonExporter = browserJsonExporterClass;
}