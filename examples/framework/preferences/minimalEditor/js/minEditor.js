/*
Copyright 2015 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

/* global fluid */

var minEditor = minEditor || {};

(function () {
    "use strict";

    /**
     * Primary Schema
     * This schema defines the preference(s) edited by this preferences editor:
     * their names, types, default values, etc.
     */
    fluid.defaults("minEditor.primarySchema", {

        // the base grade for the schema;
        // using this grade tells the framework that this is a primary schema
        gradeNames: ["fluid.prefs.schemas"],

        schema: {
            // the actual specification of the preference
            "minEditor.autoPilot": {
                "type": "boolean",
                "default": false
            },
            "minEditor.radioVolume": {
                "type": "number",
                "default": "2", // these are strings because the renderer doesn't like numbers – why?
                "minimum": "1",
                "maximum": "5",
                "divisibleBy": "0.5"
            },
            "minEditor.x": {
                "type": "boolean",
                "default": false
            },
            "minEditor.y": {
                "type": "boolean",
                "default": true
            },
            "minEditor.m": {
                "type": "boolean",
                "default": false
            },
            "minEditor.n": {
                "type": "number",
                "default": "0.5",
                "minimum": "0",
                "maximum": "1",
                "divisibleBy": "0.1"
            }
        }
    });

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
            // this value is an IoC reference to the last part of the model path in the preferenceMap
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

    /**
     * Auxiliary Schema
     */
    fluid.defaults("minEditor.auxSchema", {

        // the base grade for the schema
        gradeNames: ["fluid.prefs.auxSchema"],

        auxiliarySchema: {

            // the loaderGrade identifies the "base" form of preference editor desired
            loaderGrades: ["fluid.prefs.fullNoPreview"],

            // 'terms' are strings that can be re-used elsewhere in this schema;
            terms: {
                templatePrefix: "html",
                messagePrefix: "messages"
            },

            // the main template for the preference editor itself
            template: "%templatePrefix/minEditor.html",

            autoPilot: {
                // this 'type' must match the name of the pref in the primary schema
                type: "minEditor.autoPilot",
                panel: {
                    // this 'type' must match the name of the panel grade created for this pref
                    type: "minEditor.panels.autoPilot",

                    // selector indicating where, in the main template, to place this panel
                    container: ".mec-autoPilot",

                    // the template for this panel
                    template: "%templatePrefix/autoPilot.html",

                    message: "%messagePrefix/autoPilot.json"
                }
            },

            radioVolume: {
                type: "minEditor.radioVolume",
                panel: {
                    type: "minEditor.panels.radioVolume",
                    container: ".mec-radioVolume",
                    template: "%templatePrefix/radioVolume.html",
                    message: "%messagePrefix/radioVolume.json"
                }
            },

            xx: {
                type: "minEditor.x",
                panel: {
                    type: "minEditor.panels.x",
                    container: ".mec-xx",
                    template: "%templatePrefix/x.html"
                }
            },
            yy: {
                type: "minEditor.y",
                panel: {
                    type: "minEditor.panels.y",
                    container: ".mec-yy",
                    template: "%templatePrefix/y.html"
                }
            },
            mm: {
                type: "minEditor.m",
                panel: {
                    type: "minEditor.panels.m",
                    container: ".mec-mm",
                    template: "%templatePrefix/m.html"
                }
            },
            nn: {
                type: "minEditor.n",
                panel: {
                    type: "minEditor.panels.n",
                    container: ".mec-nn",
                    template: "%templatePrefix/n.html"
                }
            },
            groups: {
                xy: {
                    type: "minEditor.panels.xy",
                    container: ".mec-xy",
                    template: "%templatePrefix/xy.html",
                    panels: ["xx", "yy"]
                },
                mn: {
                    type: "minEditor.panels.mn",
                    container: ".mec-mn",
                    template: "%templatePrefix/mn.html",
                    panels: {
                        always: ["mm"],
                        "minEditor.m": ["nn"]
                    }
                }
            }
        }
    });

    /**
     * Initialize and instantiate the editor
     */
    minEditor.init = function (container) {
        return fluid.prefs.create(container, {
            build: {
                gradeNames: ["minEditor.auxSchema"]
            }
        });
    };

})();
