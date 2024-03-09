<template>
  <div>
    <div>
      <a-result title="碳流图加载中" v-show="!isInit">
        <template #icon><a-icon type="loading" /> </template
      ></a-result>
    </div>
    <div id="SangJiData"></div>
  </div>
</template>

<script>
import { default as VChart } from '@visactor/vchart'
export default {
  data() {
    return {
      dataSource: null,
      isInit: false,
      sangjiData: [],
    }
  },
  methods: {
    passSourceData(submitData) {
      this.dataSource = JSON.parse(JSON.stringify(submitData))

      this.sangjiDataTrans()
    },
    sangjiDataTrans() {
      let dataSource_temp = JSON.parse(JSON.stringify(this.dataSource))
      this.sangjiData.push({
        nodes: [
          {
            value: dataSource_temp.sumEmission,
            name: '总排放量',
            children: dataSource_temp.detail,
          },
        ],
      })
      this.sangjiData[0].nodes[0].children.forEach((item) => {
        item.value = item.classDataSum
        item.name = item.className
        for (let i = 0; i < item.children.length; i++) {
          if (item.children[i].classDataSum > 0) {
            item.children[i].value = item.children[i].classDataSum
            item.children[i].name = item.children[i].className
            item.children[i].children = []
            for (let j = 0; j < item.children[i].activityFactor.length; j++) {
              if (!item.children[i].activityFactor[j].isConst)
                item.children[i].children.push({
                  value: item.children[i].activityFactor[j].dataNum,
                  name: item.children[i].activityFactor[j].dataName,
                })
            }
            for (let j = 0; j < item.children[i].EmissionFactor.length; j++) {
              if (!item.children[i].EmissionFactor[j].isConst)
                item.children[i].children.push({
                  value: item.children[i].EmissionFactor[j].dataNum,
                  name: item.children[i].EmissionFactor[j].dataName,
                })
            }
          }
        }
      })
      //   console.log(this.sangjiData)
      setTimeout(() => {
        this.initGraph()
      }, 1500)
    },
    initGraph() {
      if (this.isInit) {
        return
      }
      this.isInit = true
      const spec = {
        type: 'sankey',
        data: [
          {
            name: 'data',
            values: this.sangjiData,
          },
        ],
        categoryField: 'name',
        valueField: 'value',

        nodeAlign: 'left',
        nodeGap: 12,
        nodeWidth: 14,
        minNodeHeight: 4,
        nodeKey: (datum) => datum.name,

        title: {
          text: '碳流分布图',
          subtext: '您可以直观看到各个模块/小类所占总排量的比例与对应关系，点击各个波浪可以突出显示，更直观哦',
          subtextStyle: {
            fontSize: 12,
          },
        },

        label: {
          visible: true,
          state: {
            blur: {
              fill: '#e8e8e8',
              fillOpacity: 0.15,
            },
          },
        },

        node: {
          state: {
            hover: {
              fill: 'red',
            },
            blur: {
              fill: '#e8e8e8',
              fillOpacity: 0.15,
            },
          },
        },

        link: {
          backgroundStyle: { fill: '#ccc', fillOpacity: 0.2 },
          fillOpacity: 0.8,
          state: {
            hover: {
              stroke: '#dee2e6',
            },
            blur: {
              fill: '#e8e8e8',
            },
          },
        },

        emphasis: {
          enable: true,
          effect: 'related',
        },
      }

      const vchart = new VChart(spec, { dom: 'SangJiData' })
      vchart.renderSync()

      // Just for the convenience of console debugging, DO NOT COPY!
      //   window['vchart'] = vchart
    },
  },
}
</script>

<style>
</style>