import { Controller, Get } from '@nestjs/common';
import echarts from 'echarts';
import jsPDF from 'jspdf';
import { JspdfService } from './jspdf.service';

@Controller('jspdf')
export class JspdfController {
    constructor(private readonly jspdfService: JspdfService) {}

    chart1 = echarts.init(document.getElementById("chart1"));
    chart2 = echarts.init(document.getElementById("chart2"));

    @Get()
    getJspdfs() {
        var doc = new jsPDF();

        this.chart1.setOption({
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
    }


    // this.chart2.setOption({
    // backgroundColor: "#fff",
    // xAxis: {
    //     type: "category",
    //     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    // },
    // yAxis: {
    //     type: "value"
    // },
    // series: [
    //     {
    //     data: [150, 230, 224, 218, 135, 147, 260],
    //     type: "line",
    //     areaStyle: {}
    //     }
    // ]
    // });

// window.addEventListener("resize", () => {
//   chart1.resize();
//   chart2.resize();
// });

// function loadImage(src) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = reject;
//     img.src = src;
//   });
// }

// function getChartImage(chart) {
//   return loadImage(chart.getDataURL());
// }

// const btnExport = document.getElementById("export");

// btnExport.addEventListener("click", async () => {
//   console.log("exporting...");

//   try {
//     const img1 = await getChartImage(chart1);
//     const img2 = await getChartImage(chart2);
//     const dpr1 = chart1.getDevicePixelRatio();
//     const dpr2 = chart2.getDevicePixelRatio();

//     const doc = new jspdf.jsPDF({
//       unit: "px"
//     });

//     doc.addImage(img1.src, "PNG", 0, 0, img1.width / dpr1, img1.height / dpr1);
//     doc.addPage();
//     doc.addImage(img2.src, "PNG", 0, 0, img1.width / dpr2, img1.height / dpr2);

//     await doc.save("charts.pdf", {
//       returnPromise: true
//     });

//     console.log("exported");
//   } catch (e) {
//     console.error("failed to export", e);
//   }
// });

// const btnExportHTML = document.getElementById("exportByHTML");

// btnExportHTML.addEventListener("click", async () => {
//   console.log("exporting...");
//   try {
//     const doc = new jspdf.jsPDF({
//       unit: "px",
//       orientation: "l",
//       hotfixes: ["px_scaling"]
//     });
//     await doc
//       .html(document.querySelector(".chart-box"), {
//         filename: "charts.pdf",
//         // callback: function (doc) {
//         //   doc.save('charts.pdf');
//         // },
//         html2canvas: {
//           allowTaint: true,
//           backgroundColor: "transparent"
//           // logging: false
//         }
//       })
//       .save();

//     // another way:
//     // const canvas = await html2canvas(document.querySelector(".chart-box"))
//     // const img = await loadImage(canvas.toDataURL())
//     // const dpr = chart1.getDevicePixelRatio()
//     // doc.addImage(img.src, 'PNG', 0, 0, img.width / dpr, img.height / dpr)
//     // await doc.save()
//   } catch (e) {
//     console.error("failed to export", e);
//   }
//   console.log("exported");
// });

}
