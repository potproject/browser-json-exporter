# Browser JSON Exporter

ブラウザからJavaScriptオブジェクトをJSONファイルでダウンロード、  
ブラウザからJSONファイルをアップロードしてJavaScriptオブジェクトに出力を行えるライブラリです。  
Promise,File APIがブラウザ対応している必要があります。  

[export] Javascript Object -> JSON.stringify -> XXX.json File  
Browser JSON File Download  

[import] XXX.json File -> JSON.parse -> Javascript Object  
Browser JSON File Upload  

## Usage
```js
    // ES6 only
    import browserJsonExporter from 'browserJsonExporter';

    //export
    browserJsonExporter.export(
        {
            "a":1,
            "b":2,
            "c":{
                "d":3
            }
        }
        ,
        "export.json", // fileName [Default='file.json']
        "utf-8" // charset [Default='utf-8']
    )
    .catch(
        function(err){
            console.log(err);
        }
    );

    //import
    browserJsonExporter.import(
    ) // Open file Picker
    .then(
        function(data){
            console.log(data); 
            //{a: 1, b: 2, c: {…}}
        }
    )
    .catch(
        function(err){
            console.log(err);
        }
    );

```

## LICENSE
MIT