// ═══════════════════════════════════════════════════════════
//  REHBAR MIYAN — Portfolio  |  GitHub Projects Engine
//  Auto-syncs with GitHub API, categorizes, filters, renders
// ═══════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ─── CONFIG ────────────────────────────────────────────────
  const GITHUB_USERNAME = 'Rehbar250';
  const CACHE_KEY = 'portfolio_github_repos';
  const CACHE_TTL = 60 * 60 * 1000; // 1 hour

  // Repos to feature (pinned equivalent)
  const FEATURED_REPOS = [
    'IndiTech-AI-Powered-Threat-Detection-System',
    'AutoMate',
    '3D-hand-gesture-particles',
    'HIREFLOW-DASHBOARD'
  ];

  // Repos to exclude (e.g., this portfolio itself)
  const EXCLUDED_REPOS = ['Rehbar'];

  // Category detection rules
  const CATEGORY_RULES = [
    {
      name: 'AI & Machine Learning',
      icon: '🧠',
      color: '#00ffc8',
      keywords: ['ai', 'ml', 'machine', 'learning', 'neural', 'deep', 'threat', 'detection', 'nlp', 'model', 'tensorflow', 'pytorch', 'inditech'],
      langs: ['Python', 'Jupyter Notebook']
    },
    {
      name: 'Full Stack',
      icon: '⚡',
      color: '#a78bfa',
      keywords: ['dashboard', 'fullstack', 'full-stack', 'mern', 'mean', 'hireflow', 'admin'],
      requireBothEnds: true
    },
    {
      name: 'Automation',
      icon: '🤖',
      color: '#f59e0b',
      keywords: ['automate', 'automation', 'bot', 'scraper', 'pipeline', 'ci', 'cd', 'docker', 'workflow'],
      langs: ['Dockerfile', 'Shell']
    },
    {
      name: 'Web Development',
      icon: '🌐',
      color: '#3b82f6',
      keywords: ['web', 'website', 'portfolio', 'landing', '3d', 'three', 'gesture', 'particles', 'frontend', 'ui'],
      langs: ['HTML', 'CSS', 'JavaScript', 'TypeScript']
    },
    {
      name: 'College/Academic',
      icon: '🎓',
      color: '#ec4899',
      keywords: ['college', 'academic', 'university', 'assessment', 'technical_assessment', 'platform', 'student', 'education'],
      langs: []
    },
    {
      name: 'Open Source',
      icon: '💚',
      color: '#10b981',
      keywords: ['open-source', 'oss', 'library', 'framework', 'package', 'npm'],
      langs: []
    }
  ];

  // Tech stack detection from repo name / language data
  const TECH_DETECTORS = [
    { name: 'React', detect: (r, l) => hasKeyword(r, 'react') || (l['TypeScript'] > 50000 && l['CSS']) },
    { name: 'Next.js', detect: (r, l) => hasKeyword(r, 'next') },
    { name: 'TypeScript', detect: (r, l) => l['TypeScript'] > 0 },
    { name: 'JavaScript', detect: (r, l) => l['JavaScript'] > 5000 && !l['TypeScript'] },
    { name: 'Python', detect: (r, l) => l['Python'] > 0 },
    { name: 'Node.js', detect: (r, l) => hasKeyword(r, 'node') || hasKeyword(r, 'express') || (l['JavaScript'] > 10000 && hasKeyword(r, 'dashboard|api|server|automate')) },
    { name: 'Three.js', detect: (r, l) => hasKeyword(r, 'three|3d|particles|gesture') },
    { name: 'FastAPI', detect: (r, l) => hasKeyword(r, 'fastapi|api') && l['Python'] > 0 },
    { name: 'Docker', detect: (r, l) => l['Dockerfile'] > 0 || hasKeyword(r, 'docker') },
    { name: 'WebGL', detect: (r, l) => hasKeyword(r, 'webgl|3d|particles') },
    { name: 'MediaPipe', detect: (r, l) => hasKeyword(r, 'hand|gesture|mediapipe') },
    { name: 'HTML/CSS', detect: (r, l) => l['HTML'] > 0 && l['CSS'] > 0 && !l['TypeScript'] },
    { name: 'REST API', detect: (r, l) => hasKeyword(r, 'api|dashboard|automate') },
    { name: 'Vercel', detect: (r) => r.homepage && r.homepage.includes('vercel') },
    { name: 'GitHub Pages', detect: (r) => r.has_pages },
    { name: 'SQLite', detect: (r) => hasKeyword(r, 'sqlite|automate') && r.name === 'AutoMate' },
  ];

  // ─── HELPERS ───────────────────────────────────────────────
  function hasKeyword(repo, pattern) {
    const text = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();
    return new RegExp(pattern, 'i').test(text);
  }

  function timeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const seconds = Math.floor((now - date) / 1000);
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 }
    ];
    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
    return 'just now';
  }

  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  function generateGradient(name) {
    const h = Math.abs(hashString(name));
    const hue1 = h % 360;
    const hue2 = (hue1 + 40 + (h % 60)) % 360;
    return `linear-gradient(135deg, hsl(${hue1}, 70%, 15%) 0%, hsl(${hue2}, 60%, 8%) 100%)`;
  }

  function formatRepoName(name) {
    return name
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
      .replace(/\bAi\b/gi, 'AI')
      .replace(/\bApi\b/gi, 'API')
      .replace(/\b3d\b/gi, '3D')
      .replace(/\bMl\b/gi, 'ML');
  }

  function generateIconSVG(name) {
    const h = Math.abs(hashString(name));
    const icons = [
      // Code brackets
      `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 10L5 20L15 30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M25 10L35 20L25 30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      // Neural network
      `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="30" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="30" cy="20" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="15" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="25" r="3" stroke="currentColor" stroke-width="1.5"/><line x1="13" y1="10" x2="17" y2="15" stroke="currentColor" stroke-width="1"/><line x1="13" y1="30" x2="17" y2="25" stroke="currentColor" stroke-width="1"/><line x1="23" y1="15" x2="27" y2="20" stroke="currentColor" stroke-width="1"/><line x1="23" y1="25" x2="27" y2="20" stroke="currentColor" stroke-width="1"/></svg>`,
      // Dashboard
      `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="23" y="5" width="12" height="8" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="5" y="23" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="23" y="19" width="12" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/></svg>`,
      // Cube / 3D
      `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 5L35 13V27L20 35L5 27V13L20 5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M20 35V20M20 20L5 13M20 20L35 13" stroke="currentColor" stroke-width="1.5"/></svg>`,
      // Rocket
      `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 5C20 5 28 12 28 22C28 27 24 32 20 35C16 32 12 27 12 22C12 12 20 5 20 5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="20" cy="20" r="3" stroke="currentColor" stroke-width="1.5"/></svg>`,
      // Gear
      `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M20 5V10M20 30V35M5 20H10M30 20H35M9.4 9.4L12.9 12.9M27.1 27.1L30.6 30.6M30.6 9.4L27.1 12.9M12.9 27.1L9.4 30.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
    ];
    return icons[h % icons.length];
  }

  // ─── GITHUB API ────────────────────────────────────────────
  async function fetchGitHubRepos() {
    const cacheRaw = localStorage.getItem(CACHE_KEY);
    if (cacheRaw) {
      try {
        const cache = JSON.parse(cacheRaw);
        if (Date.now() - cache.timestamp < CACHE_TTL) {
          return cache.data;
        }
      } catch (e) { /* invalid cache, refetch */ }
    }

    try {
      const reposRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`,
        { headers: { 'Accept': 'application/vnd.github.v3+json' } }
      );

      if (!reposRes.ok) throw new Error(`GitHub API error: ${reposRes.status}`);
      const repos = await reposRes.json();

      // Filter: no forks, no archived, not excluded
      const filtered = repos.filter(r =>
        !r.fork && !r.archived && !EXCLUDED_REPOS.includes(r.name)
      );

      // Fetch languages for each repo (parallel)
      const enriched = await Promise.all(filtered.map(async (repo) => {
        try {
          const langRes = await fetch(repo.languages_url, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
          });
          const languages = langRes.ok ? await langRes.json() : {};
          return { ...repo, languageData: languages };
        } catch {
          return { ...repo, languageData: {} };
        }
      }));

      // Cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: enriched
      }));

      return enriched;
    } catch (err) {
      console.warn('GitHub API fetch failed, using cache or fallback:', err);
      // Try stale cache
      if (cacheRaw) {
        try { return JSON.parse(cacheRaw).data; } catch { /* fall through */ }
      }
      return getFallbackData();
    }
  }

  // ─── FALLBACK DATA ─────────────────────────────────────────
  function getFallbackData() {
    return [
      {
        name: 'IndiTech-AI-Powered-Threat-Detection-System',
        description: 'IndiTech — AI-powered threat detection system for cybersecurity monitoring and analysis',
        html_url: 'https://github.com/Rehbar250/IndiTech-AI-Powered-Threat-Detection-System',
        homepage: 'https://rehbar250.github.io/IndiTech-AI-Powered-Threat-Detection-System/',
        language: 'TypeScript',
        languageData: { TypeScript: 197573, Python: 9219, CSS: 5692, JavaScript: 1467, HTML: 937 },
        stargazers_count: 1,
        updated_at: '2026-07-14T17:48:05Z',
        pushed_at: '2026-07-13T20:59:08Z',
        has_pages: true,
        topics: [],
        fork: false,
        archived: false
      },
      {
        name: 'HIREFLOW-DASHBOARD',
        description: 'HireFlow — Modern hiring analytics dashboard for streamlined recruitment workflows',
        html_url: 'https://github.com/Rehbar250/HIREFLOW-DASHBOARD',
        homepage: null,
        language: 'TypeScript',
        languageData: { TypeScript: 107189, CSS: 503, JavaScript: 305 },
        stargazers_count: 0,
        updated_at: '2026-07-03T15:18:41Z',
        pushed_at: '2026-07-03T15:18:38Z',
        has_pages: true,
        topics: [],
        fork: false,
        archived: false
      },
      {
        name: 'Rehbar_miyan_technical_assessment',
        description: 'Full-stack technical assessment — responsive web application with API integration',
        html_url: 'https://github.com/Rehbar250/Rehbar_miyan_technical_assessment',
        homepage: 'https://rehbarmiyantechnicalassessment.vercel.app',
        language: 'JavaScript',
        languageData: { JavaScript: 52547, CSS: 39227, Python: 2421, HTML: 1132 },
        stargazers_count: 0,
        updated_at: '2026-05-26T18:23:53Z',
        pushed_at: '2026-05-26T18:19:31Z',
        has_pages: false,
        topics: [],
        fork: false,
        archived: false
      },
      {
        name: 'college-platform',
        description: 'College Platform — Comprehensive student management and academic resource portal',
        html_url: 'https://github.com/Rehbar250/college-platform',
        homepage: 'https://college-platform-alpha.vercel.app',
        language: 'TypeScript',
        languageData: { TypeScript: 440773, CSS: 7804, JavaScript: 559 },
        stargazers_count: 0,
        updated_at: '2026-05-09T10:03:09Z',
        pushed_at: '2026-05-09T10:03:04Z',
        has_pages: true,
        topics: [],
        fork: false,
        archived: false
      },
      {
        name: 'AutoMate',
        description: 'AI Automation Dashboard Prototype',
        html_url: 'https://github.com/Rehbar250/AutoMate',
        homepage: 'https://automate-ai-platform.onrender.com',
        language: 'JavaScript',
        languageData: { JavaScript: 92937, CSS: 21066, Python: 15342, HTML: 4423, Dockerfile: 355 },
        stargazers_count: 0,
        updated_at: '2026-04-30T18:51:17Z',
        pushed_at: '2026-04-30T18:52:37Z',
        has_pages: true,
        topics: [],
        fork: false,
        archived: false
      },
      {
        name: '3D-hand-gesture-particles',
        description: 'Real-time interactive 3D particle system controlled by hand gestures via camera',
        html_url: 'https://github.com/Rehbar250/3D-hand-gesture-particles',
        homepage: 'https://rehbar250.github.io/3D-hand-gesture-particles/',
        language: 'TypeScript',
        languageData: { TypeScript: 11369, CSS: 1452, HTML: 677 },
        stargazers_count: 0,
        updated_at: '2026-04-30T18:49:26Z',
        pushed_at: '2026-04-19T18:39:31Z',
        has_pages: true,
        topics: [],
        fork: false,
        archived: false
      }
    ];
  }

  // ─── DATA PROCESSING ──────────────────────────────────────
  function categorizeRepo(repo) {
    const text = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();
    const langs = repo.languageData || {};

    for (const rule of CATEGORY_RULES) {
      const keywordMatch = rule.keywords.some(kw => text.includes(kw));
      const langMatch = rule.langs && rule.langs.some(l => langs[l] > 0);

      if (rule.requireBothEnds) {
        const hasFrontend = langs['TypeScript'] > 0 || langs['JavaScript'] > 0;
        const hasBackend = langs['Python'] > 0 || langs['Dockerfile'] > 0;
        if (keywordMatch && hasFrontend) return rule;
      }

      if (keywordMatch || langMatch) return rule;
    }

    // Default
    return CATEGORY_RULES.find(r => r.name === 'Web Development');
  }

  function detectTechStack(repo) {
    const langs = repo.languageData || {};
    const techs = [];

    for (const detector of TECH_DETECTORS) {
      if (detector.detect(repo, langs)) {
        techs.push(detector.name);
      }
    }

    // Remove redundant entries
    if (techs.includes('TypeScript') && techs.includes('JavaScript')) {
      const idx = techs.indexOf('JavaScript');
      if (idx > -1) techs.splice(idx, 1);
    }

    // Limit to 5 most relevant
    return techs.slice(0, 5);
  }

  function generateDescription(repo) {
    if (repo.description && repo.description.trim().length > 10) {
      return repo.description.trim();
    }
    // Generate from name
    const name = formatRepoName(repo.name);
    const category = categorizeRepo(repo);
    return `${name} — A ${category.name.toLowerCase()} project built with modern technologies.`;
  }

  function processRepos(repos) {
    return repos
      .filter(r => !r.fork && !r.archived && !EXCLUDED_REPOS.includes(r.name))
      .map(repo => {
        const category = categorizeRepo(repo);
        const techStack = detectTechStack(repo);
        const isFeatured = FEATURED_REPOS.includes(repo.name) || repo.stargazers_count >= 1;

        return {
          name: repo.name,
          displayName: formatRepoName(repo.name),
          description: generateDescription(repo),
          category: category,
          techStack: techStack,
          featured: isFeatured,
          stars: repo.stargazers_count || 0,
          githubUrl: repo.html_url,
          liveUrl: repo.homepage || null,
          updatedAt: repo.pushed_at || repo.updated_at,
          gradient: generateGradient(repo.name),
          iconSVG: generateIconSVG(repo.name)
        };
      })
      .sort((a, b) => {
        // Featured first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // Then by date
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
  }

  // ─── RENDERING ─────────────────────────────────────────────
  function renderSkeletons() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      const skeleton = document.createElement('div');
      skeleton.className = 'project-card-v2 skeleton-card';
      skeleton.innerHTML = `
        <div class="skeleton-thumbnail"></div>
        <div class="skeleton-body">
          <div class="skeleton-line w-40"></div>
          <div class="skeleton-line w-70"></div>
          <div class="skeleton-line w-90"></div>
          <div class="skeleton-line w-50"></div>
          <div class="skeleton-tags">
            <div class="skeleton-tag"></div>
            <div class="skeleton-tag"></div>
            <div class="skeleton-tag"></div>
          </div>
        </div>
      `;
      grid.appendChild(skeleton);
    }
  }

  function renderProjectCard(project, index) {
    const card = document.createElement('article');
    card.className = 'project-card-v2 reveal';
    card.dataset.category = project.category.name;
    card.dataset.techs = project.techStack.join(',').toLowerCase();
    card.dataset.name = project.displayName.toLowerCase();
    card.dataset.desc = project.description.toLowerCase();

    const tagsHTML = project.techStack.map(t =>
      `<span class="tech-tag">${t}</span>`
    ).join('');

    const featuredBadge = project.featured
      ? `<div class="featured-badge"><span class="featured-star">★</span> Featured</div>`
      : '';

    const starsHTML = project.stars > 0
      ? `<span class="card-stars"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>${project.stars}</span>`
      : '';

    const liveBtn = project.liveUrl
      ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="card-btn card-btn-live">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
           Live Demo
         </a>`
      : '';

    card.innerHTML = `
      <div class="card-thumbnail" style="background: ${project.gradient}">
        <div class="card-icon" style="color: ${project.category.color}">
          ${project.iconSVG}
        </div>
        <div class="card-category-pill" style="--cat-color: ${project.category.color}">
          ${project.category.icon} ${project.category.name}
        </div>
        ${featuredBadge}
      </div>
      <div class="card-body">
        <div class="card-header">
          <h3 class="card-title">${project.displayName}</h3>
          ${starsHTML}
        </div>
        <p class="card-desc">${project.description}</p>
        <div class="card-tags">${tagsHTML}</div>
        <div class="card-footer">
          <div class="card-actions">
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="card-btn card-btn-github">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Source
            </a>
            ${liveBtn}
          </div>
          <div class="card-updated">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${timeAgo(project.updatedAt)}
          </div>
        </div>
      </div>
    `;

    // Staggered reveal
    card.style.transitionDelay = `${index * 0.08}s`;

    return card;
  }

  function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    const counter = document.getElementById('projects-count');
    if (!grid) return;

    grid.innerHTML = '';

    if (projects.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          <div class="no-results-text">No projects match your filters</div>
          <button class="no-results-reset" onclick="document.querySelector('[data-filter=\"all\"]').click()">Reset Filters</button>
        </div>
      `;
      if (counter) counter.textContent = '0';
      return;
    }

    projects.forEach((project, index) => {
      grid.appendChild(renderProjectCard(project, index));
    });

    if (counter) counter.textContent = projects.length;

    // Trigger reveal animation
    requestAnimationFrame(() => {
      grid.querySelectorAll('.project-card-v2').forEach(card => {
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              obs.unobserve(e.target);
            }
          });
        }, { threshold: 0.05 });
        obs.observe(card);
      });
    });
  }

  // ─── FILTERS & SEARCH ─────────────────────────────────────
  let allProjects = [];
  let activeCategory = 'all';
  let activeTech = 'all';
  let searchQuery = '';

  function applyFilters() {
    let filtered = [...allProjects];

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category.name === activeCategory);
    }

    // Tech filter
    if (activeTech !== 'all') {
      filtered = filtered.filter(p =>
        p.techStack.some(t => t.toLowerCase() === activeTech.toLowerCase())
      );
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.displayName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack.some(t => t.toLowerCase().includes(q)) ||
        p.category.name.toLowerCase().includes(q)
      );
    }

    renderProjects(filtered);
  }

  function setupFilters() {
    // Category pills
    const pills = document.querySelectorAll('.category-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.dataset.filter;
        applyFilters();
      });
    });

    // Tech dropdown
    const techSelect = document.getElementById('tech-filter');
    if (techSelect) {
      // Populate tech options dynamically
      const allTechs = new Set();
      allProjects.forEach(p => p.techStack.forEach(t => allTechs.add(t)));
      const sorted = [...allTechs].sort();
      techSelect.innerHTML = '<option value="all">All Technologies</option>';
      sorted.forEach(tech => {
        const opt = document.createElement('option');
        opt.value = tech;
        opt.textContent = tech;
        techSelect.appendChild(opt);
      });

      techSelect.addEventListener('change', () => {
        activeTech = techSelect.value;
        applyFilters();
      });
    }

    // Search
    const searchInput = document.getElementById('projects-search');
    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          searchQuery = searchInput.value.trim();
          applyFilters();
        }, 250);
      });
    }
  }

  // ─── STATS COUNTER ANIMATION ──────────────────────────────
  function animateCounter(el, target) {
    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    function tick() {
      current += step;
      if (current >= target) {
        el.textContent = target;
        return;
      }
      el.textContent = Math.floor(current);
      requestAnimationFrame(tick);
    }
    tick();
  }

  // ─── INIT ──────────────────────────────────────────────────
  async function init() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    // Show skeletons
    renderSkeletons();

    // Fetch
    const repos = await fetchGitHubRepos();
    allProjects = processRepos(repos);

    // Render
    renderProjects(allProjects);
    setupFilters();

    // Animate stats
    const countEl = document.getElementById('projects-count');
    if (countEl) {
      animateCounter(countEl, allProjects.length);
    }

    // Update repo count in header
    const totalEl = document.getElementById('total-repos');
    if (totalEl) totalEl.textContent = allProjects.length;
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
