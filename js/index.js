let data;
d3.csv("data/data.csv", d3.autoType).then(function (rows) {
    data = rows;
});
let codeTypes,discrepancies,questions = {};
let discrepancy,noDiscrepancy,notPrompted;
let shapeDictionary,questionData;
locVisualization = d3.select("#LOC-visualization")
clickVisualization = d3.select("#click-visualization")
breakdownVisualization = d3.select("#breakdown-visualization")
basicErrVisualization = d3.select("#basic-error-visualization")
typeErrVisualization = d3.select("#type-error-visualization")
channelsUsedVisualization = d3.select("#channels-used-visualization")


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
        document.getElementById("no-image").innerHTML = "Visualization not available for question " + question + ", line " + line + ". Please select another line."
    } else {
        d3.select("#no-image").classed("hidden",true)
        d3.select("#image").classed("hidden",false)
        document.getElementById("image").src = imageURL
    }
}

function createIndividualVisualization(){
    locVisualization.html("")
    questionIndex = document.getElementById("questionList").value
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
        .attr("y",28)
        .attr("xlink:href",d=>shapeDictionary[d.Discrepancies])
  
    
    elemEnter.append('text')
        .attr('dx',55)
        .attr('dy',55)
        .text(d => d.Code)
        .attr("background-color",d=>colorForCodeTypes(d.CodeType))
  
    elemEnter.insert("rect","text")
        .attr("x", 50)
        .attr("y", 25)
        .attr("width", locWidth-75)
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
}

function initialize(){
    codeTypes = new Set(data.map(d=>d.CodeType))
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
        .range(d3.schemeTableau10)
    questionSelection = document.getElementById("questionList")
    for(const [key, value] of Object.entries(questions)){
        var option = document.createElement("option");
        option.text = value;
        option.value = key;
        questionSelection.appendChild(option);
    }
    createIndividualVisualization()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}