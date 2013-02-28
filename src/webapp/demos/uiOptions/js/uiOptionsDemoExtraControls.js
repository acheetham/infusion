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
                extraControls: "UIOptionsTemplate-extraControls.html"
            }
        },{
            target: "{that > uiOptionsLoader > uiOptions}",
            record: {
                selectors: {
                    extraControls: ".flc-uiOptions-extra-controls" 
                },
                components: {
                    extraControls: {
                        type: "fluid.uiOptions.extraControls",
                        container: "{uiOptions}.dom.extraControls",
                        createOnEvent: "onUIOptionsMarkupReady",
                        options: {
                            model: "{uiOptions}.model",
                            applier: "{uiOptions}.applier",
                            rendererOptions: "{uiOptions}.options.rendererOptions",
                            events: {
                                onUIOptionsRefresh: "{uiOptions}.events.onUIOptionsRefresh"
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
    
    /**********************************************
     * UI Options Media Controls Panel Components *
     **********************************************/
    /**
     * A sub-component of fluid.uiOptions that renders the "media" panel of the user preferences interface.
     */
    fluid.defaults("fluid.uiOptions.extraControls", {
        gradeNames: ["fluid.uiOptions.ant", "autoInit"], 
        strings: {
            language: ["English", "French"]
        },
        controlValues: {
            language: ["en", "fr"] 
        },
        volume: {
            min: 0,
            max: 100,
            sliderOptions: {
                orientation: "horizontal",
                step: 10
            }
        },
        selectors: {
            volume: ".flc-uiOptions-volume",
            captions: ".flc-uiOptions-captions",
            transcripts: ".flc-uiOptions-transcripts",
            language: ".flc-uiOptions-language"
        },
        defaultModel: {
            captions: false,             // boolean
            transcripts: false,          // boolean
            language: "en",               // ISO 639-1 language code
            volume: 50                    // number between 0 and 100
        },
        produceTree: "fluid.uiOptions.extraControls.produceTree",
        resources: {
            template: "{templateLoader}.resources.extraControls"
        }
    });

    fluid.uiOptions.extraControls.produceTree = function (that) {
        var tree = {};
        for (var item in that.model.selections) {
            if (item === "captions" || item === "transcripts") {
                tree[item] = "${selections." + item + "}";
            } else if (item === "language") {
                tree[item] = {
                    optionnames: "${labelMap." + item + ".names}",
                    optionlist: "${labelMap." + item + ".values}",
                    selection: "${selections.language}"
                };
            } else if (item === "volume") {
                tree[item] = fluid.uiOptions.createSliderNode(that, item, "fluid.textfieldSlider.slider");
            }
        }

        return tree;
    };

})(jQuery, fluid);
