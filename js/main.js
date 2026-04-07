let DATA = null;
let activeNode = 'kols';
let activeChip = 'all';
let searchValue = '';

const nodeStats = {
  kols: { badge: 'KOL Node', desc: 'Key opinion leaders amplifying AToken’s vision to the world.', total: '132', reach: '75.6M', engagement: '8.7%' },
  communities: { badge: 'Community Node', desc: 'Communities driving growth, education, and retention.', total: '128', reach: '43.2M', engagement: '11.1%' },
  institutions: { badge: 'Institution Node', desc: 'Institutions bringing capital, liquidity, and validation.', total: '86', reach: '19.4M', engagement: '6.3%' },
  projects: { badge: 'Project Node', desc: 'Projects and protocols integrating with the AToken network.', total: '98', reach: '61.8M', engagement: '7.8%' },
  media: { badge: 'Media Node', desc: 'Media outlets and research channels accelerating narrative reach.', total: '68', reach: '52.7M', engagement: '9.2%' },
};

function initials(name) {
  return name.split(' ').map(x => x[0]).slice(0,2).join('').toUpperCase();
}

async function init(){
  DATA = await fetch('./data/partners.json').then(r => r.json());
  renderHero();
  renderTrusted();
  renderChips();
  renderNetwork();
  renderDirectory();
  bindControls();
  initParticles();
  updateInsight();
}

function renderHero(){
  document.getElementById('heroSub').textContent = DATA.summary.subheadline;
  document.getElementById('metricGrid').innerHTML = DATA.summary.metrics.map(m => `
    <div class="metric"><strong>${m.value}</strong><span>${m.label}</span></div>
  `).join('');
}

function renderTrusted(){
  document.getElementById('trustedList').innerHTML = DATA.trusted.map(x => `<span>${x}</span>`).join('');
}

function renderChips(){
  const order = ['all', ...DATA.nodes.map(n => n.id)];
  document.getElementById('chipRow').innerHTML = order.map(id => {
    const label = id === 'all' ? 'All' : DATA.nodes.find(n => n.id === id).name;
    return `<button class="chip ${activeChip === id ? 'active' : ''}" data-id="${id}">${label}</button>`;
  }).join('');
}

function renderNetwork(){
  const svg = document.getElementById('networkSvg');
  const planetLayer = document.getElementById('planetLayer');
  const miniLayer = document.getElementById('miniLayer');
  const rect = svg.getBoundingClientRect();
  const w = rect.width || 1000;
  const h = rect.height || 700;
  const cx = w * 0.5;
  const cy = h * 0.5;

  function xy(x,y){ return {x: w*x/100, y: h*y/100}; }

  let paths = `
    <defs>
      <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(0,119,255,0.9)" />
        <stop offset="100%" stop-color="rgba(0,119,255,0)" />
      </radialGradient>
    </defs>
    <circle cx="${cx}" cy="${cy}" r="190" fill="url(#glowGrad)" opacity="0.24" />
  `;
  [220, 300, 380].forEach((r, idx) => {
    paths += `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r*0.44}" transform="rotate(${idx*10-12},${cx},${cy})" fill="none" stroke="rgba(82,178,255,0.12)" stroke-width="1.2" stroke-dasharray="6 9" />`;
  });

  planetLayer.innerHTML = '';
  miniLayer.innerHTML = '';

  DATA.nodes.forEach(node => {
    const p = xy(node.x, node.y);
    const mx = (cx + p.x) / 2;
    const my = (cy + p.y) / 2;
    const curve = node.id === 'media' ? 100 : (node.y < 50 ? -80 : 80);

    paths += `<path d="M ${cx} ${cy} Q ${mx} ${my + curve} ${p.x} ${p.y}" fill="none" stroke="${node.id === activeNode ? node.accent : 'rgba(255,255,255,.10)'}" stroke-width="${node.id === activeNode ? 2.2 : 1.2}" opacity="${node.id === activeNode ? 0.95 : 0.75}" />`;

    const btn = document.createElement('button');
    btn.className = `node ${node.id === activeNode ? 'active' : ''}`;
    btn.style.left = `${node.x}%`;
    btn.style.top = `${node.y}%`;
    btn.style.borderColor = `${node.accent}44`;
    btn.style.boxShadow = node.id === activeNode ? `0 0 26px ${node.accent}33` : '';
    btn.innerHTML = `
      <div class="icon" style="color:${node.accent}; border:1px solid ${node.accent}55">${node.icon}</div>
      <strong>${node.name}</strong>
      <small>${node.count}</small>
    `;
    btn.onclick = () => {
      activeNode = node.id;
      renderChips();
      renderNetwork();
      updateInsight();
    };
    planetLayer.appendChild(btn);

    if(node.id === activeNode){
      const baseAngle = -Math.PI * 0.9;
      const spread = (Math.PI * 1.8) / Math.max(node.items.length - 1, 1);
      const radius = node.id === 'media' ? 130 : 145;
      node.items.forEach((item, i) => {
        const angle = baseAngle + spread * i + (node.id === 'media' ? Math.PI * 0.3 : 0);
        const childX = p.x + Math.cos(angle) * radius;
        const childY = p.y + Math.sin(angle) * (radius * 0.62);
        paths += `<path d="M ${p.x} ${p.y} Q ${(p.x+childX)/2} ${(p.y+childY)/2 - 8} ${childX} ${childY}" fill="none" stroke="${node.accent}" stroke-width="1.2" opacity="0.58" />`;

        const mini = document.createElement('button');
        mini.className = 'mini-node';
        mini.style.left = `${childX}px`;
        mini.style.top = `${childY}px`;
        mini.style.color = node.accent;
        mini.style.borderColor = `${node.accent}66`;
        mini.innerHTML = initials(item.name);
        mini.onclick = () => {
          searchValue = item.name;
          document.getElementById('searchInput').value = item.name;
          renderDirectory();
        };
        miniLayer.appendChild(mini);
      });
    }
  });

  svg.innerHTML = paths;
}

function updateInsight(){
  const node = DATA.nodes.find(n => n.id === activeNode);
  const s = nodeStats[activeNode];
  document.getElementById('nodeBadge').textContent = s.badge;
  document.getElementById('nodeBadge').style.color = node.accent;
  document.getElementById('nodeDesc').textContent = s.desc;
  document.getElementById('nodeTotal').textContent = s.total;
  document.getElementById('nodeReach').textContent = s.reach;
  document.getElementById('nodeEngagement').textContent = s.engagement;
  document.getElementById('topPartners').innerHTML = node.items.map(item => `
    <div class="partner-row"><span>${item.name}</span><strong>${item.meta1Value}</strong></div>
  `).join('');
}

function currentItems(){
  let items = DATA.nodes.flatMap(n => n.items.map(item => ({...item, groupId: n.id, groupName: n.name, accent: n.accent})));
  if(activeChip !== 'all'){
    items = items.filter(i => i.groupId === activeChip);
  }
  const q = searchValue.trim().toLowerCase();
  if(q){
    items = items.filter(i => JSON.stringify(i).toLowerCase().includes(q));
  }
  return items;
}

function renderDirectory(){
  const items = currentItems();
  document.getElementById('cardRow').innerHTML = items.map(item => `
    <article class="partner-card">
      <div class="avatar" style="color:${item.accent}">${initials(item.name)}</div>
      <h4>${item.name}</h4>
      <div class="handle">${item.handle}</div>
      <div class="dual-metrics">
        <div><span>${item.meta1}</span><strong>${item.meta1Value}</strong></div>
        <div><span>${item.meta2}</span><strong>${item.meta2Value}</strong></div>
      </div>
      <div class="tags">${item.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <a href="#" class="profile-btn">View Profile →</a>
    </article>
  `).join('');
}

function bindControls(){
  document.getElementById('chipRow').addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if(!btn) return;
    activeChip = btn.dataset.id;
    renderChips();
    renderDirectory();
  });
  document.getElementById('searchInput').addEventListener('input', e => {
    searchValue = e.target.value;
    renderDirectory();
  });
  document.getElementById('topSearch').addEventListener('input', e => {
    searchValue = e.target.value;
    document.getElementById('searchInput').value = e.target.value;
    renderDirectory();
  });
  document.getElementById('typeFilter').addEventListener('change', e => {
    const v = e.target.value;
    activeChip = v === 'all' ? 'all' : (v === 'KOL' ? 'kols' : v.toLowerCase() + 's');
    if(v === 'Project') activeChip = 'projects';
    if(v === 'Institution') activeChip = 'institutions';
    if(v === 'Community') activeChip = 'communities';
    if(v === 'Media') activeChip = 'media';
    renderChips();
    renderDirectory();
  });
  window.addEventListener('resize', renderNetwork);
}

function initParticles(){
  const canvas = document.getElementById('bg');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize(){
    const dpr = window.devicePixelRatio || 1;
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    particles = Array.from({length:120}, () => ({
      x: Math.random()*innerWidth,
      y: Math.random()*innerHeight,
      r: Math.random()*1.8+0.4,
      dx: (Math.random()-0.5)*0.22,
      dy: (Math.random()-0.5)*0.22,
      a: Math.random()*0.55+0.12
    }));
  }

  function tick(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    particles.forEach(p => {
      p.x += p.dx; p.y += p.dy;
      if(p.x < -20) p.x = innerWidth + 20;
      if(p.x > innerWidth + 20) p.x = -20;
      if(p.y < -20) p.y = innerHeight + 20;
      if(p.y > innerHeight + 20) p.y = -20;
      ctx.beginPath();
      ctx.fillStyle = `rgba(120,180,255,${p.a})`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  resize();
  window.addEventListener('resize', resize);
  tick();
}

init();
