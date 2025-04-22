document.addEventListener('DOMContentLoaded', function() {
  // SCRIPT 1: Ajuste automático de elementos
  function ajustarLayoutResponsivo() {
    const larguraTela = window.innerWidth;
    
    // Ajusta tamanho de fontes
    if (larguraTela < 768) {
      document.querySelectorAll('h1').forEach(el => el.style.fontSize = '24px');
      document.querySelectorAll('p').forEach(el => el.style.fontSize = '16px');
    } else {
      document.querySelectorAll('h1').forEach(el => el.style.fontSize = '32px');
      document.querySelectorAll('p').forEach(el => el.style.fontSize = '18px');
    }
    
    // Ajusta elementos que estão causando rolagem horizontal
    document.querySelectorAll('.container, .row, section, div').forEach(el => {
      if (el.offsetWidth > document.body.clientWidth) {
        el.style.width = '100%';
        el.style.maxWidth = '100%';
        el.style.overflowX = 'hidden';
      }
    });
    
    // Converte menus para mobile quando necessário
    const menu = document.querySelector('.menu');
    if (menu) {
      if (larguraTela < 768) {
        menu.classList.add('menu-mobile');
      } else {
        menu.classList.remove('menu-mobile');
      }
    }
  }
  
  // SCRIPT 2: Ajuste de imagens responsivas
  function tornarImagensResponsivas() {
    document.querySelectorAll('img').forEach(img => {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      
      // Prevenir imagens de estourarem seus contêineres
      const container = img.parentElement;
      if (container && img.offsetWidth > container.offsetWidth) {
        img.style.width = '100%';
      }
    });
  }
  
  // SCRIPT 3: Menu hambúrguer responsivo
  const menuBtn = document.querySelector('.menu-btn') || document.createElement('button');
  const navMenu = document.querySelector('nav ul') || document.querySelector('nav');
  
  // Criar botão de menu se não existir
  if (!document.querySelector('.menu-btn') && document.querySelector('nav')) {
    menuBtn.className = 'menu-btn';
    menuBtn.innerHTML = '☰';
    menuBtn.style.cssText = 'display:none; font-size:24px; background:none; border:none; cursor:pointer;';
    document.querySelector('nav').prepend(menuBtn);
  }
  
  function ajustarMenu() {
    if (window.innerWidth <= 768 && navMenu) {
      menuBtn.style.display = 'block';
      navMenu.style.display = 'none';
      navMenu.style.flexDirection = 'column';
      navMenu.style.width = '100%';
    } else if (navMenu) {
      menuBtn.style.display = 'none';
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'row';
    }
  }
  
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', function() {
      if (navMenu.style.display === 'none' || navMenu.style.display === '') {
        navMenu.style.display = 'flex';
      } else {
        navMenu.style.display = 'none';
      }
    });
  }
  
  // SCRIPT 4: Correção de rolagem horizontal
  function corrigirRolagemHorizontal() {
    // Definir largura máxima para o corpo e html
    document.body.style.maxWidth = '100%';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.maxWidth = '100%';
    document.documentElement.style.overflowX = 'hidden';
    
    // Encontrar elementos que ultrapassam a largura
    const larguraTela = document.documentElement.clientWidth;
    document.querySelectorAll('*').forEach(el => {
      const computedStyle = window.getComputedStyle(el);
      const width = el.offsetWidth;
      const marginLeft = parseInt(computedStyle.marginLeft) || 0;
      const marginRight = parseInt(computedStyle.marginRight) || 0;
      const totalWidth = width + marginLeft + marginRight;
      
      if (totalWidth > larguraTela && el !== document.body && el !== document.documentElement) {
        el.style.maxWidth = '100%';
        el.style.marginLeft = '0';
        el.style.marginRight = '0';
        el.style.boxSizing = 'border-box';
      }
    });
  }
  
  // Executar todas as funções no carregamento e no redimensionamento
  ajustarLayoutResponsivo();
  tornarImagensResponsivas();
  ajustarMenu();
  corrigirRolagemHorizontal();
  
  // Adicionar evento de redimensionamento para todas as funções
  window.addEventListener('resize', function() {
    ajustarLayoutResponsivo();
    tornarImagensResponsivas();
    ajustarMenu();
    corrigirRolagemHorizontal();
  });
  
  // Executar novamente quando todas as imagens carregarem
  window.addEventListener('load', function() {
    tornarImagensResponsivas();
    corrigirRolagemHorizontal();
  });
});
