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
    Columns.push({
        title: '#',
        key: 'index',
        scopedSlots: { customRender: 'index' },
        width: 100,
        customHeaderCell: () => ({
            style: {
                textAlign: 'center',  //头部单元格水平居中
            },
        }),
        align: 'center',

    });
    console.log(template_children)
    let activityFactorColArr = []
    // 以第0个小类为基准
    for (let i = 0; i < template_children[0].activityFactor.length; i++) {
        if (template_children[0].activityFactor[i].isConst) {
            continue
        }
        activityFactorColArr.push({

            title: template_children[0].activityFactor[i].dataName,
            dataIndex: `activityFactor_${template_children[0].activityFactor[i].dataSort}`,
            key: `activityFactor_${template_children[0].activityFactor[i].dataSort}`,
            scopedSlots: { customRender: `activityFactor_${template_children[0].activityFactor[i].dataSort}` },
            width: 230,
            customHeaderCell: () => ({
                style: {
                    textAlign: 'center',  //头部单元格水平居中
                },
            }),

        })
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
            dataIndex: `EmissionFactor_${template_children[0].EmissionFactor[i].dataSort}`,
            key: `EmissionFactor_${template_children[0].EmissionFactor[i].dataSort}`,
            scopedSlots: { customRender: `EmissionFactor_${template_children[0].EmissionFactor[i].dataSort}` },
            width: 230,
            customHeaderCell: () => ({
                style: {
                    textAlign: 'center',  //头部单元格水平居中
                },
            }),

        })
    }
    let EmissionFactorCol = {
        title: '排放因子',
        children: EmissionFactorColArr
    }
    Columns.push(EmissionFactorCol)
    Columns.push({
        title: '总排放量',
        key: 'sum',
        scopedSlots: { customRender: 'sum' },
        fixed: 'right',
        width: 100,
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
        scopedSlots: { customRender: 'operation' },
        fixed: 'right',
        width: 120,
        customHeaderCell: () => ({
            style: {
                textAlign: 'center',  //头部单元格水平居中
            },
        }),

    },)

    return Columns


}