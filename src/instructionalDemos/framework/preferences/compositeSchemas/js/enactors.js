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
    fluid.defaults("learning.enactors.booleanTest1", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.booleanTest1": {
                "model.boolVal": "default"
            }
        }
    });
    learning.enactors.booleanTest1.finalInit = function (that) {
        that.applier.modelChanged.addListener("boolVal", function (newModel) {
            console.log("booleanTest1 enactor model changed to "+newModel.boolVal, that);
        });
    };
    fluid.defaults("learning.enactors.booleanTest2", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.booleanTest2": {
                "model.boolVal": "default"
            }
        }
    });
    learning.enactors.booleanTest2.finalInit = function (that) {
        that.applier.modelChanged.addListener("boolVal", function (newModel) {
            console.log("booleanTest2 enactor model changed to "+newModel.boolVal, that);
        });
    };

    /**
     * 
     */
    fluid.defaults("learning.enactors.sliderTest1", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.sliderTest1": {
                // because of FLUID-5190, this must be "value" (for textfieldSlider only)
                "model.value": "default"
            }
        }
    });
    learning.enactors.sliderTest1.finalInit = function (that) {
        that.applier.modelChanged.addListener("value", function (newModel) {
            console.log("sliderTest1 enactor model changed to "+newModel.value, that);
        });
    };

    fluid.defaults("learning.enactors.sliderTest2", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.sliderTest2": {
                "model.value": "default"
            }
        }
    });
    learning.enactors.sliderTest2.finalInit = function (that) {
        that.applier.modelChanged.addListener("value", function (newModel) {
            console.log("sliderTest2 enactor model changed to "+newModel.value, that);
        });
    };

    /**
     * 
     */
    fluid.defaults("learning.enactors.dropdownTest1", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.dropdownTest1": {
                "model.ddVal": "default"
            }
        }
    });
    learning.enactors.dropdownTest1.finalInit = function (that) {
        that.applier.modelChanged.addListener("ddVal", function (newModel) {
            console.log("dropdownTest1 enactor model changed to "+newModel.ddVal, that);
        });
    };

    fluid.defaults("learning.enactors.dropdownTest2", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.dropdownTest2": {
                "model.ddVal": "default"
            }
        }
    });
    learning.enactors.dropdownTest2.finalInit = function (that) {
        that.applier.modelChanged.addListener("ddVal", function (newModel) {
            console.log("dropdownTest2 enactor model changed to "+newModel.ddVal, that);
        });
    };

    /**
     * 
     */
    fluid.defaults("learning.enactors.radioTest1", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.radioTest1": {
                "model.radioVal": "default"
            }
        }
    });
    learning.enactors.radioTest1.finalInit = function (that) {
        that.applier.modelChanged.addListener("radioVal", function (newModel) {
            console.log("radioTest1 enactor model changed to "+newModel.radioVal, that);
        });
    };

    fluid.defaults("learning.enactors.radioTest2", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.radioTest2": {
                "model.radioVal": "default"
            }
        }
    });
    learning.enactors.radioTest2.finalInit = function (that) {
        that.applier.modelChanged.addListener("radioVal", function (newModel) {
            console.log("radioTest2 enactor model changed to "+newModel.radioVal, that);
        });
    };

})(jQuery, fluid);
