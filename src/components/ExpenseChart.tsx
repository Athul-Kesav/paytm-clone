"use client";

import { Chart, ChartData, ChartOptions } from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function DoughnutChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Initial background color array for the chart
  const initialColor = [
    "#d4d4d875",
    "#d4d4d855",
    "#d4d4d835",
    "#d4d4d815",
    "#d4d4d805",
  ];

    const dataLength = 5;
    const maxDataLength = 40;
  const cutoutPercentage = 35 + (dataLength / maxDataLength) * 10;
  const borderWidth = 2 + (dataLength / maxDataLength) * 2;
  const arcSpacing = (borderWidth / (cutoutPercentage / 100)) + 5;

  useEffect(() => {
    if (chartRef.current) {
      const context = chartRef.current.getContext("2d") as CanvasRenderingContext2D;

      // Destroy the previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Explicitly typecast the chart data to provide better type inference
      const chartData: ChartData = {
        labels: ["Food", "Clothing", "Rent", "Utilities", "Others"],
        datasets: [
          {
            label: "Expenses",
            data: [20, 10, 30, 40, 10],
            backgroundColor: initialColor,
            borderColor: "#FFFFFF75",
            borderWidth: 1,
            borderRadius: 25, // Add rounded corners
            spacing: arcSpacing, // Add padding between the bars
            hoverBackgroundColor: [
                "#d8b4fe",
                "#fdba74",
                "#93c5fd",
                "#fda4af",
                "#d4d4d8",
            ],
            hoverBorderColor: "#fafafa",
            
          },
        ],
      };

      // Create a new Chart.js instance
      chartInstanceRef.current = new Chart(context, {
        type: "doughnut",
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              enabled: true,
            },
            legend: {
                position: "right", // Moves the legend to the bottom
                padding: {
                top: 10,
                bottom: 10,
                left: 50,
                right: 50,
                }, // Add padding to the legend
                font: {
                    family: "Montserrat, sans-serif", // Use Montserrat font family
                    size: 20,                          // Font size
                    weight: '600 !important',                     // Font weight
                    style: 'normal',                    // Font style
                  },
            },
          },
          cutout: `${cutoutPercentage}%`, // Increase for a larger gap in the center
          animation: {
            duration: 1000,
            easing: "easeInOutCubic",
          },
          elements: {
            arc: {
              borderWidth: 10, // Add gap by increasing the border width
            },
          },
        } as ChartOptions,
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
