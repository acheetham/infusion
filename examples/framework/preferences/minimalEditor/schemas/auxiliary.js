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
    fluid.defaults("awesomeCars.prefs.auxSchema", {

        // the base grade for the schema
        gradeNames: ["fluid.prefs.auxSchema"],

        auxiliarySchema: {

            // the loaderGrade identifies the "base" form of preference editor desired
            loaderGrades: ["awesomeCars.prefs.editor", "fluid.prefs.fullNoPreview"],

            // 'terms' are strings that can be re-used elsewhere in this schema;
            terms: {
                templatePrefix: "html",
                messagePrefix: "messages"
            },

            // the main template for the preference editor itself
            template: "%templatePrefix/prefsEditorTemplate.html",

            heatedSeats: {
                // this 'type' must match the name of the pref in the primary schema
                type: "awesomeCars.prefs.heatedSeats",
                panel: {
                    // this 'type' must match the name of the panel grade created for this pref
                    type: "awesomeCars.prefs.panels.heatedSeats",

                    // selector indicating where, in the main template, to place this panel
                    container: ".awec-heatedSeats",

                    // the template for this panel
                    template: "%templatePrefix/heatedSeats.html",

                    message: "%messagePrefix/heatedSeats.json"
                }
            },

            radioVolume: {
                type: "awesomeCars.prefs.radioVolume",
                panel: {
                    type: "awesomeCars.prefs.panels.radioVolume",
                    container: ".awec-radioVolume",
                    template: "%templatePrefix/radioVolume.html",
                    message: "%messagePrefix/radioVolume.json"
                }
            },

            temperature: {
                type: "awesomeCars.prefs.temp",
                panel: {
                    type: "awesomeCars.prefs.panels.temp",
                    container: ".awec-temperature",
                    template: "%templatePrefix/temp.html"
                }
            },
            humidity: {
                type: "awesomeCars.prefs.humid",
                panel: {
                    type: "awesomeCars.prefs.panels.humid",
                    container: ".awec-humidity",
                    template: "%templatePrefix/humid.html"
                }
            },
            mm: {
                type: "awesomeCars.prefs.m",
                panel: {
                    type: "awesomeCars.prefs.panels.m",
                    container: ".awec-mm",
                    template: "%templatePrefix/m.html"
                }
            },
            nn: {
                type: "awesomeCars.prefs.n",
                panel: {
                    type: "awesomeCars.prefs.panels.n",
                    container: ".awec-nn",
                    template: "%templatePrefix/n.html"
                }
            },
            groups: {
                climate: {
                    type: "awesomeCars.prefs.panels.climate",
                    container: ".awec-climate",
                    template: "%templatePrefix/climate.html",
                    panels: ["temperature", "humidity"]
                },
                mn: {
                    type: "awesomeCars.prefs.panels.mn",
                    container: ".awec-mn",
                    template: "%templatePrefix/mn.html",
                    panels: {
                        always: ["mm"],
                        "awesomeCars.prefs.m": ["nn"]
                    }
                }
            }
        }
    });


})();
