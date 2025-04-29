import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// third-party
import ReactApexChart from 'react-apexcharts';

interface ChartData {
  month?: string;
  year?: string;
  revenue: number;
}

interface MonthlyBarChartProps {
  data: ChartData[];
  type: 'month' | 'year';
}

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function MonthlyBarChart({ data, type }: MonthlyBarChartProps) {
  const theme: any = useTheme();
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series, setSeries] = useState([{ data: [] }]);
  const [options, setOptions] = useState<any>({
    chart: {
      type: 'bar',
      height: 365,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: [],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    grid: {
      show: false
    }
  });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const allMonths = Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0'));
    const allYears = Array.from({ length: currentYear - 2017 }, (_, i) => (2018 + i).toString());
    console.log('allMonths', allMonths);
    const completeData =
      type === 'month'
        ? allMonths.map((month) => {
            const existing = data.find((d) => d.month?.includes(month.toString()));
            return {
              month: `${currentYear}-${month}`,
              revenue: existing?.revenue || 0
            };
          })
        : allYears.map((year) => {
            const existing = data.find((d) => d.year === year);
            return {
              year,
              revenue: existing?.revenue || 0
            };
          });

    const categories = completeData.map((item) => (type === 'month' ? item.month : item.year));
    const seriesData = completeData.map((item) => item.revenue);

    setOptions((prevState: any) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        ...prevState.xaxis,
        categories: categories,
        labels: {
          style: {
            colors: Array(categories.length).fill(secondary)
          }
        }
      }
    }));

    setSeries([{ data: seriesData }]);
  }, [data, type, primary, info, secondary]);

  return (
    <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </Box>
  );
}
