<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>MAREC HR360 — Workforce Intelligence & HR Knowledge Lab</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Code+Pro&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <div class="hero-bg"></div>

  <div class="app">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="logo-wrap">
        <img
          class="logo"
          src="https://raw.githubusercontent.com/markreciopro/marec-hr360-frontend/main/Marec%20HR360.png"
          alt="MAREC HR360 Logo"
        />
        <div class="logo-tagline">
          Workforce Intelligence Platform & HR Analytics
        </div>
      </div>

      <div class="contact-block">
        <div class="contact-title">Contact</div>
        <div class="contact-line">
          <span>Email</span>
          <strong>mark.recio.pro@gmail.com</strong>
        </div>
        <div class="contact-line">
          <span>Phone</span>
          <strong>702-201-4905</strong>
        </div>
        <div class="contact-line">
          <span>Location</span>
          <strong>Las Vegas, NV</strong>
        </div>
        <div class="contact-line">
          <span>Portfolio</span>
          <strong>markreciopro.github.io/Portfolio</strong>
        </div>
      </div>

      <button class="nav-btn active" onclick="showSection('overview', this)">Overview</button>
      <button class="nav-btn" onclick="showSection('dashboard', this)">Dashboard</button>
      <button class="nav-btn" onclick="showSection('knowledge', this)">HR Knowledge Lab</button>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="content">
      <!-- HERO -->
      <section class="hero-section">
        <img
          class="hero-logo"
          src="https://raw.githubusercontent.com/markreciopro/marec-hr360-frontend/main/Marec%20HR360.png"
          alt="MAREC HR360 Logo"
        />
        <h1 class="hero-title">MAREC HR360 — Workforce Intelligence Platform</h1>
        <p class="hero-subtitle">
          A full-stack HR analytics platform with a dual experience: live workforce dashboard and an HR Knowledge Lab
          that turns forecasting methods into upload-driven charts, KPIs, predictions, and insights.
        </p>
      </section>

      <!-- OVERVIEW SECTION -->
      <section id="overview" class="section active">
        <div class="page-header">
          <h1>Platform Overview</h1>
          <p class="subtitle">
            Universal HR data loader • FastAPI-ready frontend • Real-time analytics • Forecasting methods embedded as a demo lab.
          </p>
        </div>

        <div class="grid overview-grid">
          <div class="card">
            <div class="section-title">What HR360 Is</div>
            <p class="highlight-text">
              HR360 unifies HR data, surfaces risk, and supports better staffing decisions for SMBs.
            </p>
            <ul class="bullet-list">
              <li>Uploads HR files from ATS, HRIS, payroll, and spreadsheets.</li>
              <li>Normalizes and cleans data via API (FastAPI backend ready).</li>
              <li>Visualizes KPIs, risk, and workforce metrics in real time.</li>
              <li>Embeds HR forecasting methods as interactive demos.</li>
            </ul>
          </div>

          <div class="card">
            <div class="section-title">Tech Stack</div>
            <div class="pill-list">
              <span>FastAPI</span>
              <span>PostgreSQL</span>
              <span>Supabase</span>
              <span>JavaScript</span>
              <span>Chart.js</span>
              <span>Python</span>
              <span>REST APIs</span>
            </div>
          </div>

          <div class="card">
            <div class="section-title">HR Knowledge Lab</div>
            <p class="highlight-text">
              A second dashboard focused on HR forecasting methods, powered by demo data and CSV uploads.
            </p>
            <ul class="bullet-list">
              <li>Demo KPIs and charts for forecasting scenarios.</li>
              <li>Upload HR forecasting CSVs to override demo data.</li>
              <li>Generate charts, ratios, and simple predictions.</li>
              <li>Surface auto-generated insights from the uploaded data.</li>
            </ul>
          </div>

          <div class="card">
            <div class="section-title">Role & Focus</div>
            <p class="highlight-text">
              Built as both a product demo and a service layer for HR analytics consulting.
            </p>
            <ul class="bullet-list">
              <li>HR operations & workforce analytics.</li>
              <li>Recruiting and onboarding optimization.</li>
              <li>Custom dashboards and HR data cleanup.</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- DASHBOARD SECTION (API-DRIVEN DEMO) -->
      <section id="dashboard" class="section">
        <div class="page-header">
          <h1>Live Workforce Dashboard</h1>
          <p class="subtitle">
            Real-time metrics powered by the HR360 backend (FastAPI + PostgreSQL/Supabase) or demo fallback.
          </p>
        </div>

        <!-- METRICS -->
        <div class="grid">
          <div class="card metric-card">
            <div class="metric-label">Headcount</div>
            <div id="headcount" class="metric-value">0</div>
          </div>
          <div class="card metric-card">
            <div class="metric-label">Annual Attrition</div>
            <div id="attrition" class="metric-value">0%</div>
          </div>
          <div class="card metric-card">
            <div class="metric-label">High-Risk Employees</div>
            <div id="risk" class="metric-value">0</div>
          </div>
          <div class="card metric-card">
            <div class="metric-label">Workforce Health Index</div>
            <div id="health" class="metric-value">0</div>
          </div>
        </div>

        <!-- CHARTS -->
        <div class="grid" style="margin-top: 24px;">
          <div class="card">
            <div class="section-title">Headcount by Department</div>
            <canvas id="deptChart" height="140"></canvas>
          </div>
          <div class="card">
            <div class="section-title">Salary Distribution (Bell Curve)</div>
            <canvas id="bellCurveChart" height="140"></canvas>
          </div>
          <div class="card">
            <div class="section-title">Risk Probability Distribution</div>
            <canvas id="riskHistogram" height="140"></canvas>
          </div>
          <div class="card">
            <div class="section-title">Salary vs Risk Probability</div>
            <canvas id="riskScatter" height="140"></canvas>
          </div>
        </div>

        <!-- TABLE + INSIGHTS -->
        <div class="grid" style="margin-top: 24px;">
          <div class="card">
            <div class="section-title">Employee Risk Table</div>
            <table id="riskTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Dept</th>
                  <th>Salary</th>
                  <th>Tenure</th>
                  <th>Risk Level</th>
                  <th>Risk Probability</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>

          <div class="card">
            <div class="section-title">Insights & Recommendations</div>
            <p class="hint small">
              Generated from the unified HR dataset to highlight key workforce patterns.
            </p>
            <div id="insights" class="pill-list"></div>

            <div class="section-title" style="margin-top: 18px;">Recommendations</div>
            <p class="hint small">
              Suggested actions to improve retention, staffing, and workforce health.
            </p>
            <div id="recommend" class="pill-list"></div>
          </div>
        </div>

        <!-- UPLOAD (BACKEND PIPELINE) -->
        <div class="card" style="margin-top: 24px;">
          <div class="section-title">Universal HR Data Loader</div>
          <p class="hint">
            Upload HR exports (CSV, Excel, HRIS reports). HR360 will clean, normalize, and stream them into the live dashboard.
          </p>
          <div class="upload-row">
            <input id="fileInput" type="file" />
            <button class="btn ghost-btn" onclick="processFile()">Upload & Refresh Dashboard</button>
          </div>
          <p id="uploadStatus" class="hint small" style="margin-top: 8px;">
            Select a file to begin universal HR data loading.
          </p>
        </div>
      </section>

      <!-- HR KNOWLEDGE LAB SECTION (CSV-DRIVEN + DEMO) -->
      <section id="knowledge" class="section">
        <div class="page-header">
          <h1>HR Knowledge Lab</h1>
          <p class="subtitle">
            A forecasting-focused dashboard: demo KPIs and charts first, then CSV upload to power your own scenarios.
          </p>
        </div>

        <!-- KNOWLEDGE KPIs -->
        <div class="grid">
          <div class="card metric-card">
            <div class="metric-label">Total Forecast Headcount</div>
            <div id="kpiTotalHeadcount" class="metric-value">0</div>
          </div>
          <div class="card metric-card">
            <div class="metric-label">Avg Units per Employee</div>
            <div id="kpiAvgUnitsPerEmp" class="metric-value">0</div>
          </div>
          <div class="card metric-card">
            <div class="metric-label">Avg Sales per Employee</div>
            <div id="kpiAvgSalesPerEmp" class="metric-value">0</div>
          </div>
          <div class="card metric-card">
            <div class="metric-label">Top Productivity Dept</div>
            <div id="kpiTopDept" class="metric-value" style="font-size: 18px;">—</div>
          </div>
        </div>

        <!-- UPLOAD -->
        <div class="card" style="margin-top: 24px;">
          <div class="section-title">Upload Forecasting Dataset</div>
          <p class="hint">
            Expected columns (CSV): <strong>dept, employees, units, sales</strong>.  
            Example row: <code>Sales,20,12000,800000</code>
          </p>
          <div class="upload-row">
            <input id="knowledgeFile" type="file" accept=".csv" />
            <button class="btn" onclick="processKnowledgeFile()">Upload & Build Forecast Lab</button>
          </div>
          <p id="knowledgeStatus" class="hint small" style="margin-top: 8px;">
            Using demo data. Upload a CSV to override.
          </p>
        </div>

        <!-- CHARTS + INSIGHTS -->
        <div class="grid" style="margin-top: 24px;">
          <div class="card">
            <div class="section-title">Headcount by Department (Forecast)</div>
            <canvas id="kDeptChart" height="140"></canvas>
          </div>
          <div class="card">
            <div class="section-title">Productivity Ratios (Units per Employee)</div>
            <canvas id="kProductivityChart" height="140"></canvas>
          </div>
          <div class="card">
            <div class="section-title">Sales vs Employees (Regression-style)</div>
            <canvas id="kSalesRegressionChart" height="140"></canvas>
            <div class="label" style="margin-top: 10px;">Target Annual Sales ($)</div>
            <div class="upload-row">
              <input id="kForecastSalesInput" type="number" placeholder="e.g., 5000000" />
              <button class="btn ghost-btn" onclick="runKnowledgeSalesForecast()">Forecast Employees</button>
            </div>
            <p id="kForecastSalesResult" class="hint small" style="margin-top: 6px;">
              Using demo regression. Upload data to customize.
            </p>
          </div>
          <div class="card">
            <div class="section-title">Auto-Generated Insights</div>
            <p class="hint small">
              Simple rule-based insights from the current dataset (demo or uploaded).
            </p>
            <ul id="kInsightsList" class="bullet-list"></ul>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="footer">
        <p>© 2026 MAREC HR360 — Workforce Intelligence Platform & HR Knowledge Lab</p>
        <p>Contact: mark.recio.pro@gmail.com • Las Vegas, NV (Open to Relocation)</p>
      </footer>
    </main>
  </div>
</body>
</html>
