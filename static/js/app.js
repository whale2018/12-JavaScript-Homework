// from data.js
var tableData = data;

// YOUR CODE HERE!

var tbody = d3.select("tbody");
//console.log(data);

function buildtable(table) {
    table.forEach((sightings) => {
        var row = tbody.append("tr");
        Object.entries(sightings).forEach(([key, value]) => {
            var cell = tbody.append("td");
            cell.text(value);
        });

    });
}

buildtable(tableData);

// Select the Filter Table button
var submit = d3.select("#filter-btn");
submit.on("click", function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input element and get the raw HTML node
    var inputElementDate = d3.select("#datetime");
    var inputElementCity = d3.select("#city");
    var inputElementState = d3.select("#state");
    var inputElementCountry = d3.select("#country");
    var inputElementShape = d3.select("#shape");
  
    // Get the value property of the input element    
    var inputValueDate = inputElementDate.property("value");
    var inputValueCity = inputElementCity.property("value");
    var inputValueState = inputElementState.property("value");
    var inputValueCountry = inputElementCountry.property("value");
    var inputValueShape = inputElementShape.property("value");
  
    // Filtered data array
    var filteredData = tableData.filter(tableDatum => 
        tableDatum.datetime === inputValueDate || 
        tableDatum.city === inputValueCity ||
        tableDatum.state === inputValueState ||
        tableDatum.country === inputValueCountry ||
        tableDatum.shape === inputValueShape);
    // Clear table and message if it exists
    tbody.html("");
    d3.select("span").html("");


    if(filteredData === undefined || filteredData.length == 0) {
        d3.select("span").text("No UFO sightings for the filter(s) you entered! Try again!").style("font-size", "16px");
    }
    else {
        // Display new table with filtered data
        buildTable(filteredData);
    }

    // Clear filters
    d3.select("#datetime").node().value = "";
    d3.select("#city").node().value = "";
    d3.select("#state").node().value = "";
    d3.select("#country").node().value = "";
    d3.select("#shape").node().value = "";
});

// Select the Reset button
var submit = d3.select("#un-filter-btn");
submit.on("click", function() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Clear table and message if it exists
    tbody.html("");
    d3.select("span").html("");
    
    // Rebuild full table
    buildTable(tableData);
})

