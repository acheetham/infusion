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
        }
    });
    learning.enactors.boolean1.finalInit = function (that) {
        that.applier.modelChanged.addListener("boolVal", function (newModel) {
            console.log("boolean1 enactor model changed to "+newModel.boolVal, that);
        });
    };
    fluid.defaults("learning.enactors.boolean2", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.boolean2": {
                "model.boolVal": "default"
            }
        }
    });
    learning.enactors.boolean2.finalInit = function (that) {
        that.applier.modelChanged.addListener("boolVal", function (newModel) {
            console.log("boolean2 enactor model changed to "+newModel.boolVal, that);
        });
    };
    fluid.defaults("learning.enactors.boolean3", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.boolean3": {
                "model.boolVal": "default"
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
        }
    });
    learning.enactors.slider1.finalInit = function (that) {
        that.applier.modelChanged.addListener("value", function (newModel) {
            console.log("slider1 enactor model changed to "+newModel.value, that);
        });
    };

    fluid.defaults("learning.enactors.slider2", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.slider2": {
                "model.value": "default"
            }
        }
    });
    learning.enactors.slider2.finalInit = function (that) {
        that.applier.modelChanged.addListener("value", function (newModel) {
            console.log("slider2 enactor model changed to "+newModel.value, that);
        });
    };

    /**
     * 
     */
    fluid.defaults("learning.enactors.dropdown1", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.dropdown1": {
                "model.ddVal": "default"
            }
        }
    });
    learning.enactors.dropdown1.finalInit = function (that) {
        that.applier.modelChanged.addListener("ddVal", function (newModel) {
            console.log("dropdown1 enactor model changed to "+newModel.ddVal, that);
        });
    };

    fluid.defaults("learning.enactors.dropdown2", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.dropdown2": {
                "model.ddVal": "default"
            }
        }
    });
    learning.enactors.dropdown2.finalInit = function (that) {
        that.applier.modelChanged.addListener("ddVal", function (newModel) {
            console.log("dropdown2 enactor model changed to "+newModel.ddVal, that);
        });
    };
    fluid.defaults("learning.enactors.dropdown3", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.dropdown3": {
                "model.ddVal": "default"
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
        }
    });
    learning.enactors.radio1.finalInit = function (that) {
        that.applier.modelChanged.addListener("radioVal", function (newModel) {
            console.log("radio1 enactor model changed to "+newModel.radioVal, that);
        });
    };

    fluid.defaults("learning.enactors.radio2", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.radio2": {
                "model.radioVal": "default"
            }
        }
    });
    learning.enactors.radio2.finalInit = function (that) {
        that.applier.modelChanged.addListener("radioVal", function (newModel) {
            console.log("radio2 enactor model changed to "+newModel.radioVal, that);
        });
    };

    fluid.defaults("learning.enactors.radio3", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.radio3": {
                "model.radioVal": "default"
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
            "checkVal": {
                funcName: "learning.enactors.check1.log",
                args: ["{that}", "{change}.value"]
            }  
        },
    });
    learning.enactors.check1.log = function (that, changeVal) {
        console.log("check1 enactor: "+changeVal);
    };

})(jQuery, fluid);
