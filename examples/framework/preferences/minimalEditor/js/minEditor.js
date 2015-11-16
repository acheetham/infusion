/*
Copyright 2015 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one of these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

/* global fluid */

(function () {
    "use strict";

    /**
     * Panel for the auto-pilot preference
     */
    fluid.defaults("minEditor.panels.autoPilot", {
        gradeNames: ["fluid.prefs.panel"],

        // the Preference Map maps the information in the primary schema to this panel
        preferenceMap: {
            // the key must match the name of the pref in the primary schema
            "minEditor.autoPilot": {
                // this key is the path into the panel's model where this preference is stored
                "model.autoPilot": "default"
            }
        },

        // selectors identify elements in the DOM that need to be accessed by the code;
        // in this case, the Renderer will render data into these particular elements
        selectors: {
            autoPilot: ".mec-autoPilot",
            headerEl: ".mec-autoPilot-header",
            labelEl: ".mec-autoPilot-label"
        },

        // the ProtoTree is basically instructions to the Renderer
        // the keys in the prototree match the selectors above
        protoTree: {
            // this value is a reference to the last part of the model path in the preferenceMap
            autoPilot: "${autoPilot}",
            headerEl: {messagekey: "header"},
            labelEl: {messagekey: "label"}
        }
    });

    /**
     * Panel for the radio volume preference
     */
    fluid.defaults("minEditor.panels.radioVolume", {
        gradeNames: ["fluid.prefs.panel"],

        preferenceMap: {
            "minEditor.radioVolume": {
                "model.radioVolume": "default",
                "range.min": "minimum",
                "range.max": "maximum",
                "range.step": "divisibleBy"
            }
        },

/*
technically, the panel will function without this definition;
the framework will create the property based on the preferenceMap.
Our starter panels include it, though. Do we really need it? What's the 'best practice'?
        range: {
            min: 1, // see comment in primary schema about strings vs numbers
            max: 10,
            step: 1
        },
*/
        selectors: {
            radioVolume: ".mec-radioVolume",
            header: ".mec-radioVolume-header",
            label: ".mec-radioVolume-label"
        },

        protoTree: {
            radioVolume: {
                value: "${radioVolume}",
                decorators: [{
                    type: "attrs",
                    attributes: {
                        min: "{that}.options.range.min",
                        max: "{that}.options.range.max",
                        step: "{that}.options.range.step"
                    }
                }]
            },
            header: {messagekey: "header"},
            label: {messagekey: "label"}
        }
    });


    fluid.defaults("minEditor.panels.x", {
        gradeNames: ["fluid.prefs.panel"],
        preferenceMap: {
            "minEditor.x": {
                "model.x": "default"
            }
        },
        selectors: {
            autoPilot: ".mec-x"
        },
        protoTree: {
            autoPilot: "${x}"
        }
    });
    fluid.defaults("minEditor.panels.y", {
        gradeNames: ["fluid.prefs.panel"],
        preferenceMap: {
            "minEditor.y": {
                "model.y": "default"
            }
        },
        selectors: {
            autoPilot: ".mec-y"
        },
        protoTree: {
            autoPilot: "${y}"
        }
    });
    fluid.defaults("minEditor.panels.xy", {
        gradeNames: ["fluid.prefs.compositePanel"]
    });

    fluid.defaults("minEditor.panels.m", {
        gradeNames: ["fluid.prefs.panel"],
        preferenceMap: {
            "minEditor.m": {
                "model.m": "default"
            }
        },
        selectors: {
            autoPilot: ".mec-m"
        },
        protoTree: {
            autoPilot: "${m}"
        }
    });
    fluid.defaults("minEditor.panels.n", {
        gradeNames: ["fluid.prefs.panel"],

        preferenceMap: {
            "minEditor.n": {
                "model.n": "default",
                "range.min": "minimum",
                "range.max": "maximum",
                "range.step": "divisibleBy"
            }
        },
        range: {
            min: 1, // see comment in primary schema about strings vs numbers
            max: 10,
            step: 1
        },
        selectors: {
            radioVolume: ".mec-n"
        },

        protoTree: {
            radioVolume: {
                value: "${n}",
                decorators: [{
                    type: "attrs",
                    attributes: {
                        min: "{that}.options.range.min",
                        max: "{that}.options.range.max",
                        step: "{that}.options.range.step"
                    }
                }]
            }
        }
    });
    fluid.defaults("minEditor.panels.mn", {
        gradeNames: ["fluid.prefs.compositePanel"]
    });

    fluid.defaults("minEditor.editor", {
        gradeNames: ["fluid.rendererComponent"],
        messageLoader: {
            locale: "sp",
            defaultLocale: "fr"
        }
    });

    /**
     * Initialize and instantiate the editor
     * TODO: Update this when https://issues.fluidproject.org/browse/FLUID-5817 is addressed
     */
    minEditor.init = function (container) {
        return fluid.prefs.create(container, {
            build: {
                gradeNames: ["minEditor.auxSchema"]
            }
        });
    };

})();
