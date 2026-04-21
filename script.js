/* ================================
   MAREC HR360 — APP.JS
   Fullstack demo: CSV → Dashboards → KPIs → ADDIE
   ================================ */

/* API BASE (for real backend later) */
const API_BASE =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://marec-hr360-api.onrender.com";

/* Global state */
let charts = {};
let metricsCharts = {};
let kCharts = {};
let forceChart = null;
let kRegression = null;
let lastSummary = null;
let lastKnowledge = null;

/* DEMO DATA (Dashboard fallback) */
let demoData = [
  { name: "John Carter", dept: "HR",      salary: 64000, tenure: 1.2, risk_level: "HIGH",   risk_probability: 0.78 },
  { name: "Ana Rivera",  dept: "IT",      salary: 98000, tenure: 4.8, risk_level: "LOW",    risk_probability: 0.12 },
  { name: "Mike Chen",   dept: "Finance", salary: 72000, tenure: 2.4, risk_level: "MEDIUM", risk_probability: 0.46 },
  { name: "Priya Singh", dept: "Sales",   salary: 88000, tenure: 3.1, risk_level: "LOW",    risk_probability: 0.18 },
  { name: "Luis Gomez",  dept: "Ops",     salary: 56000, tenure: 1.7, risk_level: "HIGH",   risk_probability: 0.81 },
  { name: "Sara Lee",    dept: "HR",      salary: 69000, tenure: 3.9, risk_level: "MEDIUM", risk_probability: 0.39 }
];

/* DEMO DATA (Knowledge Lab default) */
let kDemoRows = [
  { dept: "Sales",      employees: 24, units: 14500, sales: 920000 },
  { dept: "Support",    employees: 18, units: 9000,  sales: 460000 },
  { dept: "Production", employees: 42, units: 32000, sales: 1620000 },
  { dept: "R&D",        employees: 12, units: 6500,  sales: 540000 }
];

/* NAVIGATION */
function showSection(id, btn) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  if (btn) {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  if (id === "dashboard") loadDashboard();
  if (id === "knowledge") initKnowledgeLab(kDemoRows);
  if (id === "metrics") buildMetricsCharts();
  if (id === "force") buildForceDistributionChart();
  if (id === "addie") {
    positionAddieLines();
    setActiveAddiePhase("Analyze");
    updateAddieFromData();
  }
}

/* Helper for ADDIE Analyze → Force Distribution */
function jumpToForce() {
  const navBtns = document.querySelectorAll(".nav-btn");
  showSection("force", navBtns[4]);
}

/* DASHBOARD: LOAD FROM API OR FALLBACK */
async function loadDashboard() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/summary`);
    const data = await res.json();

    if (!data || !data.data) {
      const demo = buildDemoSummary();
      lastSummary = demo;
      renderDashboard(demo);
      updateAddieFromData();
      return;
    }
    lastSummary = data;
    renderDashboard(data);
    updateAddieFromData();
  } catch (err) {
    console.error("Dashboard load failed:", err);
    const demo = buildDemoSummary();
    lastSummary = demo;
    renderDashboard(demo);
    updateAddieFromData();
  }
}

function buildDemoSummary() {
  return {
    headcount: demoData.length,
    attrition: 11,
    high_risk: demoData.filter(d => d.risk_level === "HIGH").length,
    medium_risk: demoData.filter(d => d.risk_level === "MEDIUM").length,
    low_risk: demoData.filter(d => d.risk_level === "LOW").length,
    avg_risk_probability:
      demoData.reduce((a, b) => a + b.risk_probability, 0) / demoData.length,
    data: demoData,
    ai_insights: [
      "High‑risk concentration in early‑tenure roles.",
      "IT and Sales show strong stability and lower risk.",
      "Finance and HR exhibit moderate risk bands worth monitoring."
    ],
    recommendations: [
      "Target retention levers for high‑risk early‑tenure employees.",
      "Reinforce strengths in IT and Sales with development pathways.",
      "Partner with Finance and HR leaders on risk‑aware succession planning."
    ]
  };
}

/* DASHBOARD: RENDER */
function renderDashboard(data) {
  const headcountEl = document.getElementById("headcount");
  const attritionEl = document.getElementById("attrition");
  const riskEl = document.getElementById("risk");
  const healthEl = document.getElementById("health");

  if (!headcountEl) return;

  headcountEl.innerText = data.headcount;
  attritionEl.innerText = data.attrition + "%";
  riskEl.innerText = data.high_risk;
  healthEl.innerText = Math.max(0, 100 - data.high_risk * 8);

  buildDeptChart(data.data);
  buildBellCurve(data.data);
  buildRiskHistogram(data.data);
  buildRiskScatter(data.data);
  buildTable(data.data);

  const insightsDiv = document.getElementById("insights");
  const recommendDiv = document.getElementById("recommend");
  insightsDiv.innerHTML = "";
  recommendDiv.innerHTML = "";

  (data.ai_insights || []).forEach(text => {
    const span = document.createElement("span");
    span.textContent = text;
    insightsDiv.appendChild(span);
  });

  (data.recommendations || []).forEach(text => {
    const span = document.createElement("span");
    span.textContent = text;
    recommendDiv.appendChild(span);
  });
}

/* DASHBOARD CHARTS */
function buildDeptChart(data) {
  const ctx = document.getElementById("deptChart");
  if (!ctx) return;

  let map = {};
  data.forEach(e => map[e.dept] = (map[e.dept] || 0) + 1);

  if (charts.dept) charts.dept.destroy();

  charts.dept = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(map),
      datasets: [{
        data: Object.values(map),
        backgroundColor: "rgba(76, 201, 240, 0.8)",
        borderRadius: 6
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: "#cfcfcf" }, grid: { display: false } },
        y: { ticks: { color: "#cfcfcf" }, grid: { color: "rgba(255,255,255,0.06)" } }
      }
    }
  });
}

function buildBellCurve(data) {
  const ctx = document.getElementById("bellCurveChart");
  if (!ctx) return;

  let s = data.map(e => e.salary);
  let avg = s.reduce((a, b) => a + b, 0) / s.length;
  let std = Math.sqrt(s.reduce((a, b) => a + (b - avg) ** 2, 0) / s.length);

  let pts = [];
  for (let x = avg - 3 * std; x <= avg + 3 * std; x += std / 4) {
    let y = (1 / (std * Math.sqrt(2 * Math.PI))) *
            Math.exp(-((x - avg) ** 2) / (2 * std ** 2));
    pts.push({ x, y });
  }

  if (charts.bell) charts.bell.destroy();

  charts.bell = new Chart(ctx, {
    type: "line",
    data: {
      labels: pts.map(p => Math.round(p.x)),
      datasets: [{
        data: pts.map(p => p.y),
        borderColor: "#4CC9F0",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.35,
        fill: true,
        backgroundColor: "rgba(76, 201, 240, 0.12)"
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: "#cfcfcf" }, grid: { display: false } },
        y: { ticks: { color: "#cfcfcf" }, grid: { color: "rgba(255,255,255,0.06)" } }
      }
    }
  });
}

function buildRiskHistogram(data) {
  const ctx = document.getElementById("riskHistogram");
  if (!ctx) return;

  let bins = [0, 0, 0, 0, 0];
  data.forEach(e => {
    let i = Math.min(4, Math.floor(e.risk_probability * 5));
    bins[i]++;
  });

  if (charts.hist) charts.hist.destroy();

  charts.hist = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["0–20", "20–40", "40–60", "60–80", "80–100"],
      datasets: [{
        data: bins,
        backgroundColor: "rgba(229, 57, 53, 0.8)",
        borderRadius: 6
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: "#cfcfcf" }, grid: { display: false } },
        y: { ticks: { color: "#cfcfcf" }, grid: { color: "rgba(255,255,255,0.06)" } }
      }
    }
  });
}

function buildRiskScatter(data) {
  const ctx = document.getElementById("riskScatter");
  if (!ctx) return;

  if (charts.scatter) charts.scatter.destroy();

  charts.scatter = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [{
        data: data.map(e => ({ x: e.salary, y: e.risk_probability })),
        backgroundColor: "rgba(76, 201, 240, 0.9)",
        pointRadius: 4
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: {
          title: { display: true, text: "Salary", color: "#cfcfcf" },
          ticks: { color: "#cfcfcf" },
          grid: { color: "rgba(255,255,255,0.06)" }
        },
        y: {
          title: { display: true, text: "Risk probability", color: "#cfcfcf" },
          ticks: {
            color: "#cfcfcf",
            callback: v => (v * 100).toFixed(0) + "%"
          },
          grid: { color: "rgba(255,255,255,0.06)" }
        }
      }
    }
  });
}

/* DASHBOARD TABLE */
function buildTable(data) {
  const tbody = document.querySelector("#riskTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  data.forEach(e => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${e.name}</td>
      <td>${e.dept}</td>
      <td>$${e.salary.toLocaleString()}</td>
      <td>${e.tenure.toFixed(1)}</td>
      <td>${e.risk_level}</td>
      <td>${(e.risk_probability * 100).toFixed(1)}%</td>
    `;
    tbody.appendChild(tr);
  });
}

/* DASHBOARD UPLOAD (HR CSV) */
async function processFile() {
  const file = document.getElementById("fileInput").files[0];
  const statusEl = document.getElementById("uploadStatus");

  if (!file) {
    if (statusEl) statusEl.textContent = "Select a CSV file to begin universal HR data loading.";
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    const text = e.target.result;
    const rows = parseCSV(text);
    if (!rows || rows.length === 0) {
      statusEl.textContent = "No valid rows found in CSV.";
      return;
    }

    // Clean & normalize into dashboard schema
    const cleaned = rows.map(r => ({
      name: r.name || "Unknown",
      dept: r.dept || "Unknown",
      salary: parseFloat(r.salary || "0"),
      tenure: parseFloat(r.tenure || "0"),
      risk_level: (r.risk_level || "MEDIUM").toUpperCase(),
      risk_probability: Math.min(1, Math.max(0, parseFloat(r.risk_probability || "0.5")))
    }));

    demoData = cleaned;
    const summary = buildDemoSummary();
    lastSummary = summary;
    renderDashboard(summary);
    updateAddieFromData();
    pulseAddieWheel();

    statusEl.textContent = "HR CSV cleaned, normalized, and loaded into the dashboard and ADDIE engine.";
    updatePipelineStatus("hr", true);
  };
  reader.readAsText(file);
}

/* HR METRICS MATRIX */
function buildMetricsCharts() {
  const radarCtx = document.getElementById("metricsRadarChart");
  const trendCtx = document.getElementById("metricsTrendChart");
  if (!radarCtx || !trendCtx) return;

  const labels = ["Staffing", "Training", "Development", "Compensation", "Retention", "Performance"];
  const scores = [78, 84, 76, 82, 89, 80];

  if (metricsCharts.radar) metricsCharts.radar.destroy();
  metricsCharts.radar = new Chart(radarCtx, {
    type: "radar",
    data: {
      labels,
      datasets: [{
        label: "HR Metric Strength",
        data: scores,
        borderColor: "#4CC9F0",
        backgroundColor: "rgba(76, 201, 240, 0.18)",
        borderWidth: 2,
        pointRadius: 3
      }]
    },
    options: {
      plugins: { legend: { labels: { color: "#cfcfcf" } } },
      scales: {
        r: {
          angleLines: { color: "rgba(255,255,255,0.12)" },
          grid: { color: "rgba(255,255,255,0.12)" },
          pointLabels: { color: "#cfcfcf" },
          ticks: { display: false, maxTicksLimit: 4 }
        }
      }
    }
  });

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const perfCore = [50, 50, 50, 50, 50, 50];
  const perfHigh = [30, 31, 32, 33, 34, 35];

  if (metricsCharts.trend) metricsCharts.trend.destroy();
  metricsCharts.trend = new Chart(trendCtx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Core + Strong %",
          data: perfHigh,
          borderColor: "#4CC9F0",
          backgroundColor: "rgba(76, 201, 240, 0.18)",
          tension: 0.35,
          pointRadius: 3
        },
        {
          label: "Core 50% Stability",
          data: perfCore,
          borderColor: "#E53935",
          backgroundColor: "rgba(229, 57, 53, 0.18)",
          tension: 0.35,
          pointRadius: 3
        }
      ]
    },
    options: {
      plugins: { legend: { labels: { color: "#cfcfcf" } } },
      scales: {
        x: { ticks: { color: "#cfcfcf" }, grid: { color: "rgba(255,255,255,0.06)" } },
        y: {
          ticks: {
            color: "#cfcfcf",
            callback: v => v + "%"
          },
          grid: { color: "rgba(255,255,255,0.06)" }
        }
      }
    }
  });
}

/* KNOWLEDGE LAB CORE */
function initKnowledgeLab(rows) {
  buildKnowledgeLabFromRows(rows);
}

/* CSV upload (Business) */
function processKnowledgeFile() {
  const file = document.getElementById("knowledgeFile").files[0];
  const statusEl = document.getElementById("knowledgeStatus");

  if (!file) {
    if (statusEl) statusEl.textContent = "Select a CSV file to override demo data.";
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    const text = e.target.result;
    const rows = parseCSV(text);
    if (!rows || rows.length === 0) {
      statusEl.textContent = "No valid rows found in CSV.";
      return;
    }
    statusEl.textContent = "CSV loaded. Cleaning, normalizing, and rebuilding charts…";
    buildKnowledgeLabFromRows(rows);
    pulseAddieWheel();
    updatePipelineStatus("biz", true);
  };
  reader.readAsText(file);
}

/* Simple CSV parser */
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    if (cols.length !== headers.length) continue;
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = cols[idx].trim();
    });
    rows.push(obj);
  }
  return rows;
}

/* Build charts, KPIs & insights from rows */
function buildKnowledgeLabFromRows(rows) {
  const depts = [];
  const headcounts = [];
  const units = [];
  const sales = [];

  rows.forEach(r => {
    const dept = r.dept || "Unknown";
    const emp = parseFloat(r.employees || r.headcount || "0");
    const unit = parseFloat(r.units || "0");
    const sale = parseFloat(r.sales || "0");

    depts.push(dept);
    headcounts.push(isNaN(emp) ? 0 : emp);
    units.push(isNaN(unit) ? 0 : unit);
    sales.push(isNaN(sale) ? 0 : sale);
  });

  lastKnowledge = { depts, headcounts, units, sales };

  buildKDeptChart(depts, headcounts);
  buildKProductivityChart(depts, units, headcounts);
  buildKSalesRegressionChart(sales, headcounts);
  buildKInsights(depts, headcounts, units, sales);
  buildKKPIs(depts, headcounts, units, sales);
  updateAddieFromData();
}

/* Knowledge Lab charts */
function buildKDeptChart(depts, headcounts) {
  const ctx = document.getElementById("kDeptChart");
  if (!ctx) return;

  if (kCharts.dept) kCharts.dept.destroy();

  kCharts.dept = new Chart(ctx, {
    type: "bar",
    data: {
      labels: depts,
      datasets: [{
        data: headcounts,
        backgroundColor: "rgba(76, 201, 240, 0.8)",
        borderRadius: 6
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: "#cfcfcf" }, grid: { display: false } },
        y: { ticks: { color: "#cfcfcf" }, grid: { color: "rgba(255,255,255,0.06)" } }
      }
    }
  });
}

function buildKProductivityChart(depts, units, headcounts) {
  const ctx = document.getElementById("kProductivityChart");
  if (!ctx) return;

  const ratios = units.map((u, i) => {
    const e = headcounts[i] || 1;
    return e === 0 ? 0 : u / e;
  });

  if (kCharts.productivity) kCharts.productivity.destroy();

  kCharts.productivity = new Chart(ctx, {
    type: "bar",
    data: {
      labels: depts,
      datasets: [{
        data: ratios,
        backgroundColor: "rgba(229, 57, 53, 0.8)",
        borderRadius: 6
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: "#cfcfcf" }, grid: { display: false } },
        y: {
          ticks: { color: "#cfcfcf" },
          grid: { color: "rgba(255,255,255,0.06)" },
          title: { display: true, text: "Units per employee", color: "#cfcfcf" }
        }
      }
    }
  });
}

function buildKSalesRegressionChart(sales, employees) {
  const ctx = document.getElementById("kSalesRegressionChart");
  if (!ctx) return;

  const validPairs = sales
    .map((s, i) => ({ s, e: employees[i] }))
    .filter(p => p.s > 0 && p.e > 0);

  if (validPairs.length < 2) {
    kRegression = null;
    if (kCharts.sales) kCharts.sales.destroy();
    return;
  }

  const xs = validPairs.map(p => p.s);
  const ys = validPairs.map(p => p.e);
  const n = xs.length;
  const sumX = xs.reduce((a, b) => a + b, 0);
  const sumY = ys.reduce((a, b) => a + b, 0);
  const sumXY = xs.reduce((a, x, i) => a + x * ys[i], 0);
  const sumX2 = xs.reduce((a, x) => a + x * x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  kRegression = { slope, intercept };

  const predicted = xs.map(x => slope * x + intercept);

  if (kCharts.sales) kCharts.sales.destroy();

  kCharts.sales = new Chart(ctx, {
    type: "line",
    data: {
      labels: xs.map(v => (v / 1000) + "k"),
      datasets: [
        {
          label: "Actual employees",
          data: ys,
          borderColor: "#4CC9F0",
          backgroundColor: "rgba(76, 201, 240, 0.2)",
          tension: 0.3,
          pointRadius: 4
        },
        {
          label: "Regression line",
          data: predicted,
          borderColor: "#E53935",
          borderDash: [5, 5],
          tension: 0.3,
          pointRadius: 0
        }
      ]
    },
    options: {
      plugins: { legend: { labels: { color: "#cfcfcf" } } },
      scales: {
        x: { ticks: { color: "#cfcfcf" }, grid: { color: "rgba(255,255,255,0.06)" } },
        y: { ticks: { color: "#cfcfcf" }, grid: { color: "rgba(255,255,255,0.06)" } }
      }
    }
  });
}

/* Forecast from regression */
function runKnowledgeSalesForecast() {
  const input = document.getElementById("kForecastSalesInput");
  const resultEl = document.getElementById("kForecastSalesResult");
  if (!input || !resultEl) return;

  if (!kRegression) {
    resultEl.textContent = "Upload a CSV with sales and employees first to enable forecasting.";
    return;
  }

  const value = parseFloat(input.value);
  if (isNaN(value) || value <= 0) {
    resultEl.textContent = "Enter a positive projected sales value to see the estimated headcount.";
    return;
  }

  const { slope, intercept } = kRegression;
  const predictedEmployees = slope * value + intercept;
  resultEl.textContent =
    `For projected sales of $${value.toLocaleString()}, the model estimates about ${predictedEmployees.toFixed(1)} employees.`;
}

/* KPIs for Knowledge Lab */
function buildKKPIs(depts, headcounts, units, sales) {
  const totalHeadcount = headcounts.reduce((a, b) => a + b, 0);
  const totalUnits = units.reduce((a, b) => a + b, 0);
  const totalSales = sales.reduce((a, b) => a + b, 0);

  const avgUnitsPerEmp = totalHeadcount > 0 ? totalUnits / totalHeadcount : 0;
  const avgSalesPerEmp = totalHeadcount > 0 ? totalSales / totalHeadcount : 0;

  const totalHeadcountEl = document.getElementById("kpiTotalHeadcount");
  if (!totalHeadcountEl) return;

  totalHeadcountEl.textContent = totalHeadcount;
  document.getElementById("kpiAvgUnitsPerEmp").textContent = avgUnitsPerEmp.toFixed(1);
  document.getElementById("kpiAvgSalesPerEmp").textContent = "$" + avgSalesPerEmp.toFixed(0);

  const productivity = units.map((u, i) => {
    const e = headcounts[i] || 1;
    return e === 0 ? 0 : u / e;
  });
  let maxIdx = 0;
  productivity.forEach((p, i) => {
    if (p > productivity[maxIdx]) maxIdx = i;
  });
  document.getElementById("kpiTopDept").textContent = depts[maxIdx] || "—";
}

/* Simple rule-based insights */
function buildKInsights(depts, headcounts, units, sales) {
  const list = document.getElementById("kInsightsList");
  if (!list) return;

  list.innerHTML = "";

  if (depts.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No data available for insights.";
    list.appendChild(li);
    return;
  }

  const productivity = units.map((u, i) => {
    const e = headcounts[i] || 1;
    return e === 0 ? 0 : u / e;
  });

  const salesPerEmp = sales.map((s, i) => {
    const e = headcounts[i] || 1;
    return e === 0 ? 0 : s / e;
  });

  let maxProdIdx = 0;
  productivity.forEach((p, i) => {
    if (p > productivity[maxProdIdx]) maxProdIdx = i;
  });

  let maxSalesIdx = 0;
  salesPerEmp.forEach((p, i) => {
    if (p > salesPerEmp[maxSalesIdx]) maxSalesIdx = i;
  });

  const totalHeadcount = headcounts.reduce((a, b) => a + b, 0);

  const li1 = document.createElement("li");
  li1.textContent =
    `Highest productivity: ${depts[maxProdIdx]} with about ${productivity[maxProdIdx].toFixed(1)} units per employee.`;
  list.appendChild(li1);

  const li2 = document.createElement("li");
  li2.textContent =
    `Highest sales per employee: ${depts[maxSalesIdx]} with about $${salesPerEmp[maxSalesIdx].toFixed(0)} per employee.`;
  list.appendChild(li2);

  const li3 = document.createElement("li");
  li3.textContent =
    `Total headcount in current dataset: ${totalHeadcount}. Consider focusing retention efforts on high-output teams.`;
  list.appendChild(li3);
}

/* FORCE DISTRIBUTION */
function buildForceDistributionChart() {
  const ctx = document.getElementById("forceChart");
  if (!ctx) return;

  const labels = ["Critical 5%", "Low 15%", "Core 50%", "Strong 20%", "Top 10%"];
  const values = [5, 15, 50, 20, 10];

  if (forceChart) forceChart.destroy();

  forceChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: [
          "rgba(229, 57, 53, 0.9)",
          "rgba(244, 143, 177, 0.9)",
          "rgba(76, 201, 240, 0.9)",
          "rgba(129, 199, 132, 0.9)",
          "rgba(0, 230, 118, 0.9)"
        ],
        borderRadius: 10
      }]
    },
    options: {
      indexAxis: "y",
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.raw}% of workforce`
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#cfcfcf",
            callback: v => v + "%"
          },
          grid: { color: "rgba(255,255,255,0.06)" }
        },
        y: {
          ticks: { color: "#cfcfcf" },
          grid: { display: false }
        }
      }
    }
  });

  const riskLabel = document.getElementById("riskLabel");
  const healthLabel = document.getElementById("healthLabel");

  ctx.onpointermove = e => {
    const points = forceChart.getElementsAtEventForMode(e, "nearest", { intersect: true }, false);
    if (!points.length) {
      if (riskLabel) riskLabel.style.color = "";
      if (healthLabel) healthLabel.style.color = "";
      return;
    }
    const idx = points[0].index;
    if (idx === 0 || idx === 1) {
      if (riskLabel) riskLabel.style.color = "#E53935";
      if (healthLabel) healthLabel.style.color = "";
    } else if (idx === 2) {
      if (healthLabel) healthLabel.style.color = "#4CC9F0";
      if (riskLabel) riskLabel.style.color = "";
    } else {
      if (riskLabel) riskLabel.style.color = "";
      if (healthLabel) healthLabel.style.color = "";
    }
  };
}

/* ADDIE LINES POSITIONING */
function positionAddieLines() {
  const wheel = document.querySelector(".addie-wheel");
  const orbitDashboard = document.querySelector(".orbit-dashboard");
  const orbitMetrics = document.querySelector(".orbit-metrics");
  const orbitKnowledge = document.querySelector(".orbit-knowledge");
  const orbitApi = document.querySelector(".orbit-api");
  const svg = document.querySelector(".addie-lines");

  if (!wheel || !orbitDashboard || !svg) return;

  const wheelRect = wheel.getBoundingClientRect();
  const svgRect = svg.getBoundingClientRect();

  const cx = wheelRect.left + wheelRect.width / 2;
  const cy = wheelRect.top + wheelRect.height / 2;

  function setLine(lineId, elem) {
    const line = document.getElementById(lineId);
    if (!line || !elem) return;
    const r = elem.getBoundingClientRect();
    const mx = r.left + r.width / 2;
    const my = r.top + r.height / 2;
    line.setAttribute("x1", cx - svgRect.left);
    line.setAttribute("y1", cy - svgRect.top);
    line.setAttribute("x2", mx - svgRect.left);
    line.setAttribute("y2", my - svgRect.top);
  }

  setLine("line-dashboard", orbitDashboard);
  setLine("line-metrics", orbitMetrics);
  setLine("line-knowledge", orbitKnowledge);
  setLine("line-api", orbitApi);
}

/* ADDIE PHASE PANEL LOGIC */
function setActiveAddiePhase(phase) {
  const titleEl = document.getElementById("addiePhaseTitle");
  const bodyEl = document.getElementById("addiePhaseBody");
  const segments = document.querySelectorAll(".addie-segment");

  const copy = {
    Analyze: {
      title: "Analyze • Where we are now",
      base:
        "Analyze uses the Core Dashboard and Force Distribution to understand current workforce health, risk, and " +
        "performance distribution. Upload HR CSVs to populate headcount, attrition, and risk tiers."
    },
    Design: {
      title: "Design • What we will measure",
      base:
        "Design translates insights into structured HR metrics and KPIs. The HR Metrics Matrix defines how staffing, " +
        "training, development, compensation, retention, and performance will be monitored."
    },
    Develop: {
      title: "Develop • How we will model",
      base:
        "Develop builds models, simulations, and forecasts in the Knowledge Lab. This is where HR360 tests scenarios " +
        "for productivity, sales, and headcount."
    },
    Implement: {
      title: "Implement • How we deliver",
      base:
        "Implement delivers insights through dashboards, APIs, and operational workflows. HR360’s backend and UI " +
        "connect stakeholders to the analytics."
    },
    Evaluate: {
      title: "Evaluate • What changed",
      base:
        "Evaluate compares planned vs actual outcomes, recalculates metrics, and feeds learning back into Analyze. " +
        "This closes the loop and keeps HR360 adaptive."
    }
  };

  if (!copy[phase]) return;

  if (titleEl && bodyEl) {
    let text = copy[phase].base;
    if (phase === "Analyze" && lastSummary) {
      text += ` Current headcount: ${lastSummary.headcount}, attrition: ${lastSummary.attrition}%, high‑risk: ${lastSummary.high_risk}.`;
    }
    if (phase === "Develop" && lastKnowledge) {
      const totalHeadcount = lastKnowledge.headcounts.reduce((a, b) => a + b, 0);
      text += ` Current modeling dataset spans ${lastKnowledge.depts.length} departments and ${totalHeadcount} employees.`;
    }
    if (phase === "Evaluate" && lastKnowledge && lastSummary) {
      text += ` Use Force Distribution and KPIs to see how talent tiers and productivity respond to interventions.`;
    }
    titleEl.textContent = copy[phase].title;
    bodyEl.textContent = text;
  }

  segments.forEach(seg => {
    const p = seg.getAttribute("data-phase");
    if (p === phase) {
      seg.style.borderColor = "#4CC9F0";
      seg.style.color = "#4CC9F0";
    } else {
      seg.style.borderColor = "transparent";
      seg.style.color = "#cfcfcf";
    }
  });

  updateAddieFromData();
}

/* ADDIE DATA SUMMARY + PIPELINE */
function updateAddieFromData() {
  const list = document.getElementById("addieDataSummary");
  if (!list) return;

  list.innerHTML = "";

  if (!lastSummary && !lastKnowledge) {
    const li = document.createElement("li");
    li.textContent = "Demo data active. Upload HR and Business CSVs to see your own pipeline.";
    list.appendChild(li);
    return;
  }

  if (lastSummary) {
    const li1 = document.createElement("li");
    li1.textContent = `Dashboard: ${lastSummary.headcount} employees, attrition ${lastSummary.attrition}%, high‑risk ${lastSummary.high_risk}.`;
    list.appendChild(li1);
  }

  if (lastKnowledge) {
    const totalHeadcount = lastKnowledge.headcounts.reduce((a, b) => a + b, 0);
    const li2 = document.createElement("li");
    li2.textContent = `Knowledge Lab: ${lastKnowledge.depts.length} departments, ${totalHeadcount} employees modeled.`;
    list.appendChild(li2);
  }

  const li3 = document.createElement("li");
  li3.textContent = "ADDIE wheel is synchronized with current dashboards, KPIs, and modeling datasets.";
  list.appendChild(li3);
}

/* Pipeline status helper */
function updatePipelineStatus(type, loaded) {
  const list = document.getElementById("pipelineStatusList");
  if (!list) return;

  const items = Array.from(list.querySelectorAll("li"));
  items.forEach(li => {
    if (type === "hr" && li.textContent.toLowerCase().includes("hr csv")) {
      li.textContent = loaded
        ? "HR CSV: cleaned, normalized, and loaded into the dashboard and ADDIE engine."
        : li.textContent;
    }
    if (type === "biz" && li.textContent.toLowerCase().includes("business csv")) {
      li.textContent = loaded
        ? "Business CSV: cleaned, normalized, and loaded into Knowledge Lab and KPIs."
        : li.textContent;
    }
  });
}

/* ADDIE wheel pulse */
function pulseAddieWheel() {
  const wheel = document.getElementById("addieWheel");
  if (!wheel) return;
  wheel.classList.remove("pulse");
  void wheel.offsetWidth; // restart animation
  wheel.classList.add("pulse");
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
  initKnowledgeLab(kDemoRows);
  buildMetricsCharts();
  buildForceDistributionChart();
  positionAddieLines();
  setActiveAddiePhase("Analyze");
  updateAddieFromData();

  document.querySelectorAll(".addie-segment").forEach(seg => {
    seg.addEventListener("mouseenter", () => {
      const phase = seg.getAttribute("data-phase");
      if (phase) setActiveAddiePhase(phase);
    });
    seg.addEventListener("click", () => {
      const phase = seg.getAttribute("data-phase");
      if (phase) setActiveAddiePhase(phase);
    });
  });

  window.addEventListener("resize", positionAddieLines);
});