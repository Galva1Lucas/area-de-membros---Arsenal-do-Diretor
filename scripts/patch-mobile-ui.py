from pathlib import Path

def d(s: str) -> str:
    return s.replace("__D__", "div").replace("__/D__", "/div")

p = Path(__file__).resolve().parent.parent / "public" / "app" / "index.html"
t = p.read_text(encoding="utf-8")

topbar_old = d("""    <__D__ class="topbar-brand">Arsenal <em>do Diretor</em></__D__>
    <__D__ class="search-wrap">
      <input id="searchInput" type="search" placeholder="Buscar dinâmicas, métodos, guias..." />
    </__D__>
    <__D__ class="user-chip">
      <__D__ class="avatar">A</__D__>
    </__D__>""")

topbar_new = d("""    <__D__ class="topbar-brand mobile-hide">Arsenal <em>do Diretor</em></__D__>
    <h1 class="topbar-title" id="topbarTitle">Início</h1>
    <button type="button" id="searchToggle" class="icon-btn topbar-search-btn" aria-label="Buscar">⌕</button>
    <__D__ class="search-wrap" id="searchWrap">
      <input id="searchInput" type="search" placeholder="Buscar dinâmicas..." enterkeyhint="search" />
    </__D__>
    <button type="button" class="user-chip" data-view="profile" aria-label="Perfil">
      <__D__ class="avatar">A</__D__>
    </button>""")

if topbar_old not in t:
    raise SystemExit("topbar block not found")
t = t.replace(topbar_old, topbar_new)

mobile_nav = d("""
  <!-- Navegação inferior (estilo app) -->
  <nav class="mobile-nav" id="mobileNav" aria-label="Navegação principal">
    <a href="#" class="mobile-nav-item active" data-view="home"><span class="nav-ico">⌂</span><span>Início</span></a>
    <a href="#" class="mobile-nav-item" data-view="dynamics"><span class="nav-ico">▶</span><span>Explorar</span></a>
    <a href="#" class="mobile-nav-item" data-view="arsenal"><span class="nav-ico">📘</span><span>Arsenal</span></a>
    <a href="#" class="mobile-nav-item" data-view="favorites"><span class="nav-ico">★</span><span>Salvos</span></a>
    <a href="#" class="mobile-nav-item" data-view="profile"><span class="nav-ico">☺</span><span>Perfil</span></a>
  </nav>
""")

if 'id="mobileNav"' not in t:
    t = t.replace("  </main>\n</__D__>", "  </main>\n" + mobile_nav + "\n</__D__>").replace("__D__", "div")

profile_section = d("""
    <!-- PERFIL (menu do app) -->
    <section data-view-section="profile" class="view">
      <__D__ class="profile-hero">
        <__D__ class="profile-avatar">A</__D__>
        <h1>Meu perfil</h1>
        <p class="profile-progress-label">Evolução da trilha: <strong id="profileProgressNum">0%</strong></p>
        <__D__ class="sp-bar profile-bar"><__D__ id="profileProgressFill" class="sp-fill"></__D__></__D__>
      </__D__>
      <__D__ class="profile-menu">
        <button type="button" class="profile-link" data-view-go="modules"><span>📚</span> Trilha de Evolução</button>
        <button type="button" class="profile-link" data-view-go="achievements"><span>🏆</span> Conquistas</button>
        <button type="button" class="profile-link" data-view-go="ai"><span>✦</span> Assistente IA</button>
        <button type="button" class="profile-link" data-view-go="certificate"><span>🎓</span> Certificação</button>
        <button type="button" class="profile-link" data-view-go="videos"><span>🔒</span> Vídeos (em breve)</button>
        <button type="button" id="logoutBtnMobile" class="profile-link profile-link-danger"><span>⎋</span> Sair da conta</button>
      </__D__>
    </section>
""")

if 'data-view-section="profile"' not in t:
    t = t.replace("    <!-- CERTIFICADO -->", profile_section + "\n    <!-- CERTIFICADO -->")

t = t.replace('<div class="stats">', '<div class="stats nf-stats-scroll">')
t = t.replace('id="modulesPreview" class="modules-grid"', 'id="modulesPreview" class="row-cards nf-row"')
t = t.replace('<div class="levels">', '<motion class="levels nf-levels-scroll">'.replace("motion", "div"))
t = t.replace("<body>", '<body class="mobile-app">')

p.write_text(t, encoding="utf-8")
print("OK: index.html patched")
