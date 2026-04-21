<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <title>Marec HR360.Frontend</title>
    <link rel="stylesheet" href="./style.css">

  </head>
    
  <body>
  <!-- ============================
     MAREC HR360 — FULLSTACK DEMO
     DATA PIPELINE + ADDIE ENGINE
     ============================ -->

<div class="hero-bg"></div>

<div class="app">

  <!-- ======================
       SIDEBAR
       ====================== -->
  <aside class="sidebar">
    <div class="logo-wrap">
      <img 
        src="https://raw.githubusercontent.com/markreciopro/marec_hr360_frontend/main/Marec%20HR360.png"
        class="logo"
        alt="Marec HR360 Logo"
      />
      <div class="logo-tagline">Workforce Intelligence Platform</div>
    </div>

    <div class="contact-block">
      <div class="contact-title">Contact</div>
      <div class="contact-line">
        <span>FullStack Developer</span>
        <strong>Mark A Recio</strong>
      </div><div class="contact-line">
        <span>Phone</span>
        <strong>(702) 763-2573‬</strong>
      </div>
      <div class="contact-line">
        <span>Email</span>
        <strong>mar@marec.site</strong>
      </div>
      <div class="contact-line">
        <span>Location</span>
        <strong>Las Vegas, NV</strong>
      </div>
    </div>

    <button class="nav-btn active" onclick="showSection('home', this)">Home</button>
    <button class="nav-btn" onclick="showSection('dashboard', this)">Dashboard</button>
    <button class="nav-btn" onclick="showSection('metrics', this)">HR Metrics Matrix</button>
    <button class="nav-btn" onclick="showSection('knowledge', this)">Knowledge Lab</button>
    <button class="nav-btn" onclick="showSection('force', this)">Force Distribution</button>
    <button class="nav-btn" onclick="showSection('addie', this)">ADDIE System Map</button>
  </aside>

  <!-- ======================
       MAIN CONTENT
       ====================== -->
  <main class="content">

    <!-- ======================
         HOME / HERO
         ====================== -->
    <section id="home" class="section active">
      <div class="hero-section">
        <img 
          src="https://raw.githubusercontent.com/markreciopro/marec_hr360_frontend/main/Marec%20HR360.png"
          class="hero-logo"
          alt="Marec HR360 Logo"
        />
        <h1 class="hero-title">MAREC HR360</h1>
        <p class="hero-subtitle">
          A full‑stack workforce intelligence platform demo: upload HR and business CSVs, clean and normalize them,
          stream into dashboards, KPIs, and models, and visualize the entire lifecycle through a live ADDIE engine.
        </p>
      </div>
    </section>

    <!-- ======================
         DASHBOARD
         ====================== -->
    <section id="dashboard" class="section">
      <div class="page-header">
        <h1>Core Dashboard</h1>
        <div class="subtitle">Unified workforce health, risk, and performance</div>
      </div>

      <div class="grid overview-grid">
        <div class="card metric-card">
          <div class="metric-label">Headcount</div>
          <div class="metric-value" id="headcount">0</div>
        </div>
        <div class="card metric-card">
          <div class="metric-label">Attrition</div>
          <div class="metric-value" id="attrition">0%</div>
        </div>
        <div class="card metric-card">
          <div class="metric-label" id="riskLabel">High Risk</div>
          <div class="metric-value" id="risk">0</div>
        </div>
        <div class="card metric-card">
          <div class="metric-label" id="healthLabel">Org Health</div>
          <div class="metric-value" id="health">0</div>
        </div>
      </div>

      <div class="grid">
        <div class="card">
          <div class="section-title">Headcount by Department</div>
          <canvas id="deptChart"></canvas>
        </div>

        <div class="card">
          <div class="section-title">Salary Bell Curve</div>
          <canvas id="bellCurveChart"></canvas>
        </div>

        <div class="card">
          <div class="section-title">Risk Probability Histogram</div>
          <canvas id="riskHistogram"></canvas>
        </div>

        <div class="card">
          <div class="section-title">Salary vs Risk Scatter</div>
          <canvas id="riskScatter"></canvas>
        </div>
      </div>

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
              <th>Probability</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

      <div class="card">
        <div class="section-title">AI Insights</div>
        <div id="insights" class="pill-list"></div>
      </div>

      <div class="card">
        <div class="section-title">Recommendations</div>
        <div id="recommend" class="pill-list"></div>
      </div>

      <div class="card">
        <div class="section-title">Upload HR Dataset (People CSV)</div>
        <p class="hint small">
          Example columns: name, dept, salary, tenure, risk_level, risk_probability
        </p>
        <input type="file" id="fileInput" />
        <div id="uploadStatus" class="hint small">
          Select a CSV to begin cleaning and loading into the dashboard.
        </div>
        <button class="btn" onclick="processFile()">Process HR CSV</button>
      </div>
    </section>

    <!-- ======================
         HR METRICS MATRIX
         ====================== -->
    <section id="metrics" class="section">
      <div class="page-header">
        <h1>HR Metrics Matrix</h1>
        <div class="subtitle">Performance, retention, and capability modeling</div>
      </div>

      <div class="grid">
        <div class="card">
          <div class="section-title">HR Metric Strength Radar</div>
          <canvas id="metricsRadarChart"></canvas>
        </div>

        <div class="card">
          <div class="section-title">Performance Trend</div>
          <canvas id="metricsTrendChart"></canvas>
        </div>
      </div>
    </section>

    <!-- ======================
         KNOWLEDGE LAB
         ====================== -->
    <section id="knowledge" class="section">
      <div class="page-header">
        <h1>Knowledge Lab</h1>
        <div class="subtitle">Forecasting, regression, and productivity modeling</div>
      </div>

      <div class="card">
        <div class="section-title">Upload Business Dataset (Dept CSV)</div>
        <p class="hint small">
          Example columns: dept, employees, units, sales
        </p>
        <input type="file" id="knowledgeFile" />
        <div id="knowledgeStatus" class="hint small">
          Upload CSV to override demo data and rebuild charts, KPIs, and ADDIE context.
        </div>
        <button class="btn" onclick="processKnowledgeFile()">Process Business CSV</button>
      </div>

      <div class="grid">
        <div class="card">
          <div class="section-title">Headcount by Department</div>
          <canvas id="kDeptChart"></canvas>
        </div>

        <div class="card">
          <div class="section-title">Productivity (Units per Employee)</div>
          <canvas id="kProductivityChart"></canvas>
        </div>

        <div class="card">
          <div class="section-title">Sales vs Employees Regression</div>
          <canvas id="kSalesRegressionChart"></canvas>
        </div>
      </div>

      <div class="card">
        <div class="section-title">Forecast Headcount from Sales</div>
        <input type="number" id="kForecastSalesInput" placeholder="Projected sales…" />
        <button class="btn" onclick="runKnowledgeSalesForecast()">Forecast</button>
        <div id="kForecastSalesResult" class="hint"></div>
      </div>

      <div class="card">
        <div class="section-title">Key KPIs</div>
        <div class="grid">
          <div class="metric-card">
            <div class="metric-label">Total Headcount</div>
            <div class="metric-value" id="kpiTotalHeadcount">0</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Avg Units per Employee</div>
            <div class="metric-value" id="kpiAvgUnitsPerEmp">0</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Avg Sales per Employee</div>
            <div class="metric-value" id="kpiAvgSalesPerEmp">$0</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Top Department</div>
            <div class="metric-value" id="kpiTopDept">—</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="section-title">Insights</div>
        <ul id="kInsightsList" class="bullet-list"></ul>
      </div>
    </section>

    <!-- ======================
         FORCE DISTRIBUTION
         ====================== -->
    <section id="force" class="section">
      <div class="page-header">
        <h1>Force Distribution</h1>
        <div class="subtitle">Vertical bell curve talent segmentation</div>
      </div>

      <div class="card">
        <canvas id="forceChart"></canvas>
      </div>
    </section>

    <!-- ======================
         ADDIE SYSTEM MAP
         ====================== -->
    <section id="addie" class="section">
      <div class="page-header">
        <h1>ADDIE System Map</h1>
        <div class="subtitle">
          Live visualization of the HR360 data pipeline — from raw CSVs to dashboards, KPIs, and evaluation.
        </div>
      </div>

      <div class="addie-container">

        <!-- CENTRAL WHEEL -->
        <div class="addie-wheel" id="addieWheel">
          <div class="addie-center">ADDIE</div>
        </div>

        <!-- LABELS -->
        <div class="addie-segment a" data-phase="Analyze">Analyze</div>
        <div class="addie-segment d1" data-phase="Design">Design</div>
        <div class="addie-segment d2" data-phase="Develop">Develop</div>
        <div class="addie-segment i" data-phase="Implement">Implement</div>
        <div class="addie-segment e" data-phase="Evaluate">Evaluate</div>

        <!-- ORBIT -->
        <div class="orbit">
          <div class="orbit-item orbit-dashboard">
            <div class="orbit-card" data-phase-link="Analyze" onclick="showSection('dashboard'); setActiveAddiePhase('Analyze');">
              Core Dashboard
            </div>
          </div>
          <div class="orbit-item orbit-metrics">
            <div class="orbit-card" data-phase-link="Design" onclick="showSection('metrics'); setActiveAddiePhase('Design');">
              Metrics Matrix
            </div>
          </div>
          <div class="orbit-item orbit-knowledge">
            <div class="orbit-card" data-phase-link="Develop" onclick="showSection('knowledge'); setActiveAddiePhase('Develop');">
              Knowledge Lab
            </div>
          </div>
          <div class="orbit-item orbit-api">
            <div class="orbit-card" data-phase-link="Evaluate" onclick="jumpToForce(); setActiveAddiePhase('Evaluate');">
              Force Distribution
            </div>
          </div>
        </div>

        <!-- CONNECTOR LINES -->
        <svg class="addie-lines" width="100%" height="100%">
          <line id="line-dashboard" />
          <line id="line-metrics" />
          <line id="line-knowledge" />
          <line id="line-api" />
        </svg>
      </div>

      <div class="card addie-phase-card" data-phase-detail="Analyze">
        <h3 id="addiePhaseTitle">Analyze • Where we are now</h3>
        <p id="addiePhaseBody">
          Analyze uses the Core Dashboard and Force Distribution to understand current workforce health, 
          risk, and performance distribution. Upload HR CSVs to populate headcount, attrition, and risk tiers.
        </p>
        <ul class="bullet-list" id="addieDataSummary"></ul>
      </div>

      <div class="card">
        <div class="section-title">Data Pipeline Status</div>
        <ul class="bullet-list" id="pipelineStatusList">
          <li>HR CSV: demo data loaded.</li>
          <li>Business CSV: demo data loaded.</li>
          <li>ADDIE: synchronized with current dashboards and KPIs.</li>
        </ul>
      </div>
    </section>

    <div class="footer">© 2026 MAREC Insights — HR360 Workforce Intelligence</div>

  </main>
</div>

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script  src="./script.js"></script>

  </body>
  
</html>
