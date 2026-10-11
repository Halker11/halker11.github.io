// Menu no celular
const toggle = document.querySelector('.nav-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const aberto = document.querySelector('.nav-links').classList.toggle('open');
    toggle.setAttribute('aria-expanded', aberto);
  });
}

// Filtros (projetos na home, experiência na trajetória): mostra só os itens da categoria escolhida
document.querySelectorAll('[data-filtro]').forEach((grupo) => {
  const itens = document.querySelectorAll(grupo.dataset.filtro);
  grupo.addEventListener('click', (e) => {
    const botao = e.target.closest('button');
    if (!botao) return;
    grupo.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', b === botao));
    const cat = botao.dataset.cat;
    itens.forEach((el) => { el.hidden = Boolean(cat) && el.dataset.cat !== cat; });
  });
});

// Copiar o e-mail
document.querySelectorAll('.copy').forEach((botao) => {
  let volta;
  botao.addEventListener('click', () => {
    try { navigator.clipboard.writeText(botao.dataset.copiar); } catch (e) { /* sem área de transferência */ }
    botao.textContent = 'Copiado ✓';
    botao.classList.add('done');
    clearTimeout(volta);
    volta = setTimeout(() => { botao.textContent = 'Copiar'; botao.classList.remove('done'); }, 1800);
  });
});

// Abas (módulos do TVB System): troca a imagem e a legenda do quadro
document.querySelectorAll('[data-abas]').forEach((abas) => {
  const quadro = document.querySelector(abas.dataset.abas);
  const botoes = [...abas.querySelectorAll('button')];
  abas.addEventListener('click', (e) => {
    const botao = e.target.closest('button');
    if (!botao) return;
    botoes.forEach((b) => b.setAttribute('aria-selected', b === botao));
    const nome = botao.querySelector('b').textContent;
    const img = quadro.querySelector('img');
    img.src = botao.dataset.img;
    img.alt = nome;
    quadro.querySelector('figcaption b').textContent = nome + '.';
    quadro.querySelector('.desc').textContent = botao.dataset.desc;
    quadro.querySelector('.n').textContent = String(botoes.indexOf(botao) + 1).padStart(2, '0');
  });
});
