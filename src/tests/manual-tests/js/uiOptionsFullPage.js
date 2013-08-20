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
    /**
     * The UI Options interface is defined by several HTML templates. The component
     * needs to know where those templates are. This variable will be used by all
     * versions of the component.
     */
    var pathToTemplates = "../../../components/uiOptions/html/";

    /**
     * The strings used on UI Options interface is defined by several JSON files. The component
     * needs to know where those files are. This variable will be used by all versions of the
     * component.
     */
    var pathToMessages = "../../../components/uiOptions/messages/";

    /**
     * The UI Enhancer's Table of Contents uses a template. This path variable is used by all
     * three versions of the component, as well as by the UI Enhancer present in the Preview
     * itself.
     */
    var pathToTocTemplate = "../../../components/tableOfContents/html/TableOfContents.html";

    /**
     * Initialize UIOptions global settings store.
     */
    demo.initSettingsStore = function () {
        fluid.globalSettingsStore();
    };

    /**
     * Initialize UI Enhancer for the page.
     */
    demo.initPageEnhancer = function (customThemeName) {
        fluid.pageEnhancer({
            uiEnhancer: {
                gradeNames: ["fluid.uiEnhancer.starterEnactors", "demo.customEnactors"],
                tocTemplate: pathToTocTemplate,
                classnameMap: {
                    theme: {
                        "default": customThemeName
                    }
                }
            }
        });
    };

    /**
     * The basic options for configuring the full-page versions of UI Options are the same,
     * regardless of whether or not the Preview is used. These settings used by both
     * full-page version, with and without Preview.
     */
    var basicFullPageOpts = {
        gradeNames: ["fluid.uiOptions.transformDefaultPanelsOptions"],
        // Tell UIOptions where to find all the templates, relative to this file
        templatePrefix: pathToTemplates,
        messagePrefix: pathToMessages,
        messageLoader: {
            gradeNames: ["fluid.uiOptions.starterMessageLoader"]
        },
        uiOptions: {
            gradeNames: ["fluid.uiOptions.starterPanels", "fluid.uiOptions.rootModel.starter", "demo.rootModel.extras", "fluid.uiOptions.uiEnhancerRelay", "demos.customPanels"],
            listeners: {
                // Tell UIOptions where to redirect to if the user cancels the operation
                onCancel: function () {
                    alert("Cancelled - would normally cancel any unsaved changes and return to the previous page.");
                }
            }
        }
    };

    /**
     * Initialize UI Options on the "Full Page, No Preview" version.
     */
    demo.initFullNoPreview = function (container, options) {
        var noPreviewOps = {
            templateLoader: {
                gradeNames: ["fluid.uiOptions.starterFullNoPreviewTemplateLoader"]
            }
        };
        fluid.uiOptions.fullNoPreview(container, $.extend(true, {}, basicFullPageOpts, noPreviewOps, options));
    };

    /**
     * Initialize UI Options on the "Full Page, With Preview" version.
     */
    demo.initFullWithPreview = function (container, options) {
        var previewOps = {
            templateLoader: {
                gradeNames: ["fluid.uiOptions.starterFullPreviewTemplateLoader", "demo.fullPreviewTemplateLoader"]
            }
        };
        fluid.uiOptions.fullPreview(container, $.extend(true, {}, basicFullPageOpts, previewOps, options));
    };

/*=======================
 * Demonstration of creating and adding a custom panel.
 * Panel has two adjustors, connected to a single preference.
 * Enactor uses some existing functions
 ========================*/
    /**
     * Grade for specifying template for custom panel, and for overriding the container template
     */
    fluid.defaults("demo.fullPreviewTemplateLoader", {
        gradeNames: ["fluid.uiOptions.resourceLoader", "autoInit"],
        templates: {
            uiOptions: "../html/FullPreviewUIOptions.html",
            extraTextSize: "../html/extraTextSizeTemplate.html"
        }
    });

    /**
     * Custom panel with two adjustors, a slider and a drop-down, bound to a single preference
     */
    fluid.defaults("demo.panels.extraTextSize", {
        gradeNames: ["fluid.uiOptions.panels", "autoInit"],
        strings: {
            size: ["8pt", "9pt", "10pt", "11pt", "12pt", "13pt", "14pt", "15pt", "16pt", "17pt", "18pt"]
        },
        controlValues: {
            size: ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"]
        },
        styles: {
            icon: "fl-icon"
        },
        selectors: {
            slider: ".democ-extraTextSize-slider",
            dropdown: ".democ-extraTextSize-dropdown",
        },
        range: {
            min: 8,
            max: 18
        },
        sliderOptions: {
            orientation: "horizontal",
            step: 1.0
        },
        produceTree: "demo.panels.extraTextSize.produceTree"
    });
    demo.panels.extraTextSize.produceTree = function (that) {
        var sliderOptions = $.extend(true, {}, that.options.sliderOptions, that.model, that.options.range);

        // these 'parseInts' are a workaround for the fact that the settings are strings,
        // but the slider needs integers:
        sliderOptions.value = parseInt(sliderOptions.value);

        sliderOptions.slide = function (event, ui) {
            that.applier.requestChange("value", ui.value.toString());
        };
        var tree = {
            slider: {
                decorators: {
                    type: "jQuery",
                    func: "slider",
                    args: [sliderOptions]
                }
            },
            dropdown: {
                optionnames: "${{that}.options.strings.size}",
                optionlist: "${{that}.options.controlValues.size}",
                selection: "${value}"
            }
        };
        return tree;
    };
    demo.panels.extraTextSize.finalInit = function (that) {
        // the framework does not yet have a declarative way to attach listeners to the modelChanged event
        that.applier.modelChanged.addListener("value", function (newModel, oldModel, request) {
            that.refreshView();
        });
    };
    /**
     * A grade for adding the custom panel to the interface
     */
    fluid.defaults("demos.customPanels", {
        gradeNames: ["fluid.uiOptions", "autoInit"],
        selectors: {
            extraTextSize: ".democ-extraTextSize-panel"
        },
        components: {
            extraTextSize: {
                type: "demo.panels.extraTextSize",
                createOnEvent: "onUIOptionsMarkupReady",
                container: "{uiOptions}.dom.extraTextSize",
                createOnEvent: "onUIOptionsMarkupReady",
                options: {
                    gradeNames: "fluid.uiOptions.defaultPanel",
                    rules: {
                        "extraTextSize": "value"
                    },
                    model: {
                        extraTextSize: "{fluid.uiOptions.rootModel}.rootModel.extraTextSize"
                    },
                    resources: {
                        template: "{templateLoader}.resources.extraTextSize"
                    }
                }
            }
        }
    });

    /**
     * An enactor for adding a class to the body
     */
    fluid.defaults("demo.enactors.extraTextSize", {
        gradeNames: ["fluid.viewComponent", "fluid.uiOptions.enactors", "autoInit"]
    });
    demo.enactors.extraTextSize.finalInit = function (that) {
        that.applier.modelChanged.addListener("value", function (newModel) {
            console.log("enactor detects new value: " + newModel.value);
        });
    };

    /**
     * Grade for adding enactors to enhancer
     */
    fluid.defaults("demo.customEnactors", {
        gradeNames: ["fluid.uiEnhancer", "autoInit"],
        components: {
            extraTextSize: {
                type: "demo.enactors.extraTextSize",
                container: "{uiEnhancer}.container",
                options: {
                    sourceApplier: "{uiEnhancer}.applier",
                    rules: {
                        "extraTextSize": "value"
                    },
                    model: {
                        value: "{fluid.uiOptions.rootModel}.rootModel.extraTextSize"
                    }
                }
            }
        }
    });

    /**
     * Grade for adding custom preference to the root model
     */
    fluid.defaults("demo.rootModel.extras", {
        gradeNames: ["fluid.uiOptions.rootModel", "autoInit"],
        members: {
            rootModel: {
                extraTextSize: "12"
            }
        }
    });
})(jQuery, fluid);
