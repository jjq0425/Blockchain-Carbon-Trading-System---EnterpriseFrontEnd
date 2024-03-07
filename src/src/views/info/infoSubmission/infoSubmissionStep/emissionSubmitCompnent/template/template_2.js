export const template_2 = {
    "reportPDF": "", //碳核算报告url（不含数据来源），与10各参考文档一致
    "dataSourcePDF": "", //数据来源报告的PDFurl（即各种贴图，如电费发票等）
    "taskYear": 2023,
    "enterpriseID": "", //企业ID
    "enterpriseClass": 2, //企业类别3（代表
    "sumEmission": 0.00, //各个大类的classDataSum的和。企业本年度碳排放量
    "detail": [ //后端请完整存储detail的json
        {
            "className": "使用六氟化硫设备修理与退役过程产生的排放", //大类名
            "classSort": 1, //大类排序，1为最先。数字越大越靠后，不写0
            "classDataSum": 0.00, //大类累计值，企业前端计算出来，=各个小类classDataSum求和
            "canAdd": true,
            "children": [
                {
                    "className": "修理设备", //小类名
                    "classSort": 1, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "设备六氟化硫容量", //该值的名字
                            "dataUnit": "kg", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [

                            ],
                            "dataSource": "MEASURE" //该值来源
                        },
                        {
                            "dataSort": 2, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "六氟化硫实际回收量", //该值的名字
                            "dataUnit": "kg", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [],
                            "dataSource": "MEASURE" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子，计算时采用全是是化石燃料时的航空汽油和航空煤油的排放因子
                        {
                            "dataSort": 1,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "tCO₂/MWh",
                            "dataNum": 23.9,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 23.9,//东北供电排放因子
                                    "description": "默认值"
                                },

                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                },
                {
                    "className": "退役设备", //小类名
                    "classSort": 1, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "设备六氟化硫容量", //该值的名字
                            "dataUnit": "kg", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [

                            ],
                            "dataSource": "MEASURE" //该值来源
                        },
                        {
                            "dataSort": 2, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "六氟化硫实际回收量", //该值的名字
                            "dataUnit": "kg", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [],
                            "dataSource": "MEASURE" //该值来源
                        }
                    ],
                    "EmissionFactorNum": 0.00, //活动水平数值，即EmissionFactor各个子元素相乘
                    "EmissionFactor": [ //排放因子，计算时采用全是是化石燃料时的航空汽油和航空煤油的排放因子
                        {
                            "dataSort": 1,
                            "isConst": true,
                            "dataName": "常数",
                            "dataUnit": "tCO₂/MWh",
                            "dataNum": 23.9,
                            "defaultValChooseIdx": 0,
                            "defaultVal": [
                                {
                                    "val": 23.9,//东北供电排放因子
                                    "description": "默认值"
                                },

                            ],
                            "dataSource": "DEFAULT" //该值来源
                        }
                    ]
                }
            ]
        },//以上为1子类，共2个子项
        {
            "className": "输配电引起的二氧化碳排放", //大类名
            "classSort": 2, //大类排序，1为最先。数字越大越靠后，不写0
            "classDataSum": 0.00, //大类累计值，企业前端计算出来，=各个小类classDataSum求和
            "canAdd": false,
            "children": [

                {
                    "className": "输配电", //小类名
                    "classSort": 1, //小类排序。各个大类之间编号独立。
                    "classDataSum": 0.00, //小类累计值，activityFactorNum*EmissionFactorNum
                    "activityFactorNum": 0.00, //活动水平数值，即activityFactor各个子元素相乘。若其中有除法请转化为分之一。
                    "activityFactorExtraCalcu": "[1]+[2]-[3]-[4]",
                    "activityFactor": [ //活动水平
                        {
                            "dataSort": 1, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "电厂上网电量", //该值的名字
                            "dataUnit": "兆瓦时", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [

                            ],
                            "dataSource": "MEASURE" //该值来源
                        },
                        {
                            "dataSort": 2, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "自外省输入电量", //该值的名字
                            "dataUnit": "兆瓦时", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [

                            ],
                            "dataSource": "MEASURE" //该值来源
                        },
                        {
                            "dataSort": 3, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "向外省输出电量", //该值的名字
                            "dataUnit": "兆瓦时", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [

                            ],
                            "dataSource": "MEASURE" //该值来源
                        },
                        {
                            "dataSort": 4, //活动水平数据排序
                            "isConst": false, //该值是否常数
                            "dataName": "售电量", //该值的名字
                            "dataUnit": "兆瓦时", //该值的单位
                            "dataNum": 0.00, //该值的数据值
                            "defaultValChooseIdx": 0, //默认选择的缺省值数组的下标，下标从0编号。若defaultVal为空填-1.
                            "defaultVal": [

                            ],
                            "dataSource": "MEASURE" //该值来源
                        },
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
                }
            ]
        }//以上为全部的电力、热力排放的子类，共2个子项
    ]
}
