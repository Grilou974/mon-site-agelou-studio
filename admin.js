function b64(u,p){return btoa(`${u}:${p}`)}
document.addEventListener('DOMContentLoaded', ()=>{
  const user = document.getElementById('adminUser');
  const pass = document.getElementById('adminPass');
  const btnLogin = document.getElementById('btnLogin');
  const editor = document.getElementById('editor');
  const contentArea = document.getElementById('contentArea');
  const btnSave = document.getElementById('btnSave');
  const btnMessages = document.getElementById('btnMessages');
  const messagesPre = document.getElementById('messages');

  async function loadContent(auth){
    const res = await fetch('/api/content', { headers: { 'Authorization': auth } });
    if(res.status === 401){ alert('Authentification échouée'); return; }
    const data = await res.json();
    contentArea.value = JSON.stringify(data, null, 2);
    editor.style.display = 'block';
  }

  btnLogin.addEventListener('click', ()=>{
    const auth = 'Basic ' + b64(user.value, pass.value);
    loadContent(auth);
  });

  btnSave.addEventListener('click', async ()=>{
    try{
      const body = JSON.parse(contentArea.value);
      const auth = 'Basic ' + b64(user.value, pass.value);
      const res = await fetch('/api/content', { method: 'POST', headers: { 'Content-Type':'application/json', 'Authorization': auth }, body: JSON.stringify(body) });
      if(res.ok){ alert('Contenu enregistré'); } else { alert('Erreur'); }
    }catch(e){ alert('JSON invalide'); }
  });

  btnMessages.addEventListener('click', async ()=>{
    const auth = 'Basic ' + b64(user.value, pass.value);
    const res = await fetch('/api/messages', { headers: { 'Authorization': auth } });
    if(res.status === 401){ alert('Authentification échouée'); return; }
    const msgs = await res.json();
    messagesPre.style.display = 'block';
    messagesPre.textContent = JSON.stringify(msgs, null, 2);
  });
});
