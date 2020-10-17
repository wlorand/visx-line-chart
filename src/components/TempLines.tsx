import React from 'react';

// @visx imports
import { scaleTime, scaleLinear } from '@visx/scale';

import { LinePath } from '@visx/shape';
import { curveBasis } from '@visx/curve';
import { Threshold } from '@visx/threshold';

import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { Group } from '@visx/group';

// visx mock data
import cityTemperature, {
  CityTemperature,
} from '@visx/mock-data/lib/mocks/cityTemperature';

// 1- define margin - with d3 margin convention
const margin = { top: 40, right: 30, bottom: 50, left: 40 };

// 4- Define type/interface for LineProps
export type LineProps = {
  width: number;
  height: number;
};

function TempLines({ width, height }: LineProps) {
  if (width < 100) return null; // no render under 100px wide

  // 2- accessor functions up top -- recall these .map()
  // change date string in mock data to a JS date obj and parse it
  const date = (d: CityTemperature) => new Date(d.date).valueOf();
  // get ny, sf temps and cast them to Num
  const ny = (d: CityTemperature) => Number(d['New York']);
  const sf = (d: CityTemperature) => Number(d['San Francisco']);

  // 3- scales part 1 (define data domains)
  const timeScale = scaleTime<number>({
    domain: [
      Math.min(...cityTemperature.map(date)),
      Math.max(...cityTemperature.map(date)),
    ],
  });

  const tempScale = scaleLinear<number>({
    domain: [
      Math.min(...cityTemperature.map((d) => Math.min(ny(d), sf(d)))),
      // isolate sf: Math.min(...cityTemperature.map((d) => sf(d))),
      Math.max(...cityTemperature.map((d) => Math.max(ny(d), sf(d)))),
    ],
    nice: true,
  });

  // 5- Define Bounds of the Chart (sans margin)
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // 6- scales part 2 (define pixel range)
  timeScale.range([0, xMax]);
  tempScale.range([yMax, 0]); // recall flip order on y, max to 0 to correct for svg coord space

  // return / render an SVG for your chart and graphical layers inside
  return (
    <div>
      <svg width={width} height={height} className="chart-svg">
        {/* a- chart background rect - gradients go here */}
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          rx={25}
          className="chart-bground"
        />
        {/* b- Group -- the <g> convention from D3 - to enable moving chart elements as a group */}
        <Group left={margin.left} top={margin.top}>
          {/* c- Grid */}
          <GridRows
            scale={tempScale}
            width={xMax}
            height={yMax}
            stroke="#e0e0e0"
          />
          <GridColumns
            scale={timeScale}
            width={xMax}
            height={yMax}
            stroke="#e0e0e0"
          />
          {/* xtra grid line -- TODO: file visx issue for this - grid should take care of this */}
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />
          {/* d- Axis -- recall Axes need d3 Scales to do their work */}
          <AxisBottom top={yMax} scale={timeScale} numTicks={7} />
          <AxisLeft scale={tempScale} />
          {/* e- svg text for custom axis label placement */}
          <text x="-80" y="15" transform="rotate(-90)" fontSize={10}>
            Temperature (°F)
            {/* f0- try Threshold */}
            {/* f- sf temperature line as LinePath (skipping ny or the threshold) */}
            {/* <LinePath
            data={cityTemperature}
            curve={curveBasis}
            x={d => timeScale(date(d))}
            y={d => temperatureScale(sf(d))}
            stroke="#222"
            strokeWidth={1.5}
            strokeOpacity={0.8}
            strokeDasharray="1,2"
          /> */}
            <LinePath
              data={cityTemperature}
              curve={curveBasis}
              x={(d) => timeScale(date(d)) ?? 0}
              y={(d) => tempScale(ny(d)) ?? 0}
              stroke="#222"
              strokeWidth={1.5}
            />
          </text>
        </Group>
      </svg>
    </div>
  );
}

export default TempLines;
