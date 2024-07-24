import type { Meta, StoryObj } from '@storybook/react';
import RdsCompFeatures from './rds-comp-features';
 
 
const meta: Meta = {
    title: "Components/Features",
    component: RdsCompFeatures,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompFeatures>;
 
export default meta;
type Story = StoryObj<typeof RdsCompFeatures>;
 
export const Default: Story = {
    args: {
        featuresData: [
            {
                "name": "Identity",
                "displayName": "Identity",
                "features": [
                    {
                        "name": "Identity.TwoFactor",
                        "displayName": "Two factor behaviour",
                        "value": "Optional",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "description": "Set two factor behaviour. Optional values: Optional,Disabled,Forced",
                        "valueType": {
                            "itemSource": {
                                "items": [
                                    {
                                        "value": "Optional",
                                        "displayText": {
                                            "resourceName": "AbpIdentity",
                                            "name": "Feature:TwoFactor.Optional"
                                        }
                                    },
                                    {
                                        "value": "Disabled",
                                        "displayText": {
                                            "resourceName": "AbpIdentity",
                                            "name": "Feature:TwoFactor.Disabled"
                                        }
                                    },
                                    {
                                        "value": "Forced",
                                        "displayText": {
                                            "resourceName": "AbpIdentity",
                                            "name": "Feature:TwoFactor.Forced"
                                        }
                                    }
                                ]
                            },
                            "name": "SelectionStringValueType",
                            "properties": {},
                            "validator": {
                                "name": "NULL",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    },
                    {
                        "name": "Identity.MaxUserCount",
                        "displayName": "Maximum user count",
                        "value": "0",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "description": "0 = unlimited",
                        "valueType": {
                            "name": "FreeTextStringValueType",
                            "properties": {},
                            "validator": {
                                "name": "NUMERIC",
                                "properties": {
                                    "MinValue": 0,
                                    "MaxValue": 2147483647
                                }
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    },
                    {
                        "name": "Account.EnableLdapLogin",
                        "displayName": "LDAP Login",
                        "value": "False",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "description": null,
                        "valueType": {
                            "name": "ToggleStringValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    },
                    {
                        "name": "Identity.EnableOAuthLogin",
                        "displayName": "OAuth Login",
                        "value": "False",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "description": null,
                        "valueType": {
                            "name": "ToggleStringValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    }
                ]
            },
            { "name": "SettingManagement",
            "displayName": "Setting Management",
            "description": "Enable setting management system in the application.",
            "features": [
                {
                    "name": "YourFeatureName",
            "displayName": "Your Feature Display Name",
            "value": true,
            "inputType": "checkbox",
            "provider": {
                "name": "C",
                "key": null
                    },
                    "description": "Enable or disable setting management. Optional values: Enabled,Disabled",
                    "valueType": {
                        "name": "BooleanValueType",
                        "properties": {},
                        "validator": {
                            "name": "BOOLEAN",
                            "properties": {}
                        }
                    },
                    "depth": 0,
                    "parentName": null
      },
      {
        "name": "SettingManagement.EmailSettings",
        "displayName": "Email Settings",
        "value": "Enabled",
        "uiType": "checkbox",
        "provider": {
          "name": "D",
          "key": null
        },
        "description": "Allow changing email settings. Optional values: Enabled,Disabled",
        "valueType": {
          "name": "BooleanValueType",
          "properties": {},
          "validator": {
            "name": "BOOLEAN",
            "properties": {}
          }
        },
        "depth": 1,
        "parentName": "SettingManagement.Enable"
                    },
                    
                    
                ]
            },
            {
                "name": "LanguageManagement",
                "displayName": "Language Management",
                "description": "Enable language management system in the application.",
                "features": [
                    {
                        "name": "LanguageManagement.Enable",
                        "displayName": "Enable Language Management",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "description": "Enable or disable language management. Optional values: Enabled,Disabled",
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    }
                ]
            },
            {
                "name": "TextTemplateManagement",
                "displayName": "Text Template Management",
                "description": "Enable text template management system in the application.",
                "features": [
                    {
                        "name": "TextTemplateManagement.Enable",
                        "displayName": "Enable Text Template Management",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "description": "Enable or disable text template management. Optional values: Enabled,Disabled",
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    }
                ]
            },
            {
                "name": "CmsKit",
                "displayName": "Cms Kit",
                "description": "CMS Kit's system that allows various dynamic features in the application.",
                "features": [
                    {
                        "name": "CmsKit.Blogpost",
                        "displayName": "Blogpost",
                        "description": "CMS Kit's blogpost system that allows create blogs and posts dynamically in the application.",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    },
                    {
                        "name": "CmsKit.Commenting",
                        "displayName": "Commenting",
                        "description": "CMS Kit's comment system allows commenting on entities such as BlogPost.",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    },
                    {
                        "name": "CmsKit.GlobalResourcing",
                        "displayName": "Global resourcing",
                        "description": "CMS Kit's global resources feature that allows managing global styles & scripts.",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    },
                    {
                        "name": "CmsKit.Menu",
                        "displayName": "Menu",
                        "description": "CMS Kit's dynamic menu system that allows adding/removing application menus dynamically.",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    },
                    {
                        "name": "CmsKit.Paging",
                        "displayName": "Paging",
                        "description": "CMS Kit's page system that allows creating static pages with specific URL.",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    },
                    {
                        "name": "CmsKit.Rating",
                        "displayName": "Rating",
                        "description": "CMS Kit's rating system that allows users to rate entities such as BlogPost.",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    },
                    {
                        "name": "CmsKit.Reaction",
                        "displayName": "Reaction",
                        "description": "CMS Kit's reaction system that allows users to send reactions to entities such as BlogPost, Comments, etc.",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    },
                    {
                        "name": "CmsKit.Tagging",
                        "displayName": "Tagging",
                        "description": "CMS Kit's tag system that allows tagging entities such as BlogPost.",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    }
                ]
            },
            {
                "name": "CmsKitPro",
                "displayName": "Cms Kit Pro",
                "description": "CMS Kit Pro's system that allows various dynamic features in the application.",
                "features": [
                    {
                        "name": "CmsKitPro.Contact",
                        "displayName": "Contact",
                        "description": "CMS Kit's contact system that allows creating contacts forms.",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    },
                    {
                        "name": "CmsKitPro.Newsletter",
                        "displayName": "Newsletter",
                        "description": "CMS Kit's newsletter system.",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    },
                    {
                        "name": "CmsKitPro.Poll",
                        "displayName": "Poll",
                        "description": "CMS Kit's polling system that allows creating polls with multiple choices.",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    },
                    {
                        "name": "CmsKitPro.UrlShorting",
                        "displayName": "Url shorting",
                        "description": "CMS Kit's URL shortening system that allows redirecting a specific URL path to another URL.",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    }
                ]
            },
        
            {
                "name": "Chat",
                "displayName": "Chat",
                "description": "Enable messaging system in application.",
                "features": [
                    {
                        "name": "Chat.Enable",
                        "displayName": "Enable Chat",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "description": "Enable or disable chat. Optional values: Enabled,Disabled",
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    }
                ]
            },
            {
                "name": "FileManagement",
                "displayName": "File Management",
                "description": "Enable file management system in the application.",
                "features": [
                    {
                        "name": "FileManagement.Enable",
                        "displayName": "Enable File Management",
                        "value": "Disabled",
                        "uiType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "description": "Enable or disable file management. Optional values: Enabled,Disabled",
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    },
                    {
                        "name": "FileManagement.StorageSize",
                        "displayName": "Storage size",
                        "value": "2",
                        "provider": {
                          "name": "T",
                          "key": "9e83c5cd-119d-8e19-dee5-3a114d520ad5"
                        },
                        "description": "Set maximum storage size in bytes. Zero or null will be unlimited.",
                        "valueType": {
                          "name": "FreeTextStringValueType",
                          "properties": {},
                          "validator": {
                            "name": "STRING",
                            "properties": {
                              "MinLength": 1,
                              "MaxLength": 2147483647,
                              "RegularExpression": "^[0-9]+$",
                              "AllowNull": "true"
                            }
                          }
                        },
                        "depth": 0,
                        "parentName": null
                    }
                ]
            },
            {
                "name": "Forms",
                "displayName": "Forms",
                "description": "Enable forms system in the application.",
                "features": [
                    {
                        "name": "Forms.Enable",
                        "displayName": "Enable Forms",
                        "value": "Disabled",
                        "inputeType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                    
                        "description": "Enable or disable forms. Optional values: Enabled,Disabled",
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    }
                ]
            },
            {
                "name": "AuditLogging",
                "displayName": "Audit Logging",
                "features": [
                    {
                        "name": "AuditLogging.Enable",
                        "displayName": "Enable Audit Logging",
                        "value": "Disabled",
                        "inputeType": "checkbox",
                        "provider": {
                            "name": "D",
                            "key": null
                        },
                        "description": "Enable or disable audit logging. Optional values: Enabled,Disabled",
                        "valueType": {
                            "name": "BooleanValueType",
                            "properties": {},
                            "validator": {
                                "name": "BOOLEAN",
                                "properties": {}
                            }
                        },
                        "depth": 0,
                        "parentName": null
                    },
                ]
            }
            // ... other feature groups
        ],
        // other props...
    }
 
} satisfies Story;