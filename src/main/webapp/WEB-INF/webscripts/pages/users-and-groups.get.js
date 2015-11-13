var options = [];
var result = remote.call("/api/people?filter=");
if (result.status.code == status.STATUS_OK) {
    var rawData = JSON.parse(result);
    if (rawData && rawData.people) {
        var people = rawData.people;
        for (var i = 0; i < people.length; i++) {
            options.push({
                value: people[i].userName,
                label: people[i].firstName + " " + people[i].lastName
            });
        }
    }
}

model.jsonModel = {
    services: [
        "alfresco/services/CrudService",
        "alfresco/services/DialogService",
        "tutorial/UserAndGroupService",
        "alfresco/services/OptionsService"
    ],
    widgets: [{
        name: "alfresco/layout/HorizontalWidgets",
        config: {
            widgetMarginLeft: "10",
            widgetMarginRight: "10",
            widgets: [{
                name: "alfresco/layout/ClassicWindow",
                widthPc: "50",
                config: {
                    title: "Groups",
                    widgets: [{
                        name: "alfresco/layout/TitleDescriptionAndContent",
                        config: {
                            title: "Manage Groups",
                            description: "Create, edit and delete user groups. ",
                            widgets: [{
                                name: "alfresco/layout/LeftAndRight",
                                config: {
                                    widgets: [{
                                        name: "alfresco/menus/AlfMenuBar",
                                        align: "left",
                                        config: {
                                            widgets: [{
                                                name: "alfresco/documentlibrary/AlfSelectDocumentListItems"
                                            }, {
                                                name: "alfresco/menus/AlfMenuBarItem",
                                                config: {
                                                    label: "Create New Group",
                                                    publishTopic: "ALF_CREATE_FORM_DIALOG_REQUEST",
                                                    publishPayload: {
                                                        dialogTitle: "Create Group",
                                                        dialogConfirmationButtonTitle: "Create",
                                                        dialogCancellationButtonTitle: "Cancel",
                                                        formSubmissionTopic: "TUTORIAL_CREATE_GROUP",
                                                        fixedWidth: true,
                                                        widgets: [{
                                                            name: "alfresco/forms/controls/TextBox",
                                                            config: {
                                                                fieldId: "ID",
                                                                label: "Identifier",
                                                                name: "groupId",
                                                                description: "Enter a unique identifier for the group. Only alphanumeric characters are allowed",
                                                                requirementConfig: {
                                                                    initialValue: true
                                                                },
                                                                validationConfig: [{
                                                                    validation: "regex",
                                                                    regex: "^[A-Za-z0-9]+$",
                                                                    errorMessage: "Alphanumeric characters only"
                                                                }]
                                                            }
                                                        }, {
                                                            name: "alfresco/forms/controls/TextBox",
                                                            config: {
                                                                fieldId: "DISPLAYNAME",
                                                                label: "Display name",
                                                                name: "displayName"
                                                            }
                                                        }]
                                                    }
                                                }
                                            }, {
                                                name: "alfresco/documentlibrary/AlfSelectedItemsMenuBarPopup",
                                                config: {
                                                    passive: false,
                                                    itemKeyProperty: "shortName",
                                                    label: "Selected items...",
                                                    widgets: [{
                                                        name: "alfresco/menus/AlfMenuGroup",
                                                        config: {
                                                            widgets: [{
                                                                name: "alfresco/menus/AlfSelectedItemsMenuItem",
                                                                config: {
                                                                    label: "Delete",
                                                                    iconClass: "alf-delete-icon",
                                                                    clearSelectedItemsOnClick: true,
                                                                    publishTopic: "TUTORIAL_DELETE_GROUPS"
                                                                }
                                                            }]
                                                        }
                                                    }]
                                                }
                                            }]
                                        }
                                    }, {
                                        name: "alfresco/menus/AlfMenuBar",
                                        align: "right",
                                        config: {
                                            widgets: [{
                                                name: "alfresco/menus/AlfMenuBarToggle",
                                                config: {
                                                    checked: true,
                                                    onConfig: {
                                                        title: "Change sort order to descending",
                                                        iconClass: "alf-sort-ascending-icon",
                                                        iconAltText: "Sorted ascending",
                                                        publishTopic: "ALF_DOCLIST_SORT",
                                                        publishPayload: {
                                                            direction: "ascending"
                                                        }
                                                    },
                                                    offConfig: {
                                                        title: "Change sort order to ascending",
                                                        iconClass: "alf-sort-descending-icon",
                                                        iconAltText: "Sorted descending",
                                                        publishTopic: "ALF_DOCLIST_SORT",
                                                        publishPayload: {
                                                            direction: "descending"
                                                        }
                                                    }
                                                }
                                            }, {
                                                name: "alfresco/menus/AlfMenuBarSelect",
                                                config: {
                                                    title: "Sort By",
                                                    selectionTopic: "ALF_DOCLIST_SORT_FIELD_SELECTION",
                                                    widgets: [{
                                                        name: "alfresco/menus/AlfMenuGroup",
                                                        config: {
                                                            widgets: [{
                                                                name: "alfresco/menus/AlfCheckableMenuItem",
                                                                config: {
                                                                    label: "Identifier",
                                                                    title: "Sort By Group Identifier",
                                                                    value: "shortName",
                                                                    group: "GROUP_SORT_FIELDS",
                                                                    publishTopic: "ALF_DOCLIST_SORT_FIELD_SELECTION",
                                                                    checked: true,
                                                                    publishPayload: {
                                                                        label: "Identifier",
                                                                        direction: "ascending",
                                                                        sortable: true
                                                                    }
                                                                }
                                                            }, {
                                                                name: "alfresco/menus/AlfCheckableMenuItem",
                                                                config: {
                                                                    label: "Display Name",
                                                                    title: "Sort By Display Name",
                                                                    value: "displayName",
                                                                    group: "GROUP_SORT_FIELDS",
                                                                    publishTopic: "ALF_DOCLIST_SORT_FIELD_SELECTION",
                                                                    checked: false,
                                                                    publishPayload: {
                                                                        label: "Display Name",
                                                                        direction: "ascending",
                                                                        sortable: true
                                                                    }
                                                                }
                                                            }]
                                                        }
                                                    }]
                                                }
                                            }]
                                        }
                                    }]
                                }
                            }, {
                                name: "alfresco/lists/AlfSortablePaginatedList",
                                config: {
                                    currentPageSize: 5,
                                    startIndexProperty: "paging.skipCount",
                                    totalResultsProperty: "paging.totalItems",
                                    loadDataPublishTopic: "TUTORIAL_GET_GROUPS",
                                    itemsProperty: "data",
                                    sortField: "shortName",
                                    widgets: [{
                                        name: "alfresco/lists/views/AlfListView",
                                        config: {
                                            widgetsForHeader: [{
                                                name: "alfresco/lists/views/layouts/HeaderCell",
                                                config: {
                                                    label: ""
                                                }
                                            }, {
                                                name: "alfresco/lists/views/layouts/HeaderCell",
                                                config: {
                                                    label: "Group Identifier",
                                                    sortable: true,
                                                    sortValue: "shortName"
                                                }
                                            }, {
                                                name: "alfresco/lists/views/layouts/HeaderCell",
                                                config: {
                                                    label: "Display Name",
                                                    sortable: true,
                                                    sortValue: "displayName"
                                                }
                                            }, {
                                                name: "alfresco/lists/views/layouts/HeaderCell",
                                                config: {
                                                    label: "Actions"
                                                }
                                            }],
                                            additionalCssClasses: "bordered",
                                            widgets: [{
                                                name: "alfresco/lists/views/layouts/Row",
                                                config: {
                                                    widgets: [{
                                                        name: "alfresco/lists/views/layouts/Cell",
                                                        config: {
                                                            additionalCssClasses: "mediumpad",
                                                            widgets: [{
                                                                name: "alfresco/renderers/Selector"
                                                            }]
                                                        }
                                                    }, {
                                                        name: "alfresco/lists/views/layouts/Cell",
                                                        config: {
                                                            additionalCssClasses: "mediumpad",
                                                            widgets: [{
                                                                name: "alfresco/renderers/PropertyLink",
                                                                config: {
                                                                    propertyToRender: "displayName",
                                                                    useCurrentItemAsPayload: false,
                                                                    publishTopic: "ALF_CREATE_DIALOG_REQUEST",
                                                                    publishPayloadType: "PROCESS",
                                                                    publishPayloadModifiers: ["processCurrentItemTokens"],
                                                                    publishPayload: {
                                                                        dialogTitle: "{displayName}",
                                                                        fixedWidth: true,
                                                                        widgetsContent: [{
                                                                            name: "alfresco/forms/Form",
                                                                            config: {
                                                                                okButtonLabel: "Add User",
                                                                                okButtonPublishTopic: "TUTORIAL_ADD_USER_TO_GROUP",
                                                                                okButtonPublishPayload: {
                                                                                    groupId: "{shortName}",
                                                                                    pubSubScope: "GROUP_USERS_"
                                                                                },
                                                                                okButtonPublishGlobal: true,
                                                                                showCancelButton: false,
                                                                                widgets: [{
                                                                                    name: "alfresco/forms/controls/Select",
                                                                                    config: {
                                                                                        label: "User",
                                                                                        description: "Select a user to add to the group",
                                                                                        name: "userName",
                                                                                        optionsConfig: {
                                                                                            fixed: options
                                                                                                /*publishTopic: "ALF_GET_FORM_CONTROL_OPTIONS",
                                                                                                publishPayload: {
                                                                                                  url: url.context + "/proxy/alfresco/api/people?filter=",
                                                                                                  itemsAttribute: "people",
                                                                                                  labelAttribute: "userName",
                                                                                                  valueAttribute: "userName"
                                                                                                }*/
                                                                                        }
                                                                                    }
                                                                                }]
                                                                            }
                                                                        }, {
                                                                            name: "alfresco/lists/AlfList",
                                                                            config: {
                                                                                pubSubScope: "GROUP_USERS_",
                                                                                waitForPageWidgets: false,
                                                                                loadDataPublishTopic: "ALF_CRUD_GET_ALL",
                                                                                loadDataPublishPayload: {
                                                                                    url: "api/groups/{shortName}/children?sortBy=displayName&maxItems=50&skipCount=0"
                                                                                },
                                                                                itemsProperty: "data",
                                                                                widgets: [{
                                                                                    name: "alfresco/documentlibrary/views/AlfDocumentListView",
                                                                                    config: {
                                                                                        widgets: [{
                                                                                            name: "alfresco/lists/views/layouts/Row",
                                                                                            config: {
                                                                                                widgets: [{
                                                                                                    name: "alfresco/lists/views/layouts/Cell",
                                                                                                    config: {
                                                                                                        additionalCssClasses: "mediumpad",
                                                                                                        widgets: [{
                                                                                                            name: "alfresco/renderers/Property",
                                                                                                            config: {
                                                                                                                propertyToRender: "displayName"
                                                                                                            }
                                                                                                        }]
                                                                                                    }
                                                                                                }, {
                                                                                                    name: "alfresco/lists/views/layouts/Cell",
                                                                                                    config: {
                                                                                                        additionalCssClasses: "mediumpad",
                                                                                                        widgets: [{
                                                                                                            name: "alfresco/renderers/PublishAction",
                                                                                                            config: {
                                                                                                                iconClass: "delete-16",
                                                                                                                publishTopic: "TUTORIAL_REMOVE_USER_FROM_GROUP",
                                                                                                                publishPayload: {
                                                                                                                    pubSubScope: "GROUP_USERS_",
                                                                                                                    groupId: "{shortName}"
                                                                                                                },
                                                                                                                publishPayloadItemMixin: true,
                                                                                                                publishGlobal: true
                                                                                                            }
                                                                                                        }]
                                                                                                    }
                                                                                                }]
                                                                                            }
                                                                                        }]
                                                                                    }
                                                                                }]
                                                                            }
                                                                        }]
                                                                    }
                                                                }
                                                            }]
                                                        }
                                                    }, {
                                                        name: "alfresco/lists/views/layouts/Cell",
                                                        config: {
                                                            additionalCssClasses: "mediumpad",
                                                            widgets: [{
                                                                name: "alfresco/renderers/InlineEditProperty",
                                                                config: {
                                                                    propertyToRender: "displayName",
                                                                    refreshCurrentItem: true,
                                                                    requirementConfig: {
                                                                        initialValue: true
                                                                    },
                                                                    publishTopic: "ALF_CRUD_UPDATE",
                                                                    publishPayloadType: "PROCESS",
                                                                    publishPayloadModifiers: ["processCurrentItemTokens"],
                                                                    publishPayloadItemMixin: false,
                                                                    publishPayload: {
                                                                        url: "api/groups/{shortName}",
                                                                        noRefresh: true
                                                                    }
                                                                }
                                                            }]
                                                        }
                                                    }, {
                                                        name: "alfresco/lists/views/layouts/Cell",
                                                        config: {
                                                            additionalCssClasses: "mediumpad",
                                                            widgets: [{
                                                                name: "alfresco/renderers/PublishAction",
                                                                config: {
                                                                    iconClass: "delete-16",
                                                                    publishTopic: "ALF_CRUD_DELETE",
                                                                    publishPayloadType: "PROCESS",
                                                                    publishPayloadModifiers: ["processCurrentItemTokens"],
                                                                    publishPayload: {
                                                                        url: "api/groups/{shortName}",
                                                                        requiresConfirmation: true,
                                                                        confirmationTitle: "Delete {displayName}?",
                                                                        confirmationPrompt: "Are you sure you want to delete {displayName}?"
                                                                    },
                                                                    publishGlobal: true
                                                                }
                                                            }]
                                                        }
                                                    }]
                                                }
                                            }]
                                        }
                                    }]
                                }
                            }, {
                                name: "alfresco/lists/Paginator",
                                config: {
                                    documentsPerPage: 5,
                                    pageSizes: [5, 10, 20]
                                }
                            }]
                        }
                    }]
                }
            }, {
                name: "alfresco/layout/ClassicWindow",
                widthPc: "50",
                config: {
                    title: "Users",
                    widgets: [{
                        name: "alfresco/layout/TitleDescriptionAndContent",
                        config: {
                            title: "Manage Users",
                            description: "Create, edit and delete users. ",
                            widgets: [{
                                name: "alfresco/layout/LeftAndRight",
                                config: {
                                    widgets: [{
                                        name: "alfresco/menus/AlfMenuBar",
                                        align: "left",
                                        config: {
                                            widgets: [{
                                                name: "alfresco/menus/AlfMenuBarItem",
                                                config: {
                                                    label: "Create New User",
                                                    publishTopic: "ALF_CREATE_FORM_DIALOG_REQUEST",
                                                    publishPayload: {
                                                        dialogTitle: "Create User",
                                                        dialogConfirmationButtonTitle: "Create",
                                                        dialogCancellationButtonTitle: "Cancel",
                                                        formSubmissionTopic: "ALF_CRUD_CREATE",
                                                        formSubmissionPayloadMixin: {
                                                            url: "api/people",
                                                            pubSubScope: "USERS_"
                                                        },
                                                        fixedWidth: true,
                                                        widgets: [{
                                                            name: "alfresco/forms/controls/TextBox",
                                                            config: {
                                                                fieldId: "USERNAME",
                                                                label: "Username",
                                                                name: "userName",
                                                                requirementConfig: {
                                                                    initialValue: true
                                                                }
                                                            }
                                                        }, {
                                                            name: "alfresco/forms/controls/TextBox",
                                                            config: {
                                                                fieldId: "FIRSTNAME",
                                                                label: "First Name",
                                                                name: "firstName",
                                                                requirementConfig: {
                                                                    initialValue: true
                                                                }
                                                            }
                                                        }, {
                                                            name: "alfresco/forms/controls/TextBox",
                                                            config: {
                                                                fieldId: "LASTNAME",
                                                                label: "Last Name",
                                                                name: "lastName",
                                                                requirementConfig: {
                                                                    initialValue: true
                                                                }
                                                            }
                                                        }, {
                                                            name: "alfresco/forms/controls/TextBox",
                                                            config: {
                                                                fieldId: "EMAIL",
                                                                label: "Email",
                                                                name: "email",
                                                                requirementConfig: {
                                                                    initialValue: true
                                                                },
                                                                validationConfig: [
                                                                  {
                                                                    validation: "regex",
                                                                    regex: "^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$",
                                                                    errorMessage: "Valid E-mail Address Required"
                                                                  }
                                                                ]
                                                            }
                                                        }, {
                                                            name: "alfresco/forms/controls/Password",
                                                            config: {
                                                                fieldId: "PASSWORD",
                                                                label: "Password",
                                                                name: "password"
                                                            }
                                                        }]
                                                    }
                                                }
                                            }]
                                        }
                                    }]
                                }
                            }, {
                                name: "alfresco/lists/AlfList",
                                config: {
                                    pubSubScope: "USERS_",
                                    waitForPageWidgets: false,
                                    loadDataPublishTopic: "ALF_CRUD_GET_ALL",
                                    loadDataPublishPayload: {
                                        url: "api/people"
                                    },
                                    itemsProperty: "people",
                                    widgets: [{
                                        name: "alfresco/lists/views/AlfListView",
                                        config: {
                                            widgetsForHeader: [{
                                                name: "alfresco/lists/views/layouts/HeaderCell",
                                                config: {
                                                    label: "Username"
                                                }
                                            }, {
                                                name: "alfresco/lists/views/layouts/HeaderCell",
                                                config: {
                                                    label: "First Name"
                                                }
                                            }, {
                                                name: "alfresco/lists/views/layouts/HeaderCell",
                                                config: {
                                                    label: "Last Name"
                                                }
                                            }, {
                                                name: "alfresco/lists/views/layouts/HeaderCell",
                                                config: {
                                                    label: "Actions"
                                                }
                                            }, ],
                                            additionalCssClasses: "bordered",
                                            widgets: [{
                                                name: "alfresco/lists/views/layouts/Row",
                                                config: {
                                                    widgets: [{
                                                        name: "alfresco/lists/views/layouts/Cell",
                                                        config: {
                                                            widgets: [{
                                                                name: "alfresco/renderers/Property",
                                                                config: {
                                                                    propertyToRender: "userName"
                                                                }
                                                            }]
                                                        }
                                                    }, {
                                                        name: "alfresco/lists/views/layouts/Cell",
                                                        config: {
                                                            widgets: [{
                                                                name: "alfresco/renderers/InlineEditProperty",
                                                                config: {
                                                                    propertyToRender: "firstName",
                                                                    refreshCurrentItem: true,
                                                                    requirementConfig: {
                                                                        initialValue: true
                                                                    },
                                                                    publishTopic: "ALF_CRUD_UPDATE",
                                                                    publishPayloadType: "PROCESS",
                                                                    publishPayloadModifiers: ["processCurrentItemTokens"],
                                                                    publishPayloadItemMixin: false,
                                                                    publishPayload: {
                                                                        url: "api/people/{userName}",
                                                                        noRefresh: true
                                                                    }
                                                                }
                                                            }]
                                                        }
                                                    },{
                                                        name: "alfresco/lists/views/layouts/Cell",
                                                        config: {
                                                            widgets: [{
                                                                name: "alfresco/renderers/InlineEditProperty",
                                                                config: {
                                                                    propertyToRender: "lastName",
                                                                    refreshCurrentItem: true,
                                                                    requirementConfig: {
                                                                        initialValue: true
                                                                    },
                                                                    publishTopic: "ALF_CRUD_UPDATE",
                                                                    publishPayloadType: "PROCESS",
                                                                    publishPayloadModifiers: ["processCurrentItemTokens"],
                                                                    publishPayloadItemMixin: false,
                                                                    publishPayload: {
                                                                        url: "api/people/{userName}",
                                                                        noRefresh: true
                                                                    }
                                                                }
                                                            }]
                                                        }
                                                    },{
                                                      name: "alfresco/lists/views/layouts/Cell",
                                                      config: {
                                                        additionalCssClasses: "mediumpad",
                                                        widgets: [
                                                          {
                                                            name: "alfresco/renderers/PublishAction",
                                                            config: {
                                                              iconClass: "delete-16",
                                                			  publishTopic : "ALF_CRUD_DELETE",
                                                              publishPayloadType: "PROCESS",
                                                              publishPayload: {
                                                                pubSubScope:"USERS_",
                                            					requiresConfirmation : true,
                                            					url : "api/people/{userName}",
                                                                confirmationTitle : "Delete User",
                                                                confirmationPrompt : "Are you sure you want to delete user '{userName}'?",
                                                                successMessage : "Successfully deleted user: '{userName}'"
                                                              },
                                                              publishPayloadModifiers: ["processCurrentItemTokens"],
                                                              publishGlobal:true
                                                            }
                                                          }
                                                        ]
                                                      }
                                                    }]
                                                }
                                            }]
                                        }
                                    }]
                                }
                            }]
                        }
                    }]
                }
            }]
        }
    }]
};