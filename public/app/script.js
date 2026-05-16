/* ============================================================
   ARSENAL DO DIRETOR — script.js
   ------------------------------------------------------------
   Foco: método estruturado escrito (não vídeo).
   Termos premium: Arsenal · Materiais Estratégicos · Guias de
   Aplicação · Método de Aplicação · Central do Diretor.

   COMO ADICIONAR DINÂMICAS:
     Edite o array DYNAMICS. Cada item:
       id, moduleId, level, title, category, difficulty,
       duration, objective, steps[], notes
   COMO ADICIONAR MÓDULOS: edite MODULES.
   COMO ADICIONAR MATERIAIS ESTRATÉGICOS: edite ARSENAL.
   ============================================================ */

// ===== DADOS =====
const MODULES = [
  { id:'m1', title:'Fundamentos do Diretor',  level:1, color:'#3a5f8a', desc:'Bases do trabalho em sala: presença, escuta e jogo.' },
  { id:'m2', title:'Improviso Estruturado',   level:1, color:'#8a3a5f', desc:'Métodos para improvisar com clareza e propósito.' },
  { id:'m3', title:'Voz e Dicção Aplicadas',  level:2, color:'#8a5f3a', desc:'Sistema de aquecimento, projeção e clareza.' },
  { id:'m4', title:'Expressão Corporal',      level:2, color:'#5f8a3a', desc:'Consciência corporal e linguagem cênica.' },
  { id:'m5', title:'Planejamento de Aulas',   level:2, color:'#3a8a8a', desc:'Como estruturar aulas e ensaios profissionais.' },
  { id:'m6', title:'Direção e Espetáculo',    level:3, color:'#8a3a3a', desc:'Direção avançada, cena e palco profissional.', premium:true },
];

// ===== DINÂMICAS (método escrito) =====
const DYNAMICS = [
  { id:'d1', moduleId:'m1', level:1, category:'aquecimento', difficulty:'Iniciante', duration:'10 min',
    title:'Aquecimento em círculo',
    objective:'Conectar o grupo, sincronizar respiração e iniciar a presença cênica coletiva.',
    steps:[
      'Forme um círculo amplo e instrua respiração 4-4-4 por 1 minuto.',
      'Conduza alongamento progressivo cabeça → pés.',
      'Inicie troca de olhares em silêncio (2 min).',
      'Encerre com palmas em ritmo crescente até pausa coletiva.'
    ],
    notes:'Use para abrir qualquer encontro. Estabelece a temperatura emocional do grupo antes de qualquer exercício.' },

  { id:'d2', moduleId:'m1', level:1, category:'corpo', difficulty:'Iniciante', duration:'12 min',
    title:'Espelho mágico',
    objective:'Desenvolver foco, escuta corporal e parceria de cena.',
    steps:[
      'Divida o grupo em duplas frente a frente.',
      'A conduz movimentos lentos por 3 min; B reflete em tempo real.',
      'Inverta os papéis.',
      'Última rodada: nenhum dos dois conduz — ambos se espelham mutuamente.'
    ],
    notes:'O “espelho mútuo” revela imediatamente quem ainda não escuta o parceiro de cena.' },

  { id:'d3', moduleId:'m1', level:1, category:'corpo', difficulty:'Iniciante', duration:'10 min',
    title:'Estátuas vivas',
    objective:'Construção de imagens corporais coletivas e composição visual.',
    steps:[
      'Proponha um tema (alegria, opressão, festa).',
      'Em silêncio, os alunos compõem uma estátua coletiva em 30s.',
      'Observe, descongele e refaça com novo tema.',
      'Discuta o que cada imagem comunica visualmente.'
    ],
    notes:'Ótimo para introduzir noção de cena e composição antes de qualquer texto.' },

  { id:'d4', moduleId:'m2', level:1, category:'improviso', difficulty:'Iniciante', duration:'15 min',
    title:'Método “Sim, e…”',
    objective:'Estabelecer a regra de ouro do improviso: aceitação + construção.',
    steps:[
      'Duplas começam com qualquer frase.',
      'Toda resposta deve aceitar a anterior e adicionar uma nova informação.',
      'Proibido negar ou bloquear.',
      'Após 5 min, troque duplas e aumente a complexidade do contexto.'
    ],
    notes:'Quando um aluno bloqueia, pause e mostre como a cena morre. Pedagogia pelo contraste.' },

  { id:'d5', moduleId:'m2', level:1, category:'improviso', difficulty:'Iniciante', duration:'12 min',
    title:'Cena com 3 palavras-gatilho',
    objective:'Treinar criação imediata a partir de estímulos restritos.',
    steps:[
      'Sortei 3 palavras (objeto, lugar, emoção).',
      'Dupla improvisa cena de 90s usando os três elementos.',
      'Pedir reescrita oral imediata da mesma cena com palavras novas.'
    ],
    notes:'Foque em começo, meio e fim. Improviso sem estrutura vira piada solta.' },

  { id:'d6', moduleId:'m3', level:2, category:'voz', difficulty:'Intermediário', duration:'15 min',
    title:'Aquecimento vocal completo',
    objective:'Preparar voz para projeção sem fadiga em ensaio ou apresentação.',
    steps:[
      'Sirenes vocais (graves→agudos) 2 min.',
      'Vibração labial em escala 2 min.',
      'Articulação de vogais abertas projetadas ao fundo da sala.',
      'Trava-línguas em 3 velocidades.',
      'Leitura de trecho curto com intenção emocional.'
    ],
    notes:'Use sempre antes de qualquer ensaio com texto. Reduz drasticamente o desgaste vocal.' },

  { id:'d7', moduleId:'m3', level:2, category:'voz', difficulty:'Intermediário', duration:'10 min',
    title:'Articulação e clareza',
    objective:'Aprimorar dicção e inteligibilidade no palco.',
    steps:[
      'Selecione 3 trava-línguas progressivos.',
      'Execução: lenta, média, máxima — sem perder articulação.',
      'Repetição com cortiça entre os dentes (opcional).',
      'Aplicar mesma exigência em trecho do texto da peça.'
    ],
    notes:'A clareza define se o público entende a peça. Inegociável em qualquer nível.' },

  { id:'d8', moduleId:'m4', level:2, category:'corpo', difficulty:'Intermediário', duration:'14 min',
    title:'Consciência corporal',
    objective:'Habitar o corpo cênico antes de qualquer cena.',
    steps:[
      'Deitados, varredura corporal guiada (cabeça → pés).',
      'Ativação progressiva em pé, articulação por articulação.',
      'Caminhada neutra observando peso e centro.',
      'Encerramento com 1 minuto de imobilidade ativa.'
    ],
    notes:'Use sempre que perceber o grupo "fora do corpo".' },

  { id:'d9', moduleId:'m4', level:2, category:'corpo', difficulty:'Intermediário', duration:'10 min',
    title:'Caminhadas e ritmos',
    objective:'Explorar tempos, energias e qualidades de movimento.',
    steps:[
      'Caminhada neutra pela sala.',
      'Variar ritmo 1→7 a cada comando.',
      'Inserir qualidades: peso, leveza, urgência, suspensão.',
      'Aplicar uma qualidade à fala de um personagem.'
    ],
    notes:'Conecta diretamente energia corporal à construção de personagem.' },

  { id:'d10', moduleId:'m5', level:2, category:'direcao', difficulty:'Intermediário', duration:'20 min',
    title:'Estrutura de uma aula de teatro',
    objective:'Dominar um modelo replicável para conduzir aulas profissionais.',
    steps:[
      'Acolhimento e roda inicial (5 min).',
      'Aquecimento corporal/vocal (15 min).',
      'Jogo central / dinâmica (25 min).',
      'Aplicação em cena (15 min).',
      'Roda final de devolutiva (10 min).'
    ],
    notes:'Esta estrutura serve para qualquer faixa etária. Ajuste apenas a complexidade do jogo central.' },

  { id:'d11', moduleId:'m5', level:2, category:'direcao', difficulty:'Intermediário', duration:'12 min',
    title:'Avaliação por competências',
    objective:'Avaliar processos teatrais sem reduzir a nota numérica.',
    steps:[
      'Defina 4 competências (presença, escuta, criação, entrega).',
      'Use escala de 3 níveis por competência.',
      'Registre por encontro, não por prova.',
      'Devolutiva individual ao final do ciclo.'
    ],
    notes:'Resolve o impasse "como dar nota em teatro". Foque em processo observável.' },

  { id:'d12', moduleId:'m6', level:3, category:'direcao', difficulty:'Avançado', duration:'25 min',
    title:'Direção de cena — método claro',
    objective:'Conduzir elenco com clareza de intenção e geografia cênica.',
    steps:[
      'Leitura de mesa com mapeamento de objetivos por personagem.',
      'Marcação em sala com pontos fixos no espaço.',
      'Ensaio italiano (só texto) para fixação.',
      'Ensaio corrido com correção pontual.',
      'Devolutiva escrita por cena.'
    ],
    notes:'Direção sem método vira terapia de grupo. Estruture o tempo de cada etapa.' },

  { id:'d13', moduleId:'m6', level:3, category:'direcao', difficulty:'Avançado', duration:'30 min',
    title:'Produção de espetáculo — do roteiro à estreia',
    objective:'Aplicar cronograma profissional de montagem.',
    steps:[
      'Semana 1-2: leitura, análise e divisão.',
      'Semana 3-5: marcação e ensaios por cena.',
      'Semana 6-7: ensaios corridos.',
      'Semana 8: técnico, cenotécnico e geral.',
      'Estreia + plano de manutenção.'
    ],
    notes:'Adapte para 4, 8 ou 12 semanas. Mantenha as fases.' },

  { id:'d14', moduleId:'m6', level:3, category:'direcao', difficulty:'Avançado', duration:'18 min',
    title:'Posicionamento e divulgação',
    objective:'Atrair público real para o espetáculo.',
    steps:[
      'Defina o público-alvo em 1 frase.',
      'Crie 3 peças de comunicação visual.',
      'Cronograma de divulgação T-30, T-15, T-7, T-1.',
      'Plano de recolha de depoimentos pós-estreia.'
    ],
    notes:'Sem público, não há espetáculo. Trate divulgação como parte do método.' },
];

// ===== ARSENAL (materiais estratégicos / guias) =====
const ARSENAL = [
  { id:'a01', title:'Método dos 100 Jogos Teatrais',     cat:'metodo',     tag:'Método', desc:'Sistema completo de aplicação prática por faixa etária.' },
  { id:'a02', title:'Guia de Aplicação — Iniciantes',    cat:'guia',       tag:'Guia',   desc:'Estrutura semanal pronta para os primeiros 30 dias.' },
  { id:'a03', title:'Guia de Aplicação — Intermediário', cat:'guia',       tag:'Guia',   desc:'Plano de evolução para grupos já formados.' },
  { id:'a04', title:'Repertório de Cena — Volume 1',     cat:'repertorio', tag:'Repertório', desc:'Cenas curtas selecionadas para ensaios e mostras.' },
  { id:'a05', title:'Repertório de Cena — Volume 2',     cat:'repertorio', tag:'Repertório', desc:'Cenas de média complexidade com notas de direção.', premium:true },
  { id:'a06', title:'Manual Avançado do Diretor',        cat:'metodo',     tag:'Método', desc:'Método completo de direção profissional.', premium:true },
];

const ACHIEVEMENTS = [
  { id:'a1', icon:'🎭', name:'Primeiro Ato',     desc:'Concluiu sua primeira dinâmica',  check:p => p.done.length >= 1 },
  { id:'a2', icon:'🔥', name:'Em Cena',          desc:'5 dinâmicas concluídas',          check:p => p.done.length >= 5 },
  { id:'a3', icon:'⭐', name:'Estrela',          desc:'10 dinâmicas concluídas',         check:p => p.done.length >= 10 },
  { id:'a4', icon:'📘', name:'Estrategista',     desc:'Acessou 3 materiais estratégicos',check:p => p.pdfs.length >= 3 },
  { id:'a5', icon:'🏆', name:'Mestre do Palco',  desc:'Concluiu toda a trilha',          check:p => p.done.length >= DYNAMICS.length },
  { id:'a6', icon:'💎', name:'Nível Avançado',   desc:'Alcançou o Nível 3',              check:p => p.done.some(id => DYNAMICS.find(l=>l.id===id)?.level===3) },
  { id:'a7', icon:'❤️', name:'Curador',          desc:'Favoritou 3 dinâmicas',           check:p => p.favs.length >= 3 },
  { id:'a8', icon:'🎓', name:'Diretor Certificado',desc:'100% concluído',                check:p => p.done.length === DYNAMICS.length },
];

// ===== STATE =====
const STORAGE = { user:'dt_user', progress:'dt_progress' };
function loadProgress(){
  try { return JSON.parse(localStorage.getItem(STORAGE.progress)) || {done:[],favs:[],pdfs:[],last:null}; }
  catch { return {done:[],favs:[],pdfs:[],last:null}; }
}
function saveProgress(p){ localStorage.setItem(STORAGE.progress, JSON.stringify(p)); }

let progress = loadProgress();
let currentDynId = null;

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(()=> document.getElementById('globalLoader').classList.add('hide'), 600);
  initApp();
});

// ===== INIT =====
function initApp(){
  const user = localStorage.getItem(STORAGE.user);
  if(user){ showApp(); } else { showLogin(); }

  document.getElementById('loginForm').addEventListener('submit', e=>{
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const pass  = document.getElementById('password').value.trim();
    if(!email || !pass) return toast('Preencha e-mail e senha');
    localStorage.setItem(STORAGE.user, JSON.stringify({email}));
    toast('Bem-vindo(a) ao Arsenal!');
    showApp();
  });

  document.getElementById('logoutBtn').addEventListener('click', ()=>{
    localStorage.removeItem(STORAGE.user);
    location.reload();
  });

  document.querySelectorAll('[data-view]').forEach(el=>{
    el.addEventListener('click', e=>{ e.preventDefault(); switchView(el.dataset.view); closeSidebar(); });
  });
  document.querySelectorAll('[data-view-go]').forEach(el=>{
    el.addEventListener('click', e=>{ e.preventDefault(); switchView(el.dataset.viewGo); });
  });

  document.getElementById('menuBtn').addEventListener('click', toggleSidebar);

  document.getElementById('searchInput').addEventListener('input', e=>{
    filterDynamicsBySearch(e.target.value.toLowerCase());
  });

  document.getElementById('moduleFilters').addEventListener('click', e=>{
    if(!e.target.matches('.chip')) return;
    document.querySelectorAll('#moduleFilters .chip').forEach(c=>c.classList.remove('active'));
    e.target.classList.add('active');
    renderModules(e.target.dataset.filter);
  });

  document.getElementById('dynFilters').addEventListener('click', e=>{
    if(!e.target.matches('.chip')) return;
    document.querySelectorAll('#dynFilters .chip').forEach(c=>c.classList.remove('active'));
    e.target.classList.add('active');
    renderDynamics(e.target.dataset.dynFilter);
  });

  document.getElementById('arsenalFilters').addEventListener('click', e=>{
    if(!e.target.matches('.chip')) return;
    document.querySelectorAll('#arsenalFilters .chip').forEach(c=>c.classList.remove('active'));
    e.target.classList.add('active');
    renderArsenal(e.target.dataset.arsFilter);
  });

  document.querySelector('[data-action="continue-studying"]').addEventListener('click', ()=>{
    const last = progress.last || DYNAMICS[0].id;
    openDynamic(last);
  });

  document.querySelectorAll('[data-close-method]').forEach(el=>{
    el.addEventListener('click', closeMethod);
  });
  document.getElementById('doneBtn').addEventListener('click', markDone);
  document.getElementById('favBtn').addEventListener('click', toggleFav);
  document.getElementById('nextBtn').addEventListener('click', ()=> navDynamic(1));
  document.getElementById('prevBtn').addEventListener('click', ()=> navDynamic(-1));

  document.getElementById('aiStartBtn').addEventListener('click', ()=>{
    document.getElementById('aiChat').classList.remove('hidden');
    aiBot('Olá! Sou seu assistente teatral. Posso sugerir dinâmicas, métodos de aplicação e estruturas de ensaio. O que você precisa hoje?');
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

  document.getElementById('certBtn').addEventListener('click', ()=>{
    toast('🎓 Certificação emitida! Verifique seu e-mail.');
  });

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
  if(name==='dynamics') renderDynamics('all');
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
  renderDynamics('all');
  renderArsenal('all');
  renderLevels();
  renderProgressBars();
}

function renderStats(){
  document.getElementById('statDynamics').textContent = DYNAMICS.length;
  document.getElementById('statArsenal').textContent  = ARSENAL.length;
  const pct = Math.round((progress.done.length / DYNAMICS.length) * 100);
  document.getElementById('statProgress').textContent = pct+'%';
}

function dynCard(d){
  const m = MODULES.find(x=>x.id===d.moduleId);
  const done = progress.done.includes(d.id);
  return `
    <article class="lesson-card dyn-card" data-dyn="${d.id}">
      <div class="lesson-thumb dyn-thumb" style="background:linear-gradient(135deg,${m?.color || '#333'},#0a0a0c)">
        <span class="dyn-cat-tag">${labelCat(d.category)}</span>
        ${done?'<div class="check">✓</div>':''}
      </div>
      <div class="lesson-meta">
        <span class="mod">${m?.title || ''} • ${d.duration}</span>
        <h3>${d.title}</h3>
        <p class="dyn-desc">${d.objective}</p>
        <div class="dyn-foot">
          <span class="meta-pill small">${d.difficulty}</span>
          <span class="meta-pill small">Nível ${d.level}</span>
        </div>
      </div>
    </article>`;
}

function labelCat(c){
  return { aquecimento:'Aquecimento', improviso:'Improviso', corpo:'Corpo', voz:'Voz', direcao:'Direção' }[c] || c;
}

function renderContinueRow(){
  const row = document.getElementById('continueRow');
  let list = DYNAMICS.filter(l => !progress.done.includes(l.id));
  if(progress.last){
    const l = DYNAMICS.find(x=>x.id===progress.last);
    if(l) list = [l, ...list.filter(x=>x.id!==l.id)];
  }
  list = list.slice(0,6);
  if(list.length===0){
    row.innerHTML = `<div class="glass" style="padding:1.4rem;text-align:center;width:100%">🎉 Você concluiu toda a trilha!</div>`;
    return;
  }
  row.innerHTML = list.map(dynCard).join('');
  bindDynClicks(row);
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
  const dyns = DYNAMICS.filter(l=>l.moduleId===m.id);
  const done = dyns.filter(l=>progress.done.includes(l.id)).length;
  const pct = dyns.length ? Math.round((done/dyns.length)*100) : 0;
  return `
    <article class="module-card" data-module="${m.id}">
      <div class="module-cover" style="background:linear-gradient(135deg,${m.color},#0a0a0c)">
        ${m.title.split(' ')[0]}
      </div>
      <div class="module-body">
        ${m.premium?'<span class="badge-premium">AVANÇADO</span>':''}
        <h3>${m.title}</h3>
        <p>${m.desc}</p>
        <div class="module-progress"><span style="width:${pct}%"></span></div>
        <div class="module-foot">
          <small>${dyns.length} dinâmicas • ${pct}% concluído</small>
          <button class="btn btn-gold" style="padding:.5rem 1rem;font-size:.8rem">Acessar método</button>
        </div>
      </div>
    </article>`;
}
function bindModuleClicks(wrap){
  wrap.querySelectorAll('.module-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const id = card.dataset.module;
      const first = DYNAMICS.find(l=>l.moduleId===id);
      if(first) openDynamic(first.id);
    });
  });
}
function bindDynClicks(wrap){
  wrap.querySelectorAll('.dyn-card,.lesson-card').forEach(card=>{
    card.addEventListener('click', ()=> openDynamic(card.dataset.dyn));
  });
}

function renderDynamics(filter){
  const wrap = document.getElementById('dynamicsGrid');
  const list = filter==='all' ? DYNAMICS : DYNAMICS.filter(d=>d.category===filter);
  wrap.innerHTML = list.length
    ? list.map(dynCard).join('')
    : `<div class="glass" style="padding:1.4rem;text-align:center;grid-column:1/-1">Nenhuma dinâmica nesta categoria.</div>`;
  bindDynClicks(wrap);
}

function renderArsenal(filter){
  const wrap = document.getElementById('arsenalGrid');
  const list = filter==='all' ? ARSENAL : ARSENAL.filter(p=>p.cat===filter);
  wrap.innerHTML = list.map(p=>`
    <article class="arsenal-card">
      <div class="arsenal-cover">
        <span class="arsenal-tag">${p.tag}</span>
      </div>
      <div class="arsenal-meta">
        ${p.premium?'<span class="badge-premium">AVANÇADO</span>':''}
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="arsenal-actions">
          <button class="btn btn-outline" data-ars-open="${p.id}">Abrir</button>
          <button class="btn btn-gold" data-ars-access="${p.id}">Acessar Material</button>
        </div>
      </div>
    </article>`).join('');
  wrap.querySelectorAll('[data-ars-access]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const id = el.dataset.arsAccess;
      if(!progress.pdfs.includes(id)){
        progress.pdfs.push(id);
        saveProgress(progress);
        checkAchievements();
      }
      toast('Material liberado ✓');
    });
  });
  wrap.querySelectorAll('[data-ars-open]').forEach(el=>{
    el.addEventListener('click', ()=> toast('Abrindo material estratégico...'));
  });
}

function renderFavorites(){
  const wrap = document.getElementById('favoritesGrid');
  const favs = DYNAMICS.filter(l=>progress.favs.includes(l.id));
  wrap.innerHTML = favs.length
    ? favs.map(dynCard).join('')
    : `<div class="glass" style="padding:1.4rem;text-align:center">Você ainda não favoritou nenhuma dinâmica.</div>`;
  bindDynClicks(wrap);
}

function renderLevels(){
  [1,2,3].forEach(lvl=>{
    const items = DYNAMICS.filter(l=>l.level===lvl);
    const done = items.filter(l=>progress.done.includes(l.id)).length;
    const pct = items.length ? Math.round((done/items.length)*100) : 0;
    const fill = document.querySelector(`[data-level-fill="${lvl}"]`);
    if(fill) fill.style.width = pct+'%';
    const num = document.querySelector(`[data-level-num="${lvl}"]`);
    if(num) num.textContent = pct+'%';
  });
}

function renderProgressBars(){
  const pct = Math.round((progress.done.length / DYNAMICS.length) * 100);
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
  const pct = Math.round((progress.done.length/DYNAMICS.length)*100);
  document.getElementById('certFill').style.width = pct+'%';
  document.getElementById('certStatus').textContent = pct+'% concluído';
  document.getElementById('certBtn').disabled = pct<100;
}

// ===== MODAL DE MÉTODO =====
function openDynamic(id){
  const d = DYNAMICS.find(x=>x.id===id);
  if(!d) return;
  currentDynId = id;
  progress.last = id; saveProgress(progress);

  const m = MODULES.find(x=>x.id===d.moduleId);
  document.getElementById('dynTitle').textContent      = d.title;
  document.getElementById('dynCat').textContent        = `${(m?.title||'')} • ${labelCat(d.category)}`;
  document.getElementById('dynLevel').textContent      = `Nível ${d.level}`;
  document.getElementById('dynDifficulty').textContent = d.difficulty;
  document.getElementById('dynDuration').textContent   = d.duration;
  document.getElementById('dynObjective').textContent  = d.objective;
  document.getElementById('dynNotes').textContent      = d.notes;
  document.getElementById('dynSteps').innerHTML        = `<ol class="method-steps">${d.steps.map(s=>`<li>${s}</li>`).join('')}</ol>`;

  document.getElementById('favBtn').textContent  = progress.favs.includes(id) ? '★ Favoritado' : '☆ Favoritar';
  document.getElementById('doneBtn').textContent = progress.done.includes(id) ? '✓ Concluída' : '✓ Marcar concluída';

  document.getElementById('methodModal').classList.remove('hidden');
  document.body.style.overflow='hidden';
}
function closeMethod(){
  document.getElementById('methodModal').classList.add('hidden');
  document.body.style.overflow='';
}
function navDynamic(dir){
  const idx = DYNAMICS.findIndex(l=>l.id===currentDynId);
  const next = DYNAMICS[idx+dir];
  if(next) openDynamic(next.id);
  else { closeMethod(); toast(dir>0?'Você concluiu toda a trilha!':'Esta é a primeira dinâmica'); }
}
function markDone(silent){
  if(!currentDynId) return;
  if(!progress.done.includes(currentDynId)){
    progress.done.push(currentDynId);
    saveProgress(progress);
    if(!silent) toast('Dinâmica concluída ✓');
    document.getElementById('doneBtn').textContent = '✓ Concluída';
    renderAll();
    checkAchievements();
  }
}
function toggleFav(){
  if(!currentDynId) return;
  const i = progress.favs.indexOf(currentDynId);
  if(i>-1){ progress.favs.splice(i,1); document.getElementById('favBtn').textContent='☆ Favoritar'; toast('Removido dos favoritos'); }
  else    { progress.favs.push(currentDynId); document.getElementById('favBtn').textContent='★ Favoritado'; toast('Adicionado aos favoritos ★'); }
  saveProgress(progress);
  checkAchievements();
}

// ===== BUSCA =====
function filterDynamicsBySearch(q){
  if(!q){ renderDynamics('all'); return; }
  const wrap = document.getElementById('dynamicsGrid');
  const matched = DYNAMICS.filter(l=> l.title.toLowerCase().includes(q) || l.objective.toLowerCase().includes(q));
  switchView('dynamics');
  wrap.innerHTML = matched.length
    ? `<div style="grid-column:1/-1"><h3 style="margin-bottom:1rem;color:var(--muted);font-family:Nunito;font-weight:700">Resultados (${matched.length})</h3></div>`
      + matched.map(dynCard).join('')
    : `<div class="glass" style="padding:1.4rem;text-align:center;grid-column:1/-1">Nenhum resultado para "${q}"</div>`;
  bindDynClicks(wrap);
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

// ===== AI =====
function aiUser(msg){
  const wrap = document.getElementById('aiMessages');
  wrap.insertAdjacentHTML('beforeend', `<div class="ai-msg user">${escapeHtml(msg)}</div>`);
  wrap.scrollTop = wrap.scrollHeight;
}
function aiBot(msg){
  const wrap = document.getElementById('aiMessages');
  wrap.insertAdjacentHTML('beforeend', `<div class="ai-msg bot">${escapeHtml(msg)}</div>`);
  wrap.scrollTop = wrap.scrollHeight;
}
function generateAIResponse(q){
  q = q.toLowerCase();
  if(q.includes('aquecimento')) return 'Sugestão: 5 min de respiração diafragmática → espelho em duplas (8 min) → caminhada em ritmos variados (5 min).';
  if(q.includes('improvis'))    return 'Aplique o método "Sim, e..." em duplas: cada fala aceita a anterior e adiciona algo novo. 10 min é o ideal.';
  if(q.includes('voz') || q.includes('dicção')) return 'Aqueça com sirenes vocais (graves→agudos), trava-línguas em 3 velocidades e leitura projetada para o fundo da sala.';
  if(q.includes('plano') || q.includes('aula')) return 'Estrutura recomendada: Acolhimento (5min) → Aquecimento (15min) → Jogo central (25min) → Cena/aplicação (15min) → Roda final (10min).';
  return 'Posso te ajudar com dinâmicas, métodos de direção, planos de aula, exercícios vocais ou corporais. Pergunte algo mais específico!';
}
function escapeHtml(s){ return s.replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

// ===== TOAST =====
let toastTimer;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove('show'), 2600);
}
