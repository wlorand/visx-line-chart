import React from 'react';

// @visx imports
import { LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import { Threshold } from '@visx/threshold';
import { curveBasis } from '@visx/curve';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { Group } from '@visx/group';

// visx mock data
import cityTemperature, {
  CityTemperature,
} from '@visx/mock-data/lib/mocks/cityTemperature';

function TempLines() {
  return (
    <div>
      <p>i am line chart</p>
    </div>
  );
}

export default TempLines;
