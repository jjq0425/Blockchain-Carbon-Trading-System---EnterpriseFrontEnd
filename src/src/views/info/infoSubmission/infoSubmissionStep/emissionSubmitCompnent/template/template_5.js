export const template_5 = {
    "reportPDF": "", //碳核算报告url（不含数据来源），与10各参考文档一致
    "dataSourcePDF": "", //数据来源报告的PDFurl（即各种贴图，如电费发票等）
    "taskYear": 2023,
    "enterpriseID": "", //企业ID
    "enterpriseClass": 5, //企业类别3（代表
    "sumEmission": 0.00, //各个大类的classDataSum的和。企业本年度碳排放量
    "detail": [ //后端请完整存储detail的json
        {
            "className": "化石燃料燃烧排放", //大类名
            "classSort": 1, //大类排序，1为最先。数字越大越靠后，不写0
            "classDataSum": 0.00, //大类累计值，企业前端计算出来，=各个小类classDataSum求和
            "canAdd": true,
            "children": [
                {
                    "className": "无烟煤", //小类名
                    "classSort": 1, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT"
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 20.304,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "tC/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 27.49,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.94,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "烟煤", //小类名
                    "classSort": 2, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 19.570,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 26.18,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.93,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "褐煤", //小类名
                    "classSort": 3, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 14.080,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 28.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.96,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "洗精煤", //小类名
                    "classSort": 4, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 26.344,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 25.40,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.90,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "其他洗煤", //小类名
                    "classSort": 5, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 8.363,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 25.40,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.90,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "其他煤制品", //小类名
                    "classSort": 6, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 17.460,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 33.60,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.90,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "焦炭", //小类名
                    "classSort": 7, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 28.447,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 29.50,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.93,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "原油", //小类名
                    "classSort": 8, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 41.816,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 20.10,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.98,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "燃料油", //小类名
                    "classSort": 9, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 41.816,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 21.10,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.98,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "汽油", //小类名
                    "classSort": 10, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 43.07,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 18.90,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.98,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "柴油", //小类名
                    "classSort": 11, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 42.652,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 20.20,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.98,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "一般煤油", //小类名
                    "classSort": 12, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 44.75,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 19.60,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.98,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "液化天然气", //小类名
                    "classSort": 13, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 41.868,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 17.20,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.98,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "液化石油气", //小类名
                    "classSort": 14, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 50.179,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 17.20,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.98,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "焦油", //小类名
                    "classSort": 15, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 33.453,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 22.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.98,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "粗苯", //小类名
                    "classSort": 16, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 41.816,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 22.70,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.98,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "焦炉煤气", //小类名
                    "classSort": 17, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨，10³标准立方米", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 173.54,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 12.10,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.99,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "高炉煤气", //小类名
                    "classSort": 18, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨，10³标准立方米", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 33.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 70.80,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.99,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "转炉煤气", //小类名
                    "classSort": 19, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨，10³标准立方米", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 84.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 49.60,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.99,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "其他煤气", //小类名
                    "classSort": 20, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨，10³标准立方米", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 52.27,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 12.20,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.99,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "天然气", //小类名
                    "classSort": 21, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨，10³标准立方米", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 389.31,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 15.30,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.99,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "炼厂干气", //小类名
                    "classSort": 22, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨，10³标准立方米", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t, GJ/万Nm³",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 45.998,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 18.20,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.99,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
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
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                }
            ]
        }, //以上为全部的化石燃料燃烧的子类，共22个子项  
        {
            "className": "能源的原材料用途", //大类名
            "classSort": 2, //大类排序，1为最先。数字越大越靠后，不写0
            "classDataSum": 0.00, //大类累计值，企业前端计算出来，=各个小类classDataSum求和
            "canAdd": false,
            "children": [
                {
                    "className": "炭阳极消耗", //小类名
                    "classSort": 1, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "原铝产量", //该值的名字
                            "dataUnit": "t", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactorExtraCalcu": "[1]*(1-[2]-[3])*[4]",
                    "EmissionFactor": [ //排放因子，计算时采用全是是化石燃料时的航空汽油和航空煤油的排放因子

                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "吨铝炭阳极净耗",
                            "dataUnit": "tC/t-Al",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.42,//南方区域供电排放因子
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "炭阳极平均含硫量",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.02,//南方区域供电排放因子
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 3,
                            "isConst": false,
                            "dataName": "炭阳极平均灰分含量",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.004,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 4,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 3.666666666667,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 3.666666666667,//南方区域供电排放因子
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                }
            ]
        },//以上为2子类，共1个子项,
        {
            "className": "工业生产过程排放(阳极效应)", //大类名
            "classSort": 3, //大类排序，1为最先。数字越大越靠后，不写0
            "classDataSum": 0.00, //大类累计值，企业前端计算出来，=各个小类classDataSum求和
            "canAdd": false,
            "children": [
                {
                    "className": "阳极效应", //小类名
                    "classSort": 1, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "原铝产量", //该值的名字
                            "dataUnit": "t", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactorExtraCalcu": "([1]*[3]+[2]*[4])*[5]",
                    "EmissionFactor": [ //排放因子，计算时采用全是是化石燃料时的航空汽油和航空煤油的排放因子

                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "四氟化碳排放因子",
                            "dataUnit": "公斤四氟化碳／吨铝",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.034,//南方区域供电排放因子
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "六氟化二碳排放因子",
                            "dataUnit": "公斤六氟化二碳／吨铝",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.034,//南方区域供电排放因子
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 6500,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 6500,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 4,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 9200,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 9200,//南方区域供电排放因子
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },
                        {
                            "dataSort": 5,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 0.001,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.001,//南方区域供电排放因子
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                }
            ]
        },//以上3子类，共1个子项,
        {
            "className": "工业生产过程排放(煅烧石灰石)", //大类名
            "classSort": 4, //大类排序，1为最先。数字越大越靠后，不写0
            "classDataSum": 0.00, //大类累计值，企业前端计算出来，=各个小类classDataSum求和
            "canAdd": false,
            "children": [
                {
                    "className": "煅烧石灰石", //小类名
                    "classSort": 1, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "石灰石原料消耗量", //该值的名字
                            "dataUnit": "t", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子，计算时采用全是是化石燃料时的航空汽油和航空煤油的排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "煅烧石灰石的二氧化碳排放因子  ",
                            "dataUnit": "tCO₂/t石灰石",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.405,//南方区域供电排放因子
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        },

                    ]
                }
            ]
        },//以上4子类，共2个子项
        {
            "className": "净购入电力、热力", //大类名
            "classSort": 5, //大类排序，1为最先。数字越大越靠后，不写0
            "classDataSum": 0.00, //大类累计值，企业前端计算出来，=各个小类classDataSum求和
            "canAdd": false,
            "children": [
                {
                    "className": "电力", //小类名
                    "classSort": 1, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净购入电量", //该值的名字
                            "dataUnit": "MWh", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子，计算时采用全是是化石燃料时的航空汽油和航空煤油的排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "区域电网年平均供电排放因子",
                            "dataUnit": "tCO₂/MWh",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.7769,//东北供电排放因子
                                    "description": "东北地区"
                                },
                                {
                                    "val": 0.8843,//华北供电排放因子
                                    "description": "华北地区"
                                },
                                {
                                    "val": 0.7035,//华东区域供电排放因子
                                    "description": "华东地区"
                                },
                                {
                                    "val": 0.5257,//华中区域供电排放因子
                                    "description": "华中地区"
                                },
                                {
                                    "val": 0.6671,//西北区域供电排放因子
                                    "description": "西北地区"
                                },
                                {
                                    "val": 0.5271,//南方区域供电排放因子
                                    "description": "南方地区"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "热力", //小类名
                    "classSort": 2, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净购入热力", //该值的名字
                            "dataUnit": "GJ", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 0.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子，计算时采用全是是化石燃料时的航空汽油和航空煤油的排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "热力供应的二氧化碳排放因子",
                            "dataUnit": "tCO₂/GJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.11,//热力供应的二氧化碳排放因子暂按0.11tCO2/GJ计
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                }
            ]
        }//以上为全部的电力、热力排放的子类，共2个子项
    ]
}
