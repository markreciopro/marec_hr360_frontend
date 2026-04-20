/* ================================
   MAREC HR360 — APP.JS
   Dashboard • HR Knowledge Lab
   ================================ */

/* 1. API BASE (for real backend later) */
const API_BASE =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://marec-hr360-api.onrender.com";

/* 2. DEMO DATA (Dashboard fallback) */
let demoData = [
  { name: "John", dept: "HR",      salary: 40000, tenure: 1, risk_level: "HIGH",   risk_probability: 0.8 },
  { name: "Ana",  dept: "IT",      salary: 90000, tenure: 5, risk_level: "LOW",    risk_probability: 0.1 },
  { name: "Mike", dept: "Finance", salary: 50000, tenure: 2, risk_level: "MEDIUM", risk_probability: 0.5 }
];

/* 3. DEMO DATA (Knowledge Lab default) */
let kDemoRows = [
  { dept: "Sales",     employees: 20, units: 12000, sales: 800000 },
  { dept: "Support",   employees: 16, units: 8000,  sales: 400000 },
  { dept: "Production",employees: 40, units: 30000, sales: 1500000 },
  { dept: "R&D",       employees: 10, units: 6000,  sales: 500000 }
];

/* 4. NAVIGATION */
function showSection(id, btn) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  if (id === "dashboard") loadDashboard();
  if (id === "knowledge") initKnowledgeLab(kDemoRows);
}

/* 5. DASHBOARD: LOAD FROM API OR FALLBACK */
async function loadDashboard() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/summary`);
    const data = await res.json();

    if (!data || !data.data) {
      renderDashboard(buildDemoSummary());
      return;
    }
    renderDashboard(data);
  } catch (err) {
    console.error("Dashboard load failed:", err);
    renderDashboard(buildDemoSummary());
  }
}

function buildDemoSummary() {
  return {
    headcount: demoData.length,
    attrition: 12,
    high_risk: demoData.filter(d => d.risk_level === "HIGH").length,
    medium_risk: demoData.filter(d => d.risk_level === "MEDIUM").length,
    low_risk: demoData.filter(d => d.risk_level === "LOW").length,
    avg_risk_probability:
      demoData.reduce((a, b) => a + b.risk_probability, 0) / demoData.length,
    data: demoData,
    ai_insights: ["Moderate attrition", "Some employees at risk"],
    recommendations: ["Improve retention levers", "Increase engagement in HR & Finance"]
  };
}

/* 6. DASHBOARD: RENDER */
let charts = {};

function renderDashboard(data) {
  document.getElementById("headcount").innerText = data.headcount;
  document.getElementById("attrition").innerText = data.attrition + "%";
  document.getElementById("risk").innerText = data.high_risk;
  document.getElementById("health").innerText = 100 - data.high_risk * 10;

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

/* 7. DASHBOARD CHARTS */
function buildDeptChart(data) {
  let map = {};
  data.forEach(e => map[e.dept] = (map[e.dept] || 0) + 1);

  if (charts.dept) charts.dept.destroy();

  charts.dept = new Chart(document.getElementById("deptChart"), {
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

  charts.bell = new Chart(document.getElementById("bellCurveChart"), {
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
  let bins = [0, 0, 0, 0, 0];
  data.forEach(e => {
    let i = Math.min(4, Math.floor(e.risk_probability * 5));
    bins[i]++;
  });

  if (charts.hist) charts.hist.destroy();

  charts.hist = new Chart(document.getElementById("riskHistogram"), {
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
  if (charts.scatter) charts.scatter.destroy();

  charts.scatter = new Chart(document.getElementById("riskScatter"), {
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

/* 8. DASHBOARD TABLE */
function buildTable(data) {
  const tbody = document.querySelector("#riskTable tbody");
  tbody.innerHTML = "";
  data.forEach(e => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${e.name}</td>
      <td>${e.dept}</td>
      <td>$${e.salary.toLocaleString()}</td>
      <td>${e.tenure}</td>
      <td>${e.risk_level}</td>
      <td>${(e.risk_probability * 100).toFixed(1)}%</td>
    `;
    tbody.appendChild(tr);
  });
}

/* 9. DASHBOARD UPLOAD (BACKEND PIPELINE) */
async function processFile() {
  const file = document.getElementById("fileInput").files[0];
  const statusEl = document.getElementById("uploadStatus");

  if (!file) {
    if (statusEl) statusEl.textContent = "Select a file to begin universal HR data loading.";
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    if (statusEl) statusEl.textContent = "Processing: cleaning, normalizing, and streaming data into HR360…";

    const uploadRes = await fetch(`${API_BASE}/api/v1/upload`, {
      method: "POST",
      body: formData
    });

    await uploadRes.json();

    const dashRes = await fetch(`${API_BASE}/api/v1/summary`);
    const dashData = await dashRes.json();

    renderDashboard(dashData);
    showSection("dashboard", document.querySelectorAll('.nav-btn')[1]);

    if (statusEl) statusEl.textContent = "Data loaded successfully. Dashboard reflects the latest unified HR dataset.";
  } catch (err) {
    console.error("Upload or dashboard fetch failed", err);
    if (statusEl) statusEl.textContent = "Upload failed. Check file format or try again.";
  }
}

/* 10. HR KNOWLEDGE LAB — CORE */
let kCharts = {};
let kRegression = null;

function initKnowledgeLab(rows) {
  buildKnowledgeLabFromRows(rows);
}

/* CSV upload */
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
    statusEl.textContent = "CSV loaded. Building charts and insights…";
    buildKnowledgeLabFromRows(rows);
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

  buildKDeptChart(depts, headcounts);
  buildKProductivityChart(depts, units, headcounts);
  buildKSalesRegressionChart(sales, headcounts);
  buildKInsights(depts, headcounts, units, sales);
  buildKKPIs(depts, headcounts, units, sales);
}

/* Knowledge Lab charts */
function buildKDeptChart(depts, headcounts) {
  if (kCharts.dept) kCharts.dept.destroy();

  kCharts.dept = new Chart(document.getElementById("kDeptChart"), {
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
  const ratios = units.map((u, i) => {
    const e = headcounts[i] || 1;
    return e === 0 ? 0 : u / e;
  });

  if (kCharts.productivity) kCharts.productivity.destroy();

  kCharts.productivity = new Chart(document.getElementById("kProductivityChart"), {
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

  kCharts.sales = new Chart(document.getElementById("kSalesRegressionChart"), {
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

  document.getElementById("kpiTotalHeadcount").textContent = totalHeadcount;
  document.getElementById("kpiAvgUnitsPerEmp").textContent = avgUnitsPerEmp.toFixed(1);
  document.getElementById("kpiAvgSalesPerEmp").textContent = "$" + avgSalesPerEmp.toFixed(0);

  // Top productivity dept
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

/* 11. INIT */
document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
  initKnowledgeLab(kDemoRows);
});