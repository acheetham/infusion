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
        "learning.speakText": {
            "type": "boolean",
            "default": false
        },
        "learning.volume": {
            "type": "number",
            "default": 60,
            "minimum": 0,
            "maximum": 100,
            "divisibleBy": 5
        },
        "learning.wordsPerMinute": {
            "type": "number",
            "default": 60,
            "minimum": 130,
            "maximum": 250,
            "divisibleBy": 10
        },
        "learning.increaseSize": {
            "type": "boolean",
            "default": false
        },
        "learning.cursorSize": {
            "type": "number",
            "default": 2,
            "minimum": 1,
            "maximum": 5,
            "divisibleBy": 1
        },
        "learning.magnification": {
            "type": "number",
            "default": 100,
            "minimum": 100,
            "maximum": 400,
            "divisibleBy": 10
        },
        "learning.magnifierPosition": {
            "type": "string",
            "default": "left",
            "enum": ["centre", "left", "right", "top", "bottom"]
        }
    };

    /**
     * Auxiliary Schema
     */
    fluid.defaults("learning.auxSchema.learning", {
        gradeNames: ["fluid.prefs.auxSchema", "autoInit"],
        auxiliarySchema: {
            template: "%prefix/conditionalPrefsEditor.html",
            message: "%prefix/conditionalPrefsEditor.json",
            groups: {
                speaking: {
                    "container": ".mpe-speaking",
                    "template": "%prefix/speaking.html",
                    "message": "%prefix/speaking.json",
                    "type": "learning.panels.speaking",
                    "panels": {
                        "always": ["speak"],
                        "learning.speakText": ["vol", "wpm"]
                    }
                },
                increasing: {
                    "container": ".mpe-increasing",
                    "template": "%prefix/increasing.html",
                    "message": "%prefix/increasing.json",
                    "type": "learning.panels.increasing",
                    "panels": {
                        "always": ["incSize"],
                        "learning.increaseSize": ["cursor", "magFactor", "magPos"]
                    }
/*
                },
                speakIncrease: {
                    "container": ".mpe-speakIncrease",
                    "template": "%prefix/speakIncrease.html",
                    "message": "%prefix/speakIncrease.json",
                    "type": "learning.panels.speakIncrease",
                    "panels": {
                        "always": ["speak", "incSize"],
                        "learning.speakText": ["vol", "wpm"],
                        "learning.increaseSize": ["cursor", "magFactor", "magPos"]
                    }
*/
                }
                // to try: more than one "always", with different dependencies for both, e.g. combine these two into a single panel?
                // also to try: the 'old' format for panels i.e. just an array of panel names, if there are no conditional panels relevant
            },
            speak: {
                type: "learning.speakText",
                enactor: {
                    type: "learning.enactors.speak"
                },
                panel: {
                    type: "learning.panels.speak",
                    container: ".mpe-speaking-onOff",
                    template: "%prefix/speak-template.html"
                }
            },
            vol: {
                type: "learning.volume",
                enactor: {
                    type: "learning.enactors.vol"
                },
                panel: {
                    type: "learning.panels.vol",
                    container: ".mpe-speaking-vol",
                    template: "%prefix/slide-template.html"
                }
            },
            wpm: {
                type: "learning.wordsPerMinute",
                enactor: {
                    type: "learning.enactors.wpm"
                },
                panel: {
                    type: "learning.panels.wpm",
                    container: ".mpe-speaking-wpm",
                    template: "%prefix/slide-template.html"
                }
            },
            incSize: {
                type: "learning.increaseSize",
                enactor: {
                    type: "learning.enactors.incSize"
                },
                panel: {
                    type: "learning.panels.incSize",
                    container: ".mpe-increasing-onOff",
                    template: "%prefix/incSize-template.html"
                }
            },
            cursor: {
                type: "learning.cursorSize",
                enactor: {
                    type: "learning.enactors.cursor"
                },
                panel: {
                    type: "learning.panels.cursor",
                    container: ".mpe-increasing-cursor",
                    template: "%prefix/slide-template.html"
                }
            },
            magFactor: {
                type: "learning.magnification",
                enactor: {
                    type: "learning.enactors.magFactor"
                },
                panel: {
                    type: "learning.panels.magFactor",
                    container: ".mpe-increasing-magFactor",
                    template: "%prefix/slide-template.html"
                }
            },
            magPos: {
                type: "learning.magnifierPosition",
                enactor: {
                    type: "learning.enactors.magPos"
                },
                panel: {
                    type: "learning.panels.magPos",
                    container: ".mpe-increasing-magPos",
                    template: "%prefix/radioButton-template.html"
                }
            }
        }
    });            

    /**
     * Composite Panels
     */
    fluid.defaults("learning.panels.speaking", {
        gradeNames: ["fluid.prefs.compositePanel", "autoInit"],
        selectors: {
            label: ".mpe-speaking-header"
        },
        protoTree: {
            label: {messagekey: "speakingHeader"}
        }
    });
    fluid.defaults("learning.panels.increasing", {
        gradeNames: ["fluid.prefs.compositePanel", "autoInit"],
        selectors: {
            label: ".mpe-increasing-header"
        },
        protoTree: {
            label: {messagekey: "increasingHeader"}
        }
    });
/*
    fluid.defaults("learning.panels.speakIncrease", {
        gradeNames: ["fluid.prefs.compositePanel", "autoInit"],
        selectors: {
            label: ".mpe-speakIncrease-header"
        },
        protoTree: {
            label: {messagekey: "speakIncreaseHeader"}
        }
    });
*/

    /**
     * Subpanels
     */
    fluid.defaults("learning.panels.speak", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.speakText": {
                "model.speakText": "default"
            }
        },
        selectors: {
            bool: ".mpe-speakText",
            choiceLabel: ".mpe-speakText-choice-label"
        },
        protoTree: {
            choiceLabel: {messagekey: "speakText"},
            bool: "${speakText}"
        }
    });
    fluid.defaults("learning.panels.incSize", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.increaseSize": {
                "model.incSize": "default"
            }
        },
        selectors: {
            bool: ".mpe-incSize",
            label: ".mpe-incSize-label",
            choiceLabel: ".mpe-incSize-choice-label"
        },
        protoTree: {
            choiceLabel: {messagekey: "incSize"},
            bool: "${incSize}"
        }
    });

    fluid.defaults("learning.panels.vol", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.volume": {
                // because of FLUID-5190, this must be "value" (for textfieldSlider only)
                "model.value": "default",
                "range.min": "minimum",
                "range.max": "maximum"
            }
        },
        selectors: {
            vol: ".mpe-slider",
            multiplier: ".mpe-slider-multiplier"
        },
        protoTree: {
            label: {messagekey: "volLabel"},
            multiplier: {messagekey: "volMultiplier"},
            vol: {
                decorators: {
                    type: "fluid",
                    func: "fluid.textfieldSlider",
                    options: {
                        rules: {
                            "value": "value"
                        },
                        model: {
                            value: "{learning.panels.vol}.model.value"
                        },
                        sourceApplier: "{learning.panels.vol}.applier",
                        range: "{learning.panels.vol}.options.range",
                        sliderOptions: "{learning.panels.vol}.options.sliderOptions"
                    }
                }
            }
        }
    });
    fluid.defaults("learning.panels.wpm", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.wordsPerMinute": {
                // because of FLUID-5190, this must be "value" (for textfieldSlider only)
                "model.value": "default",
                "range.min": "minimum",
                "range.max": "maximum"
            }
        },
        selectors: {
            wpm: ".mpe-slider",
            multiplier: ".mpe-slider-multiplier"
        },
        protoTree: {
            label: {messagekey: "wpmLabel"},
            multiplier: {messagekey: "wpmMultiplier"},
            wpm: {
                decorators: {
                    type: "fluid",
                    func: "fluid.textfieldSlider",
                    options: {
                        rules: {
                            "value": "value"
                        },
                        model: {
                            value: "{learning.panels.wpm}.model.value"
                        },
                        sourceApplier: "{learning.panels.wpm}.applier",
                        range: "{learning.panels.wpm}.options.range",
                        sliderOptions: "{learning.panels.wpm}.options.sliderOptions"
                    }
                }
            }
        }
    });
    fluid.defaults("learning.panels.cursor", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.cursorSize": {
                // because of FLUID-5190, this must be "value" (for textfieldSlider only)
                "model.value": "default",
                "range.min": "minimum",
                "range.max": "maximum"
            }
        },
        selectors: {
            cursor: ".mpe-slider",
            multiplier: ".mpe-slider-multiplier"
        },
        protoTree: {
            multiplier: {messagekey: "cursorMultiplier"},
            cursor: {
                decorators: {
                    type: "fluid",
                    func: "fluid.textfieldSlider",
                    options: {
                        rules: {
                            "value": "value"
                        },
                        model: {
                            value: "{learning.panels.cursor}.model.value"
                        },
                        sourceApplier: "{learning.panels.cursor}.applier",
                        range: "{learning.panels.cursor}.options.range",
                        sliderOptions: "{learning.panels.cursor}.options.sliderOptions"
                    }
                }
            }
        }
    });
    fluid.defaults("learning.panels.magFactor", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.magnification": {
                // because of FLUID-5190, this must be "value" (for textfieldSlider only)
                "model.value": "default",
                "range.min": "minimum",
                "range.max": "maximum"
            }
        },
        selectors: {
            magFactor: ".mpe-slider",
            multiplier: ".mpe-slider-multiplier"
        },
        protoTree: {
            multiplier: {messagekey: "magFactorMultiplier"},
            magFactor: {
                decorators: {
                    type: "fluid",
                    func: "fluid.textfieldSlider",
                    options: {
                        rules: {
                            "value": "value"
                        },
                        model: {
                            value: "{learning.panels.magFactor}.model.value"
                        },
                        sourceApplier: "{learning.panels.magFactor}.applier",
                        range: "{learning.panels.magFactor}.options.range",
                        sliderOptions: "{learning.panels.magFactor}.options.sliderOptions"
                    }
                }
            }
        }
    });
    fluid.defaults("learning.panels.magPos", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "learning.magnifierPosition": {
                "model.magPos": "default",
                "controlValues.magPos": "enum"
            }
        },
        selectors: {
            magPosRow: ".mpe-radioRow",
            magPosLabel: ".mpe-radioLabel",
            magPosInput: ".mpe-radioInput"
        },
        stringArrayIndex: {
            magPos: ["magPos-centre", "magPos-left", "magPos-right", "magPos-top", "magPos-bottom"]
        },
        repeatingSelectors: ["magPosRow"],
        protoTree: {
            expander: {
                type: "fluid.renderer.selection.inputs",
                rowID: "magPosRow",
                labelID: "magPosLabel",
                inputID: "magPosInput",
                selectID: "magnifierPosition",
                tree: {
                    optionnames: "${{that}.stringBundle.magPos}",
                    optionlist: "${{that}.options.controlValues.magPos}",
                    selection: "${magPos}"
                }
            }
        }
    });

    /**
     * Enactors
     */
    fluid.defaults("learning.enactors.speak", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.speakText": {
                "model.speak": "default"
            }
        },
        modelListeners: {
            "speak": {
                funcName: "learning.enactors.logModelValue",
                args: ["speak", "{change}.value"]
            }
        }
    });
    fluid.defaults("learning.enactors.incSize", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.increaseSize": {
                "model.incSize": "default"
            }
        },
        modelListeners: {
            "incSize": {
                funcName: "learning.enactors.logModelValue",
                args: ["incSize", "{change}.value"]
            }
        }
    });
    fluid.defaults("learning.enactors.vol", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.volume": {
                // because of FLUID-5190, this must be "value" (for textfieldSlider only)
                "model.value": "default"
            }
        },
        modelListeners: {
            "value": {
                funcName: "learning.enactors.logModelValue",
                args: ["vol", "{change}.value"]
            }
        }
    });
    fluid.defaults("learning.enactors.wpm", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.wordsPerMinute": {
                // because of FLUID-5190, this must be "value" (for textfieldSlider only)
                "model.value": "default"
            }
        },
        modelListeners: {
            "value": {
                funcName: "learning.enactors.logModelValue",
                args: ["wpm", "{change}.value"]
            }
        }
    });
    fluid.defaults("learning.enactors.cursor", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.cursorSize": {
                // because of FLUID-5190, this must be "value" (for textfieldSlider only)
                "model.value": "default"
            }
        },
        modelListeners: {
            "value": {
                funcName: "learning.enactors.logModelValue",
                args: ["cursor", "{change}.value"]
            }
        }
    });
    fluid.defaults("learning.enactors.magFactor", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.magnification": {
                // because of FLUID-5190, this must be "value" (for textfieldSlider only)
                "model.value": "default"
            }
        },
        modelListeners: {
            "value": {
                funcName: "learning.enactors.logModelValue",
                args: ["magFactor", "{change}.value"]
            }
        }
    });
    fluid.defaults("learning.enactors.magPos", {
        gradeNames: ["fluid.prefs.enactor", "autoInit"],
        preferenceMap: {
            "learning.magnifierPosition": {
                "model.magPos": "default"
            }
        },
        modelListeners: {
            "magPos": {
                funcName: "learning.enactors.logModelValue",
                args: ["magPos", "{change}.value"]
            }
        }
    });

    learning.enactors.logModelValue = function (name, changeVal) {
        console.log(name + " model changed to: " + changeVal);
    };

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
