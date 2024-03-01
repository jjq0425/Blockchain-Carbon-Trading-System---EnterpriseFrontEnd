export const submitData_tem = {
    "sumEmission": 0,
    "detail": [
        {
            "className": "化石燃料燃烧",
            "classSort": 1,
            "classDataSum": 0,
            "canAdd": true,
            "children": [
                {
                    "className": "燃煤",
                    "classSort": 1,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "净消耗量",
                            "dataUnit": "t，10³标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "千焦/千克，千焦/标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 29271.2,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 0.000001,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.000001,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0,
                            "defaultValChooseIdx": -1,
                            "defaultVal": [],
                            "dataSource": "MEASURE"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0,
                            "defaultValChooseIdx": -1,
                            "defaultVal": [],
                            "dataSource": "MEASURE"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 3.666666666667,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 3.666666666667,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "原油",
                    "classSort": 2,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "净消耗量",
                            "dataUnit": "吨，10³标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "千焦/千克，千焦/标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 41816,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 0.000001,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.000001,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 20.08,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.98,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 3.666666666667,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 3.666666666667,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "燃料油",
                    "classSort": 3,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "净消耗量",
                            "dataUnit": "吨，10³标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "千焦/千克，千焦/标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 41816,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 0.000001,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.000001,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 21.1,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.98,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 3.666666666667,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 3.666666666667,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "汽油",
                    "classSort": 4,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "净消耗量",
                            "dataUnit": "吨，10³标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "千焦/千克，千焦/标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 43070,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 0.000001,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.000001,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 18.9,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.98,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 3.666666666667,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 3.666666666667,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "柴油",
                    "classSort": 5,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "净消耗量",
                            "dataUnit": "吨，10³标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "千焦/千克，千焦/标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 42652,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 0.000001,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.000001,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 20.2,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.98,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 3.666666666667,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 3.666666666667,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "炼厂干气",
                    "classSort": 6,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "净消耗量",
                            "dataUnit": "吨，10³标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "千焦/千克，千焦/标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 45998,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 0.000001,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.000001,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 18.2,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.98,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 3.666666666667,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 3.666666666667,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "其它石油制品",
                    "classSort": 7,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "净消耗量",
                            "dataUnit": "吨，10³标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "千焦/千克，千焦/标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": -1,
                            "defaultVal": [],
                            "dataSource": "MEASURE"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 0.000001,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.000001,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0,
                            "defaultValChooseIdx": -1,
                            "defaultVal": [],
                            "dataSource": "MEASURE"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0,
                            "defaultValChooseIdx": -1,
                            "defaultVal": [],
                            "dataSource": "MEASURE"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 3.666666666667,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 3.666666666667,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "天然气",
                    "classSort": 8,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "净消耗量",
                            "dataUnit": "吨，10³标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "千焦/千克，千焦/标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 38931,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 0.000001,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.000001,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 15.32,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.99,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 3.666666666667,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 3.666666666667,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "焦炉煤气",
                    "classSort": 9,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "净消耗量",
                            "dataUnit": "吨，10³标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "千焦/千克，千焦/标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 16747,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 0.000001,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.000001,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 13.58,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.99,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 3.666666666667,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 3.666666666667,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "其它煤气",
                    "classSort": 10,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "净消耗量",
                            "dataUnit": "吨，10³标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "千焦/千克，千焦/标准立方米",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 52270,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 0.000001,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.000001,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 12.2,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.99,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 3.666666666667,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 3.666666666667,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                }
            ]
        },
        {
            "className": "脱硫过程排放",
            "classSort": 2,
            "classDataSum": 0,
            "canAdd": true,
            "children": [
                {
                    "className": "CaCO₃",
                    "classSort": 1,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "脱硫剂全年的消耗量",
                            "dataUnit": "吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "脱硫剂中碳酸盐含量",
                            "dataUnit": "%",
                            "dataNum": 0.9,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.9,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "完全转化时脱硫过程的排放因子",
                            "dataUnit": "吨二氧化碳/吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.44,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "转化率",
                            "dataUnit": "%",
                            "dataNum": 1,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 1,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "MgCO₃",
                    "classSort": 2,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "脱硫剂全年的消耗量",
                            "dataUnit": "吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "脱硫剂中碳酸盐含量",
                            "dataUnit": "%",
                            "dataNum": 0.9,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.9,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "完全转化时脱硫过程的排放因子",
                            "dataUnit": "吨二氧化碳/吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.522,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "转化率",
                            "dataUnit": "%",
                            "dataNum": 1,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 1,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "Na₂CO₃",
                    "classSort": 3,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "脱硫剂全年的消耗量",
                            "dataUnit": "吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "脱硫剂中碳酸盐含量",
                            "dataUnit": "%",
                            "dataNum": 0.9,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.9,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "完全转化时脱硫过程的排放因子",
                            "dataUnit": "吨二氧化碳/吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.415,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "转化率",
                            "dataUnit": "%",
                            "dataNum": 1,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 1,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "BaCO₃",
                    "classSort": 4,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "脱硫剂全年的消耗量",
                            "dataUnit": "吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "脱硫剂中碳酸盐含量",
                            "dataUnit": "%",
                            "dataNum": 0.9,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.9,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "完全转化时脱硫过程的排放因子",
                            "dataUnit": "吨二氧化碳/吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.223,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "转化率",
                            "dataUnit": "%",
                            "dataNum": 1,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 1,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "Li₂CO₃",
                    "classSort": 5,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "脱硫剂全年的消耗量",
                            "dataUnit": "吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "脱硫剂中碳酸盐含量",
                            "dataUnit": "%",
                            "dataNum": 0.9,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.9,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "完全转化时脱硫过程的排放因子",
                            "dataUnit": "吨二氧化碳/吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.596,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "转化率",
                            "dataUnit": "%",
                            "dataNum": 1,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 1,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "K₂CO₃",
                    "classSort": 6,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "脱硫剂全年的消耗量",
                            "dataUnit": "吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "脱硫剂中碳酸盐含量",
                            "dataUnit": "%",
                            "dataNum": 0.9,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.9,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "完全转化时脱硫过程的排放因子",
                            "dataUnit": "吨二氧化碳/吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.318,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "转化率",
                            "dataUnit": "%",
                            "dataNum": 1,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 1,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "SrCO₃",
                    "classSort": 7,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "脱硫剂全年的消耗量",
                            "dataUnit": "吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "脱硫剂中碳酸盐含量",
                            "dataUnit": "%",
                            "dataNum": 0.9,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.9,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "完全转化时脱硫过程的排放因子",
                            "dataUnit": "吨二氧化碳/吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.298,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "转化率",
                            "dataUnit": "%",
                            "dataNum": 1,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 1,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "NaHCO₃",
                    "classSort": 8,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "脱硫剂全年的消耗量",
                            "dataUnit": "吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "脱硫剂中碳酸盐含量",
                            "dataUnit": "%",
                            "dataNum": 0.9,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.9,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "完全转化时脱硫过程的排放因子",
                            "dataUnit": "吨二氧化碳/吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.524,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "转化率",
                            "dataUnit": "%",
                            "dataNum": 1,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 1,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                },
                {
                    "className": "FeCO₃",
                    "classSort": 9,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "脱硫剂全年的消耗量",
                            "dataUnit": "吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "脱硫剂中碳酸盐含量",
                            "dataUnit": "%",
                            "dataNum": 0.9,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.9,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "完全转化时脱硫过程的排放因子",
                            "dataUnit": "吨二氧化碳/吨",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.38,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": true,
                            "dataName": "转化率",
                            "dataUnit": "%",
                            "dataNum": 1,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 1,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                }
            ]
        },
        {
            "className": "净购入使用电力产生的排放",
            "classSort": 3,
            "classDataSum": 0,
            "canAdd": false,
            "children": [
                {
                    "className": "电力产生的排放",
                    "classSort": 1,
                    "classDataSum": 0,
                    "activityFactorNum": 0,
                    "activityFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "企业的净购入电量",
                            "dataUnit": "兆瓦时",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ],
                    "EmissionFactorNum": 0,
                    "EmissionFactor": [
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "企业供电排放因子",
                            "dataUnit": "吨二氧化碳/兆瓦时",
                            "dataNum": 0,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.7769,
                                    "description": "默认值"
                                },
                                {
                                    "val": 0.8843,
                                    "description": "默认值"
                                },
                                {
                                    "val": 0.7035,
                                    "description": "默认值"
                                },
                                {
                                    "val": 0.5257,
                                    "description": "默认值"
                                },
                                {
                                    "val": 0.6671,
                                    "description": "默认值"
                                },
                                {
                                    "val": 0.5271,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        }
                    ]
                }
            ]
        }
    ],
    "taskYear": 2023,
    "enterpriseID": "91350122MA31GW0N65",
    "enterpriseClass": 1
}

export const taskInfo_tem = { "taskYear": 2023, "taskDescription": "经酸重造国称相候务存日二风千。产总格头世少话识给公什高确效许但。史共学文这国动反出原增例只眼。关日问平清空快被少易改和作农数快。素则里且历始布状实文习件五真。", "taskBeginTime": "1709015511", "taskEndTime": "1709015511", "auditStatus": "REFUSE", "isBegin": true }