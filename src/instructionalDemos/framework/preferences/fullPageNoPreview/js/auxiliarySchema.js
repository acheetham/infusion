/*
Copyright 2013 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*global demo:true, fluid, jQuery*/

// JSLint options
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

var demo = demo || {};
(function ($, fluid) {

    /**
     * Auxiliary Schema
     */
    demo.auxiliarySchema = {
        templatePrefix: "../shared/html/",
        messagePrefix: "../shared/messages/",
        template: "html/prefsEditor.html",
        message: "%prefix/prefsEditor.json",
        lang: {
            type: "demo.language",
            enactor: {
                type: "demo.enactors.language"
            },
            panel: {
                type: "demo.panels.language",
                container: ".mpe-speaking-lang",
                "message": "%prefix/languages.json",
                template: "%prefix/dropdown-template.html"
            }
        },
        vol: {
            type: "demo.volume",
            enactor: {
                type: "demo.enactors.vol"
            },
            panel: {
                type: "demo.panels.vol",
                container: ".mpe-speaking-vol",
                template: "%prefix/slider-template.html"
            }
        },
        incSize: {
            type: "demo.increaseSize",
            enactor: {
                type: "demo.enactors.incSize"
            },
            panel: {
                type: "demo.panels.incSize",
                container: ".mpe-increasing-onOff",
                template: "%prefix/incSize-template.html"
            }
        },
        magPos: {
            type: "demo.magnifierPosition",
            enactor: {
                type: "demo.enactors.magPos"
            },
            panel: {
                type: "demo.panels.magPos",
                container: ".mpe-increasing-magPos",
                "message": "%prefix/increasing.json",
                template: "%prefix/radioButton-template.html"
            }
        }
    };            


})(jQuery, fluid);
