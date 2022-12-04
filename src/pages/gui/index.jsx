import EChartsReact from "echarts-for-react";
import * as echarts from "echarts";
import china from "@/assets/getJson.json"; //默认引入全国地图
import React, { useRef } from "react";
echarts.registerMap("map", china); //默认注册全国地图
export default () => {
  let curRef = useRef(null);
  let height = window.screen.availHeight;

  let option = {
    title: {
      text: "全国地图",
      textStyle: {
        color: "#000",
      },
      left: "center",
    },
    series: [
      {
        name: "全国地图",
        type: "map",
        map: "map",
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 0.5, //缩放最小大小
          max: 10, //缩放最大大小
        },

        label: {
          // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
          show: true, //显示省市名称
          position: [1, 100], // 相对的百分比
          fontSize: 12,
          offset: [2, 0], // 是否对文字进行偏移。默认不偏移。例如：`[30, 40]` 表示文字在横向上偏移 `30`，纵向上偏移 `40`。
          align: "left", // 文字水平对齐方式，默认自动。
        },
        itemStyle: {
          // 地图区域的多边形 图形样式
          areaColor: "#fff", // 地图图形颜色
        },
        roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 `'scale'` 或者 `'move'`。设置成 `true` 为都开启
        zoom: 1.25, // 当前视角的缩放比例
      },
    ],
  };

  return (
    <div className="bazaarMap">
      <EChartsReact
        option={option}
        ref={curRef}
        style={{ width: "100%", height: height, zIndex: 222 }}
        lazyUpdate={true}
        notMerge={true}
        onEvents={{
          click: (param) => {
            //echarts点击事件
            if (param.name) {
              //判断名称是否为空
              const echartInstance = curRef.current.getEchartsInstance(); //获取echarts实例
              let options = echartInstance.getOption(); //获取option

              let provinceJSON = null;
              try {
                provinceJSON = require(`@/assets/MapJson/${param.name}.json`); //根据点击的省名称查询Geojson地图数据（我是将地图数据全部保存在本地，可根据API获取地图json）
                echarts.registerMap("map", provinceJSON); //注册点击的省份地图

                options.title[0].text = param.name + "地图";
                options.series[0].name = param.name + "地图";

                // options.series[0].center = china.features.find(item => item.properties.name === param.name)?.properties?.center//修改点击后地图中心位置，不用会存在偏移，我使用下边null,默认全局居中
                options.series[0].center = null; //修改点击后地图中心位置，null默认全局居中
                echartInstance.setOption(options, true); //修改echarts option
              } catch (error) {
                //获取Geojson地图异常返回到全国地图，我只存在市级地图数据，所以点击市级行政区会返回到全国地图。
                options.title[0].text = "全国地图";
                echarts.registerMap("map", china);
                options.series[0].name = "全国地图";

                options.series[0].center = null;
                echartInstance.setOption(options, true);
              }
            }
          },
        }}
      />
    </div>
  );
};
