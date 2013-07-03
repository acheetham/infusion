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

    fluid.staticEnvironment["fluid--discoveryTool"] = fluid.typeTag("fluid.discoveryTool");
    fluid.registerNamespace("fluid.discoveryTool");

    var pathToTemplates = "../../components/uiOptions/html/";
    var pathToTocTemplate = "../../components/tableOfContents/html/TableOfContents.html";

    demo.initSettingsStore = function () {
        fluid.globalSettingsStore();
    };

    demo.initPageEnhancer = function (customThemeName) {
        fluid.pageEnhancer({
            gradeNames: ["fluid.discoveryTool.enactors"],
            tocTemplate: pathToTocTemplate,
            classnameMap: {
                theme: {
                    "default": customThemeName
                }
            }
        });
    };

    demo.initFatPanel = function (container) {
        fluid.uiOptions.fatPanel(container, {
            gradeNames: ["fluid.uiOptions.transformDefaultPanelsOptions"],
            prefix: pathToTemplates,
            templateLoader: {
                options: {
                    gradeNames: ["fluid.discoveryTool.templateLoader"]
                }
            },
            uiOptions: {
                options: {
                    gradeNames: ["fluid.discoveryTool.panels", "fluid.uiOptions.rootModel", "fluid.uiOptions.rootModel.starter", "fluid.uiOptions.uiEnhancerRelay"]
                }
            }
        });
    };

    fluid.demands("fluid.uiOptions.templateLoader", ["fluid.discoveryTool"], {
        options: {
            templates: {
                uiOptions: "html/DiscoveryTool.html"
            }
        }
    });
    fluid.defaults("fluid.discoveryTool.templateLoader", {
        gradeNames: ["fluid.uiOptions.templateLoader", "autoInit"],
        templates: {
            highContrast: "html/HighContrastPanelTemplate.html"
        }
    });

    /************************
     * High Contrast:
     *
     * The Discovery Tool 'high contrast' option will set:
     * - black on white
     * - emphasize links
     * - inputs larger
     * - sans serif font or monospaced font
     *********************/
    fluid.defaults("fluid.discoveryTool.panels.highContrast", {
        gradeNames: ["fluid.uiOptions.panels", "autoInit"],
        // this is being ignored - ??
        selectors: {
            highContrast: ".flc-discoveryTool-highContrast-choice"
        },
        model: {
            highContrast: false
        },
        protoTree: {
            highContrast: "${highContrast}"
        }
    });

    fluid.defaults("fluid.discoveryTool.enactors.highContrast", {
        gradeNames: ["fluid.viewComponent", "fluid.uiOptions.enactors", "autoInit"]
    });
    
    fluid.defaults("fluid.discoveryTool.panels", {
        gradeNames: ["fluid.uiOptions", "autoInit"],
        selectors: {
            highContrast: ".flc-discoveryTool-highContrast"
        },
        components: {
            highContrast: {
                type: "fluid.discoveryTool.panels.highContrast",
                container: "{uiOptions}.dom.highContrast",
                createOnEvent: "onUIOptionsMarkupReady",
                options: {
                    gradeNames: "fluid.uiOptions.defaultPanel",
                    rules: {
                        "selections.links": "highContrast",
                        "selections.inputsLarger": "highContrast"
                    },
                    resources: {
                        template: "{templateLoader}.resources.highContrast"
                    }
                }
            }
        }
    });

    fluid.defaults("fluid.discoveryTool.enactors", {
        gradeNames: ["fluid.uiEnhancer", "fluid.uiEnhancer.cssClassEnhancerBase", "autoInit"],
        components: {
            emphasizeLinks: {
                type: "fluid.uiOptions.enactors.emphasizeLinks",
                container: "{uiEnhancer}.container",
                options: {
                    cssClass: "{uiEnhancer}.options.classnameMap.links",
                    sourceApplier: "{uiEnhancer}.applier",
                    rules: {
                        "links": "value"
                    },
                    model: {
                        links: "{fluid.uiOptions.rootModel}.rootModel.links"
                    }
                }
            },
            inputsLarger: {
                type: "fluid.uiOptions.enactors.inputsLarger",
                container: "{uiEnhancer}.container",
                options: {
                    cssClass: "{uiEnhancer}.options.classnameMap.inputsLarger",
                    sourceApplier: "{uiEnhancer}.applier",
                    rules: {
                        "inputsLarger": "value"
                    },
                    model: {
                        inputsLarger: "{fluid.uiOptions.rootModel}.rootModel.inputsLarger"
                    }
                }
            }
        }
    });
})(jQuery, fluid);
