var minYear = d3.min(birthData, d => d.year);
var maxYear = d3.max(birthData, d => d.year);



var width = 600;
var height = 600;
var barPadding = 10;
var numBars = 12;
var barWidth = width / numBars - barPadding;
var maxBirths= d3.max(birthData, d => d.births)

var yScale = d3.scaleLinear()
                .domain([0, maxBirths])
                .range([height,0]);

d3.select('input')
    .property('min',minYear)
    .property('max', maxYear)
    .property('value', maxYear);

    var tooltip = d3.select('body')
    .append('div')
    .classed('tooltips',true)
    



    function showToolTips (d){
        console.log(d3.event);
        tooltip
        .style('opacity',1)
        .style('top',d3.event.y+'px')
        .style('left', d3.event.x  +'px')
        .html(`
          <p>Year: ${d.year} </p>
          <p>Month: ${d.month} </p>
          <p>Births: ${d.births.toLocaleString()} </p>
        `)
    }



d3.select('svg')
.attr('width', width)
.attr('height', height)
.attr('transfrom','rotate(90')
.selectAll('rect')
.data(birthData.filter( d => d.year === minYear
))
.enter()
.append('rect')
.attr('width', barWidth+'px')
.attr('height', ((d)=> height - yScale(d.births)))
.attr('y', d => yScale(d.births))
.attr('x', ((d,idx) => (barWidth + barPadding) * idx ))
.attr('fill','#8c732e')
.on('mousemove', showToolTips)




d3.select('input')
    .on('input', function(){
        var year = +d3.event.target.value

        d3.selectAll('rect')
            .data(birthData.filter(d=> d.year === year))
            .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .delay((d,i)=>i*250)
            .attr('height',(d=> height - yScale(d.births)))
            .attr('y',(d=> yScale(d.births)))
            
})

