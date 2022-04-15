/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.06687402799378, "KoPercent": 0.9331259720062208};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8609422492401215, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "product2"], "isController": false}, {"data": [1.0, 500, 1500, "viewcart"], "isController": false}, {"data": [0.5, 500, 1500, "product1"], "isController": false}, {"data": [1.0, 500, 1500, "deleteitem"], "isController": false}, {"data": [1.0, 500, 1500, "product2-12"], "isController": false}, {"data": [0.3333333333333333, 500, 1500, "homePage"], "isController": false}, {"data": [1.0, 500, 1500, "product2-11"], "isController": false}, {"data": [1.0, 500, 1500, "product2-10"], "isController": false}, {"data": [0.5, 500, 1500, "product3"], "isController": false}, {"data": [1.0, 500, 1500, "signup"], "isController": false}, {"data": [0.0, 500, 1500, "RegisterUser"], "isController": true}, {"data": [1.0, 500, 1500, "product1-7"], "isController": false}, {"data": [1.0, 500, 1500, "product1-8"], "isController": false}, {"data": [0.8, 500, 1500, "homePage-11"], "isController": false}, {"data": [1.0, 500, 1500, "product1-9"], "isController": false}, {"data": [0.9, 500, 1500, "homePage-10"], "isController": false}, {"data": [1.0, 500, 1500, "product1-3"], "isController": false}, {"data": [1.0, 500, 1500, "product1-4"], "isController": false}, {"data": [1.0, 500, 1500, "product1-5"], "isController": false}, {"data": [1.0, 500, 1500, "product1-6"], "isController": false}, {"data": [1.0, 500, 1500, "product1-0"], "isController": false}, {"data": [1.0, 500, 1500, "product1-1"], "isController": false}, {"data": [0.5, 500, 1500, "product1-2"], "isController": false}, {"data": [0.7833333333333333, 500, 1500, "login"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "homePage-13"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "homePage-12"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "homePage-15"], "isController": false}, {"data": [1.0, 500, 1500, "homePage-14"], "isController": false}, {"data": [1.0, 500, 1500, "productid2"], "isController": false}, {"data": [1.0, 500, 1500, "addtocart2"], "isController": false}, {"data": [1.0, 500, 1500, "productid3"], "isController": false}, {"data": [1.0, 500, 1500, "addtocart3"], "isController": false}, {"data": [1.0, 500, 1500, "addtocart1"], "isController": false}, {"data": [0.0, 500, 1500, "productid1"], "isController": false}, {"data": [1.0, 500, 1500, "https://api.demoblaze.com/check"], "isController": false}, {"data": [1.0, 500, 1500, "product3-12"], "isController": false}, {"data": [1.0, 500, 1500, "product3-11"], "isController": false}, {"data": [1.0, 500, 1500, "product3-10"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "homePage-1"], "isController": false}, {"data": [1.0, 500, 1500, "product2-6"], "isController": false}, {"data": [0.9, 500, 1500, "homePage-2"], "isController": false}, {"data": [1.0, 500, 1500, "product2-7"], "isController": false}, {"data": [1.0, 500, 1500, "product2-8"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "homePage-0"], "isController": false}, {"data": [1.0, 500, 1500, "product2-9"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "homePage-5"], "isController": false}, {"data": [1.0, 500, 1500, "product2-2"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "homePage-6"], "isController": false}, {"data": [1.0, 500, 1500, "product2-3"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "homePage-3"], "isController": false}, {"data": [1.0, 500, 1500, "product2-4"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "homePage-4"], "isController": false}, {"data": [1.0, 500, 1500, "product2-5"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "homePage-9"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "homePage-7"], "isController": false}, {"data": [1.0, 500, 1500, "product2-0"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "homePage-8"], "isController": false}, {"data": [1.0, 500, 1500, "product2-1"], "isController": false}, {"data": [1.0, 500, 1500, "viewProduct2"], "isController": false}, {"data": [1.0, 500, 1500, "viewProduct1"], "isController": false}, {"data": [0.7666666666666667, 500, 1500, "https://www.demoblaze.com/index.html-11"], "isController": false}, {"data": [0.8, 500, 1500, "https://www.demoblaze.com/index.html-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.demoblaze.com/index.html-13"], "isController": false}, {"data": [1.0, 500, 1500, "deletecartUser"], "isController": false}, {"data": [0.8, 500, 1500, "https://www.demoblaze.com/index.html-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.demoblaze.com/index.html-15"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.demoblaze.com/index.html-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.demoblaze.com/index.html-4"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "https://www.demoblaze.com/index.html-3"], "isController": false}, {"data": [1.0, 500, 1500, "product1-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.demoblaze.com/index.html-6"], "isController": false}, {"data": [1.0, 500, 1500, "check"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.demoblaze.com/index.html-5"], "isController": false}, {"data": [1.0, 500, 1500, "product1-10"], "isController": false}, {"data": [1.0, 500, 1500, "product3-9"], "isController": false}, {"data": [0.7333333333333333, 500, 1500, "https://www.demoblaze.com/index.html-8"], "isController": false}, {"data": [1.0, 500, 1500, "product1-11"], "isController": false}, {"data": [0.8, 500, 1500, "https://www.demoblaze.com/index.html-7"], "isController": false}, {"data": [0.7666666666666667, 500, 1500, "https://www.demoblaze.com/index.html-9"], "isController": false}, {"data": [1.0, 500, 1500, "product3-5"], "isController": false}, {"data": [1.0, 500, 1500, "product3-6"], "isController": false}, {"data": [0.8, 500, 1500, "entries"], "isController": false}, {"data": [1.0, 500, 1500, "product3-7"], "isController": false}, {"data": [0.5, 500, 1500, "product3-8"], "isController": false}, {"data": [1.0, 500, 1500, "viewcartAfterDeleting"], "isController": false}, {"data": [1.0, 500, 1500, "product3-1"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "https://www.demoblaze.com/index.html-0"], "isController": false}, {"data": [1.0, 500, 1500, "product3-2"], "isController": false}, {"data": [1.0, 500, 1500, "product3-3"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "https://www.demoblaze.com/index.html-2"], "isController": false}, {"data": [1.0, 500, 1500, "product3-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://www.demoblaze.com/index.html-1"], "isController": false}, {"data": [1.0, 500, 1500, "product3-0"], "isController": false}, {"data": [1.0, 500, 1500, "bycat1"], "isController": false}, {"data": [1.0, 500, 1500, "bycat2"], "isController": false}, {"data": [1.0, 500, 1500, "bycat3"], "isController": false}, {"data": [0.36666666666666664, 500, 1500, "https://www.demoblaze.com/index.html"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 643, 6, 0.9331259720062208, 404.86625194401273, 11, 2985, 318.0, 617.8000000000001, 1222.3999999999999, 1769.9199999999928, 9.84701143968514, 433.33391758487875, 8.757118098094915], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["product2", 1, 0, 0.0, 1030.0, 1030, 1030, 1030.0, 1030.0, 1030.0, 1030.0, 0.970873786407767, 7.065382281553398, 6.861536711165049], "isController": false}, {"data": ["viewcart", 1, 0, 0.0, 319.0, 319, 319, 319.0, 319.0, 319.0, 319.0, 3.134796238244514, 1.4204545454545454, 1.3806573275862069], "isController": false}, {"data": ["product1", 1, 0, 0.0, 1459.0, 1459, 1459, 1459.0, 1459.0, 1459.0, 1459.0, 0.6854009595613434, 271.5533166980809, 4.643189898903358], "isController": false}, {"data": ["deleteitem", 1, 0, 0.0, 343.0, 343, 343, 343.0, 343.0, 343.0, 343.0, 2.9154518950437316, 0.5865069241982507, 1.2783573250728861], "isController": false}, {"data": ["product2-12", 1, 0, 0.0, 459.0, 459, 459, 459.0, 459.0, 459.0, 459.0, 2.1786492374727673, 0.3510518790849673, 1.1446418845315904], "isController": false}, {"data": ["homePage", 15, 2, 13.333333333333334, 1473.0666666666668, 1063, 2985, 1265.0, 2593.8, 2985.0, 2985.0, 1.4423076923076923, 639.4231708233173, 11.737530048076923], "isController": false}, {"data": ["product2-11", 1, 0, 0.0, 264.0, 264, 264, 264.0, 264.0, 264.0, 264.0, 3.787878787878788, 0.6103515625, 2.1269827178030303], "isController": false}, {"data": ["product2-10", 1, 0, 0.0, 257.0, 257, 257, 257.0, 257.0, 257.0, 257.0, 3.8910505836575875, 0.6269759241245136, 2.162116974708171], "isController": false}, {"data": ["product3", 1, 0, 0.0, 1271.0, 1271, 1271, 1271.0, 1271.0, 1271.0, 1271.0, 0.7867820613690008, 5.797907651455548, 5.561258359559402], "isController": false}, {"data": ["signup", 15, 0, 0.0, 295.0666666666666, 286, 305, 295.0, 303.8, 305.0, 305.0, 1.944516463572725, 0.4880280577521389, 0.8373067636764324], "isController": false}, {"data": ["RegisterUser", 15, 2, 13.333333333333334, 2262.0, 1853, 3793, 2045.0, 3393.4, 3793.0, 3793.0, 1.3371367445177393, 596.9602598780976, 11.911833938759138], "isController": true}, {"data": ["product1-7", 1, 0, 0.0, 423.0, 423, 423, 423.0, 423.0, 423.0, 423.0, 2.3640661938534278, 200.75400783096927, 1.2489841903073287], "isController": false}, {"data": ["product1-8", 1, 0, 0.0, 491.0, 491, 491, 491.0, 491.0, 491.0, 491.0, 2.0366598778004072, 317.8919774694501, 1.0779977087576376], "isController": false}, {"data": ["homePage-11", 15, 1, 6.666666666666667, 469.26666666666665, 228, 669, 467.0, 660.6, 669.0, 669.0, 1.920860545524395, 280.5511869317454, 0.9489251184530669], "isController": false}, {"data": ["product1-9", 1, 0, 0.0, 392.0, 392, 392, 392.0, 392.0, 392.0, 392.0, 2.5510204081632653, 181.88725685586735, 1.4125279017857142], "isController": false}, {"data": ["homePage-10", 15, 1, 6.666666666666667, 353.8666666666666, 11, 633, 353.0, 510.6000000000001, 633.0, 633.0, 1.9549068161084324, 84.04177493320735, 0.9639625146618012], "isController": false}, {"data": ["product1-3", 1, 0, 0.0, 298.0, 298, 298, 298.0, 298.0, 298.0, 298.0, 3.3557046979865772, 41.59566380033557, 1.7892722315436242], "isController": false}, {"data": ["product1-4", 1, 0, 0.0, 270.0, 270, 270, 270.0, 270.0, 270.0, 270.0, 3.7037037037037037, 5.078125, 1.880787037037037], "isController": false}, {"data": ["product1-5", 1, 0, 0.0, 272.0, 272, 272, 272.0, 272.0, 272.0, 272.0, 3.676470588235294, 3.7554572610294117, 1.866957720588235], "isController": false}, {"data": ["product1-6", 1, 0, 0.0, 282.0, 282, 282, 282.0, 282.0, 282.0, 282.0, 3.5460992907801416, 14.762716090425533, 1.7626606826241136], "isController": false}, {"data": ["product1-0", 1, 0, 0.0, 470.0, 470, 470, 470.0, 470.0, 470.0, 470.0, 2.127659574468085, 11.128656914893618, 1.078374335106383], "isController": false}, {"data": ["product1-1", 1, 0, 0.0, 287.0, 287, 287, 287.0, 287.0, 287.0, 287.0, 3.484320557491289, 18.656767203832754, 1.748965592334495], "isController": false}, {"data": ["product1-2", 1, 0, 0.0, 542.0, 542, 542, 542.0, 542.0, 542.0, 542.0, 1.8450184501845017, 51.166830027675275, 0.994580258302583], "isController": false}, {"data": ["login", 30, 0, 0.0, 665.1666666666666, 462, 2121, 487.5, 1547.5000000000007, 1959.85, 2121.0, 2.9895366218236172, 0.7241257162431489, 1.277657106377678], "isController": false}, {"data": ["homePage-13", 15, 0, 0.0, 202.53333333333333, 79, 515, 252.0, 377.6000000000001, 515.0, 515.0, 2.0029376418747495, 22.237302209907867, 1.0640606222459608], "isController": false}, {"data": ["homePage-12", 15, 0, 0.0, 362.2, 154, 604, 397.0, 596.2, 604.0, 604.0, 1.9430051813471503, 138.0811305861399, 1.075863220531088], "isController": false}, {"data": ["homePage-15", 15, 1, 6.666666666666667, 116.4, 19, 282, 80.0, 280.8, 282.0, 282.0, 1.939487975174554, 5.474381586177916, 0.9086299133695371], "isController": false}, {"data": ["homePage-14", 15, 0, 0.0, 154.00000000000003, 79, 293, 88.0, 291.8, 293.0, 293.0, 1.996539331824837, 30.20636625682151, 1.0723599926793559], "isController": false}, {"data": ["productid2", 1, 0, 0.0, 296.0, 296, 296, 296.0, 296.0, 296.0, 296.0, 3.3783783783783785, 1.8013619087837838, 1.3460726351351353], "isController": false}, {"data": ["addtocart2", 1, 0, 0.0, 327.0, 327, 327, 327.0, 327.0, 327.0, 327.0, 3.058103975535168, 0.5883266437308868, 1.5200926987767585], "isController": false}, {"data": ["productid3", 1, 0, 0.0, 296.0, 296, 296, 296.0, 296.0, 296.0, 296.0, 3.3783783783783785, 2.0652977195945947, 1.3493718327702704], "isController": false}, {"data": ["addtocart3", 1, 0, 0.0, 337.0, 337, 337, 337.0, 337.0, 337.0, 337.0, 2.967359050445104, 0.5708688798219584, 1.4778839020771513], "isController": false}, {"data": ["addtocart1", 1, 0, 0.0, 328.0, 328, 328, 328.0, 328.0, 328.0, 328.0, 3.048780487804878, 0.5865329649390244, 1.515458269817073], "isController": false}, {"data": ["productid1", 1, 0, 0.0, 2111.0, 2111, 2111, 2111.0, 2111.0, 2111.0, 2111.0, 0.4737091425864519, 0.22852765277119846, 0.18874348649928943], "isController": false}, {"data": ["https://api.demoblaze.com/check", 15, 0, 0.0, 310.9333333333334, 288, 467, 298.0, 387.80000000000007, 467.0, 467.0, 0.4317913584156136, 0.12776638828118253, 0.18342699307694524], "isController": false}, {"data": ["product3-12", 1, 0, 0.0, 451.0, 451, 451, 451.0, 451.0, 451.0, 451.0, 2.2172949002217295, 0.51751316518847, 1.164945953436807], "isController": false}, {"data": ["product3-11", 1, 0, 0.0, 243.0, 243, 243, 243.0, 243.0, 243.0, 243.0, 4.11522633744856, 0.6630979938271605, 2.3107960390946505], "isController": false}, {"data": ["product3-10", 1, 0, 0.0, 75.0, 75, 75, 75.0, 75.0, 75.0, 75.0, 13.333333333333334, 2.1484375, 7.408854166666667], "isController": false}, {"data": ["homePage-1", 15, 0, 0.0, 250.2, 82, 525, 265.0, 485.40000000000003, 525.0, 525.0, 1.866832607342875, 10.614936605476043, 0.937062461107654], "isController": false}, {"data": ["product2-6", 1, 0, 0.0, 72.0, 72, 72, 72.0, 72.0, 72.0, 72.0, 13.888888888888888, 2.237955729166667, 7.242838541666667], "isController": false}, {"data": ["homePage-2", 15, 0, 0.0, 352.0666666666667, 140, 629, 328.0, 570.2, 629.0, 629.0, 1.8516232563881, 51.397855010183925, 0.9981406616467102], "isController": false}, {"data": ["product2-7", 1, 0, 0.0, 258.0, 258, 258, 258.0, 258.0, 258.0, 258.0, 3.875968992248062, 0.6245457848837209, 2.1423812984496124], "isController": false}, {"data": ["product2-8", 1, 0, 0.0, 444.0, 444, 444, 444.0, 444.0, 444.0, 444.0, 2.2522522522522523, 0.36291173986486486, 1.2470967060810811], "isController": false}, {"data": ["homePage-0", 15, 0, 0.0, 472.8666666666667, 244, 1622, 288.0, 1232.0000000000002, 1622.0, 1622.0, 1.5711741908452916, 15.415510107887293, 0.7871214452183931], "isController": false}, {"data": ["product2-9", 1, 0, 0.0, 261.0, 261, 261, 261.0, 261.0, 261.0, 261.0, 3.8314176245210727, 0.6173670977011494, 2.2150383141762453], "isController": false}, {"data": ["homePage-5", 15, 0, 0.0, 292.6666666666667, 76, 619, 262.0, 538.6, 619.0, 619.0, 1.9103413143148242, 1.8054964101502802, 0.9700951986754967], "isController": false}, {"data": ["product2-2", 1, 0, 0.0, 277.0, 277, 277, 277.0, 277.0, 277.0, 277.0, 3.6101083032490977, 0.5817069043321299, 2.034211416967509], "isController": false}, {"data": ["homePage-6", 15, 0, 0.0, 279.53333333333336, 82, 607, 266.0, 431.2000000000001, 607.0, 607.0, 1.864975755315181, 7.764054340731072, 0.9270240814994406], "isController": false}, {"data": ["product2-3", 1, 0, 0.0, 278.0, 278, 278, 278.0, 278.0, 278.0, 278.0, 3.5971223021582737, 0.5796144334532374, 2.005817221223021], "isController": false}, {"data": ["homePage-3", 15, 0, 0.0, 313.26666666666665, 92, 759, 293.0, 606.0000000000001, 759.0, 759.0, 1.8575851393188854, 22.54776993034056, 0.9904702012383901], "isController": false}, {"data": ["product2-4", 1, 0, 0.0, 73.0, 73, 73, 73.0, 73.0, 73.0, 73.0, 13.698630136986301, 2.207298801369863, 7.290774828767124], "isController": false}, {"data": ["homePage-4", 15, 0, 0.0, 316.7333333333333, 240, 509, 275.0, 480.8, 509.0, 509.0, 1.8679950186799503, 2.3245349470734746, 0.9485912204234123], "isController": false}, {"data": ["product2-5", 1, 0, 0.0, 278.0, 278, 278, 278.0, 278.0, 278.0, 278.0, 3.5971223021582737, 0.5796144334532374, 1.914484037769784], "isController": false}, {"data": ["homePage-9", 15, 0, 0.0, 359.53333333333336, 155, 562, 342.0, 542.8, 562.0, 562.0, 1.899696048632219, 64.7436449230623, 0.9535583681610942], "isController": false}, {"data": ["homePage-7", 15, 0, 0.0, 363.6000000000001, 147, 638, 321.0, 624.8, 638.0, 638.0, 1.907911472907657, 51.57136880723734, 0.9595453208471126], "isController": false}, {"data": ["product2-0", 1, 0, 0.0, 283.0, 283, 283, 283.0, 283.0, 283.0, 283.0, 3.5335689045936394, 18.882508833922262, 1.7909397084805656], "isController": false}, {"data": ["homePage-8", 15, 1, 6.666666666666667, 309.8, 35, 528, 330.0, 525.6, 528.0, 528.0, 1.8682276746792876, 58.49474366359447, 0.8735423931996513], "isController": false}, {"data": ["product2-1", 1, 0, 0.0, 284.0, 284, 284, 284.0, 284.0, 284.0, 284.0, 3.5211267605633805, 0.5673690580985916, 1.8534055897887325], "isController": false}, {"data": ["viewProduct2", 1, 0, 0.0, 296.0, 296, 296, 296.0, 296.0, 296.0, 296.0, 3.3783783783783785, 2.0652977195945947, 1.339474239864865], "isController": false}, {"data": ["viewProduct1", 1, 0, 0.0, 303.0, 303, 303, 303.0, 303.0, 303.0, 303.0, 3.3003300330033003, 1.5921514026402641, 1.305306311881188], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-11", 15, 0, 0.0, 533.4666666666666, 228, 691, 485.0, 689.8, 691.0, 691.0, 0.42902496925321054, 67.08752265788118, 0.22708157552269542], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-10", 15, 0, 0.0, 415.4666666666667, 117, 662, 327.0, 632.6, 662.0, 662.0, 0.43377674956622325, 19.581292473973395, 0.22917306788606132], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-13", 15, 0, 0.0, 171.60000000000002, 80, 465, 84.0, 361.20000000000005, 465.0, 465.0, 0.43513576235785567, 3.961321869923416, 0.2311658737526108], "isController": false}, {"data": ["deletecartUser", 1, 0, 0.0, 456.0, 456, 456, 456.0, 456.0, 456.0, 456.0, 2.1929824561403506, 0.44116639254385964, 0.9123149671052632], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-12", 15, 0, 0.0, 459.4666666666667, 160, 704, 405.0, 677.0, 704.0, 704.0, 0.43458106385444434, 35.41914890920153, 0.24063228828659175], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-15", 15, 0, 0.0, 174.0, 75, 310, 80.0, 303.4, 310.0, 310.0, 0.43514838559948943, 1.2236565246874185, 0.21842409199036875], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-14", 15, 0, 0.0, 194.66666666666669, 81, 294, 284.0, 292.8, 294.0, 294.0, 0.4375856938650486, 6.649849625499576, 0.23503137854079756], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-4", 15, 0, 0.0, 313.93333333333334, 77, 479, 259.0, 471.2, 479.0, 479.0, 0.4346314325452017, 0.5527119643167594, 0.22071127433936022], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-3", 15, 0, 0.0, 326.53333333333336, 91, 786, 271.0, 636.6000000000001, 786.0, 786.0, 0.42890229605695823, 5.185222126712035, 0.22869204457724532], "isController": false}, {"data": ["product1-12", 1, 0, 0.0, 439.0, 439, 439, 439.0, 439.0, 439.0, 439.0, 2.277904328018223, 6.0662549829157175, 1.1411766799544418], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-6", 15, 0, 0.0, 318.2666666666667, 79, 465, 271.0, 465.0, 465.0, 465.0, 0.4323514152302992, 1.7999160968034817, 0.21490905307834207], "isController": false}, {"data": ["check", 1, 0, 0.0, 290.0, 290, 290, 290.0, 290.0, 290.0, 290.0, 3.4482758620689653, 1.0203394396551724, 1.46484375], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-5", 15, 0, 0.0, 306.59999999999997, 234, 461, 259.0, 455.6, 461.0, 461.0, 0.4325010091690214, 0.4116362143907502, 0.21962941871864367], "isController": false}, {"data": ["product1-10", 1, 0, 0.0, 266.0, 266, 266, 266.0, 266.0, 266.0, 266.0, 3.7593984962406015, 33.746475563909776, 1.9971804511278195], "isController": false}, {"data": ["product3-9", 1, 0, 0.0, 263.0, 263, 263, 263.0, 263.0, 263.0, 263.0, 3.802281368821293, 0.6126722908745247, 2.1981939163498097], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-8", 15, 0, 0.0, 439.46666666666664, 250, 642, 518.0, 588.6, 642.0, 642.0, 0.4318162190171863, 14.396910175029507, 0.2163298050349771], "isController": false}, {"data": ["product1-11", 1, 0, 0.0, 279.0, 279, 279, 279.0, 279.0, 279.0, 279.0, 3.5842293906810037, 53.70743727598566, 1.9251232078853044], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-7", 15, 0, 0.0, 409.2, 301, 651, 340.0, 570.0, 651.0, 651.0, 0.43404033681530135, 11.732794143710757, 0.21829177095691427], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-9", 15, 0, 0.0, 418.9333333333334, 310, 543, 349.0, 535.8, 543.0, 543.0, 0.42991029205239173, 14.651908129961882, 0.2157948145653607], "isController": false}, {"data": ["product3-5", 1, 0, 0.0, 83.0, 83, 83, 83.0, 83.0, 83.0, 83.0, 12.048192771084338, 1.941359186746988, 6.4123682228915655], "isController": false}, {"data": ["product3-6", 1, 0, 0.0, 276.0, 276, 276, 276.0, 276.0, 276.0, 276.0, 3.6231884057971016, 0.5838145380434782, 1.8894361413043477], "isController": false}, {"data": ["entries", 15, 0, 0.0, 493.8666666666667, 460, 514, 497.0, 514.0, 514.0, 514.0, 1.8946570670708602, 5.423085804281925, 0.6438873626373627], "isController": false}, {"data": ["product3-7", 1, 0, 0.0, 249.0, 249, 249, 249.0, 249.0, 249.0, 249.0, 4.016064257028112, 0.6471197289156626, 2.219816767068273], "isController": false}, {"data": ["product3-8", 1, 0, 0.0, 823.0, 823, 823, 823.0, 823.0, 823.0, 823.0, 1.215066828675577, 0.1957871354799514, 0.6727957928311058], "isController": false}, {"data": ["viewcartAfterDeleting", 1, 0, 0.0, 344.0, 344, 344, 344.0, 344.0, 344.0, 344.0, 2.9069767441860463, 1.0929551235465118, 1.2803188590116281], "isController": false}, {"data": ["product3-1", 1, 0, 0.0, 284.0, 284, 284, 284.0, 284.0, 284.0, 284.0, 3.5211267605633805, 0.5673690580985916, 1.8534055897887325], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-0", 15, 0, 0.0, 393.5333333333333, 252, 507, 443.0, 506.4, 507.0, 507.0, 0.4321396675405491, 5.91069158552044, 0.21649184516435713], "isController": false}, {"data": ["product3-2", 1, 0, 0.0, 73.0, 73, 73, 73.0, 73.0, 73.0, 73.0, 13.698630136986301, 2.207298801369863, 7.718857020547945], "isController": false}, {"data": ["product3-3", 1, 0, 0.0, 74.0, 74, 74, 74.0, 74.0, 74.0, 74.0, 13.513513513513514, 2.1774704391891895, 7.535367398648649], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-2", 15, 0, 0.0, 366.5333333333333, 143, 541, 327.0, 527.2, 541.0, 541.0, 0.43165467625899284, 11.99468862410072, 0.2326888489208633], "isController": false}, {"data": ["product3-4", 1, 0, 0.0, 271.0, 271, 271, 271.0, 271.0, 271.0, 271.0, 3.6900369003690034, 0.5945860239852399, 1.9639356549815496], "isController": false}, {"data": ["https://www.demoblaze.com/index.html-1", 15, 0, 0.0, 316.1333333333333, 80, 496, 281.0, 491.8, 496.0, 496.0, 0.4321645682675963, 2.4556288534674002, 0.21692635555619577], "isController": false}, {"data": ["product3-0", 1, 0, 0.0, 368.0, 368, 368, 368.0, 368.0, 368.0, 368.0, 2.717391304347826, 14.57413383152174, 1.3799252717391304], "isController": false}, {"data": ["bycat1", 1, 0, 0.0, 315.0, 315, 315, 315.0, 315.0, 315.0, 315.0, 3.1746031746031744, 6.674727182539683, 1.2834821428571428], "isController": false}, {"data": ["bycat2", 1, 0, 0.0, 322.0, 322, 322, 322.0, 322.0, 322.0, 322.0, 3.105590062111801, 7.351513975155279, 1.2646787655279503], "isController": false}, {"data": ["bycat3", 1, 0, 0.0, 303.0, 303, 303, 303.0, 303.0, 303.0, 303.0, 3.3003300330033003, 2.4688015676567656, 1.3407590759075907], "isController": false}, {"data": ["https://www.demoblaze.com/index.html", 15, 0, 0.0, 1427.1333333333334, 1215, 1696, 1426.0, 1622.8, 1696.0, 1696.0, 0.4201916073729621, 197.57600872247744, 3.477249688357891], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 3, 50.0, 0.4665629860031104], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket operation on nonsocket: connect", 1, 16.666666666666668, 0.15552099533437014], "isController": false}, {"data": ["Assertion failed", 2, 33.333333333333336, 0.3110419906687403], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 643, 6, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 3, "Assertion failed", 2, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket operation on nonsocket: connect", 1, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["homePage", 15, 2, "Assertion failed", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["homePage-11", 15, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["homePage-10", 15, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket operation on nonsocket: connect", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["homePage-15", 15, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["homePage-8", 15, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
