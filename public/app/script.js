/* ============================================================
   DINÂMICAS DE TEATRO — script.js
   ------------------------------------------------------------
   • Login (localStorage)
   • Navegação SPA entre views
   • Player modal (vídeo local OU iframe Vimeo/Wistia)
   • Progresso, favoritos, histórico, conquistas, certificado
   • Busca dinâmica
   • Assistente IA simulado (pronto para plugar API real)

   COMO ADICIONAR NOVAS AULAS:
     Edite o array LESSONS abaixo. Cada aula precisa de:
       id, title, moduleId, level, duration, desc,
       src   (caminho /app/videos/arquivo.mp4 OU URL)
       type  ('video' | 'iframe')
       thumb (opcional — caminho /app/thumbs/xxx.jpg)

   COMO ADICIONAR NOVOS MÓDULOS:
     Edite o array MODULES.

   COMO ADICIONAR PDFs:
     Edite o array PDFS, e coloque os arquivos em /app/pdfs/.

   INTEGRAÇÃO BACKEND FUTURA:
     Substitua loadProgress()/saveProgress() por fetch() para
     sua API. As demais funções já consomem essas helpers.
   ============================================================ */

// ===== DADOS =====
const MODULES = [
  { id:'m1', title:'Dinâmicas Criativas', level:1, color:'#3a5f8a', desc:'Jogos teatrais para despertar a criatividade do grupo.' },
  { id:'m2', title:'Improvisação',         level:1, color:'#8a3a5f', desc:'Técnicas para improvisar com confiança no palco.' },
  { id:'m3', title:'Voz e Dicção',         level:2, color:'#8a5f3a', desc:'Aquecimento vocal, projeção e clareza na fala.' },
  { id:'m4', title:'Expressão Corporal',   level:2, color:'#5f8a3a', desc:'Consciência corporal e linguagem não-verbal.' },
  { id:'m5', title:'Planejamento de Aulas',level:2, color:'#3a8a8a', desc:'Estruture aulas teatrais inesquecíveis.' },
  { id:'m6', title:'Performance e Espetáculo', level:3, color:'#8a3a3a', desc:'Direção, cena e palco profissional.', premium:true },
];

const LESSONS = [
  // Módulo 1
  { id:'l1',  moduleId:'m1', level:1, title:'Aquecimento em círculo',          duration:'08:12', desc:'Dinâmica de abertura para conectar o grupo.', type:'video', src:'videos/aula1.mp4' },
  { id:'l2',  moduleId:'m1', level:1, title:'Espelho mágico',                  duration:'12:40', desc:'Trabalhe imitação, foco e parceria.',         type:'video', src:'videos/aula2.mp4' },
  { id:'l3',  moduleId:'m1', level:1, title:'Estátuas vivas',                  duration:'09:55', desc:'Construção de imagens corporais coletivas.',  type:'video', src:'videos/aula3.mp4' },
  // Módulo 2
  { id:'l4',  moduleId:'m2', level:1, title:'Sim, e... — base do improviso',   duration:'14:30', desc:'A regra de ouro da improvisação teatral.',    type:'video', src:'videos/aula4.mp4' },
  { id:'l5',  moduleId:'m2', level:1, title:'Cena com 3 palavras',             duration:'11:18', desc:'Crie cenas a partir de palavras-gatilho.',    type:'video', src:'videos/aula5.mp4' },
  // Módulo 3
  { id:'l6',  moduleId:'m3', level:2, title:'Aquecimento vocal completo',      duration:'15:00', desc:'Rotina de 15 minutos para a voz.',            type:'video', src:'videos/aula6.mp4' },
  { id:'l7',  moduleId:'m3', level:2, title:'Articulação e trava-línguas',     duration:'10:22', desc:'Dicção precisa para o palco.',                type:'video', src:'videos/aula7.mp4' },
  // Módulo 4
  { id:'l8',  moduleId:'m4', level:2, title:'Consciência corporal',            duration:'13:45', desc:'Habite seu corpo antes da cena.',             type:'video', src:'videos/aula8.mp4' },
  { id:'l9',  moduleId:'m4', level:2, title:'Caminhadas e ritmos',             duration:'09:10', desc:'Explore tempos e energias corporais.',        type:'video', src:'videos/aula9.mp4' },
  // Módulo 5
  { id:'l10', moduleId:'m5', level:2, title:'Estrutura de uma aula de teatro', duration:'18:00', desc:'Modelo prático para suas aulas.',              type:'video', src:'videos/aula10.mp4' },
  { id:'l11', moduleId:'m5', level:2, title:'Avaliação por competências',      duration:'12:30', desc:'Como avaliar processos teatrais.',            type:'video', src:'videos/aula11.mp4' },
  // Módulo 6 — Premium
  { id:'l12', moduleId:'m6', level:3, title:'Direção de cena',                 duration:'22:00', desc:'Como dirigir um elenco com clareza.',         type:'video', src:'videos/aula12.mp4' },
  { id:'l13', moduleId:'m6', level:3, title:'Produção de espetáculo',          duration:'25:40', desc:'Do roteiro à estreia.',                       type:'video', src:'videos/aula13.mp4' },
  { id:'l14', moduleId:'m6', level:3, title:'Marketing teatral',               duration:'17:20', desc:'Atraia público para o seu espetáculo.',       type:'video', src:'videos/aula14.mp4' },
];

const PDFS = [
  { id:'p1', title:'100 Dinâmicas Teatrais',          cat:'dinamicas', size:'2.4MB', file:'pdfs/100-dinamicas.pdf', premium:false },
  { id:'p2', title:'Plano de Aula — Iniciantes',      cat:'planos',    size:'1.1MB', file:'pdfs/plano-iniciantes.pdf', premium:false },
  { id:'p3', title:'Plano de Aula — Intermediário',   cat:'planos',    size:'1.4MB', file:'pdfs/plano-intermediario.pdf', premium:false },
  { id:'p4', title:'Textos Teatrais Curtos Vol.1',    cat:'textos',    size:'3.2MB', file:'pdfs/textos-curtos-1.pdf', premium:false },
  { id:'p5', title:'Textos Teatrais Curtos Vol.2',    cat:'textos',    size:'3.6MB', file:'pdfs/textos-curtos-2.pdf', premium:true },
  { id:'p6', title:'Manual Premium do Diretor',       cat:'planos',    size:'5.8MB', file:'pdfs/manual-diretor.pdf', premium:true },
];

const ACHIEVEMENTS = [
  { id:'a1', icon:'🎭', name:'Primeiro Ato',     desc:'Concluiu a primeira aula',      check:p => p.done.length >= 1 },
  { id:'a2', icon:'🔥', name:'Em Cena',          desc:'5 aulas concluídas',            check:p => p.done.length >= 5 },
  { id:'a3', icon:'⭐', name:'Estrela',          desc:'10 aulas concluídas',           check:p => p.done.length >= 10 },
  { id:'a4', icon:'📚', name:'Bibliotecário',    desc:'Baixou 3 PDFs',                 check:p => p.pdfs.length >= 3 },
  { id:'a5', icon:'🏆', name:'Mestre do Palco',  desc:'Concluiu todas as aulas',       check:p => p.done.length >= LESSONS.length },
  { id:'a6', icon:'💎', name:'Premium Unlocked', desc:'Acessou o Nível 3',             check:p => p.done.some(id => LESSONS.find(l=>l.id===id)?.level===3) },
  { id:'a7', icon:'❤️', name:'Apaixonado',       desc:'Favoritou 3 aulas',             check:p => p.favs.length >= 3 },
  { id:'a8', icon:'🎓', name:'Formado',          desc:'100% concluído',                check:p => p.done.length === LESSONS.length },
];

// ===== STATE =====
const STORAGE = {
  user:'dt_user', progress:'dt_progress'
};
function loadProgress(){
  try { return JSON.parse(localStorage.getItem(STORAGE.progress)) || {done:[],favs:[],pdfs:[],last:null}; }
  catch { return {done:[],favs:[],pdfs:[],last:null}; }
}
function saveProgress(p){ localStorage.setItem(STORAGE.progress, JSON.stringify(p)); }

let progress = loadProgress();
let currentLessonId = null;

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(()=> document.getElementById('globalLoader').classList.add('hide'), 600);
  initApp();
});

// ===== INIT =====
function initApp(){
  // Login state
  const user = localStorage.getItem(STORAGE.user);
  if(user){ showApp(); } else { showLogin(); }

  // Login form
  document.getElementById('loginForm').addEventListener('submit', e=>{
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const pass  = document.getElementById('password').value.trim();
    if(!email || !pass) return toast('Preencha e-mail e senha');
    localStorage.setItem(STORAGE.user, JSON.stringify({email}));
    toast('Bem-vindo(a)!');
    showApp();
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', ()=>{
    localStorage.removeItem(STORAGE.user);
    location.reload();
  });

  // Sidebar nav
  document.querySelectorAll('[data-view]').forEach(el=>{
    el.addEventListener('click', e=>{
      e.preventDefault();
      switchView(el.dataset.view);
      closeSidebar();
    });
  });
  document.querySelectorAll('[data-view-go]').forEach(el=>{
    el.addEventListener('click', e=>{ e.preventDefault(); switchView(el.dataset.viewGo); });
  });

  // Mobile sidebar
  const menuBtn = document.getElementById('menuBtn');
  menuBtn.addEventListener('click', toggleSidebar);

  // Search
  document.getElementById('searchInput').addEventListener('input', e=>{
    const q = e.target.value.toLowerCase();
    filterLessonsBySearch(q);
  });

  // Module filters
  document.getElementById('moduleFilters').addEventListener('click', e=>{
    if(!e.target.matches('.chip')) return;
    document.querySelectorAll('#moduleFilters .chip').forEach(c=>c.classList.remove('active'));
    e.target.classList.add('active');
    renderModules(e.target.dataset.filter);
  });

  // PDF filters
  document.getElementById('pdfFilters').addEventListener('click', e=>{
    if(!e.target.matches('.chip')) return;
    document.querySelectorAll('#pdfFilters .chip').forEach(c=>c.classList.remove('active'));
    e.target.classList.add('active');
    renderPDFs(e.target.dataset.pdfFilter);
  });

  // Continue watching button (hero)
  document.querySelector('[data-action="continue-watching"]').addEventListener('click', ()=>{
    const last = progress.last || LESSONS[0].id;
    openLesson(last);
  });

  // Player events
  document.querySelectorAll('[data-close-player]').forEach(el=>{
    el.addEventListener('click', closePlayer);
  });
  document.getElementById('doneBtn').addEventListener('click', markDone);
  document.getElementById('favBtn').addEventListener('click', toggleFav);
  document.getElementById('nextBtn').addEventListener('click', ()=> navLesson(1));
  document.getElementById('prevBtn').addEventListener('click', ()=> navLesson(-1));

  const video = document.getElementById('lessonVideo');
  video.addEventListener('ended', ()=>{
    markDone(true);
    setTimeout(()=> navLesson(1), 1200); // autoplay próxima
  });

  // AI
  document.getElementById('aiStartBtn').addEventListener('click', ()=>{
    document.getElementById('aiChat').classList.remove('hidden');
    aiBot('Olá! Sou seu assistente teatral. Posso sugerir dinâmicas, roteiros e exercícios. O que você precisa hoje?');
  });
  document.getElementById('aiForm').addEventListener('submit', e=>{
    e.preventDefault();
    const input = document.getElementById('aiInput');
    const msg = input.value.trim();
    if(!msg) return;
    aiUser(msg);
    input.value='';
    setTimeout(()=> aiBot(generateAIResponse(msg)), 700);
  });

  // Cert button
  document.getElementById('certBtn').addEventListener('click', ()=>{
    toast('🎓 Certificado emitido! Verifique seu e-mail.');
  });

  // Render tudo
  renderAll();
}

// ===== VIEWS =====
function showLogin(){
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
}
function showApp(){
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
}
function switchView(name){
  document.querySelectorAll('[data-view-section]').forEach(s=>s.classList.remove('active'));
  const target = document.querySelector(`[data-view-section="${name}"]`);
  if(target) target.classList.add('active');
  document.querySelectorAll('.side-nav a').forEach(a=>a.classList.toggle('active', a.dataset.view===name));
  window.scrollTo({top:0,behavior:'smooth'});
  if(name==='favorites') renderFavorites();
  if(name==='continue') renderContinueGrid();
  if(name==='achievements') renderAchievements();
  if(name==='certificate') renderCertificate();
}
function toggleSidebar(){
  const sb = document.getElementById('sidebar');
  sb.classList.toggle('open');
  let scrim = document.querySelector('.scrim');
  if(!scrim){
    scrim = document.createElement('div');
    scrim.className='scrim';
    scrim.addEventListener('click', closeSidebar);
    document.body.appendChild(scrim);
  }
  scrim.classList.toggle('show', sb.classList.contains('open'));
}
function closeSidebar(){
  document.getElementById('sidebar').classList.remove('open');
  document.querySelector('.scrim')?.classList.remove('show');
}

// ===== RENDER =====
function renderAll(){
  renderStats();
  renderContinueRow();
  renderModules('all');
  renderModulesPreview();
  renderPDFs('all');
  renderLevels();
  renderProgressBars();
}

function renderStats(){
  document.getElementById('statLessons').textContent = LESSONS.length;
  const pct = Math.round((progress.done.length / LESSONS.length) * 100);
  document.getElementById('statProgress').textContent = pct+'%';
}

function lessonCard(lesson, opts={}){
  const m = MODULES.find(x=>x.id===lesson.moduleId);
  const done = progress.done.includes(lesson.id);
  return `
    <article class="lesson-card" data-lesson="${lesson.id}">
      <div class="lesson-thumb" style="background:linear-gradient(135deg,${m?.color || '#333'},#0a0a0c)">
        ${done?'<div class="check">✓</div>':''}
      </div>
      <div class="lesson-meta">
        <span class="mod">${m?.title || ''} • ${lesson.duration}</span>
        <h3>${lesson.title}</h3>
        <div class="lesson-bar"><span style="width:${done?100:0}%"></span></div>
      </div>
    </article>`;
}

function renderContinueRow(){
  const row = document.getElementById('continueRow');
  // pega últimas 6 não concluídas, priorizando a "last"
  let list = LESSONS.filter(l => !progress.done.includes(l.id));
  if(progress.last){
    const l = LESSONS.find(x=>x.id===progress.last);
    if(l) list = [l, ...list.filter(x=>x.id!==l.id)];
  }
  list = list.slice(0,6);
  if(list.length===0){
    row.innerHTML = `<div class="glass" style="padding:1.4rem;text-align:center;width:100%">🎉 Você concluiu todas as aulas!</div>`;
    return;
  }
  row.innerHTML = list.map(l=>lessonCard(l)).join('');
  bindLessonClicks(row);
}
function renderContinueGrid(){
  const grid = document.getElementById('continueGrid');
  const list = LESSONS.filter(l => !progress.done.includes(l.id));
  grid.innerHTML = list.length
    ? list.map(l=>lessonCard(l)).join('')
    : `<div class="glass" style="padding:1.4rem;text-align:center">🎉 Tudo concluído!</div>`;
  bindLessonClicks(grid);
}

function renderModulesPreview(){
  const wrap = document.getElementById('modulesPreview');
  wrap.innerHTML = MODULES.slice(0,3).map(moduleCard).join('');
  bindModuleClicks(wrap);
}
function renderModules(filter){
  const wrap = document.getElementById('modulesGrid');
  const list = filter==='all' ? MODULES : MODULES.filter(m=>String(m.level)===filter);
  wrap.innerHTML = list.map(moduleCard).join('');
  bindModuleClicks(wrap);
}
function moduleCard(m){
  const lessons = LESSONS.filter(l=>l.moduleId===m.id);
  const done = lessons.filter(l=>progress.done.includes(l.id)).length;
  const pct = lessons.length ? Math.round((done/lessons.length)*100) : 0;
  return `
    <article class="module-card" data-module="${m.id}">
      <div class="module-cover" style="background:linear-gradient(135deg,${m.color},#0a0a0c)">
        ${m.title.split(' ')[0]}
      </div>
      <div class="module-body">
        ${m.premium?'<span class="badge-premium">PREMIUM</span>':''}
        <h3>${m.title}</h3>
        <p>${m.desc}</p>
        <div class="module-progress"><span style="width:${pct}%"></span></div>
        <div class="module-foot">
          <small>${lessons.length} aulas • ${pct}% concluído</small>
          <button class="btn btn-gold" style="padding:.5rem 1rem;font-size:.8rem">Acessar</button>
        </div>
      </div>
    </article>`;
}
function bindModuleClicks(wrap){
  wrap.querySelectorAll('.module-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const id = card.dataset.module;
      const first = LESSONS.find(l=>l.moduleId===id);
      if(first) openLesson(first.id);
    });
  });
}
function bindLessonClicks(wrap){
  wrap.querySelectorAll('.lesson-card').forEach(card=>{
    card.addEventListener('click', ()=> openLesson(card.dataset.lesson));
  });
}

function renderPDFs(filter){
  const wrap = document.getElementById('pdfsGrid');
  const list = filter==='all' ? PDFS : PDFS.filter(p=>p.cat===filter);
  wrap.innerHTML = list.map(p=>`
    <article class="pdf-card">
      <div class="pdf-cover">PDF</div>
      <div class="pdf-meta">
        ${p.premium?'<span class="badge-premium">PREMIUM</span>':''}
        <span class="cat">${p.cat} • ${p.size}</span>
        <h3>${p.title}</h3>
        <div class="pdf-actions">
          <a class="btn btn-outline" href="${p.file}" target="_blank" rel="noopener">Visualizar</a>
          <a class="btn btn-gold" href="${p.file}" download data-pdf="${p.id}">Baixar</a>
        </div>
      </div>
    </article>`).join('');
  wrap.querySelectorAll('[data-pdf]').forEach(el=>{
    el.addEventListener('click', ()=>{
      if(!progress.pdfs.includes(el.dataset.pdf)){
        progress.pdfs.push(el.dataset.pdf);
        saveProgress(progress);
        toast('PDF baixado ✓');
        checkAchievements();
      }
    });
  });
}

function renderFavorites(){
  const wrap = document.getElementById('favoritesGrid');
  const favs = LESSONS.filter(l=>progress.favs.includes(l.id));
  wrap.innerHTML = favs.length
    ? favs.map(l=>lessonCard(l)).join('')
    : `<div class="glass" style="padding:1.4rem;text-align:center">Você ainda não favoritou nenhuma aula.</div>`;
  bindLessonClicks(wrap);
}

function renderLevels(){
  [1,2,3].forEach(lvl=>{
    const lessons = LESSONS.filter(l=>l.level===lvl);
    const done = lessons.filter(l=>progress.done.includes(l.id)).length;
    const pct = lessons.length ? Math.round((done/lessons.length)*100) : 0;
    const fill = document.querySelector(`[data-level-fill="${lvl}"]`);
    if(fill) fill.style.width = pct+'%';
  });
}

function renderProgressBars(){
  const pct = Math.round((progress.done.length / LESSONS.length) * 100);
  document.getElementById('sideProgressFill').style.width = pct+'%';
  document.getElementById('sideProgressNum').textContent = pct;
}

function renderAchievements(){
  const wrap = document.getElementById('achievementsGrid');
  wrap.innerHTML = ACHIEVEMENTS.map(a=>{
    const ok = a.check(progress);
    return `<div class="achievement ${ok?'unlocked':''}">
      <div class="icon">${a.icon}</div>
      <h4>${a.name}</h4>
      <p>${a.desc}</p>
    </div>`;
  }).join('');
}

function renderCertificate(){
  const pct = Math.round((progress.done.length/LESSONS.length)*100);
  document.getElementById('certFill').style.width = pct+'%';
  document.getElementById('certStatus').textContent = pct+'% concluído';
  const btn = document.getElementById('certBtn');
  btn.disabled = pct<100;
}

// ===== PLAYER =====
function openLesson(id){
  const lesson = LESSONS.find(l=>l.id===id);
  if(!lesson) return;
  currentLessonId = id;
  progress.last = id; saveProgress(progress);

  const m = MODULES.find(x=>x.id===lesson.moduleId);
  document.getElementById('lessonTitle').textContent = lesson.title;
  document.getElementById('lessonDesc').textContent  = lesson.desc;
  document.getElementById('lessonModule').textContent = (m?.title || '') + ' • ' + lesson.duration;

  const video = document.getElementById('lessonVideo');
  // Para Vimeo/Wistia: criar iframe dinamicamente quando lesson.type==='iframe'
  video.src = lesson.src;
  video.load();

  // Fav button state
  document.getElementById('favBtn').textContent =
    progress.favs.includes(id) ? '★ Favoritado' : '☆ Favoritar';
  document.getElementById('doneBtn').textContent =
    progress.done.includes(id) ? '✓ Concluída' : '✓ Marcar concluída';

  document.getElementById('playerModal').classList.remove('hidden');
  document.body.style.overflow='hidden';
}
function closePlayer(){
  document.getElementById('playerModal').classList.add('hidden');
  const video = document.getElementById('lessonVideo');
  video.pause();
  document.body.style.overflow='';
}
function navLesson(dir){
  const idx = LESSONS.findIndex(l=>l.id===currentLessonId);
  const next = LESSONS[idx+dir];
  if(next) openLesson(next.id);
  else { closePlayer(); toast(dir>0?'Você terminou todas as aulas!':'Esta é a primeira aula'); }
}
function markDone(silent){
  if(!currentLessonId) return;
  if(!progress.done.includes(currentLessonId)){
    progress.done.push(currentLessonId);
    saveProgress(progress);
    if(!silent) toast('Aula concluída ✓');
    document.getElementById('doneBtn').textContent = '✓ Concluída';
    renderAll();
    checkAchievements();
  }
}
function toggleFav(){
  if(!currentLessonId) return;
  const i = progress.favs.indexOf(currentLessonId);
  if(i>-1){ progress.favs.splice(i,1); document.getElementById('favBtn').textContent='☆ Favoritar'; toast('Removido dos favoritos'); }
  else    { progress.favs.push(currentLessonId); document.getElementById('favBtn').textContent='★ Favoritado'; toast('Adicionado aos favoritos ★'); }
  saveProgress(progress);
  checkAchievements();
}

// ===== BUSCA =====
function filterLessonsBySearch(q){
  if(!q){ renderModules('all'); return; }
  const wrap = document.getElementById('modulesGrid');
  const matched = LESSONS.filter(l=> l.title.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q));
  // muda para a view de módulos para mostrar resultados de aula
  switchView('modules');
  wrap.innerHTML = matched.length
    ? `<div style="grid-column:1/-1"><h3 style="margin-bottom:1rem;color:var(--muted);font-family:Nunito;font-weight:700">Resultados (${matched.length})</h3></div>`
      + matched.map(l=>lessonCard(l)).join('')
    : `<div class="glass" style="padding:1.4rem;text-align:center;grid-column:1/-1">Nenhum resultado para "${q}"</div>`;
  bindLessonClicks(wrap);
}

// ===== ACHIEVEMENTS =====
function checkAchievements(){
  ACHIEVEMENTS.forEach(a=>{
    const key = 'dt_ach_'+a.id;
    if(a.check(progress) && !localStorage.getItem(key)){
      localStorage.setItem(key,'1');
      toast(`🏅 Conquista: ${a.name}`);
    }
  });
}

// ===== AI (mock — pronto para plugar API real) =====
function aiUser(msg){
  const wrap = document.getElementById('aiMessages');
  wrap.insertAdjacentHTML('beforeend', `<div class="ai-msg user">${escape(msg)}</div>`);
  wrap.scrollTop = wrap.scrollHeight;
}
function aiBot(msg){
  const wrap = document.getElementById('aiMessages');
  wrap.insertAdjacentHTML('beforeend', `<div class="ai-msg bot">${escape(msg)}</div>`);
  wrap.scrollTop = wrap.scrollHeight;
}
function generateAIResponse(q){
  q = q.toLowerCase();
  if(q.includes('aquecimento')) return 'Sugestão: comece com 5 min de respiração diafragmática, depois espelho em duplas (8 min) e finalize com caminhada em diferentes ritmos.';
  if(q.includes('improvis'))    return 'Tente o "Sim, e..." em duplas: cada fala deve aceitar a anterior e adicionar algo novo. 10 minutos é o ideal.';
  if(q.includes('voz') || q.includes('dicção')) return 'Aqueça com sirenes vocais (graves→agudos), trava-línguas em 3 velocidades e leitura projetada para o fundo da sala.';
  if(q.includes('plano'))       return 'Estrutura recomendada: Acolhimento (5min) → Aquecimento (15min) → Jogo central (25min) → Cena/aplicação (15min) → Roda final (10min).';
  return 'Posso te ajudar com dinâmicas, planos de aula, exercícios vocais, corporais ou ideias para espetáculo. Pergunte algo mais específico!';
}
function escape(s){ return s.replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

// ===== TOAST =====
let toastTimer;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove('show'), 2600);
}
