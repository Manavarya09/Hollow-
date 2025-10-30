import React, { useEffect, useRef, useCallback } from 'react';
// Fix: Import specific d3 modules to resolve TypeScript errors.
import { select } from 'd3-selection';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { line, curveMonotoneX } from 'd3-shape';

interface SentimentDataPoint {
  date: Date;
  value: number;
}

interface SentimentChartProps {
  data: SentimentDataPoint[];
}

export const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const drawChart = useCallback(() => {
    if (!data || data.length < 2 || !svgRef.current || !containerRef.current) {
        // Fix: use 'select' from d3-selection
        if (svgRef.current) select(svgRef.current).selectAll("*").remove();
        return;
    }

    // Fix: use 'select' from d3-selection
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const style = getComputedStyle(containerRef.current);
    const primaryColor = style.getPropertyValue('--color-text-primary').trim();
    const secondaryColor = style.getPropertyValue('--color-text-secondary').trim();
    const borderColor = style.getPropertyValue('--color-border').trim();

    const containerWidth = containerRef.current.clientWidth;
    if (containerWidth === 0) return; // Don't draw if container is not visible

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = containerWidth - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    svg.attr("width", containerWidth)
       .attr("height", 200);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // Fix: use 'scaleTime' and 'extent' from d3-scale and d3-array
    const x = scaleTime()
      .domain(extent(data, d => d.date) as [Date, Date])
      .range([0, width]);

    // Fix: use 'scaleLinear' from d3-scale
    const y = scaleLinear()
      .domain([-1.1, 1.1])
      .range([height, 0]);

    // Fix: use 'axisBottom' from d3-axis
    const xAxis = axisBottom(x).ticks(Math.min(5, data.length)).tickSize(0).tickPadding(10);
    // Fix: use 'axisLeft' from d3-axis
    const yAxis = axisLeft(y).ticks(3).tickFormat(d => {
        if (d === 1) return 'Positive';
        if (d === 0) return 'Neutral';
        if (d === -1) return 'Negative';
        return '';
    }).tickSize(0).tickPadding(10);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("fill", secondaryColor);

    g.append("g")
      .call(yAxis)
      .selectAll("text")
      .style("fill", secondaryColor);
    
    g.selectAll(".domain").remove();

    g.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", y(0))
        .attr("y2", y(0))
        .attr("stroke", borderColor)
        .attr("stroke-dasharray", "2,2");

    // Fix: Use 'line' and 'curveMonotoneX' from d3-shape.
    // Renamed variable to lineGenerator to avoid conflict with imported 'line'.
    const lineGenerator = line<SentimentDataPoint>()
      .x(d => x(d.date))
      .y(d => y(d.value))
      .curve(curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", primaryColor)
      .attr("stroke-width", 1.5)
      .attr("d", lineGenerator);
      
    g.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x(d.date))
      .attr("cy", d => y(d.value))
      .attr("r", 3)
      .attr("fill", primaryColor);
  }, [data]);

  useEffect(() => {
    drawChart();
    
    window.addEventListener('resize', drawChart);
    return () => {
      window.removeEventListener('resize', drawChart);
    };
  }, [drawChart]);

  return (
    <div ref={containerRef} className="w-full">
      <svg ref={svgRef}></svg>
    </div>
  );
};
