import React, { useEffect, useRef } from 'react';
// Fix: Import specific d3 modules to resolve TypeScript errors.
import { select } from 'd3-selection';
import { scaleSqrt } from 'd3-scale';
import { max } from 'd3-array';
import { forceSimulation, forceManyBody, forceCenter, forceCollide } from 'd3-force';

interface ClusterData {
  id: string;
  label: string;
  size: number;
}

interface ClusterMapProps {
  data: ClusterData[];
}

export const ClusterMap: React.FC<ClusterMapProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current || !containerRef.current) return;

    // Fix: Use 'select' from d3-selection instead of d3.select
    const svg = select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const style = getComputedStyle(containerRef.current);
    const primaryColor = style.getPropertyValue('--color-text-primary').trim();
    const backgroundColor = style.getPropertyValue('--color-background').trim();

    const width = svg.node()?.getBoundingClientRect().width || 500;
    const height = 300;
    
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    // Fix: Use 'scaleSqrt' and 'max' from d3-scale and d3-array
    const sizeScale = scaleSqrt()
      .domain([0, max(data, d => d.size) || 1])
      .range([5, 35]);

    // Fix: Use force functions from d3-force
    const simulation = forceSimulation(data as any)
      .force("charge", forceManyBody().strength(5))
      .force("center", forceCenter(width / 2, height / 2))
      .force("collide", forceCollide<any>(d => sizeScale(d.size) + 2));

    // Fix: Use 'select' from d3-selection
    const tooltip = select("body").append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("padding", "5px 10px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none");

    const node = svg.append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", d => sizeScale(d.size))
      .attr("fill", primaryColor)
      .attr("stroke", backgroundColor)
      .attr("stroke-width", 1.5)
      .on("mouseover", (event, d) => {
        tooltip.text(`${d.label} (${d.size})`);
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", (event) => {
        return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", () => {
        return tooltip.style("visibility", "hidden");
      });

    simulation.on("tick", () => {
      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
    });

    return () => {
      simulation.stop();
      tooltip.remove();
    };

  }, [data]);

  return (
    <div ref={containerRef} className="w-full border border-[var(--color-border)] bg-[var(--color-background)] transition-colors duration-300">
      <svg ref={svgRef} className="w-full h-auto" style={{ minHeight: '300px' }}></svg>
    </div>
  );
};
