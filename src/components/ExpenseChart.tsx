import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function DoughnutChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const context = chartRef.current.getContext("2d") as CanvasRenderingContext2D;

      // Destroy the previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new Chart.js instance
      chartInstanceRef.current = new Chart(context, {
        type: "doughnut",
        data: {
          labels: ["Food", "Clothing", "Rent", "Utilities", "Others"],
          datasets: [
            {
              label: "Expenses",
              data: [20, 10, 30, 40, 10],
              backgroundColor: [
                "#FF638450",
                "#36A2EB50",
                "#FFCE5650",
                "#4BC0C050",
                "#9966FF50",
              ],
              borderColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
              borderWidth: 1,
            },
          ],
        },
      });
    }

    // Cleanup function to destroy the chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef}></canvas>;
}
