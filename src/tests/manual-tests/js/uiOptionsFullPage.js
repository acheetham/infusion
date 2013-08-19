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
        // Tell UIOptions where to redirect to if the user cancels the operation
        uiOptions: {
            gradeNames: ["fluid.uiOptions.starterPanels", "fluid.uiOptions.rootModel.starter", "demo.rootModel.extras", "fluid.uiOptions.uiEnhancerRelay", "demos.customPanels"],
            listeners: {
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

    fluid.defaults("demos.customPanels", {
        gradeNames: ["fluid.uiOptions", "autoInit"],
        selectors: {
            playfulness: ".flc-uiOptions-playfulness"
        },
        components: {
            playfulness: {
                type: "demo.panels.playfulness",
                createOnEvent: "onUIOptionsMarkupReady",
                container: "{uiOptions}.dom.playfulness",
                createOnEvent: "onUIOptionsMarkupReady",
                options: {
                    gradeNames: "fluid.uiOptions.defaultPanel",
                    rules: {
                        "playfulness": "value"
                    },
                    model: {
                        playfulness: "{fluid.uiOptions.rootModel}.rootModel.playfulness"
                    },
                    resources: {
                        template: "{templateLoader}.resources.playfulness"
                    }
                }
            }
        }
    });
    fluid.defaults("demo.fullPreviewTemplateLoader", {
        gradeNames: ["fluid.uiOptions.resourceLoader", "autoInit"],
        templates: {
            uiOptions: "../html/FullPreviewUIOptions.html",
            playfulness: "../html/TestTemplate.html"
        }
    });
    fluid.defaults("demo.panels.playfulness", {
        gradeNames: ["fluid.uiOptions.panels", "autoInit"],
        model: {
            value: "2"
        },
        strings: {
            size: ["Ruler on the knuckes", "Smile!", "Feather boa"]
        },
        controlValues: {
            size: ["1", "2", "3"]
        },
        styles: {
            icon: "fl-icon"
        },
        selectors: {
            slider: ".democ-playfulness-slider",
            dropdown: ".democ-playfulness-dropdown",
        },
        range: {
            min: 1,
            max: 3
        },
        sliderOptions: {
            orientation: "horizontal",
            step: 1.0
        },
        produceTree: "demo.panels.playfulness.produceTree"
    });
    demo.panels.playfulness.produceTree = function (that) {
        var sliderOptions = $.extend(true, {}, that.options.sliderOptions, that.model, that.options.range);
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
    demo.panels.playfulness.finalInit = function (that) {
        // the framework does not yet have a declarative way to attach listeners to the modelChanged event
        that.applier.modelChanged.addListener("value", function (newModel, oldModel, request) {
            that.refreshView();
        });
    };
    fluid.defaults("demo.enactors.playfulness", {
        gradeNames: ["fluid.viewComponent", "fluid.uiOptions.enactors", "autoInit"],
        classes: {
            "1": "demo-playful-strict",
            "2": "",
            "3": "demo-playful-playful"
        },
        invokers: {
            clearClasses: {
                funcName: "fluid.uiOptions.enactors.classSwapper.clearClasses",
                args: ["{that}.container", "{that}.classStr"]
            },
            swap: {
                funcName: "fluid.uiOptions.enactors.classSwapper.swap",
                args: ["{arguments}.0", "{that}"]
            }
        },
        listeners: {
            onCreate: {
                listener: "{that}.swap",
                args: ["{that}.model.value"]
            }
        },
        members: {
            classStr: {
                expander: {
                    func: "fluid.uiOptions.enactors.classSwapper.joinClassStr",
                    args: "{that}.options.classes"
                }
            }
        }
    });
    demo.enactors.playfulness.finalInit = function (that) {
        that.applier.modelChanged.addListener("value", function (newModel) {
            that.swap(newModel.value);
        });
    };
    fluid.defaults("demo.customEnactors", {
        gradeNames: ["fluid.uiEnhancer", "autoInit"],
        components: {
            playfulness: {
                type: "demo.enactors.playfulness",
                container: "{uiEnhancer}.container",
                options: {
                    classes: "{uiEnhancer}.options.classnameMap.playfulness",
                    sourceApplier: "{uiEnhancer}.applier",
                    rules: {
                        "playfulness": "value"
                    },
                    model: {
                        value: "{fluid.uiOptions.rootModel}.rootModel.playfulness"
                    }
                }
            }
        }
    });
    fluid.defaults("demo.rootModel.extras", {
        gradeNames: ["fluid.uiOptions.rootModel", "autoInit"],
        members: {
            // TODO: This information is supposed to be generated from the JSON
            // schema describing various preferences. For now it's kept in top
            // level uiOptions to avoid further duplication.
            rootModel: {
                playfulness: "2"
            }
        }
    });
})(jQuery, fluid);
