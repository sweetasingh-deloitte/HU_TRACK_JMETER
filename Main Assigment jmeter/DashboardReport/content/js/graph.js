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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 20.0, "series": [{"data": [[1000.0, 1.0]], "isOverall": false, "label": "product2", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "viewcart", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "product1", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "deleteitem", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "product2-12", "isController": false}, {"data": [[2300.0, 1.0], [1100.0, 2.0], [1200.0, 4.0], [1300.0, 2.0], [1400.0, 2.0], [2900.0, 1.0], [1800.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "homePage", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product2-11", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product2-10", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "product3", "isController": false}, {"data": [[300.0, 3.0], [200.0, 12.0]], "isOverall": false, "label": "signup", "isController": false}, {"data": [[2100.0, 2.0], [2200.0, 1.0], [2600.0, 1.0], [3100.0, 1.0], [3700.0, 1.0], [1800.0, 2.0], [1900.0, 2.0], [2000.0, 5.0]], "isOverall": false, "label": "RegisterUser", "isController": true}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "product1-7", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "product1-8", "isController": false}, {"data": [[300.0, 1.0], [600.0, 3.0], [200.0, 2.0], [400.0, 8.0], [500.0, 1.0]], "isOverall": false, "label": "homePage-11", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "product1-9", "isController": false}, {"data": [[0.0, 1.0], [300.0, 11.0], [600.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "homePage-10", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product1-3", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product1-4", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product1-5", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product1-6", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "product1-0", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product1-1", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "product1-2", "isController": false}, {"data": [[2100.0, 1.0], [1200.0, 1.0], [600.0, 1.0], [1500.0, 1.0], [800.0, 1.0], [400.0, 20.0], [1800.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "login", "isController": false}, {"data": [[0.0, 6.0], [200.0, 7.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "homePage-13", "isController": false}, {"data": [[300.0, 5.0], [600.0, 1.0], [400.0, 4.0], [100.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "homePage-12", "isController": false}, {"data": [[0.0, 12.0], [200.0, 3.0]], "isOverall": false, "label": "homePage-15", "isController": false}, {"data": [[0.0, 9.0], [200.0, 5.0], [100.0, 1.0]], "isOverall": false, "label": "homePage-14", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "productid2", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "addtocart2", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "productid3", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "addtocart3", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "addtocart1", "isController": false}, {"data": [[2100.0, 1.0]], "isOverall": false, "label": "productid1", "isController": false}, {"data": [[300.0, 4.0], [200.0, 10.0], [400.0, 1.0]], "isOverall": false, "label": "https://api.demoblaze.com/check", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "product3-12", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product3-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "product3-10", "isController": false}, {"data": [[0.0, 4.0], [300.0, 1.0], [200.0, 8.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "homePage-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "product2-6", "isController": false}, {"data": [[300.0, 10.0], [600.0, 1.0], [100.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "homePage-2", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product2-7", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "product2-8", "isController": false}, {"data": [[300.0, 1.0], [1600.0, 1.0], [200.0, 8.0], [400.0, 2.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "homePage-0", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product2-9", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [600.0, 1.0], [200.0, 10.0], [400.0, 1.0]], "isOverall": false, "label": "homePage-5", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product2-2", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [600.0, 1.0], [200.0, 10.0], [100.0, 1.0]], "isOverall": false, "label": "homePage-6", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product2-3", "isController": false}, {"data": [[0.0, 2.0], [300.0, 4.0], [700.0, 1.0], [200.0, 5.0], [400.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "homePage-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "product2-4", "isController": false}, {"data": [[300.0, 1.0], [400.0, 3.0], [200.0, 10.0], [500.0, 1.0]], "isOverall": false, "label": "homePage-4", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product2-5", "isController": false}, {"data": [[300.0, 6.0], [200.0, 1.0], [100.0, 3.0], [400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "homePage-9", "isController": false}, {"data": [[300.0, 8.0], [600.0, 2.0], [100.0, 2.0], [200.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "homePage-7", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product2-0", "isController": false}, {"data": [[0.0, 1.0], [300.0, 8.0], [400.0, 1.0], [200.0, 1.0], [100.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "homePage-8", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product2-1", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "viewProduct2", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "viewProduct1", "isController": false}, {"data": [[600.0, 7.0], [200.0, 2.0], [400.0, 6.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-11", "isController": false}, {"data": [[300.0, 7.0], [600.0, 2.0], [400.0, 1.0], [100.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-10", "isController": false}, {"data": [[0.0, 9.0], [200.0, 5.0], [400.0, 1.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-13", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "deletecartUser", "isController": false}, {"data": [[600.0, 4.0], [300.0, 3.0], [700.0, 1.0], [400.0, 4.0], [100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-12", "isController": false}, {"data": [[0.0, 8.0], [300.0, 1.0], [200.0, 6.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-15", "isController": false}, {"data": [[0.0, 7.0], [200.0, 8.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-14", "isController": false}, {"data": [[0.0, 1.0], [200.0, 9.0], [400.0, 5.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-4", "isController": false}, {"data": [[0.0, 1.0], [700.0, 1.0], [200.0, 11.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-3", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "product1-12", "isController": false}, {"data": [[0.0, 1.0], [400.0, 5.0], [200.0, 9.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-6", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "check", "isController": false}, {"data": [[400.0, 4.0], [200.0, 11.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-5", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product1-10", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product3-9", "isController": false}, {"data": [[300.0, 6.0], [600.0, 1.0], [200.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-8", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product1-11", "isController": false}, {"data": [[300.0, 9.0], [600.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-7", "isController": false}, {"data": [[300.0, 8.0], [500.0, 7.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "product3-5", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product3-6", "isController": false}, {"data": [[400.0, 9.0], [500.0, 6.0]], "isOverall": false, "label": "entries", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product3-7", "isController": false}, {"data": [[800.0, 1.0]], "isOverall": false, "label": "product3-8", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "viewcartAfterDeleting", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product3-1", "isController": false}, {"data": [[300.0, 1.0], [200.0, 5.0], [400.0, 7.0], [500.0, 2.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "product3-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "product3-3", "isController": false}, {"data": [[300.0, 10.0], [100.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-2", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "product3-4", "isController": false}, {"data": [[0.0, 3.0], [400.0, 6.0], [200.0, 6.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-1", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "product3-0", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "bycat1", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "bycat2", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "bycat3", "isController": false}, {"data": [[1200.0, 3.0], [1300.0, 3.0], [1400.0, 5.0], [1500.0, 3.0], [1600.0, 1.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 3700.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 6.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 508.0, "series": [{"data": [[0.0, 508.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 117.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 12.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 6.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.65001272E12, "maxY": 11.207547169811324, "series": [{"data": [[1.65001272E12, 2.1333333333333333]], "isOverall": false, "label": "Invalid user", "isController": false}, {"data": [[1.65001272E12, 4.956666666666668]], "isOverall": false, "label": "Registration", "isController": false}, {"data": [[1.65001272E12, 1.0]], "isOverall": false, "label": "Item Buy", "isController": false}, {"data": [[1.65001278E12, 4.404761904761903], [1.65001272E12, 11.207547169811324]], "isOverall": false, "label": "Login", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.65001278E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 48.0, "minX": 1.0, "maxY": 2985.0, "series": [{"data": [[21.0, 1030.0]], "isOverall": false, "label": "product2", "isController": false}, {"data": [[21.0, 1030.0]], "isOverall": false, "label": "product2-Aggregated", "isController": false}, {"data": [[16.0, 319.0]], "isOverall": false, "label": "viewcart", "isController": false}, {"data": [[16.0, 319.0]], "isOverall": false, "label": "viewcart-Aggregated", "isController": false}, {"data": [[16.0, 1459.0]], "isOverall": false, "label": "product1", "isController": false}, {"data": [[16.0, 1459.0]], "isOverall": false, "label": "product1-Aggregated", "isController": false}, {"data": [[16.0, 343.0]], "isOverall": false, "label": "deleteitem", "isController": false}, {"data": [[16.0, 343.0]], "isOverall": false, "label": "deleteitem-Aggregated", "isController": false}, {"data": [[21.0, 459.0]], "isOverall": false, "label": "product2-12", "isController": false}, {"data": [[21.0, 459.0]], "isOverall": false, "label": "product2-12-Aggregated", "isController": false}, {"data": [[16.0, 1164.0], [17.0, 1223.0], [18.0, 1248.0], [19.0, 1143.5], [20.0, 1330.5], [21.0, 1083.0], [22.0, 1314.0], [12.0, 2333.0], [13.0, 2985.0], [14.0, 1413.0], [15.0, 1610.5]], "isOverall": false, "label": "homePage", "isController": false}, {"data": [[17.133333333333333, 1473.0666666666668]], "isOverall": false, "label": "homePage-Aggregated", "isController": false}, {"data": [[21.0, 264.0]], "isOverall": false, "label": "product2-11", "isController": false}, {"data": [[21.0, 264.0]], "isOverall": false, "label": "product2-11-Aggregated", "isController": false}, {"data": [[21.0, 257.0]], "isOverall": false, "label": "product2-10", "isController": false}, {"data": [[21.0, 257.0]], "isOverall": false, "label": "product2-10-Aggregated", "isController": false}, {"data": [[16.0, 1271.0]], "isOverall": false, "label": "product3", "isController": false}, {"data": [[16.0, 1271.0]], "isOverall": false, "label": "product3-Aggregated", "isController": false}, {"data": [[16.0, 297.5], [17.0, 297.0], [18.0, 291.6666666666667], [19.0, 293.0], [20.0, 292.5], [21.0, 305.0], [22.0, 303.0], [15.0, 290.0]], "isOverall": false, "label": "signup", "isController": false}, {"data": [[18.333333333333336, 295.0666666666666]], "isOverall": false, "label": "signup-Aggregated", "isController": false}, {"data": [[16.0, 2266.0], [17.0, 1965.0], [18.0, 2599.0], [19.0, 2406.6666666666665], [20.0, 2122.5], [21.0, 1983.0], [22.0, 2045.0], [15.0, 2178.0]], "isOverall": false, "label": "RegisterUser", "isController": true}, {"data": [[18.333333333333336, 2262.0]], "isOverall": false, "label": "RegisterUser-Aggregated", "isController": true}, {"data": [[16.0, 423.0]], "isOverall": false, "label": "product1-7", "isController": false}, {"data": [[16.0, 423.0]], "isOverall": false, "label": "product1-7-Aggregated", "isController": false}, {"data": [[16.0, 491.0]], "isOverall": false, "label": "product1-8", "isController": false}, {"data": [[16.0, 491.0]], "isOverall": false, "label": "product1-8-Aggregated", "isController": false}, {"data": [[16.0, 428.5], [17.0, 471.0], [18.0, 669.0], [19.0, 556.0], [20.0, 560.0], [21.0, 463.0], [22.0, 516.0], [12.0, 230.0], [13.0, 418.0], [14.0, 228.0], [15.0, 477.5]], "isOverall": false, "label": "homePage-11", "isController": false}, {"data": [[17.133333333333333, 469.26666666666665]], "isOverall": false, "label": "homePage-11-Aggregated", "isController": false}, {"data": [[16.0, 392.0]], "isOverall": false, "label": "product1-9", "isController": false}, {"data": [[16.0, 392.0]], "isOverall": false, "label": "product1-9-Aggregated", "isController": false}, {"data": [[16.0, 349.0], [17.0, 343.0], [18.0, 375.0], [19.0, 343.5], [20.0, 379.0], [21.0, 402.0], [22.0, 334.0], [12.0, 353.0], [13.0, 356.0], [14.0, 358.0], [15.0, 322.0]], "isOverall": false, "label": "homePage-10", "isController": false}, {"data": [[17.133333333333333, 353.8666666666666]], "isOverall": false, "label": "homePage-10-Aggregated", "isController": false}, {"data": [[16.0, 298.0]], "isOverall": false, "label": "product1-3", "isController": false}, {"data": [[16.0, 298.0]], "isOverall": false, "label": "product1-3-Aggregated", "isController": false}, {"data": [[16.0, 270.0]], "isOverall": false, "label": "product1-4", "isController": false}, {"data": [[16.0, 270.0]], "isOverall": false, "label": "product1-4-Aggregated", "isController": false}, {"data": [[16.0, 272.0]], "isOverall": false, "label": "product1-5", "isController": false}, {"data": [[16.0, 272.0]], "isOverall": false, "label": "product1-5-Aggregated", "isController": false}, {"data": [[16.0, 282.0]], "isOverall": false, "label": "product1-6", "isController": false}, {"data": [[16.0, 282.0]], "isOverall": false, "label": "product1-6-Aggregated", "isController": false}, {"data": [[16.0, 470.0]], "isOverall": false, "label": "product1-0", "isController": false}, {"data": [[16.0, 470.0]], "isOverall": false, "label": "product1-0-Aggregated", "isController": false}, {"data": [[16.0, 287.0]], "isOverall": false, "label": "product1-1", "isController": false}, {"data": [[16.0, 287.0]], "isOverall": false, "label": "product1-1-Aggregated", "isController": false}, {"data": [[16.0, 542.0]], "isOverall": false, "label": "product1-2", "isController": false}, {"data": [[16.0, 542.0]], "isOverall": false, "label": "product1-2-Aggregated", "isController": false}, {"data": [[10.0, 1033.5], [11.0, 1321.5], [12.0, 830.5], [13.0, 1828.0], [14.0, 472.5], [15.0, 485.0], [16.0, 485.5], [17.0, 483.25], [18.0, 470.0], [19.0, 476.5], [20.0, 488.0], [21.0, 481.6666666666667], [22.0, 488.0], [23.0, 474.0]], "isOverall": false, "label": "login", "isController": false}, {"data": [[16.1, 665.1666666666666]], "isOverall": false, "label": "login-Aggregated", "isController": false}, {"data": [[16.0, 177.5], [17.0, 515.0], [18.0, 262.0], [19.0, 92.0], [20.0, 180.5], [21.0, 278.0], [22.0, 82.0], [12.0, 286.0], [13.0, 105.0], [14.0, 79.0], [15.0, 265.5]], "isOverall": false, "label": "homePage-13", "isController": false}, {"data": [[17.133333333333333, 202.53333333333333]], "isOverall": false, "label": "homePage-13-Aggregated", "isController": false}, {"data": [[16.0, 287.0], [17.0, 364.0], [18.0, 161.0], [19.0, 504.0], [20.0, 494.0], [21.0, 398.0], [22.0, 393.0], [12.0, 420.0], [13.0, 427.0], [14.0, 156.0], [15.0, 272.0]], "isOverall": false, "label": "homePage-12", "isController": false}, {"data": [[17.133333333333333, 362.2]], "isOverall": false, "label": "homePage-12-Aggregated", "isController": false}, {"data": [[16.0, 48.0], [17.0, 77.0], [18.0, 76.0], [19.0, 279.5], [20.0, 78.5], [21.0, 80.0], [22.0, 81.0], [12.0, 79.0], [13.0, 92.0], [14.0, 89.0], [15.0, 180.0]], "isOverall": false, "label": "homePage-15", "isController": false}, {"data": [[17.133333333333333, 116.4]], "isOverall": false, "label": "homePage-15-Aggregated", "isController": false}, {"data": [[16.0, 82.5], [17.0, 88.0], [18.0, 80.0], [19.0, 88.0], [20.0, 192.5], [21.0, 88.0], [22.0, 85.0], [12.0, 286.0], [13.0, 106.0], [14.0, 288.0], [15.0, 281.5]], "isOverall": false, "label": "homePage-14", "isController": false}, {"data": [[17.133333333333333, 154.00000000000003]], "isOverall": false, "label": "homePage-14-Aggregated", "isController": false}, {"data": [[14.0, 296.0]], "isOverall": false, "label": "productid2", "isController": false}, {"data": [[14.0, 296.0]], "isOverall": false, "label": "productid2-Aggregated", "isController": false}, {"data": [[20.0, 327.0]], "isOverall": false, "label": "addtocart2", "isController": false}, {"data": [[20.0, 327.0]], "isOverall": false, "label": "addtocart2-Aggregated", "isController": false}, {"data": [[20.0, 296.0]], "isOverall": false, "label": "productid3", "isController": false}, {"data": [[20.0, 296.0]], "isOverall": false, "label": "productid3-Aggregated", "isController": false}, {"data": [[16.0, 337.0]], "isOverall": false, "label": "addtocart3", "isController": false}, {"data": [[16.0, 337.0]], "isOverall": false, "label": "addtocart3-Aggregated", "isController": false}, {"data": [[15.0, 328.0]], "isOverall": false, "label": "addtocart1", "isController": false}, {"data": [[15.0, 328.0]], "isOverall": false, "label": "addtocart1-Aggregated", "isController": false}, {"data": [[12.0, 2111.0]], "isOverall": false, "label": "productid1", "isController": false}, {"data": [[12.0, 2111.0]], "isOverall": false, "label": "productid1-Aggregated", "isController": false}, {"data": [[8.0, 297.0], [2.0, 299.0], [9.0, 298.0], [10.0, 293.0], [11.0, 288.0], [12.0, 291.0], [3.0, 295.0], [13.0, 296.0], [14.0, 298.0], [15.0, 304.0], [4.0, 301.0], [1.0, 467.0], [5.0, 335.0], [6.0, 293.0], [7.0, 309.0]], "isOverall": false, "label": "https://api.demoblaze.com/check", "isController": false}, {"data": [[8.0, 310.9333333333334]], "isOverall": false, "label": "https://api.demoblaze.com/check-Aggregated", "isController": false}, {"data": [[16.0, 451.0]], "isOverall": false, "label": "product3-12", "isController": false}, {"data": [[16.0, 451.0]], "isOverall": false, "label": "product3-12-Aggregated", "isController": false}, {"data": [[16.0, 243.0]], "isOverall": false, "label": "product3-11", "isController": false}, {"data": [[16.0, 243.0]], "isOverall": false, "label": "product3-11-Aggregated", "isController": false}, {"data": [[16.0, 75.0]], "isOverall": false, "label": "product3-10", "isController": false}, {"data": [[16.0, 75.0]], "isOverall": false, "label": "product3-10-Aggregated", "isController": false}, {"data": [[16.0, 261.0], [17.0, 459.0], [18.0, 84.0], [19.0, 255.5], [20.0, 173.5], [21.0, 265.0], [22.0, 82.0], [12.0, 313.0], [13.0, 525.0], [14.0, 86.0], [15.0, 279.5]], "isOverall": false, "label": "homePage-1", "isController": false}, {"data": [[17.133333333333333, 250.2]], "isOverall": false, "label": "homePage-1-Aggregated", "isController": false}, {"data": [[21.0, 72.0]], "isOverall": false, "label": "product2-6", "isController": false}, {"data": [[21.0, 72.0]], "isOverall": false, "label": "product2-6-Aggregated", "isController": false}, {"data": [[16.0, 317.0], [17.0, 311.0], [18.0, 328.0], [19.0, 230.0], [20.0, 525.0], [21.0, 143.0], [22.0, 327.0], [12.0, 360.0], [13.0, 360.0], [14.0, 351.0], [15.0, 478.5]], "isOverall": false, "label": "homePage-2", "isController": false}, {"data": [[17.133333333333333, 352.0666666666667]], "isOverall": false, "label": "homePage-2-Aggregated", "isController": false}, {"data": [[21.0, 258.0]], "isOverall": false, "label": "product2-7", "isController": false}, {"data": [[21.0, 258.0]], "isOverall": false, "label": "product2-7-Aggregated", "isController": false}, {"data": [[21.0, 444.0]], "isOverall": false, "label": "product2-8", "isController": false}, {"data": [[21.0, 444.0]], "isOverall": false, "label": "product2-8-Aggregated", "isController": false}, {"data": [[16.0, 369.5], [17.0, 244.0], [18.0, 246.0], [19.0, 256.0], [20.0, 285.5], [21.0, 250.0], [22.0, 308.0], [12.0, 972.0], [13.0, 1622.0], [14.0, 592.0], [15.0, 518.5]], "isOverall": false, "label": "homePage-0", "isController": false}, {"data": [[17.133333333333333, 472.8666666666667]], "isOverall": false, "label": "homePage-0-Aggregated", "isController": false}, {"data": [[21.0, 261.0]], "isOverall": false, "label": "product2-9", "isController": false}, {"data": [[21.0, 261.0]], "isOverall": false, "label": "product2-9-Aggregated", "isController": false}, {"data": [[16.0, 265.0], [17.0, 245.0], [18.0, 258.0], [19.0, 162.5], [20.0, 263.5], [21.0, 252.0], [22.0, 485.0], [12.0, 305.0], [13.0, 314.0], [14.0, 268.0], [15.0, 440.5]], "isOverall": false, "label": "homePage-5", "isController": false}, {"data": [[17.133333333333333, 292.6666666666667]], "isOverall": false, "label": "homePage-5-Aggregated", "isController": false}, {"data": [[21.0, 277.0]], "isOverall": false, "label": "product2-2", "isController": false}, {"data": [[21.0, 277.0]], "isOverall": false, "label": "product2-2-Aggregated", "isController": false}, {"data": [[16.0, 172.5], [17.0, 279.0], [18.0, 261.0], [19.0, 265.5], [20.0, 261.5], [21.0, 264.0], [22.0, 196.0], [12.0, 306.0], [13.0, 314.0], [14.0, 281.0], [15.0, 446.5]], "isOverall": false, "label": "homePage-6", "isController": false}, {"data": [[17.133333333333333, 279.53333333333336]], "isOverall": false, "label": "homePage-6-Aggregated", "isController": false}, {"data": [[21.0, 278.0]], "isOverall": false, "label": "product2-3", "isController": false}, {"data": [[21.0, 278.0]], "isOverall": false, "label": "product2-3-Aggregated", "isController": false}, {"data": [[16.0, 292.0], [17.0, 98.0], [18.0, 282.0], [19.0, 277.5], [20.0, 203.5], [21.0, 278.0], [22.0, 504.0], [12.0, 325.0], [13.0, 323.0], [14.0, 759.0], [15.0, 292.0]], "isOverall": false, "label": "homePage-3", "isController": false}, {"data": [[17.133333333333333, 313.26666666666665]], "isOverall": false, "label": "homePage-3-Aggregated", "isController": false}, {"data": [[21.0, 73.0]], "isOverall": false, "label": "product2-4", "isController": false}, {"data": [[21.0, 73.0]], "isOverall": false, "label": "product2-4-Aggregated", "isController": false}, {"data": [[16.0, 268.0], [17.0, 240.0], [18.0, 462.0], [19.0, 249.0], [20.0, 354.5], [21.0, 262.0], [22.0, 256.0], [12.0, 303.0], [13.0, 509.0], [14.0, 275.0], [15.0, 350.5]], "isOverall": false, "label": "homePage-4", "isController": false}, {"data": [[17.133333333333333, 316.7333333333333]], "isOverall": false, "label": "homePage-4-Aggregated", "isController": false}, {"data": [[21.0, 278.0]], "isOverall": false, "label": "product2-5", "isController": false}, {"data": [[21.0, 278.0]], "isOverall": false, "label": "product2-5-Aggregated", "isController": false}, {"data": [[16.0, 340.0], [17.0, 497.0], [18.0, 352.0], [19.0, 427.0], [20.0, 432.5], [21.0, 562.0], [22.0, 524.0], [12.0, 247.0], [13.0, 181.0], [14.0, 155.0], [15.0, 238.0]], "isOverall": false, "label": "homePage-9", "isController": false}, {"data": [[17.133333333333333, 359.53333333333336]], "isOverall": false, "label": "homePage-9-Aggregated", "isController": false}, {"data": [[16.0, 320.5], [17.0, 327.0], [18.0, 306.0], [19.0, 320.5], [20.0, 583.5], [21.0, 299.0], [22.0, 616.0], [12.0, 147.0], [13.0, 153.0], [14.0, 524.0], [15.0, 316.5]], "isOverall": false, "label": "homePage-7", "isController": false}, {"data": [[17.133333333333333, 363.6000000000001]], "isOverall": false, "label": "homePage-7-Aggregated", "isController": false}, {"data": [[21.0, 283.0]], "isOverall": false, "label": "product2-0", "isController": false}, {"data": [[21.0, 283.0]], "isOverall": false, "label": "product2-0-Aggregated", "isController": false}, {"data": [[16.0, 430.5], [17.0, 323.0], [18.0, 344.0], [19.0, 326.0], [20.0, 331.0], [21.0, 318.0], [22.0, 528.0], [12.0, 406.0], [13.0, 247.0], [14.0, 152.0], [15.0, 77.0]], "isOverall": false, "label": "homePage-8", "isController": false}, {"data": [[17.133333333333333, 309.8]], "isOverall": false, "label": "homePage-8-Aggregated", "isController": false}, {"data": [[21.0, 284.0]], "isOverall": false, "label": "product2-1", "isController": false}, {"data": [[21.0, 284.0]], "isOverall": false, "label": "product2-1-Aggregated", "isController": false}, {"data": [[16.0, 296.0]], "isOverall": false, "label": "viewProduct2", "isController": false}, {"data": [[16.0, 296.0]], "isOverall": false, "label": "viewProduct2-Aggregated", "isController": false}, {"data": [[16.0, 303.0]], "isOverall": false, "label": "viewProduct1", "isController": false}, {"data": [[16.0, 303.0]], "isOverall": false, "label": "viewProduct1-Aggregated", "isController": false}, {"data": [[8.0, 665.0], [2.0, 485.0], [9.0, 475.0], [10.0, 658.0], [11.0, 672.0], [12.0, 455.0], [3.0, 470.0], [13.0, 252.0], [14.0, 689.0], [15.0, 691.0], [1.0, 670.0], [6.0, 530.6666666666666], [7.0, 228.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-11", "isController": false}, {"data": [[8.2, 533.4666666666666]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-11-Aggregated", "isController": false}, {"data": [[8.0, 321.0], [2.0, 662.0], [9.0, 547.0], [10.0, 535.0], [11.0, 411.0], [12.0, 319.0], [3.0, 117.0], [13.0, 551.0], [14.0, 327.0], [15.0, 324.0], [1.0, 323.0], [6.0, 489.6666666666667], [7.0, 326.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-10", "isController": false}, {"data": [[8.2, 415.4666666666667]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-10-Aggregated", "isController": false}, {"data": [[8.0, 80.0], [2.0, 84.0], [9.0, 80.0], [10.0, 84.0], [11.0, 84.0], [12.0, 91.0], [3.0, 292.0], [13.0, 267.0], [14.0, 81.0], [15.0, 284.0], [1.0, 265.0], [6.0, 139.0], [7.0, 465.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-13", "isController": false}, {"data": [[8.2, 171.60000000000002]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-13-Aggregated", "isController": false}, {"data": [[16.0, 456.0]], "isOverall": false, "label": "deletecartUser", "isController": false}, {"data": [[16.0, 456.0]], "isOverall": false, "label": "deletecartUser-Aggregated", "isController": false}, {"data": [[8.0, 384.0], [2.0, 601.0], [9.0, 384.0], [10.0, 704.0], [11.0, 600.0], [12.0, 429.0], [3.0, 402.0], [13.0, 401.0], [14.0, 405.0], [15.0, 606.0], [1.0, 160.0], [6.0, 473.33333333333337], [7.0, 396.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-12", "isController": false}, {"data": [[8.2, 459.4666666666667]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-12-Aggregated", "isController": false}, {"data": [[8.0, 75.0], [2.0, 299.0], [9.0, 276.0], [10.0, 78.0], [11.0, 278.0], [12.0, 282.0], [3.0, 75.0], [13.0, 310.0], [14.0, 80.0], [15.0, 76.0], [1.0, 276.0], [6.0, 142.66666666666666], [7.0, 77.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-15", "isController": false}, {"data": [[8.2, 174.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-15-Aggregated", "isController": false}, {"data": [[8.0, 86.0], [2.0, 284.0], [9.0, 95.0], [10.0, 286.0], [11.0, 292.0], [12.0, 289.0], [3.0, 86.0], [13.0, 86.0], [14.0, 91.0], [15.0, 287.0], [1.0, 81.0], [6.0, 221.0], [7.0, 294.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-14", "isController": false}, {"data": [[8.2, 194.66666666666669]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-14-Aggregated", "isController": false}, {"data": [[8.0, 256.0], [2.0, 464.0], [9.0, 256.0], [10.0, 288.0], [11.0, 259.0], [12.0, 240.0], [3.0, 460.0], [13.0, 479.0], [14.0, 242.0], [15.0, 253.0], [1.0, 77.0], [6.0, 397.6666666666667], [7.0, 242.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-4", "isController": false}, {"data": [[8.2, 313.93333333333334]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-4-Aggregated", "isController": false}, {"data": [[8.0, 262.0], [2.0, 297.0], [9.0, 269.0], [10.0, 265.0], [11.0, 271.0], [12.0, 261.0], [3.0, 786.0], [13.0, 91.0], [14.0, 265.0], [15.0, 273.0], [1.0, 537.0], [6.0, 351.0], [7.0, 268.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-3", "isController": false}, {"data": [[8.2, 326.53333333333336]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-3-Aggregated", "isController": false}, {"data": [[16.0, 439.0]], "isOverall": false, "label": "product1-12", "isController": false}, {"data": [[16.0, 439.0]], "isOverall": false, "label": "product1-12-Aggregated", "isController": false}, {"data": [[8.0, 263.0], [2.0, 464.0], [9.0, 451.0], [10.0, 249.0], [11.0, 263.0], [12.0, 271.0], [3.0, 247.0], [13.0, 261.0], [14.0, 290.0], [15.0, 458.0], [1.0, 258.0], [6.0, 406.6666666666667], [7.0, 79.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-6", "isController": false}, {"data": [[8.2, 318.2666666666667]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-6-Aggregated", "isController": false}, {"data": [[16.0, 290.0]], "isOverall": false, "label": "check", "isController": false}, {"data": [[16.0, 290.0]], "isOverall": false, "label": "check-Aggregated", "isController": false}, {"data": [[8.0, 252.0], [2.0, 256.0], [9.0, 448.0], [10.0, 234.0], [11.0, 273.0], [12.0, 244.0], [3.0, 461.0], [13.0, 259.0], [14.0, 266.0], [15.0, 452.0], [1.0, 246.0], [6.0, 252.66666666666666], [7.0, 450.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-5", "isController": false}, {"data": [[8.2, 306.59999999999997]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-5-Aggregated", "isController": false}, {"data": [[16.0, 266.0]], "isOverall": false, "label": "product1-10", "isController": false}, {"data": [[16.0, 266.0]], "isOverall": false, "label": "product1-10-Aggregated", "isController": false}, {"data": [[16.0, 263.0]], "isOverall": false, "label": "product3-9", "isController": false}, {"data": [[16.0, 263.0]], "isOverall": false, "label": "product3-9-Aggregated", "isController": false}, {"data": [[8.0, 250.0], [2.0, 642.0], [9.0, 355.0], [10.0, 321.0], [11.0, 521.0], [12.0, 528.0], [3.0, 524.0], [13.0, 524.0], [14.0, 335.0], [15.0, 541.0], [1.0, 327.0], [6.0, 465.0], [7.0, 329.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-8", "isController": false}, {"data": [[8.2, 439.46666666666664]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-8-Aggregated", "isController": false}, {"data": [[16.0, 279.0]], "isOverall": false, "label": "product1-11", "isController": false}, {"data": [[16.0, 279.0]], "isOverall": false, "label": "product1-11-Aggregated", "isController": false}, {"data": [[8.0, 318.0], [2.0, 514.0], [9.0, 651.0], [10.0, 512.0], [11.0, 509.0], [12.0, 340.0], [3.0, 338.0], [13.0, 339.0], [14.0, 313.0], [15.0, 512.0], [1.0, 301.0], [6.0, 391.6666666666667], [7.0, 316.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-7", "isController": false}, {"data": [[8.2, 409.2]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-7-Aggregated", "isController": false}, {"data": [[8.0, 316.0], [2.0, 324.0], [9.0, 310.0], [10.0, 509.0], [11.0, 318.0], [12.0, 345.0], [3.0, 330.0], [13.0, 543.0], [14.0, 336.0], [15.0, 531.0], [1.0, 522.0], [6.0, 461.0], [7.0, 517.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-9", "isController": false}, {"data": [[8.2, 418.9333333333334]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-9-Aggregated", "isController": false}, {"data": [[16.0, 83.0]], "isOverall": false, "label": "product3-5", "isController": false}, {"data": [[16.0, 83.0]], "isOverall": false, "label": "product3-5-Aggregated", "isController": false}, {"data": [[16.0, 276.0]], "isOverall": false, "label": "product3-6", "isController": false}, {"data": [[16.0, 276.0]], "isOverall": false, "label": "product3-6-Aggregated", "isController": false}, {"data": [[16.0, 500.0], [17.0, 500.0], [18.0, 494.0], [19.0, 497.0], [20.0, 486.0], [21.0, 505.0], [15.0, 474.5]], "isOverall": false, "label": "entries", "isController": false}, {"data": [[17.53333333333333, 493.8666666666667]], "isOverall": false, "label": "entries-Aggregated", "isController": false}, {"data": [[16.0, 249.0]], "isOverall": false, "label": "product3-7", "isController": false}, {"data": [[16.0, 249.0]], "isOverall": false, "label": "product3-7-Aggregated", "isController": false}, {"data": [[16.0, 823.0]], "isOverall": false, "label": "product3-8", "isController": false}, {"data": [[16.0, 823.0]], "isOverall": false, "label": "product3-8-Aggregated", "isController": false}, {"data": [[16.0, 344.0]], "isOverall": false, "label": "viewcartAfterDeleting", "isController": false}, {"data": [[16.0, 344.0]], "isOverall": false, "label": "viewcartAfterDeleting-Aggregated", "isController": false}, {"data": [[16.0, 284.0]], "isOverall": false, "label": "product3-1", "isController": false}, {"data": [[16.0, 284.0]], "isOverall": false, "label": "product3-1-Aggregated", "isController": false}, {"data": [[8.0, 278.0], [2.0, 443.0], [9.0, 448.0], [10.0, 274.0], [11.0, 266.0], [12.0, 506.0], [3.0, 485.0], [13.0, 318.0], [14.0, 507.0], [15.0, 273.0], [1.0, 453.0], [6.0, 390.6666666666667], [7.0, 480.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-0", "isController": false}, {"data": [[8.2, 393.5333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-0-Aggregated", "isController": false}, {"data": [[16.0, 73.0]], "isOverall": false, "label": "product3-2", "isController": false}, {"data": [[16.0, 73.0]], "isOverall": false, "label": "product3-2-Aggregated", "isController": false}, {"data": [[16.0, 74.0]], "isOverall": false, "label": "product3-3", "isController": false}, {"data": [[16.0, 74.0]], "isOverall": false, "label": "product3-3-Aggregated", "isController": false}, {"data": [[8.0, 324.0], [2.0, 325.0], [9.0, 518.0], [10.0, 541.0], [11.0, 323.0], [12.0, 327.0], [3.0, 318.0], [13.0, 338.0], [14.0, 511.0], [15.0, 326.0], [1.0, 314.0], [6.0, 275.0], [7.0, 508.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-2", "isController": false}, {"data": [[8.2, 366.5333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-2-Aggregated", "isController": false}, {"data": [[16.0, 271.0]], "isOverall": false, "label": "product3-4", "isController": false}, {"data": [[16.0, 271.0]], "isOverall": false, "label": "product3-4-Aggregated", "isController": false}, {"data": [[8.0, 273.0], [2.0, 472.0], [9.0, 85.0], [10.0, 281.0], [11.0, 85.0], [12.0, 273.0], [3.0, 80.0], [13.0, 479.0], [14.0, 496.0], [15.0, 457.0], [1.0, 273.0], [6.0, 412.0], [7.0, 252.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-1", "isController": false}, {"data": [[8.2, 316.1333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-1-Aggregated", "isController": false}, {"data": [[16.0, 368.0]], "isOverall": false, "label": "product3-0", "isController": false}, {"data": [[16.0, 368.0]], "isOverall": false, "label": "product3-0-Aggregated", "isController": false}, {"data": [[10.0, 315.0]], "isOverall": false, "label": "bycat1", "isController": false}, {"data": [[10.0, 315.0]], "isOverall": false, "label": "bycat1-Aggregated", "isController": false}, {"data": [[16.0, 322.0]], "isOverall": false, "label": "bycat2", "isController": false}, {"data": [[16.0, 322.0]], "isOverall": false, "label": "bycat2-Aggregated", "isController": false}, {"data": [[22.0, 303.0]], "isOverall": false, "label": "bycat3", "isController": false}, {"data": [[22.0, 303.0]], "isOverall": false, "label": "bycat3-Aggregated", "isController": false}, {"data": [[8.0, 1220.0], [2.0, 1574.0], [9.0, 1447.0], [10.0, 1523.0], [11.0, 1215.0], [12.0, 1398.0], [3.0, 1418.0], [13.0, 1378.0], [14.0, 1696.0], [15.0, 1426.0], [1.0, 1440.0], [6.0, 1405.3333333333333], [7.0, 1456.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html", "isController": false}, {"data": [[8.2, 1427.1333333333334]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 23.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 2028.0166666666667, "minX": 1.65001272E12, "maxY": 372563.2166666667, "series": [{"data": [[1.65001278E12, 110359.81666666667], [1.65001272E12, 372563.2166666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.65001278E12, 2028.0166666666667], [1.65001272E12, 7731.233333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.65001278E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 72.0, "minX": 1.65001272E12, "maxY": 2262.0, "series": [{"data": [[1.65001272E12, 1030.0]], "isOverall": false, "label": "product2", "isController": false}, {"data": [[1.65001272E12, 319.0]], "isOverall": false, "label": "viewcart", "isController": false}, {"data": [[1.65001272E12, 1459.0]], "isOverall": false, "label": "product1", "isController": false}, {"data": [[1.65001272E12, 343.0]], "isOverall": false, "label": "deleteitem", "isController": false}, {"data": [[1.65001272E12, 459.0]], "isOverall": false, "label": "product2-12", "isController": false}, {"data": [[1.65001272E12, 1473.0666666666668]], "isOverall": false, "label": "homePage", "isController": false}, {"data": [[1.65001272E12, 264.0]], "isOverall": false, "label": "product2-11", "isController": false}, {"data": [[1.65001272E12, 257.0]], "isOverall": false, "label": "product2-10", "isController": false}, {"data": [[1.65001272E12, 1271.0]], "isOverall": false, "label": "product3", "isController": false}, {"data": [[1.65001272E12, 295.0666666666666]], "isOverall": false, "label": "signup", "isController": false}, {"data": [[1.65001272E12, 2262.0]], "isOverall": false, "label": "RegisterUser", "isController": true}, {"data": [[1.65001272E12, 423.0]], "isOverall": false, "label": "product1-7", "isController": false}, {"data": [[1.65001272E12, 491.0]], "isOverall": false, "label": "product1-8", "isController": false}, {"data": [[1.65001272E12, 469.26666666666665]], "isOverall": false, "label": "homePage-11", "isController": false}, {"data": [[1.65001272E12, 392.0]], "isOverall": false, "label": "product1-9", "isController": false}, {"data": [[1.65001272E12, 353.8666666666666]], "isOverall": false, "label": "homePage-10", "isController": false}, {"data": [[1.65001272E12, 298.0]], "isOverall": false, "label": "product1-3", "isController": false}, {"data": [[1.65001272E12, 270.0]], "isOverall": false, "label": "product1-4", "isController": false}, {"data": [[1.65001272E12, 272.0]], "isOverall": false, "label": "product1-5", "isController": false}, {"data": [[1.65001272E12, 282.0]], "isOverall": false, "label": "product1-6", "isController": false}, {"data": [[1.65001272E12, 470.0]], "isOverall": false, "label": "product1-0", "isController": false}, {"data": [[1.65001272E12, 287.0]], "isOverall": false, "label": "product1-1", "isController": false}, {"data": [[1.65001272E12, 542.0]], "isOverall": false, "label": "product1-2", "isController": false}, {"data": [[1.65001272E12, 665.1666666666666]], "isOverall": false, "label": "login", "isController": false}, {"data": [[1.65001272E12, 202.53333333333333]], "isOverall": false, "label": "homePage-13", "isController": false}, {"data": [[1.65001272E12, 362.2]], "isOverall": false, "label": "homePage-12", "isController": false}, {"data": [[1.65001272E12, 116.4]], "isOverall": false, "label": "homePage-15", "isController": false}, {"data": [[1.65001272E12, 154.00000000000003]], "isOverall": false, "label": "homePage-14", "isController": false}, {"data": [[1.65001272E12, 296.0]], "isOverall": false, "label": "productid2", "isController": false}, {"data": [[1.65001272E12, 327.0]], "isOverall": false, "label": "addtocart2", "isController": false}, {"data": [[1.65001272E12, 296.0]], "isOverall": false, "label": "productid3", "isController": false}, {"data": [[1.65001272E12, 337.0]], "isOverall": false, "label": "addtocart3", "isController": false}, {"data": [[1.65001272E12, 328.0]], "isOverall": false, "label": "addtocart1", "isController": false}, {"data": [[1.65001272E12, 2111.0]], "isOverall": false, "label": "productid1", "isController": false}, {"data": [[1.65001278E12, 328.42857142857144], [1.65001272E12, 295.625]], "isOverall": false, "label": "https://api.demoblaze.com/check", "isController": false}, {"data": [[1.65001272E12, 451.0]], "isOverall": false, "label": "product3-12", "isController": false}, {"data": [[1.65001272E12, 243.0]], "isOverall": false, "label": "product3-11", "isController": false}, {"data": [[1.65001272E12, 75.0]], "isOverall": false, "label": "product3-10", "isController": false}, {"data": [[1.65001272E12, 250.2]], "isOverall": false, "label": "homePage-1", "isController": false}, {"data": [[1.65001272E12, 72.0]], "isOverall": false, "label": "product2-6", "isController": false}, {"data": [[1.65001272E12, 352.0666666666667]], "isOverall": false, "label": "homePage-2", "isController": false}, {"data": [[1.65001272E12, 258.0]], "isOverall": false, "label": "product2-7", "isController": false}, {"data": [[1.65001272E12, 444.0]], "isOverall": false, "label": "product2-8", "isController": false}, {"data": [[1.65001272E12, 472.8666666666667]], "isOverall": false, "label": "homePage-0", "isController": false}, {"data": [[1.65001272E12, 261.0]], "isOverall": false, "label": "product2-9", "isController": false}, {"data": [[1.65001272E12, 292.6666666666667]], "isOverall": false, "label": "homePage-5", "isController": false}, {"data": [[1.65001272E12, 277.0]], "isOverall": false, "label": "product2-2", "isController": false}, {"data": [[1.65001272E12, 279.53333333333336]], "isOverall": false, "label": "homePage-6", "isController": false}, {"data": [[1.65001272E12, 278.0]], "isOverall": false, "label": "product2-3", "isController": false}, {"data": [[1.65001272E12, 313.26666666666665]], "isOverall": false, "label": "homePage-3", "isController": false}, {"data": [[1.65001272E12, 73.0]], "isOverall": false, "label": "product2-4", "isController": false}, {"data": [[1.65001272E12, 316.7333333333333]], "isOverall": false, "label": "homePage-4", "isController": false}, {"data": [[1.65001272E12, 278.0]], "isOverall": false, "label": "product2-5", "isController": false}, {"data": [[1.65001272E12, 359.53333333333336]], "isOverall": false, "label": "homePage-9", "isController": false}, {"data": [[1.65001272E12, 363.6000000000001]], "isOverall": false, "label": "homePage-7", "isController": false}, {"data": [[1.65001272E12, 283.0]], "isOverall": false, "label": "product2-0", "isController": false}, {"data": [[1.65001272E12, 309.8]], "isOverall": false, "label": "homePage-8", "isController": false}, {"data": [[1.65001272E12, 284.0]], "isOverall": false, "label": "product2-1", "isController": false}, {"data": [[1.65001272E12, 296.0]], "isOverall": false, "label": "viewProduct2", "isController": false}, {"data": [[1.65001272E12, 303.0]], "isOverall": false, "label": "viewProduct1", "isController": false}, {"data": [[1.65001278E12, 492.14285714285717], [1.65001272E12, 569.625]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-11", "isController": false}, {"data": [[1.65001278E12, 413.85714285714283], [1.65001272E12, 416.875]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-10", "isController": false}, {"data": [[1.65001278E12, 217.57142857142858], [1.65001272E12, 131.375]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-13", "isController": false}, {"data": [[1.65001272E12, 456.0]], "isOverall": false, "label": "deletecartUser", "isController": false}, {"data": [[1.65001278E12, 425.5714285714286], [1.65001272E12, 489.125]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-12", "isController": false}, {"data": [[1.65001278E12, 165.0], [1.65001272E12, 181.875]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-15", "isController": false}, {"data": [[1.65001278E12, 201.14285714285714], [1.65001272E12, 189.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-14", "isController": false}, {"data": [[1.65001278E12, 348.0], [1.65001272E12, 284.125]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-4", "isController": false}, {"data": [[1.65001278E12, 420.1428571428571], [1.65001272E12, 244.625]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-3", "isController": false}, {"data": [[1.65001272E12, 439.0]], "isOverall": false, "label": "product1-12", "isController": false}, {"data": [[1.65001278E12, 324.0], [1.65001272E12, 313.25]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-6", "isController": false}, {"data": [[1.65001272E12, 290.0]], "isOverall": false, "label": "check", "isController": false}, {"data": [[1.65001278E12, 310.14285714285717], [1.65001272E12, 303.5]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-5", "isController": false}, {"data": [[1.65001272E12, 266.0]], "isOverall": false, "label": "product1-10", "isController": false}, {"data": [[1.65001272E12, 263.0]], "isOverall": false, "label": "product3-9", "isController": false}, {"data": [[1.65001278E12, 459.5714285714286], [1.65001272E12, 421.875]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-8", "isController": false}, {"data": [[1.65001272E12, 279.0]], "isOverall": false, "label": "product1-11", "isController": false}, {"data": [[1.65001278E12, 377.7142857142857], [1.65001272E12, 436.75]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-7", "isController": false}, {"data": [[1.65001278E12, 439.42857142857144], [1.65001272E12, 401.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-9", "isController": false}, {"data": [[1.65001272E12, 83.0]], "isOverall": false, "label": "product3-5", "isController": false}, {"data": [[1.65001272E12, 276.0]], "isOverall": false, "label": "product3-6", "isController": false}, {"data": [[1.65001272E12, 493.8666666666667]], "isOverall": false, "label": "entries", "isController": false}, {"data": [[1.65001272E12, 249.0]], "isOverall": false, "label": "product3-7", "isController": false}, {"data": [[1.65001272E12, 823.0]], "isOverall": false, "label": "product3-8", "isController": false}, {"data": [[1.65001272E12, 344.0]], "isOverall": false, "label": "viewcartAfterDeleting", "isController": false}, {"data": [[1.65001272E12, 284.0]], "isOverall": false, "label": "product3-1", "isController": false}, {"data": [[1.65001278E12, 433.2857142857143], [1.65001272E12, 358.75]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-0", "isController": false}, {"data": [[1.65001272E12, 73.0]], "isOverall": false, "label": "product3-2", "isController": false}, {"data": [[1.65001272E12, 74.0]], "isOverall": false, "label": "product3-3", "isController": false}, {"data": [[1.65001278E12, 327.1428571428571], [1.65001272E12, 401.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-2", "isController": false}, {"data": [[1.65001272E12, 271.0]], "isOverall": false, "label": "product3-4", "isController": false}, {"data": [[1.65001278E12, 330.42857142857144], [1.65001272E12, 303.625]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-1", "isController": false}, {"data": [[1.65001272E12, 368.0]], "isOverall": false, "label": "product3-0", "isController": false}, {"data": [[1.65001272E12, 315.0]], "isOverall": false, "label": "bycat1", "isController": false}, {"data": [[1.65001272E12, 322.0]], "isOverall": false, "label": "bycat2", "isController": false}, {"data": [[1.65001272E12, 303.0]], "isOverall": false, "label": "bycat3", "isController": false}, {"data": [[1.65001278E12, 1443.4285714285713], [1.65001272E12, 1412.875]], "isOverall": false, "label": "https://www.demoblaze.com/index.html", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.65001278E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.65001272E12, "maxY": 2110.0, "series": [{"data": [[1.65001272E12, 281.0]], "isOverall": false, "label": "product2", "isController": false}, {"data": [[1.65001272E12, 319.0]], "isOverall": false, "label": "viewcart", "isController": false}, {"data": [[1.65001272E12, 464.0]], "isOverall": false, "label": "product1", "isController": false}, {"data": [[1.65001272E12, 343.0]], "isOverall": false, "label": "deleteitem", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-12", "isController": false}, {"data": [[1.65001272E12, 458.0666666666666]], "isOverall": false, "label": "homePage", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-11", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-10", "isController": false}, {"data": [[1.65001272E12, 279.0]], "isOverall": false, "label": "product3", "isController": false}, {"data": [[1.65001272E12, 295.0666666666666]], "isOverall": false, "label": "signup", "isController": false}, {"data": [[1.65001272E12, 1245.7333333333333]], "isOverall": false, "label": "RegisterUser", "isController": true}, {"data": [[1.65001272E12, 254.0]], "isOverall": false, "label": "product1-7", "isController": false}, {"data": [[1.65001272E12, 270.0]], "isOverall": false, "label": "product1-8", "isController": false}, {"data": [[1.65001272E12, 268.86666666666673]], "isOverall": false, "label": "homePage-11", "isController": false}, {"data": [[1.65001272E12, 242.0]], "isOverall": false, "label": "product1-9", "isController": false}, {"data": [[1.65001272E12, 259.46666666666664]], "isOverall": false, "label": "homePage-10", "isController": false}, {"data": [[1.65001272E12, 276.0]], "isOverall": false, "label": "product1-3", "isController": false}, {"data": [[1.65001272E12, 268.0]], "isOverall": false, "label": "product1-4", "isController": false}, {"data": [[1.65001272E12, 272.0]], "isOverall": false, "label": "product1-5", "isController": false}, {"data": [[1.65001272E12, 278.0]], "isOverall": false, "label": "product1-6", "isController": false}, {"data": [[1.65001272E12, 464.0]], "isOverall": false, "label": "product1-0", "isController": false}, {"data": [[1.65001272E12, 277.0]], "isOverall": false, "label": "product1-1", "isController": false}, {"data": [[1.65001272E12, 470.0]], "isOverall": false, "label": "product1-2", "isController": false}, {"data": [[1.65001272E12, 665.1666666666666]], "isOverall": false, "label": "login", "isController": false}, {"data": [[1.65001272E12, 188.93333333333334]], "isOverall": false, "label": "homePage-13", "isController": false}, {"data": [[1.65001272E12, 234.53333333333336]], "isOverall": false, "label": "homePage-12", "isController": false}, {"data": [[1.65001272E12, 113.86666666666665]], "isOverall": false, "label": "homePage-15", "isController": false}, {"data": [[1.65001272E12, 139.99999999999997]], "isOverall": false, "label": "homePage-14", "isController": false}, {"data": [[1.65001272E12, 296.0]], "isOverall": false, "label": "productid2", "isController": false}, {"data": [[1.65001272E12, 327.0]], "isOverall": false, "label": "addtocart2", "isController": false}, {"data": [[1.65001272E12, 296.0]], "isOverall": false, "label": "productid3", "isController": false}, {"data": [[1.65001272E12, 337.0]], "isOverall": false, "label": "addtocart3", "isController": false}, {"data": [[1.65001272E12, 328.0]], "isOverall": false, "label": "addtocart1", "isController": false}, {"data": [[1.65001272E12, 2110.0]], "isOverall": false, "label": "productid1", "isController": false}, {"data": [[1.65001278E12, 328.42857142857144], [1.65001272E12, 295.625]], "isOverall": false, "label": "https://api.demoblaze.com/check", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-12", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-11", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-10", "isController": false}, {"data": [[1.65001272E12, 244.5333333333333]], "isOverall": false, "label": "homePage-1", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-6", "isController": false}, {"data": [[1.65001272E12, 287.1333333333333]], "isOverall": false, "label": "homePage-2", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-7", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-8", "isController": false}, {"data": [[1.65001272E12, 458.0666666666666]], "isOverall": false, "label": "homePage-0", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-9", "isController": false}, {"data": [[1.65001272E12, 291.8666666666667]], "isOverall": false, "label": "homePage-5", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-2", "isController": false}, {"data": [[1.65001272E12, 274.19999999999993]], "isOverall": false, "label": "homePage-6", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-3", "isController": false}, {"data": [[1.65001272E12, 293.59999999999997]], "isOverall": false, "label": "homePage-3", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-4", "isController": false}, {"data": [[1.65001272E12, 316.4666666666666]], "isOverall": false, "label": "homePage-4", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-5", "isController": false}, {"data": [[1.65001272E12, 280.1333333333333]], "isOverall": false, "label": "homePage-9", "isController": false}, {"data": [[1.65001272E12, 299.8666666666666]], "isOverall": false, "label": "homePage-7", "isController": false}, {"data": [[1.65001272E12, 281.0]], "isOverall": false, "label": "product2-0", "isController": false}, {"data": [[1.65001272E12, 234.9333333333333]], "isOverall": false, "label": "homePage-8", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-1", "isController": false}, {"data": [[1.65001272E12, 296.0]], "isOverall": false, "label": "viewProduct2", "isController": false}, {"data": [[1.65001272E12, 303.0]], "isOverall": false, "label": "viewProduct1", "isController": false}, {"data": [[1.65001278E12, 281.57142857142856], [1.65001272E12, 354.25]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-11", "isController": false}, {"data": [[1.65001278E12, 310.85714285714283], [1.65001272E12, 322.375]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-10", "isController": false}, {"data": [[1.65001278E12, 208.0], [1.65001272E12, 123.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-13", "isController": false}, {"data": [[1.65001272E12, 456.0]], "isOverall": false, "label": "deletecartUser", "isController": false}, {"data": [[1.65001278E12, 290.42857142857144], [1.65001272E12, 324.875]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-12", "isController": false}, {"data": [[1.65001278E12, 164.28571428571428], [1.65001272E12, 180.25]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-15", "isController": false}, {"data": [[1.65001278E12, 189.00000000000003], [1.65001272E12, 177.50000000000003]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-14", "isController": false}, {"data": [[1.65001278E12, 347.5714285714286], [1.65001272E12, 283.5]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-4", "isController": false}, {"data": [[1.65001278E12, 399.0], [1.65001272E12, 225.25]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-3", "isController": false}, {"data": [[1.65001272E12, 438.0]], "isOverall": false, "label": "product1-12", "isController": false}, {"data": [[1.65001278E12, 318.7142857142857], [1.65001272E12, 308.37499999999994]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-6", "isController": false}, {"data": [[1.65001272E12, 290.0]], "isOverall": false, "label": "check", "isController": false}, {"data": [[1.65001278E12, 309.42857142857144], [1.65001272E12, 302.625]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-5", "isController": false}, {"data": [[1.65001272E12, 256.0]], "isOverall": false, "label": "product1-10", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-9", "isController": false}, {"data": [[1.65001278E12, 379.7142857142857], [1.65001272E12, 341.875]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-8", "isController": false}, {"data": [[1.65001272E12, 256.0]], "isOverall": false, "label": "product1-11", "isController": false}, {"data": [[1.65001278E12, 305.2857142857143], [1.65001272E12, 366.25]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-7", "isController": false}, {"data": [[1.65001278E12, 359.2857142857143], [1.65001272E12, 322.25000000000006]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-9", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-5", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-6", "isController": false}, {"data": [[1.65001272E12, 492.6000000000001]], "isOverall": false, "label": "entries", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-7", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-8", "isController": false}, {"data": [[1.65001272E12, 344.0]], "isOverall": false, "label": "viewcartAfterDeleting", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-1", "isController": false}, {"data": [[1.65001278E12, 415.57142857142856], [1.65001272E12, 328.75]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-0", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-2", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-3", "isController": false}, {"data": [[1.65001278E12, 257.57142857142856], [1.65001272E12, 332.50000000000006]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-2", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-4", "isController": false}, {"data": [[1.65001278E12, 324.85714285714283], [1.65001272E12, 297.875]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-1", "isController": false}, {"data": [[1.65001272E12, 279.0]], "isOverall": false, "label": "product3-0", "isController": false}, {"data": [[1.65001272E12, 315.0]], "isOverall": false, "label": "bycat1", "isController": false}, {"data": [[1.65001272E12, 321.0]], "isOverall": false, "label": "bycat2", "isController": false}, {"data": [[1.65001272E12, 303.0]], "isOverall": false, "label": "bycat3", "isController": false}, {"data": [[1.65001278E12, 415.57142857142856], [1.65001272E12, 328.75]], "isOverall": false, "label": "https://www.demoblaze.com/index.html", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.65001278E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.65001272E12, "maxY": 1770.0, "series": [{"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "viewcart", "isController": false}, {"data": [[1.65001272E12, 187.0]], "isOverall": false, "label": "product1", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "deleteitem", "isController": false}, {"data": [[1.65001272E12, 180.0]], "isOverall": false, "label": "product2-12", "isController": false}, {"data": [[1.65001272E12, 338.46666666666664]], "isOverall": false, "label": "homePage", "isController": false}, {"data": [[1.65001272E12, 191.0]], "isOverall": false, "label": "product2-11", "isController": false}, {"data": [[1.65001272E12, 181.0]], "isOverall": false, "label": "product2-10", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "signup", "isController": false}, {"data": [[1.65001272E12, 513.9333333333333]], "isOverall": false, "label": "RegisterUser", "isController": true}, {"data": [[1.65001272E12, 178.0]], "isOverall": false, "label": "product1-7", "isController": false}, {"data": [[1.65001272E12, 192.0]], "isOverall": false, "label": "product1-8", "isController": false}, {"data": [[1.65001272E12, 151.60000000000002]], "isOverall": false, "label": "homePage-11", "isController": false}, {"data": [[1.65001272E12, 169.0]], "isOverall": false, "label": "product1-9", "isController": false}, {"data": [[1.65001272E12, 161.13333333333333]], "isOverall": false, "label": "homePage-10", "isController": false}, {"data": [[1.65001272E12, 200.0]], "isOverall": false, "label": "product1-3", "isController": false}, {"data": [[1.65001272E12, 194.0]], "isOverall": false, "label": "product1-4", "isController": false}, {"data": [[1.65001272E12, 193.0]], "isOverall": false, "label": "product1-5", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product1-6", "isController": false}, {"data": [[1.65001272E12, 187.0]], "isOverall": false, "label": "product1-0", "isController": false}, {"data": [[1.65001272E12, 201.0]], "isOverall": false, "label": "product1-1", "isController": false}, {"data": [[1.65001272E12, 200.0]], "isOverall": false, "label": "product1-2", "isController": false}, {"data": [[1.65001272E12, 354.16666666666663]], "isOverall": false, "label": "login", "isController": false}, {"data": [[1.65001272E12, 58.8]], "isOverall": false, "label": "homePage-13", "isController": false}, {"data": [[1.65001272E12, 118.66666666666667]], "isOverall": false, "label": "homePage-12", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "homePage-15", "isController": false}, {"data": [[1.65001272E12, 11.4]], "isOverall": false, "label": "homePage-14", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "productid2", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "addtocart2", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "productid3", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "addtocart3", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "addtocart1", "isController": false}, {"data": [[1.65001272E12, 1770.0]], "isOverall": false, "label": "productid1", "isController": false}, {"data": [[1.65001278E12, 25.285714285714285], [1.65001272E12, 0.0]], "isOverall": false, "label": "https://api.demoblaze.com/check", "isController": false}, {"data": [[1.65001272E12, 174.0]], "isOverall": false, "label": "product3-12", "isController": false}, {"data": [[1.65001272E12, 168.0]], "isOverall": false, "label": "product3-11", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-10", "isController": false}, {"data": [[1.65001272E12, 126.26666666666667]], "isOverall": false, "label": "homePage-1", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-6", "isController": false}, {"data": [[1.65001272E12, 145.2]], "isOverall": false, "label": "homePage-2", "isController": false}, {"data": [[1.65001272E12, 179.0]], "isOverall": false, "label": "product2-7", "isController": false}, {"data": [[1.65001272E12, 168.0]], "isOverall": false, "label": "product2-8", "isController": false}, {"data": [[1.65001272E12, 338.46666666666664]], "isOverall": false, "label": "homePage-0", "isController": false}, {"data": [[1.65001272E12, 187.0]], "isOverall": false, "label": "product2-9", "isController": false}, {"data": [[1.65001272E12, 177.53333333333333]], "isOverall": false, "label": "homePage-5", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-2", "isController": false}, {"data": [[1.65001272E12, 159.13333333333333]], "isOverall": false, "label": "homePage-6", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-3", "isController": false}, {"data": [[1.65001272E12, 174.66666666666666]], "isOverall": false, "label": "homePage-3", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-4", "isController": false}, {"data": [[1.65001272E12, 186.13333333333333]], "isOverall": false, "label": "homePage-4", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-5", "isController": false}, {"data": [[1.65001272E12, 143.39999999999998]], "isOverall": false, "label": "homePage-9", "isController": false}, {"data": [[1.65001272E12, 180.06666666666666]], "isOverall": false, "label": "homePage-7", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-0", "isController": false}, {"data": [[1.65001272E12, 118.93333333333334]], "isOverall": false, "label": "homePage-8", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product2-1", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "viewProduct2", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "viewProduct1", "isController": false}, {"data": [[1.65001278E12, 147.71428571428572], [1.65001272E12, 152.625]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-11", "isController": false}, {"data": [[1.65001278E12, 147.0], [1.65001272E12, 171.875]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-10", "isController": false}, {"data": [[1.65001278E12, 74.28571428571428], [1.65001272E12, 22.375]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-13", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "deletecartUser", "isController": false}, {"data": [[1.65001278E12, 129.42857142857142], [1.65001272E12, 174.125]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-12", "isController": false}, {"data": [[1.65001278E12, 0.0], [1.65001272E12, 0.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-15", "isController": false}, {"data": [[1.65001278E12, 0.0], [1.65001272E12, 0.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-14", "isController": false}, {"data": [[1.65001278E12, 157.42857142857142], [1.65001272E12, 181.625]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-4", "isController": false}, {"data": [[1.65001278E12, 237.14285714285714], [1.65001272E12, 151.0]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-3", "isController": false}, {"data": [[1.65001272E12, 166.0]], "isOverall": false, "label": "product1-12", "isController": false}, {"data": [[1.65001278E12, 157.42857142857142], [1.65001272E12, 156.875]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-6", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "check", "isController": false}, {"data": [[1.65001278E12, 178.42857142857144], [1.65001272E12, 176.5]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-5", "isController": false}, {"data": [[1.65001272E12, 178.0]], "isOverall": false, "label": "product1-10", "isController": false}, {"data": [[1.65001272E12, 190.0]], "isOverall": false, "label": "product3-9", "isController": false}, {"data": [[1.65001278E12, 216.0], [1.65001272E12, 165.875]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-8", "isController": false}, {"data": [[1.65001272E12, 174.0]], "isOverall": false, "label": "product1-11", "isController": false}, {"data": [[1.65001278E12, 170.28571428571428], [1.65001272E12, 187.625]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-7", "isController": false}, {"data": [[1.65001278E12, 169.71428571428572], [1.65001272E12, 168.50000000000003]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-9", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-5", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-6", "isController": false}, {"data": [[1.65001272E12, 175.46666666666667]], "isOverall": false, "label": "entries", "isController": false}, {"data": [[1.65001272E12, 175.0]], "isOverall": false, "label": "product3-7", "isController": false}, {"data": [[1.65001272E12, 493.0]], "isOverall": false, "label": "product3-8", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "viewcartAfterDeleting", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-1", "isController": false}, {"data": [[1.65001278E12, 169.14285714285714], [1.65001272E12, 202.25]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-0", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-2", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-3", "isController": false}, {"data": [[1.65001278E12, 126.57142857142857], [1.65001272E12, 155.375]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-2", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-4", "isController": false}, {"data": [[1.65001278E12, 134.42857142857142], [1.65001272E12, 70.125]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-1", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "product3-0", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "bycat1", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "bycat2", "isController": false}, {"data": [[1.65001272E12, 0.0]], "isOverall": false, "label": "bycat3", "isController": false}, {"data": [[1.65001278E12, 169.14285714285714], [1.65001272E12, 202.25]], "isOverall": false, "label": "https://www.demoblaze.com/index.html", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.65001278E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 72.0, "minX": 1.65001272E12, "maxY": 2985.0, "series": [{"data": [[1.65001278E12, 1574.0], [1.65001272E12, 2985.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.65001278E12, 646.5], [1.65001272E12, 606.8]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.65001278E12, 1571.3], [1.65001272E12, 1880.7999999999997]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.65001278E12, 1347.5999999999988], [1.65001272E12, 1192.1999999999991]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.65001278E12, 75.0], [1.65001272E12, 72.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.65001278E12, 328.0], [1.65001272E12, 315.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.65001278E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 200.5, "minX": 1.0, "maxY": 650.0, "series": [{"data": [[2.0, 304.0], [32.0, 339.0], [8.0, 384.0], [34.0, 304.0], [38.0, 323.5], [39.0, 311.0], [10.0, 499.5], [47.0, 289.0], [48.0, 330.5], [3.0, 337.0], [51.0, 286.0], [13.0, 458.0], [14.0, 267.0], [15.0, 318.0], [1.0, 297.0], [4.0, 312.0], [16.0, 321.0], [20.0, 403.5], [26.0, 343.0], [27.0, 281.0], [7.0, 298.0], [30.0, 320.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[39.0, 650.0], [48.0, 200.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 51.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 450.0, "series": [{"data": [[2.0, 277.0], [32.0, 278.5], [8.0, 357.0], [34.0, 258.5], [38.0, 302.0], [39.0, 261.0], [10.0, 368.0], [47.0, 250.0], [48.0, 269.0], [3.0, 337.0], [51.0, 274.0], [13.0, 450.0], [14.0, 0.0], [15.0, 258.0], [1.0, 297.0], [4.0, 271.5], [16.0, 248.0], [20.0, 297.0], [26.0, 281.5], [27.0, 258.0], [7.0, 244.0], [30.0, 249.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[39.0, 230.5], [48.0, 119.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 51.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 2.1, "minX": 1.65001272E12, "maxY": 8.616666666666667, "series": [{"data": [[1.65001278E12, 2.1], [1.65001272E12, 8.616666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.65001278E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.06666666666666667, "minX": 1.65001272E12, "maxY": 8.15, "series": [{"data": [[1.65001278E12, 2.1], [1.65001272E12, 8.15]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.65001272E12, 0.4]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.65001272E12, 0.06666666666666667]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.65001278E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.65001272E12, "maxY": 0.5, "series": [{"data": [[1.65001272E12, 0.23333333333333334]], "isOverall": false, "label": "homePage-15-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "productid3-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product2-6-success", "isController": false}, {"data": [[1.65001272E12, 0.23333333333333334]], "isOverall": false, "label": "homePage-8-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "homePage-8-failure", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product3-11-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product1-10-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "homePage-11-failure", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product2-2-success", "isController": false}, {"data": [[1.65001272E12, 0.23333333333333334]], "isOverall": false, "label": "homePage-11-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-1-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "addtocart2-success", "isController": false}, {"data": [[1.65001272E12, 0.25]], "isOverall": false, "label": "homePage-0-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product1-7-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product3-6-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product2-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-15-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-5-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "viewProduct2-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product3-1-success", "isController": false}, {"data": [[1.65001272E12, 0.25]], "isOverall": false, "label": "homePage-4-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product1-2-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "bycat2-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-11-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-9-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "deleteitem-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "productid2-success", "isController": false}, {"data": [[1.65001272E12, 0.25]], "isOverall": false, "label": "homePage-7-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-0-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "bycat3-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product2-3-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product2-9-success", "isController": false}, {"data": [[1.65001272E12, 0.25]], "isOverall": false, "label": "homePage-14-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "homePage-10-failure", "isController": false}, {"data": [[1.65001272E12, 0.23333333333333334]], "isOverall": false, "label": "homePage-10-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product3-3-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-4-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "addtocart1-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "check-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-8-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product1-8-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product2-12-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product3-7-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product1-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product3-0-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product1-1-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product3-12-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-12-success", "isController": false}, {"data": [[1.65001272E12, 0.25]], "isOverall": false, "label": "homePage-3-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "viewcart-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "productid1-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product2-8-success", "isController": false}, {"data": [[1.65001272E12, 0.25]], "isOverall": false, "label": "homePage-6-success", "isController": false}, {"data": [[1.65001272E12, 0.25]], "isOverall": false, "label": "homePage-13-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product1-5-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product2-0-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product1-12-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://api.demoblaze.com/check-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product3-4-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product2-10-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-3-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-7-success", "isController": false}, {"data": [[1.65001272E12, 0.25]], "isOverall": false, "label": "signup-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product2-11-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product3-8-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product1-4-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product1-9-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-13-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "deletecartUser-success", "isController": false}, {"data": [[1.65001272E12, 0.25]], "isOverall": false, "label": "homePage-2-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product1-0-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product2-5-success", "isController": false}, {"data": [[1.65001272E12, 0.5]], "isOverall": false, "label": "login-success", "isController": false}, {"data": [[1.65001272E12, 0.21666666666666667]], "isOverall": false, "label": "homePage-success", "isController": false}, {"data": [[1.65001272E12, 0.03333333333333333]], "isOverall": false, "label": "homePage-failure", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product2-7-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-10-success", "isController": false}, {"data": [[1.65001272E12, 0.21666666666666667]], "isOverall": false, "label": "RegisterUser-success", "isController": true}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product3-10-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-2-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product1-11-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "addtocart3-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product2-1-success", "isController": false}, {"data": [[1.65001272E12, 0.25]], "isOverall": false, "label": "homePage-12-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product1-6-success", "isController": false}, {"data": [[1.65001272E12, 0.03333333333333333]], "isOverall": false, "label": "RegisterUser-failure", "isController": true}, {"data": [[1.65001272E12, 0.25]], "isOverall": false, "label": "homePage-9-success", "isController": false}, {"data": [[1.65001272E12, 0.25]], "isOverall": false, "label": "entries-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product3-5-success", "isController": false}, {"data": [[1.65001272E12, 0.25]], "isOverall": false, "label": "homePage-1-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "viewcartAfterDeleting-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product3-2-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product3-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-6-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product1-3-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "bycat1-success", "isController": false}, {"data": [[1.65001272E12, 0.25]], "isOverall": false, "label": "homePage-5-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "viewProduct1-success", "isController": false}, {"data": [[1.65001278E12, 0.11666666666666667], [1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "https://www.demoblaze.com/index.html-14-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product3-9-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "product2-4-success", "isController": false}, {"data": [[1.65001272E12, 0.016666666666666666]], "isOverall": false, "label": "homePage-15-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.65001278E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.13333333333333333, "minX": 1.65001272E12, "maxY": 8.733333333333333, "series": [{"data": [[1.65001278E12, 2.1], [1.65001272E12, 8.733333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.65001272E12, 0.13333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.65001278E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
