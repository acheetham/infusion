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
     * Primary Schema
     * This schema defines the preference(s) edited by this preferences editor:
     * their names, types, default values, etc.
     */
    fluid.defaults("awesomeCars.prefs.schemas.heatedSeats", {

        // the base grade for the schema;
        // using this grade tells the framework that this is a primary schema
        gradeNames: ["fluid.prefs.schemas"],

        schema: {
            // the actual specification of the preference
            "awesomeCars.prefs.heatedSeats": {
                "type": "boolean",
                "default": false
            },
            "awesomeCars.prefs.radioVolume": {
                "type": "number",
                "default": "2", // these are strings because the renderer doesn't like numbers – why?
                "minimum": "1",
                "maximum": "5",
                "divisibleBy": "0.5"
            },
            "awesomeCars.prefs.temp": {
                "type": "number",
                "default": "22",
                "minimum": "15",
                "maximum": "28",
                "divisibleBy": "0.5"
            },
            "awesomeCars.prefs.humid": {
                "type": "number",
                "default": "55",
                "minimum": "35",
                "maximum": "70",
                "divisibleBy": "5"
            },
            "awesomeCars.prefs.m": {
                "type": "boolean",
                "default": false
            },
            "awesomeCars.prefs.n": {
                "type": "number",
                "default": "0.5",
                "minimum": "0",
                "maximum": "1",
                "divisibleBy": "0.1"
            }
        }
    });

})();
