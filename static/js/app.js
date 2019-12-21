function ShowMetadata(sampleID)
{
    console.log("ShowMetadata: sample = ", sampleID);

    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;

        var resultArray = metadata.filter(sampleObj => sampleObj.id == sampleID);
        var result = resultArray[0];
        console.log(result);
        
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");
        
        Object.entries(result).forEach(([key, value]) => {
            var textToShow = `${key.toUpperCase()}: ${value}`;
            PANEL.append("h6").text(textToShow);
         
    });

    });

}


function DrawBargraph(sampleID)
{
    console.log("DrawBargraph: sample = ", sampleID);

    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        var resultArray =samples.filter(sampleObj => sampleObj.id == sampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [
            {
                x: sample_values.slice(0, 10).reverse(),
                y: yticks,
                type: "bar",
                text: otu_labels.slice(0, 10).reverse(),
                orientation: "h"
            }
        ];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        };

        Plotly.newPlot("bar", barData, barLayout);
});

}

function DrawBubbleChart(sampleID)
{
    console.log("DrawBubbleChart: sample = ", sampleID);
    
    d3.json("samples.json").then((data) => {

        // @TODO: Build a Bubble Chart using the sample data
        var samples = data.samples;
        var resultArray =samples.filter(sampleObj => sampleObj.id == sampleID);
        var result = resultArray[0];
        
        var otu_ids  = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
    
    
    
        var bubble_chart = {
    
          mode: "markers",
          x: otu_ids,
          y: sample_values,
          text: otu_labels, 
          marker: {color:otu_ids, colorscale:"Rainbow", size:sample_values}
    
        };
    
    
    
        var bubble_data = [bubble_chart];
    
    
    
        var bubble_layout = {
    
          title : "Bacteria Type and Counts",
          showlegend: false,
          height: 600,
          width: 1000
    
        };
    
    
    
        Plotly.newPlot("bubble", bubble_data, bubble_layout);
});

}




    

function optionChanged(newSampleID)
{
    console.log("Dropdown changed to: ", newSampleID);
    
    ShowMetadata(newSampleID);
    DrawBargraph(newSampleID);
    DrawBubbleChart(newSampleID);
}

function Init()
{
    console.log("Initializing Screen");

    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;

        sampleNames.forEach((sampleID) => {
            selector
                .append("option")
                .text(sampleID)
                .property("value", sampleID);
        });

    });

    DrawBargraph(sampleID);
    DrawBubbleChart(sampleID);
    ShowMetadata(sampleID);
}




Init();





