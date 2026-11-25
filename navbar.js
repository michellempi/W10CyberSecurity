/**
 * navbar.js — Unified Navigation Controller
 * Connects 3 EHE Topics into 1 seamless learning suite:
 * 1. 01 — Application Layer DDoS (12-ApplicationLayerDDoS.html)
 * 2. 02 — XSS Cookie Theft Mechanics (12-XSSCookieTheft.html)
 * 3. 03 — Konstruksi Rule-Base Firewall (12-KonstruksiRuleBaseFirewall.html)
 */

(function () {
  'use strict';

  var TOPICS = [
    {
      id: 'ddos',
      num: '01',
      name: 'App Layer DDoS',
      sub: 'HTTP GET & POST Flood',
      href: '12-ApplicationLayerDDoS.html',
      match: ['ddos', 'applicationlayer']
    },
    {
      id: 'xss',
      num: '02',
      name: 'XSS Cookie Theft',
      sub: 'Pencurian Sesi DOM',
      href: '12-XSSCookieTheft.html',
      match: ['xss', 'cookietheft']
    },
    {
      id: 'firewall',
      num: '03',
      name: 'Rulebase Firewall',
      sub: 'Penyaringan Paket Jaringan',
      href: '12-KonstruksiRuleBaseFirewall.html',
      match: ['firewall', 'konstruksi']
    }
  ];

  // Detect current active topic from pathname / document title
  function getActiveTopicId() {
    var loc = window.location.pathname.toLowerCase();
    for (var i = 0; i < TOPICS.length; i++) {
      for (var m = 0; m < TOPICS[i].match.length; m++) {
        if (loc.indexOf(TOPICS[i].match[m]) !== -1) {
          return TOPICS[i].id;
        }
      }
    }
    var docTitle = (document.title || '').toLowerCase();
    if (docTitle.indexOf('ddos') !== -1 || docTitle.indexOf('flood') !== -1) return 'ddos';
    if (docTitle.indexOf('xss') !== -1 || docTitle.indexOf('cookie') !== -1) return 'xss';
    if (docTitle.indexOf('firewall') !== -1 || docTitle.indexOf('rule') !== -1) return 'firewall';
    return 'ddos';
  }

  // Ensure navbar.css is loaded
  function ensureCSS() {
    if (!document.querySelector('link[href*="navbar.css"]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'navbar.css';
      document.head.appendChild(link);
    }
  }

  // Render or Update Top Master Bar
  function renderTopBar(activeId) {
    var existingNav = document.getElementById('master-nav-suite');
    if (existingNav) {
      var items = existingNav.querySelectorAll('.master-nav-item');
      items.forEach(function (el) {
        var tid = el.getAttribute('data-topic');
        if (tid === activeId) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
      return;
    }

    var nav = document.createElement('header');
    nav.className = 'master-nav-suite';
    nav.id = 'master-nav-suite';
    nav.setAttribute('aria-label', 'Navigasi Topik EHE');

    var tabsHtml = TOPICS.map(function (t) {
      var isActive = t.id === activeId ? ' active' : '';
      return '<a href="' + t.href + '" class="master-nav-item' + isActive + '" data-topic="' + t.id + '">' +
        '<span class="nav-badge">' + t.num + '</span>' +
        '<div class="nav-info">' +
        '<div class="nav-name">' + t.name + '</div>' +
        '<div class="nav-desc">' + t.sub + '</div>' +
        '</div>' +
        '</a>';
    }).join('');

    nav.innerHTML = '<div class="master-nav-inner">' +
      '<div class="master-suite-brand">' +
      '<span class="suite-tag">EHE LEARNING SUITE</span>' +
      '<span class="suite-title">Cybersecurity Interactive Lab</span>' +
      '</div>' +
      '<div class="master-nav-tabs">' +
      tabsHtml +
      '</div>' +
      '</div>';

    document.body.insertBefore(nav, document.body.firstChild);
  }

  // Render Sidebar Topic Switcher
  function renderSidebarSwitcher(activeId) {
    var sidebar = document.getElementById('sidebar');
    if (!sidebar || sidebar.querySelector('.sidebar-topic-switcher')) return;

    var switcher = document.createElement('div');
    switcher.className = 'sidebar-topic-switcher';

    var itemsHtml = TOPICS.map(function (t) {
      var isActive = t.id === activeId ? ' active' : '';
      return '<a href="' + t.href + '" class="topic-btn' + isActive + '" data-topic="' + t.id + '">' +
        '<span class="btn-num">' + t.num + '</span>' +
        '<span class="btn-text"><b>' + t.name + '</b><small>' + t.sub + '</small></span>' +
        '</a>';
    }).join('');

    switcher.innerHTML = '<div class="topic-switcher-heading">PILIH TOPIK MATERI</div>' +
      '<div class="topic-switcher-list">' + itemsHtml + '</div>';

    var target = sidebar.querySelector('.sidebar__top') || sidebar.querySelector('.brand');
    if (target && target.nextSibling) {
      sidebar.insertBefore(switcher, target.nextSibling);
    } else if (target) {
      sidebar.appendChild(switcher);
    } else {
      sidebar.insertBefore(switcher, sidebar.firstChild);
    }
  }

  function init() {
    ensureCSS();
    var activeId = getActiveTopicId();
    renderTopBar(activeId);
    renderSidebarSwitcher(activeId);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
