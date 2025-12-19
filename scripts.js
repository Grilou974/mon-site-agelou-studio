document.addEventListener('DOMContentLoaded', ()=>{
  // Year
  const year = document.getElementById('year'); if(year) year.textContent = new Date().getFullYear();

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
    })
  })

  // Fetch content from CMS and populate page
  async function loadContent(){
    try{
      const res = await fetch('/api/content');
      if(res.ok){
        const content = await res.json();
        const heroTitle = document.getElementById('heroTitle');
        const heroSubtitle = document.getElementById('heroSubtitle');
        if(heroTitle) heroTitle.textContent = content.heroTitle || heroTitle.textContent;
        if(heroSubtitle) heroSubtitle.textContent = content.heroSubtitle || heroSubtitle.textContent;

        // Services
        const servicesGrid = document.querySelector('.services-grid');
        if(servicesGrid && content.services){
          servicesGrid.innerHTML = '';
          content.services.forEach(s=>{
            const el = document.createElement('article'); el.className='card';
            el.innerHTML = `<h3>${s.title}</h3><p>${s.desc}</p>`;
            servicesGrid.appendChild(el);
          });
        }

        // Pricing
        const pricingGrid = document.querySelector('.pricing-grid');
        if(pricingGrid && content.pricing){
          pricingGrid.innerHTML='';
          content.pricing.forEach(p=>{
            const card = document.createElement('div'); card.className='price-card'+(p.featured? ' featured':'');
            const badge = p.badge ? `<span class="badge${p.featured? ' featured':''}">${p.badge}</span>` : '';
            card.innerHTML = `${badge}<h3>${p.name}</h3><div class="price">${p.price}</div><ul>${(p.items||[]).map(i=>`<li>${i}</li>`).join('')}</ul><a class="btn primary" href="#contact">Commander</a>`;
            pricingGrid.appendChild(card);
          })
        }

        // Portfolio
        const pg = document.getElementById('portfolioGrid');
        if(pg && content.portfolio){
          pg.innerHTML='';
          content.portfolio.forEach(it=>{
            const div = document.createElement('div'); div.className='thumb';
            const href = it.link || '#';
            div.innerHTML = `<a href="${href}" target="_blank" rel="noopener noreferrer"><img src="${it.image}" alt="${it.title}" loading="lazy"><div class="overlay"><div class="overlay-title">${it.title}</div><div class="overlay-cta">Voir le site</div></div></a>`;
            pg.appendChild(div);
          })
        }
      }
    }catch(e){ console.warn('Could not load content', e); }
  }
  loadContent();

  // Contact form (sends to backend)
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMessage');
  if(form){
    form.addEventListener('submit', async e=>{
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();
      if(!name || !email || !message){ msg.textContent = 'Merci de remplir tous les champs.'; return; }
      try{
        const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, email, message }) });
        if(res.ok){ msg.textContent = 'Merci — votre message a bien été envoyé. Je vous répondrai sous 48h.'; form.reset(); }
        else { const data = await res.json(); msg.textContent = data && data.error ? data.error : 'Erreur'; }
      }catch(e){ msg.textContent = 'Erreur réseau'; }
    })
  }
})
