/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var browserjsonExporterClass = function () {
    function browserjsonExporterClass() {
        _classCallCheck(this, browserjsonExporterClass);
    }

    _createClass(browserjsonExporterClass, [{
        key: "support",
        value: function support() {
            if (!window.File || !window.FileReader || !window.FileList || !window.Blob || !window.JSON) {
                //unsupported
                return false;
            }
            return true;
        }
    }, {
        key: "import",
        value: function _import() {
            var self = this;
            return new Promise(function (resolve, reject) {
                if (!self.support()) {
                    reject(100, "This Web Browser is Unsupported");
                    return;
                }
                var input = document.createElement('input');
                input.type = "file";
                input.accept = "application/json";
                input.onchange = function (event) {
                    if (typeof event.target.files === "undefined" || event.target.files.length > 1) {
                        reject(200, "Invaild Upload Type");
                        return;
                    }
                    var file = event.target.files[0];
                    if (typeof file === "undefined" || file.type !== "application/json") {
                        reject(201, "Invaild Upload File");
                        return;
                    }
                    var reader = new FileReader();
                    reader.onload = function () {
                        try {
                            var jsobject = JSON.parse(reader.result);
                            resolve(jsobject);
                        } catch (e) {
                            reject(300, "JSON Parse Error - " + e);
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

    }, {
        key: "export",
        value: function _export(jsobject) {
            var fileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "file.json";
            var charset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "utf-8";

            var self = this;
            return new Promise(function (resolve, reject) {
                if (!self.support()) {
                    reject(100, "This Web Browser is Unsupported");
                    return;
                }
                if (typeof jsobject === "undefined") {
                    throw new TypeError("Javascript Object is undefined");
                    return;
                }
                var jsonData = JSON.stringify(jsobject, null, 4);
                var dataUri = 'data:application/json;charset=' + charset + ',' + encodeURIComponent(jsonData);
                var link = document.createElement('a');
                link.download = fileName;
                link.href = dataUri;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                resolve(true);
            });
        }
    }]);

    return browserjsonExporterClass;
}();

var browserJsonExporterClass = new browserjsonExporterClass();

//for ES6 Module
exports.default = browserJsonExporterClass;

//for <script>

window.browserJsonExporter = browserJsonExporterClass;
module.exports = exports["default"];

/***/ })
/******/ ]);