export const template_Standard =
{
    "reportPDF": "",//碳核算报告url（不含数据来源），与10各参考文档一致
    "dataSourcePDF": "",//数据来源报告的PDFurl（即各种贴图，如电费发票等）
    "taskYear": 2023,
    "erterpriseID": "",//企业ID
    "enterpriseClass": 1,//企业类别1（代表发电）
    "sumEmission": 0.00,//各个大类的classDataSum的和。企业本年度碳排放量
    "detail": [//后端请完整存储detail的json
        {
            "className": "化石燃料燃烧", //大类名
            "classSort": 1, //大类排序，1为最先。数字越大越靠后，不写0
            "classDataSum": 0.00, //大类累计值，企业前端计算出来，=各个小类classDataSum求和
            "children": [
                {
                    "className": "燃煤", //小类名
                    "classSort": 1, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "t，万Nm³", //该值的单位
                            "dataNum": 10.00, //该值的数据值
                            "defaultValChooseIdx": 0,//默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [
                                {
                                    "val": 10.00,
                                    "description": "默认值"
                                }
                            ],
                            //因为核算购电时，缺省值还需要分为东北、华北、华东、华中、西北、南方进行选择，故选用数组。核算购电排放因子时，即数组中需要六个元素，默认值为一个即数组中有一个元素即可。默认值没有，则留空数组。
                            "dataSource": "DEFAULT" //该值来源（来源可以分为如下几类。（发票INVOICE,测量MEASURE,使用USE，专家EXPERT，自行评估ESTIMATE，缺省值DEFAULT））
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "GJ/t， GJ/万Nm³",
                            "dataNum": 10.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 10.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源

                        },
                        {
                            "dataSort": 3,//常数的dataSort就接着上面的动态值写即可，上一个是2这个就是3
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
                            "dataSource": "DEFAULT" //该值来源
                            //说明，因为在发电行业计算时需要化石实际消耗量*低位发热值*10^{-6}，所以10^{-6}是常数 "isConst": true，前端计算时候需要乘以这个数据。
                        }
                    ],
                    "EmissionFactorNum": 2, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "tC/GJ",
                            "dataNum": 2.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 2.00,
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
                            "dataNum": 1.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 1.00,
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
        }
    ]
}



export const template_1 = {
    "reportPDF": "", //碳核算报告url（不含数据来源），与10各参考文档一致
    "dataSourcePDF": "", //数据来源报告的PDFurl（即各种贴图，如电费发票等）
    "taskYear": 2023,
    "erterpriseID": "", //企业ID
    "sumEmission": 0.00, //各个大类的classDataSum的和。企业本年度碳排放量
    "detail": [ //后端请完整存储detail的json
        {
            "className": "化石燃料燃烧", //大类名
            "classSort": 1, //大类排序，1为最先。数字越大越靠后，不写0
            "classDataSum": 0.00, //大类累计值，企业前端计算出来，=各个小类classDataSum求和
            "children": [
                {
                    "className": "燃煤", //小类名
                    "classSort": 1, //小类排序
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨，10³标准立方米", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 10.00,
                                    "description": "默认值"
                                }
                            ],
                            //因为核算购电时，缺省值还需要分为东北、华北、华东、华中、西北、南方进行选择，故选用数组。核算购电排放因子时，即数组中需要六个元素
                            "dataSource": "DEFAULT" //该值来源（来源可以分为如下几类。（发票INVOICE,测量MEASURE,使用USE，专家EXPERT，自行评估ESTIMATE，缺省值DEFAULT））
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "千焦/千克，千焦/标准立方米",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 29271.20, //该值的链接
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
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.000001,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                            //说明，因为在发电行业计算时需要化石实际消耗量*低位发热值*10^{-6}，所以10^{-6}是常数 "isConst": true，前端计算时候需要乘以这个数据。
                        }
                    ],
                    "EmissionFactorNum": 2, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [],
                            "dataSource": "MEASURE" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [],
                            "dataSource": "MEASURE" //该值来源
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 0.00,
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
                    "classSort": 2, //小类排序
                    "classDataSum": 0.00, //小类累计值，假定静消耗量为10吨，其他值均按照表格缺省值
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨，10³标准立方米", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 10.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源（具体值参考第一小类备注）
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "千焦/千克，千焦/标准立方米",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 41816.00,
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
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.000001,
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
                                    "val": 20.08,
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
                            "dataNum": 0.00,
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
        },
        {
            "className": "化石燃料燃烧2", //大类名
            "classSort": 2, //大类排序，1为最先。数字越大越靠后，不写0
            "classDataSum": 0.00, //大类累计值，企业前端计算出来，=各个小类classDataSum求和
            "children": [
                {
                    "className": "燃煤", //小类名
                    "classSort": 1, //小类排序
                    "classDataSum": 1.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨，10³标准立方米", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 10.00,
                                    "description": "默认值"
                                }
                            ],
                            //因为核算购电时，缺省值还需要分为东北、华北、华东、华中、西北、南方进行选择，故选用数组。核算购电排放因子时，即数组中需要六个元素
                            "dataSource": "DEFAULT" //该值来源（来源可以分为如下几类。（发票INVOICE,测量MEASURE,使用USE，专家EXPERT，自行评估ESTIMATE，缺省值DEFAULT））
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "千焦/千克，千焦/标准立方米",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 29271.20, //该值的链接
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
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.000001,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源
                            //说明，因为在发电行业计算时需要化石实际消耗量*低位发热值*10^{-6}，所以10^{-6}是常数 "isConst": true，前端计算时候需要乘以这个数据。
                        }
                    ],
                    "EmissionFactorNum": 2, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子
                        {
                            "dataSort": 1,
                            "isConst": false,
                            "dataName": "单位热值含碳量",
                            "dataUnit": "吨碳/TJ",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [],
                            "dataSource": "MEASURE" //该值来源
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "碳氧化率",
                            "dataUnit": "%",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [],
                            "dataSource": "MEASURE" //该值来源
                        },
                        {
                            "dataSort": 3,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "",
                            "dataNum": 0.00,
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
                    "classSort": 2, //小类排序
                    "classDataSum": 0.00, //小类累计值，假定静消耗量为10吨，其他值均按照表格缺省值
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "净消耗量", //该值的名字
                            "dataUnit": "吨，10³标准立方米", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 10.00,
                                    "description": "默认值"
                                }
                            ],
                            "dataSource": "DEFAULT" //该值来源（具体值参考第一小类备注）
                        },
                        {
                            "dataSort": 2,
                            "isConst": false,
                            "dataName": "低位发热量",
                            "dataUnit": "千焦/千克，千焦/标准立方米",
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 41816.00,
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
                            "dataNum": 0.00,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 0.000001,
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
                                    "val": 20.08,
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
                            "dataNum": 0.00,
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
        }
    ]
}