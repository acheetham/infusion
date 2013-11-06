/*
Copyright 2013 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*global demo:true, fluid, jQuery, window, console*/

// JSLint options
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

var learning = learning || {};
(function ($, fluid) {

    // NOTE: There is still a fair amount of duplication in this file. It will be cleaned up.

    /**
     * 
     */
    fluid.defaults("learning.enactors.boolean1", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.boolean1": {
                "model.boolVal": "default"
            }
        },
        modelListeners: {
            "boolVal": {
                funcName: "learning.enactors.logModelValue",
                args: ["boolean1", "{change}.value"]
            }
        }
    });

    fluid.defaults("learning.enactors.boolean2", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.boolean2": {
                "model.boolVal": "default"
            }
        },
        modelListeners: {
            "boolVal": {
                funcName: "learning.enactors.logModelValue",
                args: ["boolean2", "{change}.value"]
            }
        }
    });

    /**
     * 
     */
    fluid.defaults("learning.enactors.slider1", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.slider1": {
                // because of FLUID-5190, this must be "value" (for textfieldSlider only)
                "model.value": "default"
            }
        },
        modelListeners: {
            "value": {
                funcName: "learning.enactors.logModelValue",
                args: ["slider1", "{change}.value"]
            }
        }
    });

    fluid.defaults("learning.enactors.slider2", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.slider2": {
                "model.value": "default"
            }
        },
        modelListeners: {
            "value": {
                funcName: "learning.enactors.logModelValue",
                args: ["slider2", "{change}.value"]
            }
        }
    });

    /**
     * 
     */
    fluid.defaults("learning.enactors.dropdown1", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.dropdown1": {
                "model.ddVal": "default"
            }
        },
        modelListeners: {
            "ddVal": {
                funcName: "learning.enactors.logModelValue",
                args: ["dropdown1", "{change}.value"]
            }
        }
    });

    fluid.defaults("learning.enactors.dropdown2", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.dropdown2": {
                "model.ddVal": "default"
            }
        },
        modelListeners: {
            "ddVal": {
                funcName: "learning.enactors.logModelValue",
                args: ["dropdown2", "{change}.value"]
            }
        }
    });

    /**
     * 
     */
    fluid.defaults("learning.enactors.radio1", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.radio1": {
                "model.radioVal": "default"
            }
        },
        modelListeners: {
            "radio1": {
                funcName: "learning.enactors.logModelValue",
                args: ["radio1", "{change}.value"]
            }
        }
    });

    fluid.defaults("learning.enactors.radio2", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.radio2": {
                "model.radioVal": "default"
            }
        },
        modelListeners: {
            "radio2": {
                funcName: "learning.enactors.logModelValue",
                args: ["radio2", "{change}.value"]
            }
        }
    });
    
    fluid.defaults("learning.enactors.check1", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.check1": {
                "model.checkVal": "default"
            }
        },
        modelListeners: {
            "check1": {
                funcName: "learning.enactors.logModelValue",
                args: ["check1", "{change}.value"]
            }
        }
    });

    learning.enactors.logModelValue = function (name, changeVal) {
        console.log(name + " model changed to: " + changeVal);
    };

})(jQuery, fluid);
