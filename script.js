/* AFG ERP — Sanitized Demo
   Recreates the commission-dashboard screen with sample data only. */
(function () {
  "use strict";

  const PERIOD_DATA = {
    day: {
      labels: ["1일", "5일", "10일", "15일", "20일", "25일", "30일"],
      values: [820, 1040, 1180, 1390, 1620, 1860, 2120],
      start: "1,118", today: "1,000,000", total: "3,000,000"
    },
    month: {
      labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
      values: [4200, 5100, 4800, 6200, 7100, 8300],
      start: "4,200", today: "8,300,000", total: "35,700,000"
    },
    quarter: {
      labels: ["1분기", "2분기", "3분기", "4분기"],
      values: [12500, 15800, 14200, 19600],
      start: "12,500", today: "19,600,000", total: "62,100,000"
    }
  };

  const ctx = document.getElementById("perfChart");
  let chart;

  function renderChart(period) {
    const d = PERIOD_DATA[period];
    document.getElementById("perfStart").textContent = d.start;
    document.getElementById("perfToday").textContent = d.today;
    document.getElementById("perfTotal").textContent = d.total;

    if (chart) { chart.destroy(); }
    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: d.labels,
        datasets: [{
          data: d.values,
          backgroundColor: "#2f6fed",
          borderRadius: 6,
          maxBarThickness: 34
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false }, tooltip: { intersect: false } },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: "#eef0f4" }, ticks: { callback: (v) => v.toLocaleString() } }
        }
      }
    });
  }

  document.getElementById("periodToggle").addEventListener("click", (e) => {
    const btn = e.target.closest(".seg-toggle__btn");
    if (!btn) return;
    document.querySelectorAll(".seg-toggle__btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderChart(btn.dataset.period);
  });

  document.querySelectorAll(".seg-toggle--mini").forEach((group) => {
    group.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      group.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });

  renderChart("day");
})();
