let data;
d3.csv("data/data.csv", d3.autoType).then(function (rows) {
    data = rows;
});
let codeTypes,discrepancies,questions = {};
let discrepancy,noDiscrepancy,notPrompted;
let shapeDictionary,questionData;

let maxAllErrorsCount,errorTypes,chartTypes,maxErrorCount,errorCounts;
let maxChannelCount,allUsedChannels_unique,errorColors;


const locVisualization = d3.select("#LOC-visualization")
const clickVisualization = d3.select("#click-visualization")
const breakdownVisualization = d3.select("#breakdown-visualization")
const locLegend = d3.select("#LOC-legend-visualization")
const basicErrVisualization = d3.select("#basic-error-visualization")
const typeErrVisualization = d3.select("#type-error-visualization")
const channelsUsedVisualization = d3.select("#channels-used-visualization")
const summaryLegend = d3.select("#summary-legend")

summaryCreated = false

legendWidth = 675

colors = ["#A29FAF", "#D0899B", "#53AAB9", "#DE6F50", "#7C8FA6", "#536BC4", "#F0C05B", "#9F79BD"]

function toggleView(button){
    if(button==="LOC" && !d3.select("#LOC-button").classed("clicked")){
        d3.select("#summary-button").classed("clicked",false)
        d3.select("#LOC-button").classed("clicked",true)
        d3.select("#summary-container").classed("hidden",true)
        d3.select("#LOC-container").classed("hidden",false)
    } else if(button==="SUM" && !d3.select("#summary-button").classed("clicked")){
        d3.select("#summary-button").classed("clicked",true)
        d3.select("#LOC-button").classed("clicked",false)
        d3.select("#LOC-container").classed("hidden",true)
        d3.select("#summary-container").classed("hidden",false)
        if(!summaryCreated){
            summaryCreated = true
            createSummaryVisualization()
        }
    }
}

function changeImage(question,line){
    imageURL = "images/q"+question+"l"+line+".png"
    var http = new XMLHttpRequest();

    http.open('HEAD', imageURL, false);
    http.send();
    if(http.status==404){
        d3.select("#image").classed("hidden",true)
        d3.select("#no-image").classed("hidden",false)
        document.getElementById("no-image").innerHTML = "Visualization not available for question " + question + ", line " + line + ". Please select another line of code."
    } else {
        d3.select("#no-image").classed("hidden",true)
        d3.select("#image").classed("hidden",false)
        document.getElementById("image").src = imageURL
    }
}

function createIndividualVisualization(){
    locVisualization.html("")
    questionIndex = document.getElementById("question-list").value
    questionData = data.filter(d=> d.QuestionIndex == questionIndex)
    var elementHeight = questionData.length*50
    
    var locWidth = document.getElementById('LOC-visualization').offsetWidth;

    var locSVG = locVisualization.append('svg')
          .attr('height', elementHeight)
          .attr('width', locWidth);
    // Need line of code, discrepancy, and type
  
    // Since we're doing all lines of code in the same visualization, we need to do a "join"
    // We'll first start by establishing a "g" element that houses everything
    var elem = locSVG.selectAll("g")
        .data(questionData)
  
    // Next, we want to enter the data and for each line, add a "g" element, we're also going to adjust it by the total number of lines
    // that are present in the requested visualization
    var elemEnter = elem.enter()
        .append('g')
        .attr("transform",function(d,i){return "translate(10," + (((elementHeight)/(questionData.length+1))*i) + ")"})
        .attr("cursor","pointer")
        .attr("id",(d,i)=>"q"+d.QuestionIndex+"l"+d.CodeIndex)
        .on("click", (a,b)=>changeImage(b.QuestionIndex,b.CodeIndex))
        
  
    elemEnter.append("svg:image")
        .attr("width", 40)
        .attr('height',40)
        .attr("y",5)
        .attr("xlink:href",d=>shapeDictionary[d.Discrepancies])
  
    
    elemEnter.append('text')
        .attr('dx',55)
        .attr('dy',30)
        .text(d => d.Code)
        .attr("background-color",d=>colorForCodeTypes(d.CodeType))
  
    elemEnter.insert("rect","text")
        .attr("x", 50)
        .attr("y", 1)
        .attr("width", locWidth-74)
        .attr("height", elementHeight/questionData.length)
        .style("fill", d=> colorForCodeTypes(d.CodeType))
        .style("outline","thin black solid")

    var breakdownWidth = document.getElementById('breakdown-visualization').offsetWidth;
    var breakdownHeight = document.getElementById('breakdown-visualization').offsetHeight;
    breakdownVisualization.html("")

    var breakdownSVG = breakdownVisualization.append('svg')
        .attr('height', breakdownHeight)
        .attr('width', breakdownWidth);

    var breakdownElem = breakdownSVG.selectAll("g")
        .data(questionData)
    
    var breakdownElemEnter = breakdownElem.enter()
        .append('g')
        .attr("transform",function(d,i){return "translate(5," + (5+((breakdownHeight-10)/(questionData.length))*(i)) + ")"})
        .on("click",(node,data)=>document.getElementById("q"+data.QuestionIndex+"l"+data.CodeIndex).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" }))

    breakdownElemEnter.insert("rect","text")
        .attr("width", breakdownWidth-12)
        .attr("height", (breakdownHeight)/(questionData.length))
        .style("fill", d => colorForCodeTypes(d.CodeType))
        .attr("cursor","pointer")
}

function createSummaryVisualization(){
    var legendWidth = 625;
    var legendSvg = summaryLegend.append('svg')
        .attr('height', 50)
        .attr('width', legendWidth);
    
    legend = legendSvg.append("g")
    

    var legendElem = legend.selectAll("g")
        .data(errorTypes)


    var legendElemEnter = legendElem.enter()
        .append('g')
        .attr("transform",function(d,i){return "translate(" + (((legendWidth)/(Array.from(errorTypes).length)*2)*((i)%4)+15) + "," + ((25 * (parseInt(i/4)))) + ")"})

    legendElemEnter.append("rect")
        .attr("width", 20)
        .attr('height',20)
        .attr("y",5)
        .attr("stroke","black")
        .attr("fill",d=>errorColors(d))

    legendElemEnter.append('text')
        .attr('dx',25)
        .attr('dy',20)
        .text(d=>d)

    var basicErrWidth = document.getElementById('basic-error-visualization').offsetWidth;
    var basicErrHeight = document.getElementById('basic-error-visualization').offsetHeight;
    var channelsWidth = document.getElementById('channels-used-visualization').offsetWidth;
    var channelsHeight = document.getElementById('channels-used-visualization').offsetHeight;
    var typeErrWidth = document.getElementById('type-error-visualization').offsetWidth;
    var typeErrHeight = document.getElementById('type-error-visualization').offsetHeight;
    marginChartsMiddle = ({top: 10, bottom: 45, left: 125, right: 10})
    marginCharts = ({top: 10, bottom: 45, left: 125, right: 10})

    yBasicErrors = d3.scaleLinear()
        .domain([0, maxAllErrorsCount]).nice()
        .range([basicErrHeight - marginChartsMiddle.bottom, marginChartsMiddle.top])
    xBasicErrors = d3.scaleBand()
        .domain(errorTypes)
        .range([marginChartsMiddle.left, basicErrWidth - marginChartsMiddle.right])
        .padding(0.1)
    xAxisErrors = d3.axisBottom(xBasicErrors)
    yAxisErrors = d3.axisLeft(yBasicErrors)
    basicSvg = basicErrVisualization.append('svg')
        .attr('width', basicErrWidth)
        .attr('height', basicErrHeight);

    basicSvg.append('g')
        .selectAll('rect')
        .data(errorCounts)
        .join('rect')
            .attr('x', d => xBasicErrors(d[0]))
            .attr('width', xBasicErrors.bandwidth())
            .attr('y', ([error, count]) => yBasicErrors(count))
            .attr('height', ([error, count]) => yBasicErrors(0) - yBasicErrors(count))
            .attr('fill', ([error, count]) => errorColors(error));

    basicSvg.append('g')
        .attr('transform', `translate(0,${basicErrHeight - marginChartsMiddle.bottom})`)
        .call(xAxisErrors)
        .append('text')
            .attr('x', basicErrWidth / 2)
            .attr('y', 30)
            .attr('dominant-baseline', 'hanging')
            .attr('text-align', 'middle')
            .attr('fill', 'black')
            .text('Error Type');
  
    basicSvg.append('g')
        .attr('transform', `translate(${marginChartsMiddle.left})`)
        .call(yAxisErrors.ticks(maxAllErrorsCount + 1).tickFormat(d3.format(".0f")))
        .append('text')
            .attr('x', -50)
            .attr('y', basicErrHeight / 2)
            .attr('dominant-baseline', 'middle')
            .attr('text-align', 'end')
            .attr('fill', 'black')
            .text('Error Count');
      
    yChannel = d3.scaleLinear()
        .domain([0, maxChannelCount]).nice()
        .range([channelsHeight - marginChartsMiddle.bottom, marginChartsMiddle.top])
    
    xChannel = d3.scaleBand()
        .domain(allUsedChannels_unique)
        .range([marginChartsMiddle.left, channelsWidth - marginChartsMiddle.right])
        .padding(0.1)

    xAxisChannel = d3.axisBottom(xChannel)
    yAxisChannel = d3.axisLeft(yChannel)

    channelsSvg = channelsUsedVisualization.append('svg')
        .attr('width', channelsWidth)
        .attr('height', channelsHeight);



    channelsSvg.append('g')
        .selectAll('rect')
        .data(channelCounts)
        .join('rect')
            .attr('x', d => xChannel(d[0]))
            .attr('width', xChannel.bandwidth())
            .attr('y', ([error, count]) => yChannel(count))
            .attr('height', ([error, count]) => yChannel(0) - yChannel(count))
            .attr('fill', "steelblue");

    channelsSvg.append('g')
        .attr('transform', `translate(0,${channelsHeight - marginChartsMiddle.bottom})`)
        .call(xAxisChannel)
        .append('text')
            .attr('x', channelsWidth / 2)
            .attr('y', 30)
            .attr('dominant-baseline', 'hanging')
            .attr('text-align', 'middle')
            .attr('fill', 'black')
            .text('Channel Used');

    channelsSvg.append('g')
        .attr('transform', `translate(${marginChartsMiddle.left})`)
        .call(yAxisChannel.ticks(maxChannelCount + 1).tickFormat(d3.format(".0f")))
        .append('text')
        .attr('x', -50)
        .attr('y', channelsHeight / 2)
        .attr('dominant-baseline', 'middle')
        .attr('text-align', 'end')
        .attr('fill', 'black')
        .text('Channel Count');

    groupX = d3.scaleBand()
        .domain(chartTypes)
        .range([marginCharts.left, typeErrWidth - marginCharts.right])
        .padding(0.1)

    barX = d3.scaleBand()
        .domain(errorTypes)
        .range([0, groupX.bandwidth()])
        .padding(0.1)

    yCharts = d3.scaleLinear()
        .domain([0, maxErrorCount]).nice()
        .range([typeErrHeight - marginCharts.bottom, marginCharts.top])

    xAxisCharts = d3.axisBottom(groupX)
    yAxisCharts = d3.axisLeft(yCharts).ticks(2)

    typesSvg = typeErrVisualization.append('svg')
        .attr('width', typeErrWidth)
        .attr('height', typeErrHeight);

    const groups = typesSvg.selectAll('g')
        .data(errorsByChart)
        .join('g')
            .attr('transform', ([chart, errors]) => `translate(${groupX(chart)})`);

    groups.selectAll('rect')
        .data(([chart, errors]) => errors)
        .join('rect')
            .attr('x', d => barX(d[0]))
            .attr('width', barX.bandwidth())
            .attr('y', ([error, count]) => yCharts(count))
            .attr('height', ([error, count]) => yCharts(0) - yCharts(count))
            .attr('fill', ([error, count]) => errorColors(error));

    typesSvg.append('g')
        .attr('transform', `translate(0,${typeErrHeight - marginCharts.bottom})`)
        .call(xAxisCharts)
    .append('text')
        .attr('x', typeErrWidth / 2)
        .attr('y', 30)
        .attr('dominant-baseline', 'hanging')
        .attr('text-align', 'middle')
        .attr('fill', 'black')
        .text('Chart Type');
  
    typesSvg.append('g')
        .attr('transform', `translate(${marginCharts.left})`)
        .call(yAxisCharts)
    .append('text')
        .attr('x', -50)
        .attr('y', typeErrHeight / 2)
        .attr('dominant-baseline', 'middle')
        .attr('text-align', 'end')
        .attr('fill', 'black')
        .text('Error Count');
}

function initialize(){
    codeTypes = Array.from(new Set(data.map(d=>d.CodeType)))
    discrepancies = new Set(data.map(d=>d.Discrepancies))
    for(const row of data)
        if(questions[row.QuestionIndex]==undefined)
            questions[row.QuestionIndex] = row.Question
    discrepancy = "images/Discrepancy.svg"
    noDiscrepancy = "images/NoDiscrepancy.svg"
    notPrompted = "images/NotPrompted.svg"
    shapeDictionary = ({"No Discrepancy": noDiscrepancy, "Discrepancy":discrepancy, "Not Prompted":notPrompted})
    colorForCodeTypes = d3.scaleOrdinal()
        .domain(codeTypes)
        .range(colors)
    questionSelection = document.getElementById("question-list")
    for(const [key, value] of Object.entries(questions)){
        var option = document.createElement("option");
        option.text = value;
        option.value = key;
        questionSelection.appendChild(option);
    }

    var legendSvg = locLegend.append('svg')
        .attr('height', 75)
        .attr('width', legendWidth);

    var topLegend = legendSvg.append("g")

    var topLegendElem = topLegend.selectAll("g")
        .data(discrepancies)

    var topLegendElemEnter = topLegendElem.enter()
        .append('g')
        .attr("transform",function(d,i){return "translate(" + (((legendWidth)/(Array.from(discrepancies).length))*i+1) + ",0)"})

    topLegendElemEnter.append("svg:image")
        .attr("width", 20)
        .attr('height',20)
        .attr("y",5)
        .attr("xlink:href",d=>shapeDictionary[d])

    topLegendElemEnter.append('text')
        .attr('dx',30)
        .attr('dy',20)
        .text(d => d)

    var bottomLegend = legendSvg.append("g")
    

    var bottomLegendElem = bottomLegend.selectAll("g")
        .data(codeTypes)


    var bottomLegendElemEnter = bottomLegendElem.enter()
        .append('g')
        .attr("transform",function(d,i){return "translate(" + (((legendWidth)/(Array.from(codeTypes).length)*2)*((i)%4)+1) + "," + ((25 * (parseInt(i/4)+1))) + ")"})

    bottomLegendElemEnter.append("rect")
        .attr("width", 20)
        .attr('height',20)
        .attr("y",5)
        .attr("stroke","black")
        .attr("fill",d=>colorForCodeTypes(d))

    bottomLegendElemEnter.append('text')
        .attr('dx',30)
        .attr('dy',20)
        .text(d => d)

    createIndividualVisualization()

    chartTypes = new Set(data.map(d=>d.VisProduced))
    channelsOnly = data.map(d=>({Channel1:d.Channel1,Channel2:d.Channel2,Channel3:d.Channel3,Channel4:d.Channel4})).filter(j=>j.Channel1!=="N/A")
    allUsedChannels = channelsOnly.map(d=>([d.Channel1,d.Channel2,d.Channel3,d.Channel4])).flat().filter(d=>d!=="No Extra")
    allUsedChannels_unique = new Set(allUsedChannels)
    channelCounts = d3.rollups(allUsedChannels, group => group.length, d => d)
    maxChannelCount = d3.max(channelCounts, d => d[1])
    errorTypes = ["Ordinal","LabelFormatting","Overplotting","TextOverlap","Filtering","DescriptiveStats","VizIdiomMismatch","ChartJunk"]
    errorsOnly = data.filter(d=>d.AllErrors!==",,,,,,,")
    visProducedErrors = errorsOnly.map(d=>({"type":d.VisProduced,errors:d.AllErrors.split(",").filter(j=>j!=="")}))
    finalErrorList = visProducedErrors.map(d=>d.errors.map(j=>({type:d.type,error:j}))).flat()
    errorsByChart = d3.rollup(
        finalErrorList,
        group => group.length,
        codeLine => codeLine.type,
        codeLine => codeLine.error
    )
    errorColors = d3.scaleOrdinal()
        .domain(errorTypes)
        .range(['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0','#f0027f','#bf5b17','#666666'])

    maxErrorCount = d3.max(
        errorsByChart,
        ([type, errors]) => d3.max(errors, ([error, count]) => count)
    )

    errorCounts =  d3.rollups(finalErrorList, group => group.length, d => d.error)
    maxAllErrorsCount = d3.max(errorCounts, d => d[1])
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}