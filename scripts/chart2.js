charts.chart2 = function () {
    // initialise layout variables
    const margin = { top: 50, right: 20, bottom: 50, left: 60 };
    const width = 600;
    const height = 400;

    const parseDateTime = d3.timeParse("%B %d, %Y");

    // initialise charts
    const svg = d3.select('#svg2')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    //Read the data
    d3.csv("data/recession_2.csv",

        // When reading the csv, I must format variables:
        function (d) {
            return { date: d3.timeParse("%m/%d/%Y")(d.date), value: d.value }
        },

        // Now I can use this dataset:
        function (data) {
            console.log(data)

            // Add X axis --> it is a date format
            var x = d3.scaleTime()
                .domain(d3.extent(data, function (d) { return d.date; }))
                .range([0, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, d3.max(data, function (d) { return +d.value; })])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            // Add the line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(function (d) { return x(d.date) })
                    .y(function (d) { return y(d.value) })
                )
            const annotations = [
                {
                    note: {
                        label: "Start of Recession"
                    },
                    connector: {
                        end: "arrow"
                    },
                    type: d3.annotationLabel,
                    x: 200,
                    y: 60,
                    dx: -20,
                    dy: -15
                },
                {
                    note: {
                        label: "End of Recession"
                    },
                    connector: {
                        end: "arrow"
                    },
                    type: d3.annotationLabel,
                    x: 500,
                    y: 130,
                    dx: 0,
                    dy: -35
                }]
            // Add annotation to the chart
            const makeAnnotations = d3.annotation()
                .annotations(annotations)
            d3.select("#svg2")
                .append("g")
                .call(makeAnnotations)

        })
}
