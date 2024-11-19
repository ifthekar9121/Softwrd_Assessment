<script>
  import { Chart } from "flowbite-svelte";
  import { successRate } from "$lib";

  export let landingPads;

  //Calculates success rates for each landing zones
  const successRates = landingPads.map((pad) =>
    Number(successRate(pad.successful_landings, pad.attempted_landings)),
  );
  const padNames = landingPads.map((pad) => pad.full_name);

  const options = {
    series: successRates,
    colors: [
      "#1C64F2",
      "#16BDCA",
      "#FDBA8C",
      "#E74694",
      "#34D399",
      "#FBBF24",
      "#D946EF",
    ],
    chart: {
      height: 235,
      width: "100%",
      type: "donut",
    },
    stroke: {
      colors: ["transparent"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: 20,
            },
            total: {
              showAlways: true,
              show: true,
              label: "Landing Pads",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              color: "#6B7280",
              formatter: (w) => `${w.globals.series.length}`,
            },
            value: {
              show: true,
              fontFamily: "Inter, sans-serif",
              fontSize: "30px",
              fontWeight: 700,
              color: "#111928",
              offsetY: -20,
            },
          },
          size: "80%",
        },
      },
    },
    grid: {
      padding: {
        top: -2,
      },
    },
    labels: padNames,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };
</script>

<div>
  <div
    class="px-4 py-3.5 text-base text-gray-900 font-semibold card-components-header"
  >
    Success Rate Chart
  </div>
  <Chart {options} class="card-components-body p-10" />
</div>
