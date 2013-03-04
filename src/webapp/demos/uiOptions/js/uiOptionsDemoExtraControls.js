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

var demo = demo || {};
(function ($, fluid) {       

    /**
     * The UI Options interface is defined by several HTML templates. The component
     * needs to know where those templates are. This variable will be used by all
     * versions of the component.
     */
    var pathToTemplates = "../../../components/uiOptions/html/";
    
    /**
     * The UI Enhancer's Table of Contents uses a template. This path variable is used by all
     * three versions of the component, as well as by the UI Enhancer present in the Preview
     * itself.
     */
    var pathToTocTemplate = "../../../components/tableOfContents/html/TableOfContents.html";

    /**
     * Initialize UI Enhancer for the page. This function is used by the two full-page
     * UI Options pages as well as by the demo page itself.
     */
    demo.initPageEnhancer = function (customThemeName) {
        fluid.pageEnhancer({
            tocTemplate: pathToTocTemplate,
            classnameMap: {
                theme: {
                    "default": customThemeName
                }
            }
        });
    };

    var opts = {
        // Tell UIOptions where to find all the templates, relative to this file
        prefix: pathToTemplates,

        // Tell UIOptions where to redirect to if the user cancels the operation
        uiOptions: {
            options: {
                listeners: {
                    onCancel: function () {
                        window.location = "uiOptions.html";
                    }
                }
            }
        },

        distributeOptions: [{
            target: "{that > templateLoader}.options.templates",
            record: {
                uiOptions: "FullExtraControlsTemplate.html",
                controlRenderingSample: "UIOptionsTemplate-controlRenderingSample.html",
                extraControls: "UIOptionsTemplate-extraControls.html"
            }
        }, {
            target: "{that > uiOptionsLoader > uiOptions}",
            record: {
                selectors: {
                    controlRenderingSample: ".flc-uiOptions-controlRenderingSample",
                    extraControls: ".flc-uiOptions-extra-controls"
                },
                components: {
                    controlRenderingSample: {
                        type: "fluid.uiOptions.controlRenderingSample",
                        container: "{uiOptions}.dom.controlRenderingSample",
                        createOnEvent: "onUIOptionsMarkupReady",
                        options: {
                            resources: {
                                template: "{templateLoader}.resources.controlRenderingSample"
                            }

                        }
                    },
                    extraControls: {
                        type: "fluid.uiOptions.extraControls",
                        container: "{uiOptions}.dom.extraControls",
                        createOnEvent: "onUIOptionsMarkupReady",
                        options: {
                            resources: {
                                template: "{templateLoader}.resources.extraControls"
                            }
                        }
                    }
                }
            }
        }]
    };

    /**
     * Initialize UI Options on the "Full Page, No Preview, with extra Controls" version.
     */
    demo.initFullExtraControls = function (container, options) {
        fluid.uiOptions.fullNoPreview(container, $.extend(true, {}, opts, options));
    };
    
    /***************************************************
     * Grade to be used for any 'extra controls' panel *
     ***************************************************/
    fluid.defaults("fluid.uiOptions.controlsPanel", {
        gradeNames: ["fluid.uiOptions.ant"],
        model: "{uiOptions}.model",
        applier: "{uiOptions}.applier",
        events: {
            onUIOptionsRefresh: "{uiOptions}.events.onUIOptionsRefresh"
        }
    });

    /***************************************
     * UI Options Control Rendering Sample *
     ***************************************/
    /**
     * A sub-component of fluid.uiOptions that renders a sampling of controls.
     */
    fluid.defaults("fluid.uiOptions.controlRenderingSample", {
        gradeNames: ["fluid.uiOptions.controlsPanel", "autoInit"],
        strings: {
            sampleDropdown: ["English", "French"],
            sampleRadioButtons: ["Option 1", "Option 2", "Option 3"]
        },
        controlValues: {
            sampleDropdown: ["en", "fr"] ,
            sampleRadioButtons: ["opt1", "opt2", "opt3"]
        },
        sampleSlider: {
            min: 0,
            max: 100,
            sliderOptions: {
                orientation: "horizontal",
                step: 10
            }
        },
        selectors: {
            sampleSlider: ".flc-uiOptions-sampleSlider",
            sampleCheckbox: ".flc-uiOptions-sampleCheckbox",
            sampleDropdown: ".flc-uiOptions-sampleDropdown",
            radioRow: ".flc-uiOptions-sampleRadioButtons-radio",
            radioButton: ".flc-uiOptions-sampleRadioButtons-radioButton",
            radioLabel: ".flc-uiOptions-sampleRadioButtons-radioLabel"
        },
        repeatingSelectors: ["radioRow"],
        defaultModel: {
            sampleCheckbox: false,             // boolean
            sampleDropdown: "en",               // ISO 639-1 language code
            sampleSlider: 50,                    // number between 0 and 100
            sampleRadioButtons: "opt2"
        },
        produceTree: "fluid.uiOptions.controlRenderingSample.produceTree",
        resources: {
            template: "{templateLoader}.resources.controlRenderingSample"
        }
    });

    fluid.uiOptions.controlRenderingSample.produceTree = function (that) {
        var tree = {};
        for (var item in that.model.selections) {
            if (item === "sampleCheckbox") {
                tree[item] = "${selections." + item + "}";

            } else if (item === "sampleDropdown") {
                tree[item] = {
                    optionnames: "${labelMap." + item + ".names}",
                    optionlist: "${labelMap." + item + ".values}",
                    selection: "${selections." + item + "}"
                };

            } else if (item === "sampleSlider") {
                tree[item] = fluid.uiOptions.createSliderNode(that, item, "fluid.textfieldSlider.slider");

            } else if (item === "sampleRadioButtons") {
                tree.expander = {
                    type: "fluid.renderer.selection.inputs",
                    selectID: "sampleRadioButtons",
                    rowID: "radioRow",
                    labelID: "radioLabel",
                    inputID: "radioButton",
                    tree: {
                        optionnames: "${labelMap." + item + ".names}",
                        optionlist: "${labelMap." + item + ".values}",
                        selection: "${selections." + item + "}"
                    }
                };
            }
        }

        return tree;
    };

    /*************************************
     * UI Options Control Extra Controls *
     *************************************/
    /**
     * A sub-component of fluid.uiOptions that renders extra controls.
     */
    fluid.defaults("fluid.uiOptions.extraControls", {
        gradeNames: ["fluid.uiOptions.controlsPanel", "autoInit"],
        strings: {
            onscreenKeyboard: ["Show Onscreen Keyboard", "Hide Onscreen Keyboard"]
        },
        controlValues: {
            onscreenKeyboard: ["show", "hide"]
        },
        selectors: {
            oskRow: ".flc-uiOptions-onscreenKeyboard-radio",
            oskButton: ".flc-uiOptions-onscreenKeyboard-radioButton",
            oskLabel: ".flc-uiOptions-onscreenKeyboard-radioLabel"
        },
        repeatingSelectors: ["oskRow"],
        defaultModel: {
            onscreenKeyboard: "show"
        },
        produceTree: "fluid.uiOptions.extraControls.produceTree",
        resources: {
            template: "{templateLoader}.resources.extraControls"
        }
    });

    fluid.uiOptions.extraControls.produceTree = function (that) {
        var tree = {};
        for (var item in that.model.selections) {
            if (item === "onscreenKeyboard") {
                tree.expander = {
                    type: "fluid.renderer.selection.inputs",
                    selectID: "onscreenKeyboard",
                    rowID: "oskRow",
                    labelID: "oskLabel",
                    inputID: "oskButton",
                    tree: {
                        optionnames: "${labelMap." + item + ".names}",
                        optionlist: "${labelMap." + item + ".values}",
                        selection: "${selections." + item + "}"
                    }
                };
            }
        }

        return tree;
    };

})(jQuery, fluid);
