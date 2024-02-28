/*
 * @Author: jjq
 * @Description: 
 * 
 */


export function GetMainClassName(template) {
    let mainClassName = [];
    let mainClassNum = template.detail.length
    for (let i = 0; i < mainClassNum; i++) {
        mainClassName.push(template.detail[i].className)
    }
    let tem = {}

    console.log(tem)
    return mainClassName
}


/**
 * 
 * @param {Array} template_children 传入的是每个小类的信息,即第一个children数组.
 */
export function ConstructColumns(template_children) {

    let Columns = [];
    let ColKey = []
    Columns.push({
        title: '#',
        key: 'index',
        scopedSlots: { customRender: 'index' },
        width: 50,
        customHeaderCell: () => ({
            style: {
                textAlign: 'center',  //头部单元格水平居中
            },
        }),
        align: 'center',

    });
    Columns.push({
        title: '排放源',
        key: 'emissionName',
        scopedSlots: { customRender: 'emissionName' },
        width: 100,
        customHeaderCell: () => ({
            style: {
                textAlign: 'center',  //头部单元格水平居中
            },
        }),
        align: 'center',
    },)
    // console.log(template_children)
    let activityFactorColArr = []
    // 以第0个小类为基准

    for (let i = 0; i < template_children[0].activityFactor.length; i++) {
        if (template_children[0].activityFactor[i].isConst) {
            continue
        }
        activityFactorColArr.push({

            title: template_children[0].activityFactor[i].dataName,
            // dataIndex: `activityFactor_${template_children[0].activityFactor[i].dataSort}`,
            key: `activityFactor_${template_children[0].activityFactor[i].dataSort}`,
            scopedSlots: { customRender: `activityFactor_${template_children[0].activityFactor[i].dataSort}` },
            width: 230,
            customHeaderCell: () => ({
                style: {
                    textAlign: 'center',  //头部单元格水平居中
                },
            }),
            align: 'center',

        })
        ColKey.push(`activityFactor_${template_children[0].activityFactor[i].dataSort}`)
    }
    let activityFactorCol = {
        title: '活动水平',
        children: activityFactorColArr
    }
    Columns.push(activityFactorCol)

    let EmissionFactorColArr = []
    for (let i = 0; i < template_children[0].EmissionFactor.length; i++) {
        if (template_children[0].EmissionFactor[i].isConst) {
            continue
        }
        EmissionFactorColArr.push({

            title: template_children[0].EmissionFactor[i].dataName,
            // dataIndex: `EmissionFactor_${template_children[0].EmissionFactor[i].dataSort}`,
            key: `EmissionFactor_${template_children[0].EmissionFactor[i].dataSort}`,
            scopedSlots: { customRender: `EmissionFactor_${template_children[0].EmissionFactor[i].dataSort}` },
            width: 230,
            customHeaderCell: () => ({
                style: {
                    textAlign: 'center',  //头部单元格水平居中
                },
            }),
            align: 'center',

        })
        ColKey.push(`EmissionFactor_${template_children[0].EmissionFactor[i].dataSort}`)
    }
    let EmissionFactorCol = {
        title: '排放因子',
        children: EmissionFactorColArr
    }
    Columns.push(EmissionFactorCol)
    Columns.push({
        title: '总排放量(tCO₂)',
        key: 'sum',
        // dataIndex: 'sum',
        scopedSlots: { customRender: 'sum' },
        fixed: 'right',
        width: 130,
        customHeaderCell: () => ({
            style: {
                textAlign: 'center',  //头部单元格水平居中
            },
        }),
        align: 'center',
    },)
    Columns.push({
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        fixed: 'right',
        width: 120,
        customHeaderCell: () => ({
            style: {
                textAlign: 'center',  //头部单元格水平居中
            },
        }),

    },)

    return { Columns: Columns, ColKey: ColKey }


}


export function ConstructInitData(template_children, col_key) {
    let dataSource = []
    for (let i = 0; i < template_children.length; i++) {
        let obj = {}
        obj.emissionName = template_children[i].className
        // colkey是以activityFactor_或者EmissionFactor_开头的
        for (let j = 0; j < col_key.length; j++) {
            let [prefix, suffix] = col_key[j].split('_');
            if (prefix === 'activityFactor') {
                let target = template_children[i].activityFactor.find(item => item.dataSort === parseInt(suffix));
                if (target) {
                    obj[col_key[j]]['dataNum'] = target.dataNum;
                    obj[col_key[j]]['defaultVal'] = target.defaultVal;
                    obj[col_key[j]]['dataSource'] = target.dataSource;
                }
            }
        }

    }
}