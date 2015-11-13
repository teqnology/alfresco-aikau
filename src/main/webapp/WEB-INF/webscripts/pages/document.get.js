if (page.url.templateArgs.store_type != null &&
    page.url.templateArgs.store_id != null &&
    page.url.templateArgs.id != null)
{
    var nodeRef = page.url.templateArgs.store_type + "://" + page.url.templateArgs.store_id + "/" + page.url.templateArgs.id;
    // Document widgets go here
    model.jsonModel = {
       services: [
          "alfresco/services/DocumentService"
       ],
       widgets:[
          {
             name: "alfresco/layout/FullScreenWidgets",
             config: {
                widgets: [
                   {
                      name: "alfresco/documentlibrary/AlfDocument",
                      config: {
                         nodeRef: nodeRef,
                         rawData: true,
                         widgets: [
                            {
                               name: "alfresco/preview/AlfDocumentPreview",
                               config: {
                                  widgetsForPluginsOverrides: [
                                     {
                                        id: "PdfJs",
                                        replace: true,
                                        name: "alfresco/preview/PdfJs/PdfJs",
                                        config: {}
                                     }
                                  ]
                               }
                            }
                         ]
                      }
                   }
                ]
             }
          }
       ]
    };

}
else
{
  // Warning widget goes here
    model.jsonModel = {
      widgets:[
        {
          name: "alfresco/header/Warning",
          config: {
            warnings: [
              {
                message: "No document details provided",
                level: 3
              }
            ]
          }
        }
      ]
    };
}

