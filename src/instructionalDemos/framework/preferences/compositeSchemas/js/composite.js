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
        "learning.boolean1": {
            "type": "boolean",
            "default": false
        },
        "learning.boolean2": {
            "type": "boolean",
            "default": true
        },
        "learning.slider1": {
            "type": "number",
            "default": 2,
            "minimum": 1,
            "maximum": 5,
            "divisibleBy": 1
        },
        "learning.slider2": {
            "type": "number",
            "default": 25,
            "minimum": 0,
            "maximum": 50,
            "divisibleBy": 5
        },
        "learning.dropdown1": {
            "type": "string",
            "default": "kl",
            "enum": ["en", "kl", "bj", "rm", "cd"]
        },
        "learning.dropdown2": {
            "type": "string",
            "default": "three",
            "enum": ["one", "two", "three", "go"]
        },
        "learning.radio1": {
            "type": "string",
            "default": "occasionally",
            "enum": ["never", "occasionally", "regularly", "always"]
        },
        "learning.radio2": {
            "type": "string",
            "default": "maybe",
            "enum": ["yes", "no", "maybe", "sometimes"]
        },
        "learning.check1": {
            "type": "boolean",
            "default": true
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
            boolean1: {
                type: "learning.boolean1",
                enactor: {
                    type: "learning.enactors.boolean1"
                },
                panel: {
                    type: "learning.panels.boolean1",
                    container: ".flc-prefsEditor-composite1-boolean1",
                    template: "%prefix/boolean-template.html",
                    message: "%prefix/boolean1.json"
                }
            },
            boolean2: {
                type: "learning.boolean2",
                enactor: {
                    type: "learning.enactors.boolean2"
                },
                panel: {
                    type: "learning.panels.boolean2",
                    container: ".flc-prefsEditor-composite1-boolean2",
                    template: "%prefix/boolean-template2.html",
                    message: "%prefix/boolean2.json"
                }
            },
            check1: {
                type: "learning.check1",
                enactor: {
                    type: "learning.enactors.check1"
                },
                panel: {
                    type: "learning.panels.check1",
                    container: ".flc-prefsEditor-composite1-check1",
                    template: "%prefix/check1-template.html",
                    message: "%prefix/check1.json"
                }
            },
            slider1: {
                type: "learning.slider1",
                enactor: {
                    type: "learning.enactors.slider1"
                },
                panel: {
                    type: "learning.panels.slider1",
                    container: ".flc-prefsEditor-composite1-slider1",
                    template: "%prefix/slider-template.html",
                    message: "%prefix/slider1.json"
                }
            },
            slider2: {
                type: "learning.slider2",
                enactor: {
                    type: "learning.enactors.slider2"
                },
                panel: {
                    type: "learning.panels.slider2",
                    container: ".flc-prefsEditor-composite1-slider2",
                    template: "%prefix/slider-template.html",
                    message: "%prefix/slider2.json"
                }
            },
            dropdown1: {
                type: "learning.dropdown1",
                enactor: {
                    type: "learning.enactors.dropdown1"
                },
                panel: {
                    type: "learning.panels.dropdown1",
                    container: ".flc-prefsEditor-composite2-dropdown1",
                    template: "%prefix/dropdown-template.html",
                    message: "%prefix/dropdown1.json"
                }
            },
            dropdown2: {
                type: "learning.dropdown2",
                enactor: {
                    type: "learning.enactors.dropdown2"
                },
                panel: {
                    type: "learning.panels.dropdown2",
                    container: ".flc-prefsEditor-composite2-dropdown2",
                    template: "%prefix/dropdown-template.html",
                    message: "%prefix/dropdown2.json"
                }
            },
/*
 this might be how to have multiple enactors
            radio3foo: {
                type: "learning.radio3",
                enactor: {
                    type: "learning.enactors.radio3-2"
                }
            },
*/
            radio1: {
                type: "learning.radio1",
                enactor: {
                    type: "learning.enactors.radio1"
                },
                panel: {
                    type: "learning.panels.radio1",
                    container: ".flc-prefsEditor-composite2-radio1",
                    template: "%prefix/radio-template.html",
                    message: "%prefix/radio1.json"
                }
            },
            radio2: {
                type: "learning.radio2",
                enactor: {
                    type: "learning.enactors.radio2"
                },
                panel: {
                    type: "learning.panels.radio2",
                    container: ".flc-prefsEditor-composite2-radio2",
                    template: "%prefix/radio-template.html",
                    message: "%prefix/radio2.json"
                }
            },
            groups: {
                composite1: {
                    "container": ".flc-prefsEditor-compositePanel1",
                    "template": "%prefix/composite1.html",
                    "message": "%prefix/composite1.json",
                    "type": "learning.panels.composite1",
                    "panels": ["boolean1", "boolean2", "check1", "slider1", "slider2"]
                },
                composite2: {
                    "container": ".flc-prefsEditor-compositePanel2",
                    "template": "%prefix/composite2.html",
                    "message": "%prefix/composite2.json",
                    "type": "learning.panels.composite2",
                    "panels": ["dropdown1", "dropdown2", "radio1", "radio2"]
                }
            }
        }
    });            

    /**
     * Composite Panels
     */
    fluid.defaults("learning.panels.composite1", {
        gradeNames: ["fluid.prefs.compositePanel", "autoInit"],
        selectors: {
            label: ".flc-prefsEditor-composite1-label"
        },
        protoTree: {
            label: {messagekey: "composite1Label"}
        }
    });
    fluid.defaults("learning.panels.composite2", {
        gradeNames: ["fluid.prefs.compositePanel", "autoInit"],
        selectors: {
            label: ".flc-prefsEditor-composite2-label"
        },
        protoTree: {
            label: {messagekey: "composite2Label"}
        }
    });
    fluid.defaults("learning.panels.composite3", {
        gradeNames: ["fluid.prefs.compositePanel", "autoInit"],
        selectors: {
            label: ".flc-prefsEditor-composite3-label"
        },
        protoTree: {
            label: {messagekey: "composite3Label"}
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
