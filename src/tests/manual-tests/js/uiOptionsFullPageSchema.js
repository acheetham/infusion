/*
Copyright 2013 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*global skon:true, fluid, jQuery*/

// JSLint options
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

var demo = demo || {};
(function ($, fluid) {

    demo.initWithSchema = function (container, compOpts, uioType, template) {
        var builder = fluid.uiOptions.builder({
            gradeNames: ["fluid.uiOptions.auxSchema.starter"],
            auxiliarySchema: {
                "template": template,
                "tableOfContents": {
                    "enactor": {
                        "tocTemplate": "../../../components/tableOfContents/html/TableOfContents.html"
                    }
                },
                "testPrefStuff": {
                    "type": "demos.testPref",
                    "enactor": {
                        "type": "demo.enactors.testPrefEnactor"
                    },
                    "panel": {
                        "type": "demo.panels.testPrefPanel",
                        "container": ".democ-testPref-panel",
                        "template": "../html/testPrefTemplate.html",
                        "message": "../messages/test.json"
                    }
                }
            },
            primarySchema: {
                "demos.testPref": {
                    "type": "string",
                    "default": "12",
                    "minimum": "8",
                    "maximum": "18",
                    "divisibleBy": "1",
                    // normally wouldn't do this for range, but we've got a dropdown, too
                    // these are the internal values, not the display strings
                    "enum": ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"]
                }
            }
        });
        var baseOpts = {
            uioType: uioType
        };
        $.extend(true, baseOpts, compOpts);
        return fluid.invokeGlobalFunction(builder.options.assembledUIOGrade, [container, baseOpts]);
    };

    demo.initFullWithPreview = function (container, options) {
        return demo.initWithSchema(container, options, "fluid.uiOptions.fullPreview", "../html/FullPreviewUIOptions.html");
    };

    demo.initFullNoPreview = function (container, options) {
        return demo.initWithSchema(container, options, "fluid.uiOptions.fullNoPreview", "%prefix/FullNoPreviewUIOptions.html");
    };


    fluid.defaults("demo.panels.testPrefPanel", {
        gradeNames: ["fluid.uiOptions.panels", "autoInit"],
        preferenceMap: {
            "demos.testPref": {
                "model.value": "default",
                "range.min": "minimum",
                "range.max": "maximum",
                "controlValues.size": "enum"
            }
        },
        strings: {
            size: {
                expander: {
                    func: "fluid.uiOptions.panels.lookupMsg",
                    args: ["{that}.options.parentBundle", "size", "{that}.options.controlValues.size"]
                }
            }
        },
        selectors: {
            sizeSlider: ".flc-uiOptions-sizeSlider",
            sizeDropdown: ".flc-uiOptions-sizeDropdown",
        },
        sliderOptions: {
            orientation: "horizontal",
            step: 1.0
        },
        produceTree: "demo.panels.testPrefPanel.produceTree"
    });
    demo.panels.testPrefPanel.produceTree = function (that) {
        var sliderOptions = $.extend(true, {}, that.options.sliderOptions, that.model, that.options.range);

        // these 'parseInts' are a workaround for the fact that the settings are strings,
        // but the slider needs integers:
        sliderOptions.min = parseInt(sliderOptions.min);
        sliderOptions.max = parseInt(sliderOptions.max);
        sliderOptions.value = parseInt(sliderOptions.value);

        sliderOptions.slide = function (event, ui) {
            that.applier.requestChange("value", ui.value.toString());
        };
        var tree = {
            sizeSlider: {
                decorators: {
                    type: "jQuery",
                    func: "slider",
                    args: [sliderOptions]
                }
            },
            sizeDropdown: {
                optionnames: "${{that}.options.strings.size}",
                optionlist: "${{that}.options.controlValues.size}",
                selection: "${value}"
            }
        };
        return tree;
    };
    demo.panels.testPrefPanel.finalInit = function (that) {
        // the framework does not yet have a declarative way to attach listeners to the modelChanged event
        that.applier.modelChanged.addListener("value", function (newModel, oldModel, request) {
            that.refreshView();
        });
    };

    fluid.defaults("demo.enactors.testPrefEnactor", {
        gradeNames: ["fluid.viewComponent", "fluid.uiOptions.enactors", "autoInit"],
        preferenceMap: {
            "demos.testPref": {
                "model.value": "default"
            }
        },
    });
    demo.enactors.testPrefEnactor.finalInit = function (that) {
        that.applier.modelChanged.addListener("value", function (newModel) {
            console.log("enactor detects new value: " + newModel.value);
        });
    };
})(jQuery, fluid);
