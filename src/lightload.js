/*!
 * LightLoad v0.1.0
 * http://emarva.github.io/lightload
 *
 * Copyright (c) 2015 Daniel Nuñez S. <dnunezse@gmail.com>
 * Released under the MIT license
 */
var lightload;
(function(global) {
	var LightLoad,
		pathDataConfig,
		config,
		scriptsLoaded,
		cssLoaded;

	/*
	 * Carga una script al DOM
	 */
	function loadScript(path, callback) {
        if (typeof scriptsLoaded[path] !== 'undefined') {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            if (script.readyState) { // IE
                script.onreadystatechange = function() {
                    if (script.readyState == 'loaded' || script.readyState == 'complete') {
                        script.readystatechange = null;
                        if (callback !== null)
                            callback();
                    }
                };
            } else { // Otros
                script.onload = function() {
                    if (callback !== null)
                        callback();
                };
            }
            //script.async = "true";
            script.src = path;
            document.getElementsByTagName('head')[0].appendChild(script);
            //scriptsLoaded[path]sCargados[url] = true;
        } else {
            if (callback !== null) {
                callback();
            }
        }
    }

    /*
     * Busca los tags de tipo script en busca del que contenta el
     * atributo data-config.
     */
	function loadScripts() {
		var scripts = document.getElementsByTagName('script');

		for (var i = 0; i < scripts.length; i++) {
			var attrDataConfig = scripts[i].attributes.getNamedItem('data-config');

			if (attrDataConfig !== null) {
				pathDataConfig = attrDataConfig.value + '.js';
			} else {
				return false;
			}
		}

		return true;
	}

	/*
	 * Constructor de LightLoad.
	 */
	LightLoad = function(script, fn) {
		// Se cargan los scripts en busqueda de atributo data-config
		if (loadScripts()) {
			//loadScript(pathDataConfig, function() {});
		} else {
			console.log('');
		}
	};

	/*
	 * Carga un script JavaScript al DOM.
	 */
	LightLoad.prototype.using = function(name, callback) {
		loadScript(name, callback);
	};

	/*
	 * Carga un archivo CSS, de no estar cargado ya.
	 */
	LightLoad.prototype.css = function(name) {
		if (typeof cssLoaded[name] === 'undefined') {
            var style = document.createElement('link');
            style.type = 'text/css';
            style.href = config[name];
            style.rel = 'stylesheet';
            document.getElementsByTagName('head')[0].appendChild(style);
            //app.estilosCargados[url] = true;
        }
	};

	/*
	 * Limpia el cache de LightLoad en localStorage.
	 */
	LightLoad.prototype.clearCache = function() {

	};

	// Se crea la instancia de LightLoad
	if (global === this) {
		lightload = new LightLoad();
	}
})(this);
