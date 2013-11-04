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
    fluid.defaults("learning.panels.boolean1", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.boolean1": {
                "model.boolVal": "default"
            }
        },
        selectors: {
            bool: ".flc-prefsEditor-booleanTest",
            label: ".flc-prefsEditor-booleanTest-label",
            choiceLabel: ".flc-prefsEditor-booleanTest-choice-label"
        },
        protoTree: {
            label: {messagekey: "booleanTest"},
            choiceLabel: {messagekey: "booleanTestLabel1"},
            bool: "${boolVal}"
        }
    });

    fluid.defaults("learning.panels.boolean2", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.boolean2": {
                "model.boolVal": "default"
            }
        },
        selectors: {
            bool: ".flc-prefsEditor-booleanTest",
            label: ".flc-prefsEditor-booleanTest-label",
            choiceLabel: ".flc-prefsEditor-booleanTest-choice-label"
        },
        protoTree: {
            label: {messagekey: "booleanTest"},
            choiceLabel: {messagekey: "booleanTestLabel2"},
            bool: "${boolVal}"
        }
    });
    fluid.defaults("learning.panels.boolean3", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.boolean3": {
                "model.boolVal": "default"
            }
        },
        selectors: {
            bool: ".flc-prefsEditor-booleanTest",
            label: ".flc-prefsEditor-booleanTest-label",
            choiceLabel: ".flc-prefsEditor-booleanTest-choice-label"
        },
        protoTree: {
            label: {messagekey: "booleanTest"},
            choiceLabel: {messagekey: "booleanTestLabel3"},
            bool: "${boolVal}"
        }
    });

    /**
     * 
     */
    fluid.defaults("learning.panels.slider1", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.slider1": {
                // because of FLUID-5190, this must be "value" (for textfieldSlider only)
                "model.value": "default",
                "range.min": "minimum",
                "range.max": "maximum"
            }
        },
        selectors: {
            textSize: ".flc-prefsEditor-min-val",
            label: ".flc-prefsEditor-min-val-label",
            smallIcon: ".flc-prefsEditor-min-val-smallIcon",
            largeIcon: ".flc-prefsEditor-min-val-largeIcon",
            multiplier: ".flc-prefsEditor-multiplier"
        },
        protoTree: {
            label: {messagekey: "textSizeLabel"},
            smallIcon: {messagekey: "textSizeSmallIcon"},
            largeIcon: {messagekey: "textSizeLargeIcon"},
            multiplier: {messagekey: "multiplier"},
            textSize: {
                decorators: {
                    type: "fluid",
                    // the fluid.prefs.textfieldSlider is a fluid.textfieldSlider that pulls the model and range from <???>
                    func: "fluid.prefs.textfieldSlider",
                    options: {
                        rules: {
                            "value": "value"
                        },
                        model: "{learning.panels.sliderTest1}.model",
                        sourceApplier: "{learning.panels.sliderTest1}.applier",
                        range: "{learning.panels.sliderTest1}.options.range",
                        sliderOptions: "{learning.panels.sliderTest1}.options.sliderOptions"
                    }
                }
            }
        }
    });

    fluid.defaults("learning.panels.slider2", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.slider2": {
                // because of FLUID-5190, this must be "value" (for textfieldSlider only)
                "model.value": "default",
                "range.min": "minimum",
                "range.max": "maximum"
            }
        },
        selectors: {
            textSize: ".flc-prefsEditor-min-val",
            label: ".flc-prefsEditor-min-val-label",
            smallIcon: ".flc-prefsEditor-min-val-smallIcon",
            largeIcon: ".flc-prefsEditor-min-val-largeIcon",
            multiplier: ".flc-prefsEditor-multiplier"
        },
        protoTree: {
            label: {messagekey: "textSizeLabel"},
            smallIcon: {messagekey: "textSizeSmallIcon"},
            largeIcon: {messagekey: "textSizeLargeIcon"},
            multiplier: {messagekey: "multiplier"},
            textSize: {
                decorators: {
                    type: "fluid",
                    // the fluid.prefs.textfieldSlider is a fluid.textfieldSlider that pulls the model and range from <???>
                    func: "fluid.prefs.textfieldSlider",
                    options: {
                        rules: {
                            "value": "value"
                        },
                        model: "{learning.panels.sliderTest2}.model",
                        sourceApplier: "{learning.panels.sliderTest2}.applier",
                        range: "{learning.panels.sliderTest2}.options.range",
                        sliderOptions: "{learning.panels.sliderTest2}.options.sliderOptions"
                    }
                }
            }
        }
    });

    /**
     * 
     */
    fluid.defaults("learning.panels.dropdown1", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.dropdown1": {
                "model.ddVal": "default",
                "controlValues.ddStrings": "enum"
            }
        },
        selectors: {
            textFont: ".flc-prefsEditor-text-font",
            label: ".flc-prefsEditor-text-font-label"
        },
        stringArrayIndex: {
            dd: ["dropdownTest-en", "dropdownTest-kl", "dropdownTest-bj", "dropdownTest-rm", "dropdownTest-cd"]
        },
        protoTree: {
            label: {messagekey: "labelkey"},
            textFont: {
                optionnames: "${{that}.stringBundle.dd}",
                optionlist: "${{that}.options.controlValues.ddStrings}",
                selection: "${ddVal}"
            }
        }
    });

    fluid.defaults("learning.panels.dropdown2", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.dropdown2": {
                "model.ddVal": "default",
                "controlValues.ddStrings": "enum"
            }
        },
        selectors: {
            textFont: ".flc-prefsEditor-text-font",
            label: ".flc-prefsEditor-text-font-label"
        },
        stringArrayIndex: {
            dd: ["dropdownTest-one", "dropdownTest-two", "dropdownTest-three", "dropdownTest-go"]
        },
        protoTree: {
            label: {messagekey: "labelkey"},
            textFont: {
                optionnames: "${{that}.stringBundle.dd}",
                optionlist: "${{that}.options.controlValues.ddStrings}",
                selection: "${ddVal}"
            }
        }
    });
    fluid.defaults("learning.panels.dropdown3", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.dropdown3": {
                "model.ddVal": "default",
                "controlValues.ddStrings": "enum"
            }
        },
        selectors: {
            textFont: ".flc-prefsEditor-text-font",
            label: ".flc-prefsEditor-text-font-label"
        },
        stringArrayIndex: {
            dd: ["dropdownTest-adelphi", "dropdownTest-enterprise", "dropdownTest-bozeman"]
        },
        protoTree: {
            label: {messagekey: "labelkey"},
            textFont: {
                optionnames: "${{that}.stringBundle.dd}",
                optionlist: "${{that}.options.controlValues.ddStrings}",
                selection: "${ddVal}"
            }
        }
    });

    /**
     * 
     */
    fluid.defaults("learning.panels.radio1", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.radio1": {
                "model.radioVal": "default",
                "controlValues.radioStrings": "enum"
            }
        },
        selectors: {
            frequencyRow: ".flc-prefsEditor-frequencyRow",
            frequencyLabel: ".flc-prefsEditor-frequency-label",
            frequencyInput: ".flc-prefsEditor-frequencyInput",
            label: ".flc-prefsEditor-contrast-label"
        },
        stringArrayIndex: {
            radioTestStrings: ["radioTestKey-never", "radioTestKey-occasionally", "radioTestKey-regularly", "radioTestKey-always"]
        },
        repeatingSelectors: ["frequencyRow"],
        protoTree: {
            label: {messagekey: "radioTestLabelKey"},
            expander: {
                type: "fluid.renderer.selection.inputs",
                rowID: "frequencyRow",
                labelID: "frequencyLabel",
                inputID: "frequencyInput",
                selectID: "frequency-radio",
                tree: {
                    optionnames: "${{that}.stringBundle.radioTestStrings}",
                    optionlist: "${{that}.options.controlValues.radioStrings}",
                    selection: "${radioVal}"
                }
            }
        }
    });

    fluid.defaults("learning.panels.radio2", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.radio2": {
                "model.radioVal": "default",
                "controlValues.radioStrings": "enum"
            }
        },
        selectors: {
            frequencyRow: ".flc-prefsEditor-frequencyRow",
            frequencyLabel: ".flc-prefsEditor-frequency-label",
            frequencyInput: ".flc-prefsEditor-frequencyInput",
            label: ".flc-prefsEditor-contrast-label"
        },
        stringArrayIndex: {
            radioTestStrings: ["radioTestKey-yes", "radioTestKey-no", "radioTestKey-maybe", "radioTestKey-sometimes"]
        },
        repeatingSelectors: ["frequencyRow"],
        protoTree: {
            label: {messagekey: "radioTestLabelKey"},
            expander: {
                type: "fluid.renderer.selection.inputs",
                rowID: "frequencyRow",
                labelID: "frequencyLabel",
                inputID: "frequencyInput",
                selectID: "frequency-radio",
                tree: {
                    optionnames: "${{that}.stringBundle.radioTestStrings}",
                    optionlist: "${{that}.options.controlValues.radioStrings}",
                    selection: "${radioVal}"
                }
            }
        }
    });

    fluid.defaults("learning.panels.radio3", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.radio3": {
                "model.radioVal": "default",
                "controlValues.radioStrings": "enum"
            }
        },
        selectors: {
            frequencyRow: ".flc-prefsEditor-frequencyRow",
            frequencyLabel: ".flc-prefsEditor-frequency-label",
            frequencyInput: ".flc-prefsEditor-frequencyInput",
            label: ".flc-prefsEditor-contrast-label"
        },
        stringArrayIndex: {
            radioTestStrings: ["radio3-ensign", "radio3-lieutenant", "radio3-commander", "radio3-captain", "radio3-admiral"]
        },
        repeatingSelectors: ["frequencyRow"],
        protoTree: {
            label: {messagekey: "radioTestLabelKey"},
            expander: {
                type: "fluid.renderer.selection.inputs",
                rowID: "frequencyRow",
                labelID: "frequencyLabel",
                inputID: "frequencyInput",
                selectID: "frequency-radio",
                tree: {
                    optionnames: "${{that}.stringBundle.radioTestStrings}",
                    optionlist: "${{that}.options.controlValues.radioStrings}",
                    selection: "${radioVal}"
                }
            }
        }
    });

})(jQuery, fluid);
