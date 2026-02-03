(function(){
  const API = '/api';
  const app = document.getElementById('app');
  let token = localStorage.getItem('admin_token') || null;

  function html(strings,...vals){
    let s = '';
    strings.forEach((str,i)=>{ s+=str + (vals[i]||'') });
    const template = document.createElement('div');
    template.innerHTML = s.trim();
    return template.firstElementChild || template;
  }

  function showToast(msg){
    const el = document.createElement('div'); el.className='toast'; el.textContent=msg; document.body.appendChild(el);
    setTimeout(()=>el.remove(),2500);
  }

  function setToken(t){ token=t; if(t) localStorage.setItem('admin_token', t); else localStorage.removeItem('admin_token'); }

  function authHeaders(){ return token? { 'Authorization': 'Bearer '+token } : {}; }

  // Login view
  function loginView(){
    app.innerHTML='';
    const card = html`<div class="card"><h2>Admin Login</h2>
      <div class="form-row">
        <input id="email" placeholder="Email" />
        <input id="password" type="password" placeholder="Password" />
      </div>
      <div style="margin-top:12px"><button id="loginBtn" class="btn">Login</button></div>
    </div>`;
    app.appendChild(card);
    card.querySelector('#loginBtn').onclick = async ()=>{
      const email = card.querySelector('#email').value;
      const password = card.querySelector('#password').value;
      try{
        const r = await fetch(API+'/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
        if(!r.ok) throw new Error(await r.text());
        const data = await r.json();
        setToken(data.token); showToast('Logged in'); dashboardView();
      }catch(e){ showToast('Login failed'); }
    }
  }

  // Dashboard
  async function dashboardView(){
    if(!token) return loginView();
    app.innerHTML='';
    const layout = html`<div class="layout">
      <div class="sidebar card nav">
        <a href="#" id="nav-overview" class="active">Overview</a>
        <a href="#" id="nav-categories">Categories</a>
        <a href="#" id="nav-items">Menu Items</a>
        <a href="#" id="nav-logout">Logout</a>
      </div>
      <div class="main">
        <div id="main-content"></div>
      </div>
    </div>`;
    app.appendChild(layout);
    layout.querySelector('#nav-overview').onclick = ()=>renderOverview();
    layout.querySelector('#nav-categories').onclick = ()=>renderCategories();
    layout.querySelector('#nav-items').onclick = ()=>renderItems();
    layout.querySelector('#nav-logout').onclick = ()=>{ setToken(null); showToast('Logged out'); loginView(); };
    renderOverview();
  }

  async function fetchJSON(url, opts){
    const headers = Object.assign({'Accept':'application/json'}, authHeaders(), (opts&&opts.headers)||{});
    const r = await fetch(url, Object.assign({},opts,{headers}));
    if(!r.ok) throw new Error(r.statusText);
    return r.json();
  }

  async function renderOverview(){
    const main = document.getElementById('main-content'); main.innerHTML='';
    try{
      const [cats, items] = await Promise.all([fetchJSON(API+'/categories'), fetchJSON(API+'/items')]);
      const card = html`<div class="card"><h2>Overview</h2>
        <p>Categories: <strong>${cats.length}</strong></p>
        <p>Menu items: <strong>${items.length}</strong></p>
      </div>`;
      main.appendChild(card);
    }catch(e){ showToast('Failed to load overview'); }
  }

  async function renderCategories(){
    const main = document.getElementById('main-content'); main.innerHTML='';
    const addBtn = html`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><h2>Categories</h2><button id="addCat" class="btn">Add Category</button></div>`;
    main.appendChild(addBtn);
    addBtn.querySelector('#addCat').onclick = ()=>showCategoryForm();
    try{
      const cats = await fetchJSON(API+'/categories');
      const table = document.createElement('table'); table.className='table card';
      table.innerHTML = `<thead><tr><th>Image</th><th>Name</th><th>Description</th><th></th></tr></thead><tbody></tbody>`;
      cats.forEach(c=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><img src="/${c.image}" class="preview" onerror="this.src='/assets/default-category.jpg'"></td><td>${c.name}</td><td>${c.description||''}</td><td><button class="btn edit">Edit</button> <button class="btn" data-id="${c.id}" style="background:#c33">Delete</button></td>`;
        tr.querySelector('.edit').onclick = ()=>showCategoryForm(c);
        tr.querySelector('[data-id]')?.addEventListener('click', async (e)=>{
          if(!confirm('Delete category? This also removes its items.')) return;
          try{ await fetch(API+`/categories/${c.id}`,{method:'DELETE',headers:authHeaders()}); showToast('Deleted'); renderCategories(); }catch(err){ showToast('Delete failed'); }
        });
        table.querySelector('tbody').appendChild(tr);
      });
      main.appendChild(table);
    }catch(e){ showToast('Failed load categories'); }
  }

  function showCategoryForm(cat){
    const main = document.getElementById('main-content'); main.innerHTML='';
    const isEdit = !!cat;
    const card = html`<div class="card"><h2>${isEdit? 'Edit' : 'Add'} Category</h2>
      <div class="form-row">
        <input id="name" placeholder="Name" value="${cat?cat.name:''}" />
        <input id="description" placeholder="Description" value="${cat?cat.description||'':''}" />
      </div>
      <div style="margin-top:8px">
        <input id="image" type="file" accept="image/*" />
        <div id="preview"></div>
      </div>
      <div style="margin-top:12px"><button id="save" class="btn">Save</button> <button id="cancel">Cancel</button></div>
    </div>`;
    main.appendChild(card);
    const preview = card.querySelector('#preview');
    if(cat && cat.image) preview.innerHTML = `<img src="/${cat.image}" class="preview">`;
    card.querySelector('#image').onchange = (e)=>{
      const f = e.target.files[0]; if(!f) return; const img = document.createElement('img'); img.className='preview'; img.src = URL.createObjectURL(f); preview.innerHTML=''; preview.appendChild(img);
    };
    card.querySelector('#cancel').onclick = ()=>renderCategories();
    card.querySelector('#save').onclick = async ()=>{
      const name = card.querySelector('#name').value;
      const description = card.querySelector('#description').value;
      const file = card.querySelector('#image').files[0];
      const fd = new FormData(); fd.append('name', name); fd.append('description', description);
      if(file) fd.append('image', file);
      try{
        const url = isEdit? API+`/categories/${cat.id}` : API+'/categories';
        const method = isEdit? 'PUT' : 'POST';
        const r = await fetch(url,{method,headers:authHeaders(),body:fd});
        if(!r.ok) throw new Error('fail');
        showToast('Saved'); renderCategories();
      }catch(err){ showToast('Save failed'); }
    };
  }

  async function renderItems(){
    const main = document.getElementById('main-content'); main.innerHTML='';
    const addBtn = html`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><h2>Menu Items</h2><button id="addItem" class="btn">Add Item</button></div>`;
    main.appendChild(addBtn);
    addBtn.querySelector('#addItem').onclick = ()=>showItemForm();
    try{
      const [cats, items] = await Promise.all([fetchJSON(API+'/categories'), fetchJSON(API+'/items')]);
      const table = document.createElement('table'); table.className='table card';
      table.innerHTML = `<thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th></th></tr></thead><tbody></tbody>`;
      items.forEach(it=>{
        const cat = cats.find(c=>c.id===it.categoryId);
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><img src="/${it.image}" class="preview" onerror="this.src='/assets/default-item.jpg'"></td><td>${it.name}</td><td>${cat?cat.name:'—'}</td><td>${it.price}</td><td><button class="btn edit">Edit</button> <button class="btn" style="background:#c33" data-id="${it.id}">Delete</button></td>`;
        tr.querySelector('.edit').onclick = ()=>showItemForm(it);
        tr.querySelector('[data-id]')?.addEventListener('click', async (e)=>{
          if(!confirm('Delete item?')) return;
          try{ await fetch(API+`/items/${it.id}`,{method:'DELETE',headers:authHeaders()}); showToast('Deleted'); renderItems(); }catch(err){ showToast('Delete failed'); }
        });
        table.querySelector('tbody').appendChild(tr);
      });
      main.appendChild(table);
    }catch(e){ showToast('Failed load items'); }
  }

  async function showItemForm(item){
    const main = document.getElementById('main-content'); main.innerHTML='';
    const isEdit = !!item;
    const cats = await fetchJSON(API+'/categories');
    const card = html`<div class="card"><h2>${isEdit? 'Edit' : 'Add'} Item</h2>
      <div class="form-row">
        <input id="name" placeholder="Name" value="${item?item.name:''}" />
        <input id="price" placeholder="Price" value="${item?item.price:''}" />
      </div>
      <div style="margin-top:8px">
        <select id="category">${cats.map(c=>`<option value="${c.id}" ${item&&item.categoryId===c.id? 'selected':''}>${c.name}</option>`).join('')}</select>
      </div>
      <div style="margin-top:8px"><textarea id="desc" placeholder="Description">${item?item.description||'':''}</textarea></div>
      <div style="margin-top:8px">
        <input id="image" type="file" accept="image/*" />
        <div id="preview"></div>
      </div>
      <div style="margin-top:8px" class="form-row">
        <label><input id="featured" type="checkbox" ${item&&item.featured? 'checked':''}/> Featured</label>
        <label><input id="popular" type="checkbox" ${item&&item.popular? 'checked':''}/> Popular</label>
        <label><input id="spicy" type="checkbox" ${item&&item.spicy? 'checked':''}/> Spicy</label>
        <label><input id="vegetarian" type="checkbox" ${item&&item.vegetarian? 'checked':''}/> Vegetarian</label>
      </div>
      <div style="margin-top:12px"><button id="save" class="btn">Save</button> <button id="cancel">Cancel</button></div>
    </div>`;
    main.appendChild(card);
    const preview = card.querySelector('#preview');
    if(item && item.image) preview.innerHTML = `<img src="/${item.image}" class="preview">`;
    card.querySelector('#image').onchange = (e)=>{
      const f = e.target.files[0]; if(!f) return; const img = document.createElement('img'); img.className='preview'; img.src = URL.createObjectURL(f); preview.innerHTML=''; preview.appendChild(img);
    };
    card.querySelector('#cancel').onclick = ()=>renderItems();
    card.querySelector('#save').onclick = async ()=>{
      const name = card.querySelector('#name').value;
      const price = card.querySelector('#price').value;
      const description = card.querySelector('#desc').value;
      const categoryId = card.querySelector('#category').value;
      const featured = card.querySelector('#featured').checked;
      const popular = card.querySelector('#popular').checked;
      const spicy = card.querySelector('#spicy').checked;
      const vegetarian = card.querySelector('#vegetarian').checked;
      const file = card.querySelector('#image').files[0];
      const fd = new FormData();
      fd.append('name', name); fd.append('price', price); fd.append('description', description); fd.append('categoryId', categoryId);
      fd.append('featured', featured); fd.append('popular', popular); fd.append('spicy', spicy); fd.append('vegetarian', vegetarian);
      if(file) fd.append('image', file);
      try{
        const url = isEdit? API+`/items/${item.id}` : API+'/items';
        const method = isEdit? 'PUT' : 'POST';
        const r = await fetch(url,{method,headers:authHeaders(),body:fd});
        if(!r.ok) throw new Error('fail');
        showToast('Saved'); renderItems();
      }catch(err){ showToast('Save failed'); }
    };
  }

  // Boot
  (function(){
    if(!token) loginView(); else dashboardView();
  })();

})();
