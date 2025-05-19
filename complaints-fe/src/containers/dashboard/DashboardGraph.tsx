import { SkeletonLoader } from '@/components/inputs/Loader';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface DashboardGraphProps {
  data: {
    date: string;
    value: number;
  }[];
  dataKey: string;
  height?: string;
  width?: string;
  type?:
    | 'basis'
    | 'basisClosed'
    | 'basisOpen'
    | 'linear'
    | 'monotone'
    | 'natural'
    | 'step'
    | 'stepAfter'
    | 'stepBefore';
  vertical?: boolean;
  fill?: string;
  strokeWidth?: number;
  isLoading?: boolean;
}

const DashboardGraph = ({
  data,
  dataKey,
  height = '90%',
  width = '100%',
  type = 'monotone',
  vertical = false,
  fill = '#EAFAFE',
  strokeWidth = 2,
  isLoading = false,
}: DashboardGraphProps) => {
  if (isLoading) {
    return <SkeletonLoader height={height} width={width} />;
  }

  const values = data.map((item) => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const range = maxValue - minValue;
  const padding = Math.round(range * 0.1);
  const yMin = Math.max(0, Math.round(minValue - padding));
  const yMax = Math.round(maxValue + padding);

  return (
    <ResponsiveContainer height={height} width={width}>
      <ComposedChart compact data={data} margin={{ left: 10, right: 10, top: 10, bottom: 30 }}>
        <Area
          connectNulls
          dataKey="value"
          fill={fill}
          stackId={1}
          fillOpacity={0.8}
          strokeWidth={strokeWidth}
          stroke="#056025"
          type={type}
        />
        <XAxis 
          dataKey={dataKey}
          padding={{ left: 20, right: 20 }}
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <Legend />
        <YAxis
          allowDataOverflow
          domain={[yMin, yMax]}
          tickSize={10}
          tickMargin={20}
          padding={{ top: 20, bottom: 20 }}
          className="!text-[12px]"
          style={{
            fontSize: '12px',
          }}
        />
        <Tooltip />
        <CartesianGrid strokeDasharray={'5 5'} y={0} vertical={vertical} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default DashboardGraph;
