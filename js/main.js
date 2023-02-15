const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 200;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const data = [55000, 48000, 27000, 66000, 90000]

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

const FRAME = d3.select("#vis")
	.append("svg")
		.attr("height", FRAME_HEIGHT)
		.attr("width", FRAME_WIDTH)
		.attr("class", "frame");

FRAME.selectAll("points")
		.data(data) //assigns data to value in data1
		.enter(); // automatically loops through

const MAX_Y = d3.max(data, (d) => { return d; }); 
console.log("Max Y: " + MAX_Y);  

const Y_SCALE = d3.scaleLinear() // linear scale because we have 
                              // linear data 
                  .domain([0, (MAX_Y + 10000)]) // add some padding  
                  .range([0, VIS_WIDTH]); 

FRAME.selectAll("points")  
    .data(data)  
    .enter()       
    .append("circle")  
      .attr("cx",  MARGINS.left) 
      .attr("cy", (d) => { return (Y_SCALE(d) + MARGINS.left);}) 
      .attr("r", 20)
      .attr("class", "point"); 

// We can also use X_SCALE to add an axis to the vis  
FRAME.append("g") // g is a "placeholder" svg
      .attr("transform", "translate(" + MARGINS.left + 
            "," + (VIS_HEIGHT + MARGINS.top) + ")") //moves axis 
                                                    // within margins 
      .call(d3.axisLeft(Y_SCALE).ticks(4)) // function for generating axis  
        .attr("font-size", '20px'); // set font size

				