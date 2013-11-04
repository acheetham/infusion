/*
Copyright 2013 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*global demo:true, fluid, jQuery, window*/

// JSLint options
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

var learning = learning || {};
(function ($, fluid) {

    /**
     * Primary Schema
     */
    learning.primarySchema = {
        "learning.booleanTest1": {
            "type": "boolean",
            "default": false
        },
        "learning.booleanTest2": {
            "type": "boolean",
            "default": true
        },
        "learning.sliderTest1": {
            "type": "number",
            "default": 2,
            "minimum": 1,
            "maximum": 5,
            "divisibleBy": 1
        },
        "learning.sliderTest2": {
            "type": "number",
            "default": 25,
            "minimum": 0,
            "maximum": 50,
            "divisibleBy": 5
        },
        "learning.dropdownTest1": {
            "type": "string",
            "default": "kl",
            "enum": ["en", "kl", "bj", "rm", "cd"]
        },
        "learning.dropdownTest2": {
            "type": "string",
            "default": "three",
            "enum": ["one", "two", "three", "go"]
        },
        "learning.radioTest1": {
            "type": "string",
            "default": "occasionally",
            "enum": ["never", "occasionally", "regularly", "always"]
        },
        "learning.radioTest2": {
            "type": "string",
            "default": "maybe",
            "enum": ["yes", "no", "maybe", "sometimes"]
        }
    };

    /**
     * Auxiliary Schema
     */
    fluid.defaults("learning.auxSchema.learning", {
        gradeNames: ["fluid.prefs.auxSchema", "autoInit"],
        auxiliarySchema: {
            template: "%prefix/compositePrefsEditor.html",
            message: "%prefix/prefsEditor.json",
            booleanTest1: {
                type: "learning.booleanTest1",
                enactor: {
                    type: "learning.enactors.booleanTest1"
                },
                panel: {
                    type: "learning.panels.booleanTest1",
                    container: ".flc-prefsEditor-composite1-booleanTest1",
                    template: "%prefix/boolean-template.html",
                    message: "%prefix/booleanTest1.json"
                }
            },
            booleanTest2: {
                type: "learning.booleanTest2",
                enactor: {
                    type: "learning.enactors.booleanTest2"
                },
                panel: {
                    type: "learning.panels.booleanTest2",
                    container: ".flc-prefsEditor-composite1-booleanTest2",
                    template: "%prefix/boolean-template2.html",
                    message: "%prefix/booleanTest2.json"
                }
            },
            sliderTest1: {
                type: "learning.sliderTest1",
                enactor: {
                    type: "learning.enactors.sliderTest1"
                },
                panel: {
                    type: "learning.panels.sliderTest1",
                    container: ".flc-prefsEditor-composite1-sliderTest1",
                    template: "%prefix/slider-template.html",
                    message: "%prefix/sliderTest1.json"
                }
            },

            sliderTest2: {
                type: "learning.sliderTest2",
                enactor: {
                    type: "learning.enactors.sliderTest2"
                },
                panel: {
                    type: "learning.panels.sliderTest2",
                    container: ".flc-prefsEditor-composite1-sliderTest2",
                    template: "%prefix/slider-template.html",
                    message: "%prefix/sliderTest2.json"
                }
            },

            dropdownTest1: {
                type: "learning.dropdownTest1",
                enactor: {
                    type: "learning.enactors.dropdownTest1"
                },
                panel: {
                    type: "learning.panels.dropdownTest1",
                    container: ".flc-prefsEditor-composite2-dropdownTest1",
                    template: "%prefix/dropdown-template.html",
                    message: "%prefix/dropdownTest1.json"
                }
            },
            dropdownTest2: {
                type: "learning.dropdownTest2",
                enactor: {
                    type: "learning.enactors.dropdownTest2"
                },
                panel: {
                    type: "learning.panels.dropdownTest2",
                    container: ".flc-prefsEditor-composite2-dropdownTest2",
                    template: "%prefix/dropdown-template.html",
                    message: "%prefix/dropdownTest2.json"
                }
            },
            radioTest1: {
                type: "learning.radioTest1",
                enactor: {
                    type: "learning.enactors.radioTest1"
                },
                panel: {
                    type: "learning.panels.radioTest1",
                    container: ".flc-prefsEditor-composite2-radioTest1",
                    template: "%prefix/radio-template.html",
                    message: "%prefix/radioTest1.json"
                }
            },
            radioTest2: {
                type: "learning.radioTest2",
                enactor: {
                    type: "learning.enactors.radioTest2"
                },
                panel: {
                    type: "learning.panels.radioTest2",
                    container: ".flc-prefsEditor-composite2-radioTest2",
                    template: "%prefix/radio-template.html",
                    message: "%prefix/radioTest2.json"
                }
            },
            groups: {
                composite1: {
                    "container": ".flc-prefsEditor-compositePanel1",
                    "template": "%prefix/composite1.html",
                    "message": "%prefix/composite1.json",
                    "type": "fluid.prefs.panel.composite1",
                    "panels": ["booleanTest1", "booleanTest2", "sliderTest1", "sliderTest2"]
                },
                composite2: {
                    "container": ".flc-prefsEditor-compositePanel2",
                    "template": "%prefix/composite2.html",
                    "message": "%prefix/composite2.json",
                    "type": "fluid.prefs.panel.composite2",
                    "panels": ["dropdownTest1", "dropdownTest2", "radioTest1", "radioTest2"]
                }
            }
        }
    });            

    /**
     * Composite Panels
     */
    fluid.defaults("fluid.prefs.panel.composite1", {
        gradeNames: ["fluid.prefs.compositePanel", "autoInit"],
        selectors: {
            label: ".flc-prefsEditor-composite1-label"
        },
        protoTree: {
            label: {messagekey: "composite1Label"}
        }
    });
    fluid.defaults("fluid.prefs.panel.composite2", {
        gradeNames: ["fluid.prefs.compositePanel", "autoInit"],
        selectors: {
            label: ".flc-prefsEditor-composite2-label"
        },
        protoTree: {
            label: {messagekey: "composite2Label"}
        }
    });

    /**
     * Initialize Preference Editor. This version of Preferences Editor uses the
     * page itself as a live preview.
     *
     * Makes use of a schema to configure Preferences Editor
     */
    learning.initPrefsEditor = function (container) {
        var builder = fluid.prefs.builder({
            gradeNames: ["learning.auxSchema.learning"],
            primarySchema: learning.primarySchema,
            auxiliarySchema: {
                "templatePrefix": "html/",
                "messagePrefix": "messages/"
            }
        });
        return fluid.invokeGlobalFunction(builder.options.assembledPrefsEditorGrade, [container]);
    };

})(jQuery, fluid);
