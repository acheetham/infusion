 /*
Copyright 2015 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

/* global fluid */

(function () {
    "use strict";

    /**
     * Auxiliary Schema
     */
    fluid.defaults("minEditor.auxSchema", {

        // the base grade for the schema
        gradeNames: ["fluid.prefs.auxSchema"],

        auxiliarySchema: {

            // the loaderGrade identifies the "base" form of preference editor desired
            loaderGrades: ["minEditor.editor", "fluid.prefs.fullNoPreview"],

            // 'terms' are strings that can be re-used elsewhere in this schema;
            terms: {
                templatePrefix: "html",
                messagePrefix: "messages"
            },

            // the main template for the preference editor itself
            template: "%templatePrefix/minEditor.html",

            heatedSeats: {
                // this 'type' must match the name of the pref in the primary schema
                type: "minEditor.heatedSeats",
                panel: {
                    // this 'type' must match the name of the panel grade created for this pref
                    type: "minEditor.panels.heatedSeats",

                    // selector indicating where, in the main template, to place this panel
                    container: ".mec-heatedSeats",

                    // the template for this panel
                    template: "%templatePrefix/heatedSeats.html",

                    message: "%messagePrefix/heatedSeats.json"
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

            temperature: {
                type: "minEditor.temp",
                panel: {
                    type: "minEditor.panels.temp",
                    container: ".mec-temperature",
                    template: "%templatePrefix/temp.html"
                }
            },
            humidity: {
                type: "minEditor.humid",
                panel: {
                    type: "minEditor.panels.humid",
                    container: ".mec-humidity",
                    template: "%templatePrefix/humid.html"
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
                climate: {
                    type: "minEditor.panels.climate",
                    container: ".mec-climate",
                    template: "%templatePrefix/climate.html",
                    panels: ["temperature", "humidity"]
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


})();
