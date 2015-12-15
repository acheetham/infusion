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
            heatedSeats: ".awec-heatedSeats"
        },

        // the ProtoTree is basically instructions to the Renderer
        // the keys in the prototree match the selectors above
        protoTree: {
            // this value is a reference to the last part of the model path in the preferenceMap
            heatedSeats: "${heatedSeats}"
        }
    });

    fluid.defaults("awesomeCars.prefs.settingsStore", {
        gradeNames: ["fluid.prefs.store"],
        invokers: {
            get: {
                funcName: "awesomeCars.prefs.settingsStore.get",
                args: "{that}.model"
            },
            set: {
                funcName: "awesomeCars.prefs.settingsStore.set",
                args: ["{arguments}.0", "{that}.applier"]
            }
        }
    });

    awesomeCars.prefs.settingsStore.get = function () {
        console.log("getting");
    };
    awesomeCars.prefs.settingsStore.set = function () {
        console.log("setting");
    };

    fluid.defaults("awesomeCars.prefs.store", {
        gradeNames: ["fluid.prefs.globalSettingsStore"],
        components: {
            settingsStore: {
                type: "awesomeCars.prefs.settingsStore"
            }
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
            },
            prefsEditor: {
                storeType: "awesomeCars.prefs.store"
            }
        });
    };

})();
