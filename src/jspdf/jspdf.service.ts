import { Injectable } from '@nestjs/common';
import * as echarts from 'echarts';

@Injectable()
export class JspdfService {

  chartSvgString: string;

  constructor() {};

  getChartSvgString(): string {   // Putôt à mettre dans un service...
    const myChart = echarts.init(null, null, {
        renderer: 'svg',
        ssr: true,
        width: 400,
        height: 300
    });

    myChart.setOption({
        backgroundColor: "#fff",
        series: [
            {
                type: "pie",
                radius: [20, 140],
                roseType: "radius",
                itemStyle: {
                    borderRadius: 5
                },
                label: {
                    show: false
                },
                data: [
                    { value: 40, name: "rose 1" },
                    { value: 33, name: "rose 2" },
                    { value: 28, name: "rose 3" },
                    { value: 22, name: "rose 4" },
                    { value: 20, name: "rose 5" },
                    { value: 15, name: "rose 6" },
                    { value: 12, name: "rose 7" },
                    { value: 10, name: "rose 8" }
                ]
            }
        ]
    });

    // Solution 1 : transformer en image via getDataUrl :/
    // let imgString = myChart.getDataURL({
    //     pixelRatio: 2,
    //     backgroundColor: '#fff'
    // });
    // console.log(imgString);

    // Solution 2 : transformer en svg :)
    const fs = require('fs')
    let svgString = myChart.renderToSVGString();
    fs.writeFile('bar.svg', svgString, (err) => {  
        if (err) throw err;
        console.log('SVG written!');
    });

    return svgString;
  }
}
