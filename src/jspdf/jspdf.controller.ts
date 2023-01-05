import { Controller, Get } from '@nestjs/common';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import jsPDF from 'jspdf';
import { JspdfService } from './jspdf.service';
import fs from 'fs';

@Controller('jspdf')
export class JspdfController {
    constructor(private readonly jspdfService: JspdfService) {}

    chartOptions: EChartsOption = {};

    @Get()
    getJspdfs() {
        let doc = new jsPDF();
        this.jspdfService.getChartSvgString();
    }

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
