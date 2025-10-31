// ===== main.js: Web Components, Theme, Reveal, Timeline =====
const THEME_KEY = "theme";
function setTheme(mode){
  if(mode === "auto"){
    document.documentElement.setAttribute("data-theme","auto");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.appliedTheme = prefersDark ? "dark" : "light";
  }else{
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.dataset.appliedTheme = mode;
  }
  localStorage.setItem(THEME_KEY, mode);
}
(function initTheme(){
  const saved = localStorage.getItem(THEME_KEY) || "auto";
  setTheme(saved);
})();

class SiteHeader extends HTMLElement{
  connectedCallback(){
    const active = this.getAttribute("data-active") || "";
    this.innerHTML = `
      <header class="site">
        <nav class="nav container">
          <a class="nav__brand" href="index.html" aria-label="Home">
            <span class="logo"></span>
            <span>Shingo</span>
          </a>
          <div class="nav__links">
            <a href="index.html" ${active==="home"?'aria-current="page"':''}>Home</a>
            <a href="projects.html" ${active==="projects"?'aria-current="page"':''}>Projects</a>
            <a href="about.html" ${active==="about"?'aria-current="page"':''}>About</a>
            <a href="contact.html" ${active==="contact"?'aria-current="page"':''}>Contact</a>
          </div>
          <button class="theme-toggle" id="themeToggle" title="テーマ切替" aria-label="テーマ切替">
            <span class="visually-hidden">テーマ切替</span>🌓
          </button>
        </nav>
      </header>
    `;
    this.querySelector("#themeToggle")?.addEventListener("click",()=>{
      const current = localStorage.getItem(THEME_KEY) || "auto";
      const next = current === "auto" ? "light" : current === "light" ? "dark" : "auto";
      setTheme(next);
    });
  }
}
customElements.define("site-header", SiteHeader);

class SiteFooter extends HTMLElement{
  connectedCallback(){
    const y = new Date().getFullYear();
    this.innerHTML = `
      <footer class="site">
        <div class="container">
          <small>© ${y} Shingo. Shin-you STUDIO Computers.</small>
        </div>
      </footer>
    `;
  }
}
customElements.define("site-footer", SiteFooter);

// Reveal on view
const io = new IntersectionObserver((entries)=>{
  for(const e of entries){
    if(e.isIntersecting){
      e.target.classList.add("is-visible");
      io.unobserve(e.target);
    }
  }
},{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

// Simple timeline data (edit freely or fetch from GitHub API if needed)
const news = [
  { date:"2025-10-30", text:"ポートフォリオ初版を公開。" },
  { date:"2025-09-15", text:"ARM64 タイマ割り込みとGICv2初期化を整理。" },
  { date:"2025-08-01", text:"Flask + MySQL のSNS開発メモを更新。" },
  { date:"2025-08-01", text:"石川県警察本庁舎で庁舎見学とCTFの参加" },
  { date:"2025-06-09～", text:"VA Linux Systems Japan社で長期インターンシップを開始(継続中)" },
];
const list = document.querySelector("#news-list");
if(list){
  for(const n of news){
    const li = document.createElement("li");
    li.className = "timeline__item";
    li.innerHTML = `<div class="timeline__date">${n.date}</div><div>${n.text}</div>`;
    list.appendChild(li);
  }
}

// Defer heavy effects if user prefers reduced motion
if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  // Canvas background init (particles.js will look for this id)
  if(document.getElementById("bg-canvas") && window.initParticles){
    window.initParticles("bg-canvas");
  }
}
