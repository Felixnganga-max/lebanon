import { assets } from "../assets/assets";

/**
 * ProgramData.js
 * ─────────────────────────────────────────────────────────────
 * Single source of truth for every Lebanon TTC program.
 * Each program now carries enough content to power both the
 * program grid (Programs.jsx) AND a detailed "Learn More" /
 * program detail page — overview, learning outcomes, a week-by-
 * week style curriculum breakdown, and career pathways.
 *
 * Usage:
 *   import { categories } from "../data/ProgramData";
 *
 * Every program object shape:
 * {
 *   title, image, duration, mode, fee, suitable, description,
 *   dates?,                     // only present for scheduled intakes
 *   overview,                   // 2-3 sentence expanded pitch
 *   learningOutcomes: [...],    // what they'll be able to DO after
 *   curriculum: [...],          // module-by-module breakdown
 *   careerPaths: [...],         // roles/next steps this unlocks
 *   certification,              // credential they walk away with
 * }
 * ─────────────────────────────────────────────────────────────
 */

const CERT_STANDARD = "NITA-Accredited Certificate of Completion";
const CERT_PROFESSIONAL = "NITA-Accredited Professional Certificate";

export const categories = [
  /* ══════════════════════ DIGITAL & TECH ══════════════════════ */
  {
    id: "digital",
    name: "Digital & Tech",
    programs: [
      {
        title: "Advanced Digital Marketing",
        image: assets.smm,
        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Marketers, Business Owners, Content Creators",
        description:
          "Master SEO, social media strategy, paid advertising, and analytics.",
        overview:
          "A hands-on program built for people who need marketing that actually converts, not just theory. You'll build real campaigns for a real (or practice) brand across search, social, and paid channels, then learn to read the numbers behind them.",
        learningOutcomes: [
          "Plan and execute a multi-channel digital marketing campaign from scratch",
          "Optimize a website and content for search engines (on-page + off-page SEO)",
          "Run and analyze paid ad campaigns on Meta and Google Ads",
          "Interpret analytics dashboards to make data-backed marketing decisions",
        ],
        curriculum: [
          "Week 1: Digital marketing foundations & customer journey mapping",
          "Week 2: SEO — keyword research, on-page optimization, technical basics",
          "Week 3: Social media strategy & content calendars",
          "Week 4: Paid advertising — Meta Ads Manager & Google Ads",
          "Week 5: Email marketing & marketing automation basics",
          "Week 6: Analytics, reporting, and capstone campaign presentation",
        ],
        careerPaths: [
          "Digital Marketing Executive/Manager",
          "Social Media Manager",
          "Freelance Marketing Consultant",
        ],
        certification: CERT_PROFESSIONAL,
      },
      {
        title: "Website Development Using WordPress",
        image: assets.wp,
        duration: "4 Weeks",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "Entrepreneurs, Freelancers, Aspiring Developers",
        description:
          "Build professional, responsive websites without writing code.",
        overview:
          "Designed for people who need a website live fast — for their business, church, NGO, or clients — without hiring a developer. By the end, you'll have published a real site and know how to maintain it yourself.",
        learningOutcomes: [
          "Install and configure WordPress from scratch (hosting, domain, themes)",
          "Customize page layouts, menus, and branding using visual page builders",
          "Add e-commerce, contact forms, and SEO plugins correctly",
          "Maintain, back up, and troubleshoot a live WordPress site",
        ],
        curriculum: [
          "Week 1: Hosting, domains & WordPress installation",
          "Week 2: Themes, page builders, and site structure",
          "Week 3: Plugins — forms, SEO, e-commerce (WooCommerce basics)",
          "Week 4: Site launch, security, backups & maintenance",
        ],
        careerPaths: [
          "Freelance Website Developer",
          "Small Business Digital Presence Manager",
          "WordPress Support Consultant",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Computer Packages & Digital Literacy",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        duration: "1 Month",
        mode: "Online / In-Person",
        fee: "Ksh. 8,000",
        suitable: "Students, Job Seekers, Office Workers",
        description:
          "MS Office, internet skills, and essential computer operations.",
        overview:
          "The entry point for anyone who needs solid, practical computer skills for work or study — from typing a professional report to building a budget spreadsheet and navigating the internet safely and efficiently.",
        learningOutcomes: [
          "Confidently use Microsoft Word, Excel, and PowerPoint for everyday tasks",
          "Manage files, folders, and basic computer troubleshooting",
          "Use email, cloud storage, and internet research effectively and safely",
          "Produce professional documents, spreadsheets, and presentations independently",
        ],
        curriculum: [
          "Week 1: Computer basics, file management & internet essentials",
          "Week 2: Microsoft Word — professional documents & formatting",
          "Week 3: Microsoft Excel — formulas, tables & basic data handling",
          "Week 4: Microsoft PowerPoint & final digital literacy assessment",
        ],
        careerPaths: [
          "Office Support / Clerical Roles",
          "Entry-Level Administrative Assistant",
          "General Digital Literacy for Job Applications",
        ],
        certification: CERT_STANDARD,
      },
    ],
  },

  /* ══════════════════════ DATA & ANALYTICS ══════════════════════ */
  {
    id: "data",
    name: "Data & Analytics",
    programs: [
      {
        title: "Data Analysis Using Advanced Excel & Power BI",
        image: assets.ex,
        duration: "12 Weeks",
        mode: "Online",
        fee: "Ksh. 25,000",
        suitable: "Analysts, Accountants, Managers",
        description:
          "Pivot tables, Power Query, DAX, and interactive dashboards.",
        overview:
          "A deep, career-grade program for anyone whose job depends on turning raw spreadsheets into decisions. You'll go from formulas to fully interactive Power BI dashboards that leadership can actually use.",
        learningOutcomes: [
          "Build complex formulas, pivot tables, and automated Excel workbooks",
          "Clean and transform messy datasets using Power Query",
          "Write DAX measures to power dynamic calculations",
          "Design interactive Power BI dashboards and publish reports",
        ],
        curriculum: [
          "Weeks 1–3: Advanced Excel formulas, pivot tables & data validation",
          "Weeks 4–6: Power Query — data cleaning & transformation",
          "Weeks 7–9: Power BI fundamentals & data modeling",
          "Weeks 10–11: DAX formulas & advanced visualizations",
          "Week 12: Capstone dashboard project & presentation",
        ],
        careerPaths: [
          "Data Analyst",
          "Business Intelligence Analyst",
          "Financial/Operations Analyst",
        ],
        certification: CERT_PROFESSIONAL,
      },
      {
        title: "Data Management & Analysis Using Stata",
        image: assets.st,
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 15,000",
        suitable: "Researchers, Statisticians, M&E Officers",
        description:
          "Statistical analysis, regression modeling, and data visualization.",
        overview:
          "A focused, intensive course for researchers who need Stata fluency fast — from importing raw survey data to running regression models that hold up in a thesis defense or donor report.",
        learningOutcomes: [
          "Import, clean, and manage datasets using Stata's do-file workflow",
          "Run descriptive statistics and hypothesis tests correctly",
          "Build and interpret linear and logistic regression models",
          "Produce publication-ready tables and visualizations",
        ],
        curriculum: [
          "Week 1: Stata interface, data import/cleaning & descriptive statistics",
          "Week 2: Regression modeling, hypothesis testing & result interpretation",
        ],
        careerPaths: [
          "Research Analyst",
          "Monitoring & Evaluation Officer",
          "Academic/Policy Researcher",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Data Management & Analysis Using R Software",
        image: assets.r,
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 15,000",
        suitable: "Data Scientists, Researchers, Policy Analysts",
        description:
          "Programming with R for data cleaning and statistical analysis.",
        overview:
          "For people ready to move from spreadsheets to real statistical programming. You'll write actual R scripts to clean, analyze, and visualize data — a skill set that scales far beyond what Excel can do.",
        learningOutcomes: [
          "Write R scripts to import, clean, and reshape datasets",
          "Apply core statistical functions and models in R",
          "Create publication-quality visualizations with ggplot2",
          "Structure reproducible analysis workflows using R Markdown",
        ],
        curriculum: [
          "Week 1: R fundamentals, data structures & tidyverse basics",
          "Week 2: Statistical modeling, ggplot2 visualization & reporting",
        ],
        careerPaths: [
          "Data Scientist (entry-level)",
          "Policy/Research Analyst",
          "Quantitative Researcher",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Statistical Package for Social Sciences (SPSS)",
        image: assets.spss,
        duration: "8 Weeks",
        mode: "Online",
        fee: "Ksh. 20,000",
        suitable: "Social Scientists, Researchers, Students",
        description:
          "Comprehensive SPSS training from data entry to multivariate analysis.",
        overview:
          "A thorough, step-by-step path through SPSS for social science research — built for students and researchers who need to move confidently from raw survey data to a defensible multivariate analysis.",
        learningOutcomes: [
          "Set up and manage datasets and variable coding in SPSS",
          "Run descriptive and inferential statistics accurately",
          "Conduct multivariate techniques (ANOVA, regression, factor analysis)",
          "Interpret and present SPSS output in academic/professional formats",
        ],
        curriculum: [
          "Weeks 1–2: SPSS interface, data entry & variable management",
          "Weeks 3–4: Descriptive statistics & data visualization",
          "Weeks 5–6: Inferential statistics — t-tests, ANOVA, chi-square",
          "Weeks 7–8: Regression, factor analysis & final research project",
        ],
        careerPaths: [
          "Research Assistant/Analyst",
          "Thesis & Dissertation Statistical Support",
          "Survey Data Analyst",
        ],
        certification: CERT_PROFESSIONAL,
      },
      {
        title: "Qualitative Data Analysis Using NVivo",
        image:
          "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
        duration: "9 Weeks",
        mode: "Online",
        fee: "Ksh. 22,000",
        suitable: "Qualitative Researchers, Academics, Consultants",
        description:
          "Thematic analysis, coding frameworks, and qualitative data management.",
        overview:
          "For researchers drowning in interview transcripts, focus group notes, or open-ended survey responses. You'll learn to organize that data systematically in NVivo and pull out defensible themes and insights.",
        learningOutcomes: [
          "Import and organize interviews, transcripts, and documents in NVivo",
          "Build and apply coding frameworks for thematic analysis",
          "Identify patterns and relationships across qualitative datasets",
          "Present qualitative findings clearly for academic or donor audiences",
        ],
        curriculum: [
          "Weeks 1–2: NVivo setup & qualitative data organization",
          "Weeks 3–5: Coding frameworks & thematic analysis techniques",
          "Weeks 6–7: Queries, matrices & pattern identification",
          "Weeks 8–9: Reporting findings & final case study project",
        ],
        careerPaths: [
          "Qualitative Research Analyst",
          "Academic Researcher/Consultant",
          "M&E Specialist (qualitative focus)",
        ],
        certification: CERT_PROFESSIONAL,
      },
      {
        title: "Qualitative Data Analysis Using QDA Miner Lite",
        image: assets.q,
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Researchers, Students, NGO Staff",
        description:
          "Code, categorize, and analyze qualitative text data efficiently.",
        overview:
          "A lighter, faster alternative to NVivo — ideal if you need practical qualitative coding skills for a specific project without the steeper learning curve or cost.",
        learningOutcomes: [
          "Import and manage text data in QDA Miner Lite",
          "Build coding categories and apply them consistently",
          "Run basic frequency and co-occurrence analysis on coded data",
          "Export organized findings for reports or academic write-ups",
        ],
        curriculum: [
          "Week 1: QDA Miner Lite setup & coding scheme development",
          "Week 2: Applying codes, analysis & exporting results",
        ],
        careerPaths: [
          "Junior Qualitative Researcher",
          "NGO Program/Data Officer",
          "Student Thesis Support",
        ],
        certification: CERT_STANDARD,
      },
    ],
  },

  /* ══════════════════════ LEADERSHIP & MANAGEMENT ══════════════════════ */
  {
    id: "leadership",
    name: "Leadership & Mgmt",
    programs: [
      {
        title: "Leadership & Management",
        image: assets.ld,
        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "Managers, Supervisors, Team Leaders, HRs, HoDs",
        description:
          "Strategic leadership, team dynamics, and organizational behavior.",
        overview:
          "A well-rounded foundation for anyone stepping into or already holding a leadership role — covering how to lead people, not just manage tasks, and how to read organizational dynamics accurately.",
        learningOutcomes: [
          "Apply core leadership styles appropriately to different team situations",
          "Manage team dynamics, conflict, and motivation effectively",
          "Understand organizational behavior and its impact on performance",
          "Develop a personal leadership development plan",
        ],
        curriculum: [
          "Week 1: Foundations of leadership vs. management",
          "Week 2: Leadership styles & situational leadership",
          "Week 3: Team dynamics & motivation theory",
          "Week 4: Conflict resolution & difficult conversations",
          "Week 5: Organizational behavior & culture",
          "Week 6: Personal leadership development plan & assessment",
        ],
        careerPaths: [
          "Team Lead / Supervisor",
          "Department Head",
          "HR/People Manager",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Supervisory Skills",
        image: assets.sk,
        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Supervisors, Team Leads, Junior Managers",
        description:
          "Effective supervision, delegation, and conflict resolution.",
        overview:
          "Built for people newly promoted into supervisory roles who need practical, day-one-usable skills — delegating without micromanaging, giving feedback that lands, and handling conflict before it escalates.",
        learningOutcomes: [
          "Delegate tasks effectively while maintaining accountability",
          "Give constructive feedback and conduct performance conversations",
          "Resolve workplace conflict using structured techniques",
          "Plan and run productive team meetings and briefings",
        ],
        curriculum: [
          "Week 1: The shift from peer to supervisor",
          "Week 2: Delegation & accountability frameworks",
          "Week 3: Feedback & performance conversations",
          "Week 4: Conflict resolution techniques",
          "Week 5: Running effective meetings & briefings",
          "Week 6: Practical supervisory scenarios & assessment",
        ],
        careerPaths: [
          "Frontline Supervisor",
          "Shift/Team Leader",
          "Junior Operations Manager",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Supervisory Leadership",
        image: assets.sl,
        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Aspiring Leaders, Team Coordinators",
        description: "Leadership principles applied to supervisory roles.",
        overview:
          "Bridges the gap between supervision and leadership — for coordinators and aspiring leaders who need to influence a team without formal authority over every part of it.",
        learningOutcomes: [
          "Apply leadership principles within a supervisory scope",
          "Build influence and trust across a team without formal authority",
          "Coordinate cross-functional tasks and priorities",
          "Set clear expectations and follow through on team commitments",
        ],
        curriculum: [
          "Week 1: Leadership within a supervisory scope",
          "Week 2: Building influence & trust",
          "Week 3: Cross-functional coordination",
          "Week 4: Setting expectations & accountability",
          "Week 5: Communication for coordinators",
          "Week 6: Applied leadership project & assessment",
        ],
        careerPaths: [
          "Team Coordinator",
          "Project Coordinator",
          "Aspiring Team Lead",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Transformational Leadership Development",
        image: assets.tl,
        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Senior Leaders, Executives, Change Agents",
        description:
          "Inspire innovation, drive change, and build high-performance cultures.",
        overview:
          "For leaders already managing teams who need to move beyond maintaining the status quo — driving genuine organizational change and building a culture people want to perform in.",
        learningOutcomes: [
          "Diagnose organizational culture and identify change opportunities",
          "Apply change management frameworks to real initiatives",
          "Inspire innovation and psychological safety within teams",
          "Lead high-performance culture initiatives with measurable outcomes",
        ],
        curriculum: [
          "Week 1: Transformational vs. transactional leadership",
          "Week 2: Diagnosing organizational culture",
          "Week 3: Change management frameworks",
          "Week 4: Driving innovation & psychological safety",
          "Week 5: Building high-performance teams",
          "Week 6: Change initiative capstone project",
        ],
        careerPaths: [
          "Senior Manager / Director",
          "Change Management Lead",
          "Organizational Development Consultant",
        ],
        certification: CERT_PROFESSIONAL,
      },
      {
        title: "Strategic Management",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 15,000",
        suitable: "Executives, Directors, Business Strategists",
        description:
          "Strategic planning, competitive analysis, and long-term positioning.",
        overview:
          "A practical strategy course for executives and directors who need to move from reacting to markets to actively positioning their organization ahead of them.",
        learningOutcomes: [
          "Conduct competitive and environmental analysis (PESTEL, Porter's Five Forces)",
          "Develop a coherent strategic plan aligned to organizational goals",
          "Evaluate strategic options and trade-offs",
          "Translate strategy into actionable implementation roadmaps",
        ],
        curriculum: [
          "Week 1: Strategic thinking & analysis frameworks",
          "Week 2: Competitive & environmental analysis",
          "Week 3: Strategy formulation & options evaluation",
          "Week 4: Long-term positioning & competitive advantage",
          "Week 5: Strategy implementation & execution roadmaps",
          "Week 6: Strategic plan capstone presentation",
        ],
        careerPaths: [
          "Strategy/Business Development Manager",
          "Executive Director",
          "Management Consultant",
        ],
        certification: CERT_PROFESSIONAL,
      },
      {
        title: "Performance Management",
        image:
          "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&q=80",
        duration: "4 Weeks",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "HR Professionals, Managers, Team Leaders",
        description:
          "Design and implement effective performance appraisal systems.",
        overview:
          "For HR professionals and managers tired of appraisal systems that feel like paperwork — this course builds performance management that actually improves output and morale.",
        learningOutcomes: [
          "Design KPI and objective-setting frameworks aligned to strategy",
          "Conduct fair, structured performance appraisals",
          "Link performance outcomes to development plans and rewards",
          "Handle underperformance conversations professionally",
        ],
        curriculum: [
          "Week 1: Performance management systems & KPI design",
          "Week 2: Objective-setting frameworks (SMART, OKRs)",
          "Week 3: Conducting fair appraisals & giving feedback",
          "Week 4: Linking performance to development & rewards",
        ],
        careerPaths: [
          "HR Officer/Manager",
          "People & Culture Lead",
          "Team/Department Manager",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Project Management",
        image:
          "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
        duration: "8 Weeks",
        mode: "Online",
        fee: "Ksh. 19,500",
        suitable: "Project Managers, Coordinators, Consultants",
        description:
          "End-to-end project lifecycle management and risk management.",
        overview:
          "A complete run through the project lifecycle — from scoping and planning to execution, risk management, and closeout — grounded in globally recognized project management principles.",
        learningOutcomes: [
          "Define project scope, objectives, and deliverables clearly",
          "Build realistic project schedules and budgets",
          "Identify, assess, and mitigate project risks proactively",
          "Manage stakeholders and close out projects with lessons learned",
        ],
        curriculum: [
          "Weeks 1–2: Project initiation & scope definition",
          "Weeks 3–4: Planning — scheduling, budgeting & resourcing",
          "Weeks 5–6: Execution & stakeholder management",
          "Week 7: Risk management & monitoring",
          "Week 8: Project closeout & capstone case study",
        ],
        careerPaths: [
          "Project Manager/Coordinator",
          "Program Officer",
          "Independent Project Consultant",
        ],
        certification: CERT_PROFESSIONAL,
      },
      {
        title: "Office Administration",
        image:
          "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80",
        duration: "4 Weeks",
        mode: "Online / In-Person",
        fee: "Ksh. 8,000",
        suitable: "Admin Assistants, Office Managers, Secretaries",
        description:
          "Office operations, record management, and administrative excellence.",
        overview:
          "Practical training for the people who keep an office actually running — from records and correspondence to scheduling and vendor coordination.",
        learningOutcomes: [
          "Organize and maintain accurate physical and digital records",
          "Manage office correspondence and professional communication",
          "Coordinate schedules, meetings, and office logistics efficiently",
          "Apply administrative best practices for confidentiality and compliance",
        ],
        curriculum: [
          "Week 1: Office systems & records management",
          "Week 2: Business correspondence & communication",
          "Week 3: Scheduling, meetings & logistics coordination",
          "Week 4: Confidentiality, compliance & final assessment",
        ],
        careerPaths: [
          "Office Administrator",
          "Administrative Assistant",
          "Operations Support Officer",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Front Office Management",
        image: assets.fo,
        duration: "1 Month",
        mode: "Online / In-Person",
        fee: "Ksh. 10,000",
        suitable: "Receptionists, Front Desk Officers, Hospitality Staff",
        description:
          "Customer service excellence and professional front-desk operations.",
        overview:
          "For anyone whose job is the first impression of an organization — training in customer service, handling difficult visitors gracefully, and running an efficient front desk.",
        learningOutcomes: [
          "Deliver professional, brand-aligned customer service consistently",
          "Handle visitor inquiries, complaints, and difficult situations calmly",
          "Manage front-desk operations, bookings, and communication systems",
          "Apply telephone and email etiquette professionally",
        ],
        curriculum: [
          "Week 1: Front office operations & professional presentation",
          "Week 2: Customer service excellence & handling complaints",
          "Week 3: Communication systems — phone, email & visitor management",
          "Week 4: Booking/reception systems & final practical assessment",
        ],
        careerPaths: [
          "Front Desk Officer/Receptionist",
          "Guest Relations Officer",
          "Customer Service Representative",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Executive Assistant Certificate",
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
        duration: "1 Month",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "Executive Assistants, Personal Assistants",
        description:
          "Advanced administrative support and executive communication.",
        overview:
          "A step up from general office administration — built for people supporting senior executives directly, where discretion, judgment, and polished communication matter as much as organization.",
        learningOutcomes: [
          "Manage complex executive calendars, travel, and priorities",
          "Draft high-level correspondence and executive communications",
          "Handle confidential information with sound judgment and discretion",
          "Anticipate executive needs and manage competing priorities proactively",
        ],
        curriculum: [
          "Week 1: The role of a modern executive assistant",
          "Week 2: Calendar, travel & priority management",
          "Week 3: Executive communication & correspondence",
          "Week 4: Confidentiality, discretion & final practicum",
        ],
        careerPaths: [
          "Executive Assistant",
          "Personal Assistant to Senior Management",
          "Chief of Staff (entry pathway)",
        ],
        certification: CERT_PROFESSIONAL,
      },
    ],
  },

  /* ══════════════════════ COMPLIANCE & SAFETY ══════════════════════ */
  {
    id: "compliance",
    name: "Compliance & Safety",
    programs: [
      {
        title: "Certified Data Protection Officer (DPO)",
        image: assets.cd,
        duration: "4 Weeks",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "DPOs, Compliance Officers, Legal, IT Security",
        description: "GDPR-aligned data protection and compliance auditing.",
        overview:
          "With Kenya's Data Protection Act enforcement tightening, organizations need people who genuinely understand compliance — not just the law, but how to build and audit real data protection systems.",
        learningOutcomes: [
          "Interpret Kenya's Data Protection Act and GDPR-aligned principles",
          "Conduct data protection impact assessments (DPIAs)",
          "Design and audit organizational data protection policies",
          "Handle data breach response and regulatory reporting requirements",
        ],
        curriculum: [
          "Week 1: Data protection law fundamentals (Kenya DPA & GDPR alignment)",
          "Week 2: Data protection impact assessments & risk mapping",
          "Week 3: Policy design & compliance auditing",
          "Week 4: Breach response, reporting & final case study",
        ],
        careerPaths: [
          "Data Protection Officer",
          "Compliance Officer",
          "IT Governance/Risk Consultant",
        ],
        certification: CERT_PROFESSIONAL,
      },
      {
        title: "Child Protection & Safeguarding",
        image: assets.cp,
        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Teachers, Social Workers, NGO Staff, Caregivers",
        description:
          "Safeguarding policies, abuse identification, and trauma-informed care.",
        overview:
          "Essential training for anyone working directly with children — recognizing abuse early, responding appropriately, and building institutional safeguards that actually protect children rather than just satisfy a policy checklist.",
        learningOutcomes: [
          "Identify signs of child abuse, neglect, and exploitation accurately",
          "Apply safeguarding policies and reporting procedures correctly",
          "Respond to disclosures using trauma-informed approaches",
          "Design or strengthen institutional child protection frameworks",
        ],
        curriculum: [
          "Week 1: Child rights & safeguarding fundamentals",
          "Week 2: Recognizing abuse, neglect & exploitation",
          "Week 3: Reporting procedures & mandatory reporting duties",
          "Week 4: Trauma-informed response & communication",
          "Week 5: Institutional safeguarding policy design",
          "Week 6: Case studies & final assessment",
        ],
        careerPaths: [
          "Child Protection Officer",
          "Safeguarding Focal Point (schools/NGOs)",
          "Social Worker",
        ],
        certification: CERT_PROFESSIONAL,
      },
      {
        title: "Occupational Safety & Health (OSH)",
        image: assets.os,
        duration: "5 Days",
        mode: "Online / In-Person",
        fee: "Ksh. 8,000",
        suitable: "OSH Officers, Safety Committees, HR Professionals",
        description: "Workplace hazard identification and risk assessment.",
        overview:
          "A compact, practical course aligned to Kenya's OSH regulatory requirements — built to help workplaces identify hazards before they cause injury, not just after an incident report is filed.",
        learningOutcomes: [
          "Identify workplace hazards across common industry settings",
          "Conduct basic risk assessments and control measure planning",
          "Understand Kenya's OSH regulatory and compliance requirements",
          "Support workplace safety committees and incident reporting systems",
        ],
        curriculum: [
          "Day 1: OSH legal framework in Kenya",
          "Day 2: Hazard identification techniques",
          "Day 3: Risk assessment & control hierarchy",
          "Day 4: Incident reporting & safety committees",
          "Day 5: Practical workplace audit & assessment",
        ],
        careerPaths: [
          "OSH Officer",
          "Safety Committee Member",
          "HR Officer (Safety Compliance Focus)",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Disaster Risk Reduction & Management",
        image: assets.p,
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "Emergency Responders, NGO Staff, Government Officers",
        description: "Disaster preparedness and community resilience building.",
        overview:
          "Built for people working where disaster preparedness genuinely saves lives — covering the full cycle from risk assessment to response planning and building resilience in vulnerable communities.",
        learningOutcomes: [
          "Conduct community-level disaster risk and vulnerability assessments",
          "Develop disaster preparedness and response plans",
          "Coordinate early warning systems and emergency communication",
          "Apply resilience-building frameworks in development programming",
        ],
        curriculum: [
          "Week 1: Disaster risk assessment & vulnerability mapping",
          "Week 2: Preparedness planning, early warning & resilience building",
        ],
        careerPaths: [
          "Disaster Risk Reduction Officer",
          "Emergency Response Coordinator",
          "Humanitarian Program Officer",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Hospital Emergency Preparedness & Response",
        image: assets.hs,
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Healthcare Administrators, Emergency Coordinators",
        description:
          "Hospital emergency planning and mass casualty incident management.",
        overview:
          "A specialized course for healthcare administrators who need functioning emergency systems, not just a plan sitting in a drawer — covering mass casualty response and hospital-level coordination.",
        learningOutcomes: [
          "Develop hospital emergency preparedness and response plans",
          "Coordinate mass casualty incident management protocols",
          "Apply triage and resource allocation principles during emergencies",
          "Run emergency drills and evaluate hospital readiness",
        ],
        curriculum: [
          "Week 1: Hospital emergency planning & incident command systems",
          "Week 2: Mass casualty response, triage & readiness drills",
        ],
        careerPaths: [
          "Hospital Emergency Coordinator",
          "Healthcare Administrator",
          "Public Health Emergency Officer",
        ],
        certification: CERT_PROFESSIONAL,
      },
    ],
  },

  /* ══════════════════════ NGO & DEVELOPMENT ══════════════════════ */
  {
    id: "ngo",
    name: "NGO & Development",
    programs: [
      {
        title: "Resource Mobilization & Proposal Writing",
        image: assets.rm,
        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 15,000",
        suitable: "Project Managers, Fundraising Officers, NGO Leaders",
        description:
          "Grant writing, donor engagement, and resource mobilization.",
        overview:
          "For NGO staff whose survival depends on winning grants — a practical course in writing proposals that donors actually fund, not just proposals that look complete.",
        learningOutcomes: [
          "Research and identify appropriate donor and funding opportunities",
          "Write compelling, logically structured funding proposals",
          "Develop results frameworks and budgets that satisfy donor requirements",
          "Build long-term donor relationships and engagement strategies",
        ],
        curriculum: [
          "Week 1: Donor landscape & funding opportunity research",
          "Week 2: Proposal structure & needs assessment writing",
          "Week 3: Logical frameworks & theory of change",
          "Week 4: Budgeting for proposals",
          "Week 5: Donor engagement & relationship building",
          "Week 6: Full proposal capstone & peer review",
        ],
        careerPaths: [
          "Resource Mobilization Officer",
          "Grants/Proposal Writer",
          "Program Development Manager",
        ],
        certification: CERT_PROFESSIONAL,
      },
      {
        title: "Project M&E with Data Management",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        duration: "10 Days",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "M&E Officers, Project Managers, Consultants",
        description:
          "M&E frameworks, indicator tracking, and reporting systems.",
        overview:
          "A practical, systems-focused course for building M&E structures that stay usable throughout a project's life — from indicator design to the data management systems that track them.",
        learningOutcomes: [
          "Design M&E frameworks with clear, measurable indicators",
          "Set up data collection and management systems for tracking",
          "Analyze and report on project performance against targets",
          "Use M&E findings to inform project adaptation and decision-making",
        ],
        curriculum: [
          "Days 1–3: M&E frameworks & indicator design",
          "Days 4–6: Data collection tools & management systems",
          "Days 7–8: Data analysis & performance reporting",
          "Days 9–10: Using M&E for adaptive management & final project",
        ],
        careerPaths: [
          "M&E Officer",
          "Project Data Manager",
          "Program Quality Advisor",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Results-Based Monitoring & Evaluation",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "M&E Professionals, Program Managers",
        description:
          "Results-based management and evidence-based decision-making.",
        overview:
          "A focused course in shifting from activity tracking to genuine results measurement — for teams under pressure to prove outcomes, not just outputs, to donors and boards.",
        learningOutcomes: [
          "Distinguish outputs, outcomes, and impact within a results chain",
          "Apply results-based management principles to program design",
          "Use evidence to inform program decisions and course correction",
          "Report results credibly to donors and leadership",
        ],
        curriculum: [
          "Day 1: Results-based management foundations",
          "Day 2: Results chains — outputs, outcomes & impact",
          "Day 3: Evidence-based decision-making tools",
          "Day 4: Results reporting for donors & leadership",
          "Day 5: Applied case study & assessment",
        ],
        careerPaths: [
          "M&E Specialist",
          "Program Manager",
          "Donor Reporting Officer",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Participatory Monitoring & Evaluation",
        image: assets.pm,
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Community Development Officers, NGO Staff",
        description: "Community-led M&E and participatory tools.",
        overview:
          "For practitioners who believe communities should help evaluate the programs meant to serve them — practical tools for genuinely participatory, community-owned M&E.",
        learningOutcomes: [
          "Apply participatory M&E principles and community engagement techniques",
          "Facilitate participatory data collection tools (e.g., community scorecards)",
          "Balance community-led insights with donor reporting requirements",
          "Build community ownership into project monitoring processes",
        ],
        curriculum: [
          "Day 1: Principles of participatory M&E",
          "Day 2: Community engagement & facilitation techniques",
          "Day 3: Participatory tools — scorecards, mapping, storytelling",
          "Day 4: Integrating community data into formal reporting",
          "Day 5: Field practicum & assessment",
        ],
        careerPaths: [
          "Community Development Officer",
          "Participatory M&E Facilitator",
          "Field Program Officer",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Project Performance Evaluation",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
        duration: "10 Days",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Evaluators, Program Directors, Donor Representatives",
        description: "Performance metrics and impact assessment methodologies.",
        overview:
          "For evaluators and program directors conducting formal end-of-project or mid-term evaluations — grounded in credible methodology donors and boards will trust.",
        learningOutcomes: [
          "Design performance evaluation frameworks and metrics",
          "Select and apply appropriate evaluation methodologies",
          "Conduct data collection and analysis for formal evaluations",
          "Write evaluation reports that meet donor and OECD-DAC standards",
        ],
        curriculum: [
          "Days 1–3: Evaluation design & methodology selection",
          "Days 4–6: Data collection & analysis for evaluations",
          "Days 7–8: OECD-DAC evaluation criteria & standards",
          "Days 9–10: Evaluation report writing & final assessment",
        ],
        careerPaths: [
          "Program Evaluator",
          "M&E Consultant",
          "Donor Compliance/Reporting Officer",
        ],
        certification: CERT_PROFESSIONAL,
      },
      {
        title: "Impact Evaluation for Evidence-Based Development",
        image:
          "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "Researchers, Policy Makers, Development Practitioners",
        description: "Counterfactual analysis and causal impact measurement.",
        overview:
          "A rigorous, focused introduction to impact evaluation methods — for practitioners who need to prove causation, not just correlation, in their development interventions.",
        learningOutcomes: [
          "Understand counterfactual reasoning and causal inference basics",
          "Distinguish impact evaluation designs (RCTs, quasi-experimental methods)",
          "Assess when and how to apply impact evaluation appropriately",
          "Interpret impact evaluation findings for policy and program decisions",
        ],
        curriculum: [
          "Day 1: Foundations of causal inference & counterfactuals",
          "Day 2: Experimental designs (RCTs)",
          "Day 3: Quasi-experimental methods",
          "Day 4: Interpreting & applying impact evaluation findings",
          "Day 5: Case studies & final assessment",
        ],
        careerPaths: [
          "Impact Evaluation Analyst",
          "Development Researcher",
          "Policy Analyst",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Budgeting & Cost Control for NGOs",
        image:
          "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Finance Officers, Program Managers, Grant Administrators",
        description: "NGO budgeting, variance analysis, and donor compliance.",
        overview:
          "Practical financial management for NGO teams — building budgets that satisfy donor scrutiny and staying compliant without slowing programs down.",
        learningOutcomes: [
          "Develop realistic program and grant budgets",
          "Conduct budget variance analysis and corrective planning",
          "Apply donor compliance requirements to financial management",
          "Prepare financial reports aligned to grant agreements",
        ],
        curriculum: [
          "Day 1: NGO budgeting principles & structures",
          "Day 2: Grant budget development",
          "Day 3: Variance analysis & cost control",
          "Day 4: Donor compliance & financial reporting",
          "Day 5: Practical budgeting exercise & assessment",
        ],
        careerPaths: [
          "NGO Finance Officer",
          "Grants Administrator",
          "Program Budget Manager",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Accounting for NGOs Using QuickBooks",
        image:
          "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&q=80",
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Accountants, Finance Officers, Admin Staff",
        description:
          "NGO-specific accounting and fund tracking with QuickBooks.",
        overview:
          "Hands-on QuickBooks training tailored specifically to NGO fund accounting — tracking restricted vs. unrestricted funds the way donors expect to see them.",
        learningOutcomes: [
          "Set up QuickBooks for NGO-specific fund accounting structures",
          "Track restricted and unrestricted funds by donor/project",
          "Generate accurate financial statements for grant reporting",
          "Reconcile accounts and maintain audit-ready financial records",
        ],
        curriculum: [
          "Day 1: QuickBooks setup for NGO fund accounting",
          "Day 2: Recording income, expenses & fund allocation",
          "Day 3: Donor/project-based tracking",
          "Day 4: Financial statements & reconciliation",
          "Day 5: Audit-readiness & final practicum",
        ],
        careerPaths: [
          "NGO Accountant",
          "Finance Officer",
          "Grants Financial Administrator",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Financial Management for Non-Finance Executives",
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Program Directors, Managers, Board Members",
        description: "Financial literacy for leaders: budgets and cash flow.",
        overview:
          "For leaders who make financial decisions but don't have a finance background — enough fluency to read a budget, question a cash flow statement, and make sound financial calls.",
        learningOutcomes: [
          "Read and interpret budgets, cash flow, and financial statements",
          "Ask the right financial questions in board and management meetings",
          "Understand cost structures and their impact on organizational sustainability",
          "Make informed financial decisions without needing to be an accountant",
        ],
        curriculum: [
          "Week 1: Financial statements demystified for non-finance leaders",
          "Week 2: Budgeting, cash flow & financial decision-making",
        ],
        careerPaths: [
          "Program/Executive Director",
          "Board Member",
          "Non-Finance Department Head",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Analytical Decision Making",
        image: assets.dm,
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Managers, Analysts, Policy Makers",
        description:
          "Data-driven decision frameworks and strategic problem-solving.",
        overview:
          "A short, sharp course in structured thinking — for anyone whose decisions are too important to be based on gut feeling alone.",
        learningOutcomes: [
          "Apply structured decision-making frameworks to complex problems",
          "Use data and evidence systematically in decision processes",
          "Evaluate trade-offs and risks before committing to a decision",
          "Communicate decisions and their rationale clearly to stakeholders",
        ],
        curriculum: [
          "Day 1: Foundations of analytical decision-making",
          "Day 2: Decision frameworks & problem structuring",
          "Day 3: Using data & evidence in decisions",
          "Day 4: Risk, trade-offs & scenario analysis",
          "Day 5: Applied case studies & final assessment",
        ],
        careerPaths: [
          "Program/Operations Manager",
          "Policy Analyst",
          "Strategy Advisor",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Gender Mainstreaming",
        image: assets.gm,
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Development Practitioners, HR Professionals, Policy Makers",
        description:
          "Integrating gender perspectives into policies and programs.",
        overview:
          "Practical training in embedding gender equity into program design and policy — moving past token gender sections into genuinely inclusive practice.",
        learningOutcomes: [
          "Conduct gender analysis within program and policy contexts",
          "Integrate gender considerations into project design and M&E",
          "Identify and address gender-based barriers in institutions",
          "Develop gender action plans aligned to organizational goals",
        ],
        curriculum: [
          "Day 1: Gender concepts & frameworks",
          "Day 2: Gender analysis tools",
          "Day 3: Mainstreaming gender into program design",
          "Day 4: Gender in M&E & institutional policy",
          "Day 5: Gender action plan development & assessment",
        ],
        careerPaths: [
          "Gender/Social Inclusion Officer",
          "Development Program Officer",
          "Policy Advisor",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Gender-Based Violence Training",
        image: assets.gbv,
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Social Workers, Counselors, Law Enforcement, NGO Staff",
        description: "GBV prevention, survivor support, and legal frameworks.",
        overview:
          "Grounded, sensitive training for frontline responders — covering prevention, survivor-centered support, and the legal frameworks that govern GBV response in Kenya.",
        learningOutcomes: [
          "Understand GBV forms, drivers, and the legal frameworks governing response",
          "Apply survivor-centered approaches when responding to disclosures",
          "Coordinate referral pathways across health, legal, and psychosocial services",
          "Support GBV prevention programming within institutions and communities",
        ],
        curriculum: [
          "Day 1: GBV forms, drivers & legal frameworks in Kenya",
          "Day 2: Survivor-centered response principles",
          "Day 3: Referral pathways & multi-sectoral coordination",
          "Day 4: Prevention programming approaches",
          "Day 5: Case scenarios & final assessment",
        ],
        careerPaths: [
          "GBV Case Worker/Counselor",
          "Social Worker",
          "Community Protection Officer",
        ],
        certification: CERT_PROFESSIONAL,
      },
      {
        title: "Disability Mainstreaming in Projects",
        image: assets.ds,
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable:
          "Project Managers, HR Professionals, Development Practitioners",
        description: "Inclusive programming and disability rights frameworks.",
        overview:
          "Practical training in designing genuinely accessible, inclusive programs — moving disability inclusion from an afterthought to a built-in design principle.",
        learningOutcomes: [
          "Apply disability rights frameworks to program design",
          "Identify and remove accessibility barriers in projects and workplaces",
          "Integrate disability inclusion indicators into M&E systems",
          "Engage persons with disabilities meaningfully in program design",
        ],
        curriculum: [
          "Day 1: Disability rights frameworks & models of disability",
          "Day 2: Accessibility audits & barrier identification",
          "Day 3: Inclusive program design principles",
          "Day 4: Disability inclusion in M&E",
          "Day 5: Applied project review & assessment",
        ],
        careerPaths: [
          "Disability Inclusion Officer",
          "Project Manager (Inclusive Programming)",
          "HR/Diversity & Inclusion Officer",
        ],
        certification: CERT_STANDARD,
      },
    ],
  },

  /* ══════════════════════ BUSINESS ══════════════════════ */
  {
    id: "business",
    name: "Business",
    programs: [
      {
        title: "Entrepreneurship & Business Growth",
        image: assets.bs,
        duration: "6 Weeks",
        mode: "Virtual",
        fee: "Ksh. 15,000",
        suitable: "Entrepreneurs, Business Owners, Startup Founders",
        description: "Business planning, market strategy, and scalable growth.",
        overview:
          "For founders and business owners who need more than passion to grow — a structured path through validating an idea, building a real business plan, and scaling sustainably.",
        learningOutcomes: [
          "Validate a business idea against real market demand",
          "Build a bankable business plan and financial projections",
          "Develop a market entry and growth strategy",
          "Identify funding and scaling pathways appropriate to the business stage",
        ],
        curriculum: [
          "Week 1: Idea validation & market research",
          "Week 2: Business model design",
          "Week 3: Business planning & financial projections",
          "Week 4: Marketing & customer acquisition strategy",
          "Week 5: Funding options & scaling strategies",
          "Week 6: Business plan pitch & capstone review",
        ],
        careerPaths: [
          "Business Owner/Founder",
          "Business Development Officer",
          "Startup Consultant",
        ],
        certification: CERT_PROFESSIONAL,
      },
      {
        title: "Public Speaking Course",
        image:
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Professionals, Leaders, Trainers, Politicians",
        description:
          "Persuasive communication and impactful presentation design.",
        overview:
          "A practical, confidence-building course for anyone who needs to speak in front of people and be remembered for the right reasons — structure, delivery, and presence, all trained together.",
        learningOutcomes: [
          "Structure a persuasive speech or presentation clearly",
          "Manage nerves and project confidence while speaking publicly",
          "Use vocal variety, body language, and pacing effectively",
          "Design visually clear, impactful presentation slides",
        ],
        curriculum: [
          "Week 1: Speech structure, audience analysis & managing nerves",
          "Week 2: Delivery techniques, presentation design & final live delivery",
        ],
        careerPaths: [
          "Trainer/Facilitator",
          "Public Relations Officer",
          "Leadership/Executive Communication",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Protocol, Etiquette & Event Management",
        image:
          "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
        duration: "10 Days",
        mode: "Online / In-Person",
        fee: "Ksh. 12,000",
        suitable: "Event Planners, Protocol Officers, Corporate Professionals",
        description: "Diplomatic protocol and large-scale event coordination.",
        overview:
          "For professionals responsible for high-stakes events and official functions — where getting the protocol, seating, and etiquette wrong is not an option.",
        learningOutcomes: [
          "Apply diplomatic and corporate protocol standards correctly",
          "Plan and coordinate large-scale official events end-to-end",
          "Manage VIP logistics, seating protocol, and official communication",
          "Handle cross-cultural etiquette considerations professionally",
        ],
        curriculum: [
          "Days 1–3: Protocol fundamentals & diplomatic etiquette",
          "Days 4–6: Event planning & logistics coordination",
          "Days 7–8: VIP management & seating protocol",
          "Days 9–10: Cross-cultural etiquette & final event simulation",
        ],
        careerPaths: [
          "Protocol Officer",
          "Event Manager/Planner",
          "Corporate Affairs Officer",
        ],
        certification: CERT_PROFESSIONAL,
      },
      {
        title: "QuickBooks Accounting Software Training",
        image:
          "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&q=80",
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "Accountants, Bookkeepers, Small Business Owners",
        description:
          "Hands-on QuickBooks for invoicing, payroll, and tax compliance.",
        overview:
          "General business-focused QuickBooks training — invoicing, payroll basics, and tax compliance — for accountants and small business owners managing their own books.",
        learningOutcomes: [
          "Set up a company file and chart of accounts in QuickBooks",
          "Manage invoicing, billing, and accounts receivable/payable",
          "Process basic payroll and understand tax compliance requirements",
          "Generate accurate financial reports for business decision-making",
        ],
        curriculum: [
          "Week 1: QuickBooks setup, invoicing & accounts management",
          "Week 2: Payroll basics, tax compliance & financial reporting",
        ],
        careerPaths: [
          "Bookkeeper",
          "Small Business Accountant",
          "Accounts Assistant",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Risk Identification & Quality Risk Management",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Quality Managers, Risk Officers, Compliance Professionals",
        description: "ISO-aligned risk frameworks and quality assurance.",
        overview:
          "For quality and compliance professionals who need risk management that aligns with recognized ISO standards, not an internal checklist invented on the spot.",
        learningOutcomes: [
          "Apply ISO-aligned risk identification and assessment frameworks",
          "Develop risk registers and mitigation plans",
          "Integrate risk management into quality assurance systems",
          "Communicate risk findings clearly to leadership and auditors",
        ],
        curriculum: [
          "Day 1: Risk management frameworks & ISO alignment",
          "Day 2: Risk identification techniques",
          "Day 3: Risk assessment & registers",
          "Day 4: Integrating risk into quality management systems",
          "Day 5: Applied audit simulation & assessment",
        ],
        careerPaths: [
          "Quality Assurance Manager",
          "Risk & Compliance Officer",
          "ISO Systems Coordinator",
        ],
        certification: CERT_PROFESSIONAL,
      },
    ],
  },

  /* ══════════════════════ SPECIALIZED ══════════════════════ */
  {
    id: "specialized",
    name: "Specialized",
    programs: [
      {
        title: "Quantum GIS (QGIS)",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Urban Planners, Environmental Scientists, Surveyors",
        description: "Spatial data analysis and geospatial visualization.",
        overview:
          "A practical, free-and-open-source alternative to expensive GIS software — for planners, environmental scientists, and surveyors who need real spatial analysis skills without the licensing cost.",
        learningOutcomes: [
          "Import, manage, and visualize spatial datasets in QGIS",
          "Perform spatial analysis (buffering, overlay, proximity analysis)",
          "Create professional maps and geospatial visualizations",
          "Export and share GIS outputs for planning or research use",
        ],
        curriculum: [
          "Week 1: QGIS interface, data import & map layer management",
          "Week 2: Spatial analysis tools, map design & final mapping project",
        ],
        careerPaths: [
          "GIS Technician/Analyst",
          "Urban/Regional Planner",
          "Environmental Surveyor",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Church Management & Administration",
        image:
          "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=80",
        duration: "1 Month",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Pastors, Church Administrators, Ministry Leaders",
        description: "Church governance and effective ministry administration.",
        overview:
          "Practical administrative training built specifically for church contexts — governance structures, financial stewardship, and the day-to-day systems that keep a ministry running smoothly.",
        learningOutcomes: [
          "Apply sound church governance and organizational structures",
          "Manage church finances and stewardship transparently",
          "Coordinate ministry programs, records, and volunteer teams",
          "Handle church administration and conflict with wisdom and structure",
        ],
        curriculum: [
          "Week 1: Church governance & organizational structures",
          "Week 2: Financial stewardship & transparency systems",
          "Week 3: Ministry program & volunteer coordination",
          "Week 4: Records management, conflict handling & final assessment",
        ],
        careerPaths: [
          "Church Administrator",
          "Ministry Operations Coordinator",
          "Pastoral Support/Church Office Manager",
        ],
        certification: CERT_STANDARD,
      },
      {
        title: "Youth & Children Ministry Leadership",
        image: assets.yt,
        duration: "4 Weeks",
        mode: "Online",
        fee: "Ksh. 8,000",
        dates: "19th Jan – 13th Feb 2026",
        suitable: "Youth Pastors, Sunday School Teachers, Church Volunteers",
        description: "Leadership for youth and children's ministry.",
        overview:
          "Purpose-built for those shaping the next generation spiritually — practical, age-appropriate leadership, teaching methods, and pastoral care for youth and children's ministry settings.",
        learningOutcomes: [
          "Design age-appropriate teaching and discipleship programs",
          "Apply child-safe ministry practices and safeguarding awareness",
          "Lead and mentor volunteer teams within youth/children's ministry",
          "Handle pastoral care situations with youth and children sensitively",
        ],
        curriculum: [
          "Week 1: Foundations of youth & children's ministry leadership",
          "Week 2: Age-appropriate teaching & discipleship methods",
          "Week 3: Safeguarding & child-safe ministry practices",
          "Week 4: Volunteer leadership, pastoral care & final assessment",
        ],
        careerPaths: [
          "Youth Pastor/Leader",
          "Sunday School Coordinator",
          "Children's Ministry Director",
        ],
        certification: CERT_STANDARD,
      },
    ],
  },
];

export default categories;
