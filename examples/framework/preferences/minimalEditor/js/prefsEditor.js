/*
Copyright 2015 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one of these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

/* global fluid, awesomeCars */

(function () {
    "use strict";

    /**
     * Panel for the heated seats preference
     */
    fluid.defaults("awesomeCars.prefs.panels.heatedSeats", {
        gradeNames: ["fluid.prefs.panel"],

        // the Preference Map maps the information in the primary schema to this panel
        preferenceMap: {
            // the key must match the name of the pref in the primary schema
            "awesomeCars.prefs.heatedSeats": {
                // this key is the path into the panel's model where this preference is stored
                "model.heatedSeats": "default"
            }
        },

        // selectors identify elements in the DOM that need to be accessed by the code;
        // in this case, the Renderer will render data into these particular elements
        selectors: {
            heatedSeats: ".awec-heatedSeats",
            headerEl: ".awec-heatedSeats-header",
            labelEl: ".awec-heatedSeats-label"
        },

        // the ProtoTree is basically instructions to the Renderer
        // the keys in the prototree match the selectors above
        protoTree: {
            // this value is a reference to the last part of the model path in the preferenceMap
            heatedSeats: "${heatedSeats}",
            headerEl: {messagekey: "header"},
            labelEl: {messagekey: "label"}
        }
    });

    /**
     * Panel for the radio volume preference
     */
    fluid.defaults("awesomeCars.prefs.panels.radioVolume", {
        gradeNames: ["fluid.prefs.panel"],

        preferenceMap: {
            "awesomeCars.prefs.radioVolume": {
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
            radioVolume: ".awec-radioVolume",
            header: ".awec-radioVoluawe-header",
            label: ".awec-radioVoluawe-label"
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


    fluid.defaults("awesomeCars.prefs.panels.temp", {
        gradeNames: ["fluid.prefs.panel"],
        preferenceMap: {
            "awesomeCars.prefs.temp": {
                "model.temp": "default"
            }
        },
        selectors: {
            temp: ".awec-temp"
        },
        protoTree: {
            temp: {
                value: "${temp}",
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
    fluid.defaults("awesomeCars.prefs.panels.humid", {
        gradeNames: ["fluid.prefs.panel"],
        preferenceMap: {
            "awesomeCars.prefs.humid": {
                "model.humid": "default"
            }
        },
        selectors: {
            humid: ".awec-humid"
        },
        protoTree: {
            humid: {
                value: "${humid}",
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
    fluid.defaults("awesomeCars.prefs.panels.climate", {
        gradeNames: ["fluid.prefs.compositePanel"]
    });

    fluid.defaults("awesomeCars.prefs.panels.m", {
        gradeNames: ["fluid.prefs.panel"],
        preferenceMap: {
            "awesomeCars.prefs.m": {
                "model.m": "default"
            }
        },
        selectors: {
            m: ".awec-m"
        },
        protoTree: {
            m: "${m}"
        }
    });
    fluid.defaults("awesomeCars.prefs.panels.n", {
        gradeNames: ["fluid.prefs.panel"],

        preferenceMap: {
            "awesomeCars.prefs.n": {
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
            n: ".awec-n"
        },

        protoTree: {
            n: {
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
    fluid.defaults("awesomeCars.prefs.panels.mn", {
        gradeNames: ["fluid.prefs.compositePanel"]
    });

    fluid.defaults("awesomeCars.prefs.editor", {
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
    awesomeCars.prefs.init = function (container) {
        return fluid.prefs.create(container, {
            build: {
                gradeNames: ["awesomeCars.prefs.auxSchema"]
            }
        });
    };

})();
