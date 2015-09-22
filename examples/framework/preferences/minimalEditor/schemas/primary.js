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

})();
