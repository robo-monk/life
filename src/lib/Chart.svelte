<script>
  import Chart from "chart.js/auto";

  import { onMount } from "svelte";
  import { clear_loops } from "svelte/internal";

  let canvas;
  let chart;
  export let data = {};

  let chartData = {
    labels: [1, 2, 4],
    datasets: [
      {
        data: [1, 2, 4],
        backgroundColor: "white",
        radius: 50,
      },
    ],
  };
  //   $: {
  // 	  chartData = {
  // 		  labels: data?.cells.map(c => c.y),
  // 		  data: data?.cells.map(c => c.x)
  // 	  }
  //   }

  const config = {
    type: "scatter",
    data: chartData,
    options: {
      animations: null,
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Scatter Multi Axis Chart",
        },
      },
      scales: {
        y: {
          // type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          position: "left",
          ticks: {
            color: "white",
          },
        },
        x: {
          ticks: {
            color: "white",
          },
        },
      },
    },
  };

  function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(data);
    console.log("chart", chart);
    chart.update();
  }

  function removeData(chart) {
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.update();
  }

  function newPoints(points) {
    // console.log("chart", chart);
    if (chart) {
      removeData(chart);
      let middle = { x: 0, y: 0 };
      points?.forEach((point) => {
        middle.x += point.x;
        middle.y += point.y;
        // console.log("adding point", point.x, point.y, point);
        addData(chart, point.x, point.y);
      });

      middle.x /= points.length;
      middle.y /= points.length;

      //   addData(chart, middle.x, middle.y)
    }
  }

  $: {
    // let cells = data.cells;
    newPoints(data);
    // chart.data = getData();
  }

  $: console.log(data);

  onMount(() => {
    // chart = new Chart(canvas, config);
    // console.log(chart);
  });
</script>
<!-- 
<canvas
  width="1000"
  height="1000"
  style="margin-left: -2500px"
  bind:this={canvas}
/> -->
