
(function ($, fluid) {
    fluid.registerNamespace("demo");

    var pathToTocTemplate = "../../components/tableOfContents/html/TableOfContents.html";
    var pathToTemplates = "../../components/uiOptions/html/";

    demo.updateToc = function (tocEnactor) {
        if (tocEnactor.tableOfContents) {
            tocEnactor.tableOfContents.regenerateToc();
        }
    };

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

    demo.initFatPanel = function (container) {
        fluid.uiOptions.fatPanel(container, {
            prefix: pathToTemplates 
        });
    };
})(jQuery, fluid);
