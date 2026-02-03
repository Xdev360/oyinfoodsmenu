const API = '/api';

// Load data from API and render similarly to previous implementation.
let menuData = {};
let categories = [];
let items = [];

async function loadData(){
  try{
    const [catsRes, itemsRes] = await Promise.all([fetch(API+'/categories'), fetch(API+'/items')]);
    categories = await catsRes.json();
    items = await itemsRes.json();
    // build menuData map keyed by category id or fallback to 'all'
    menuData = {};
    categories.forEach(c=>{ menuData[c.id] = { title: c.name, items: [] }; });
    items.forEach(it=>{
      const catKey = it.categoryId || 'uncategorized';
      if(!menuData[catKey]) menuData[catKey] = { title: 'Uncategorized', items: [] };
      menuData[catKey].items.push(Object.assign({}, it, { desc: it.description }));
    });
  }catch(e){
    console.error('Failed to load menu data', e);
  }
}

// Image sourcing — prefer explicit `item.image`, otherwise use Unsplash search per item name, with a local placeholder fallback
const LOCAL_IMAGES = [
  'assets/food-1.svg',
  'assets/food-2.svg',
  'assets/food-3.svg',
  'assets/food-4.svg',
  'assets/food-5.svg',
  'assets/food-6.svg'
];

// Optional curated map for a few items (use direct image URLs) — extend if you have specific photos
const IMAGE_MAP = {
  // 'Jollof Rice': 'https://images.unsplash.com/photo-...'
};

function getImageUrl(item){
  // Accept either a string name or an item object
  if(!item) return LOCAL_IMAGES[0];
  if(typeof item === 'string') item = { name: item };

  // 1) explicit image on item
  if(item.image) return item.image.startsWith('/') ? item.image : ('/' + item.image);

  // 2) curated map
  if(IMAGE_MAP[item.name]) return IMAGE_MAP[item.name];

  // 3) Unsplash search by name (real food images). This requires network access and may vary per request.
  const query = encodeURIComponent((item.name || 'food') + ' food');
  return `https://source.unsplash.com/900x600/?${query}`;
}


// Render categories as pill buttons
function renderCategories(container, defaultKey){
  const keys = Object.keys(menuData);
  // Add an 'All' option first
  const allBtn = document.createElement('button');
  allBtn.className = 'btn-cat active';
  allBtn.setAttribute('data-category','all');
  allBtn.setAttribute('aria-pressed','true');
  allBtn.textContent = 'All';
  container.appendChild(allBtn);

  keys.forEach(k => {
    const btn = document.createElement('button');
    btn.className = 'btn-cat';
    btn.setAttribute('data-category', k);
    btn.setAttribute('aria-pressed','false');
    btn.textContent = menuData[k].title;
    container.appendChild(btn);
  });
}

// Render menu items for a given category key ('all' for every item)
function renderMenu(gridEl, key){
  gridEl.innerHTML = '';
  let items = [];
  if(key === 'all'){
    Object.keys(menuData).forEach(k => {
      menuData[k].items.forEach(it => items.push(Object.assign({}, it, { category: k })));
    });
  } else {
    items = menuData[key] ? menuData[key].items.map(it => Object.assign({}, it, { category: key })) : [];
  }

  if(items.length === 0){
    gridEl.innerHTML = `<div class="empty">No items yet.</div>`;
    return;
  }

  items.forEach(item => {
    const card = document.createElement('button');
    card.className = 'menu-card';
    card.setAttribute('type','button');
    card.setAttribute('data-name', item.name);
    card.setAttribute('aria-label', `${item.name}, ${item.price}`);

    // decorative accent (image-free design)
    const accentBar = document.createElement('div');
    accentBar.className = 'accent-bar';
    card.appendChild(accentBar);

    // media / image area — uses getImageUrl(item)
    const media = document.createElement('div');
    media.className = 'media';
    media.setAttribute('aria-hidden', 'true');
    // use inline style to set background image (fall back handled by getImageUrl)
    media.style.backgroundImage = `url('${getImageUrl(item)}')`;
    card.appendChild(media);

    const body = document.createElement('div');
    body.className = 'body';

    // left column contains title and optional subtitle/desc
    const left = document.createElement('div');
    left.className = 'left';
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = item.name;
    left.appendChild(title);
    if(item.desc){
      const subtitle = document.createElement('div');
      subtitle.className = 'subtitle';
      subtitle.textContent = item.desc;
      left.appendChild(subtitle);
    }

    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = item.price;
    body.appendChild(left);
    body.appendChild(price);

    // category tag
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = (menuData[item.category] && menuData[item.category].title) ? menuData[item.category].title : '';
    card.appendChild(tag);

    card.appendChild(body);

    // Click to open modal with details
    card.addEventListener('click', () => openItemModal(item));

    gridEl.appendChild(card);
  });

  // Observe for fade-in
  const cards = document.querySelectorAll('.menu-card');
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in-view');
        observer.unobserve(e.target);
      }
    });
  }, {threshold:0.08});

  cards.forEach(c => io.observe(c));
}

// Modal for item detail
function openItemModal(item){
  const modal = document.getElementById('detailModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  modalTitle.textContent = item.name;
  modalBody.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0"><strong style="font-size:16px">${item.name}</strong><strong style="color:var(--gold);font-size:16px">${item.price}</strong></div>
      ${item.desc ? `<div style="color:rgba(43,22,7,0.7);font-size:14px">${item.desc}</div>` : ''}
    </div>
  `;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}

function setupCategoryInteractions(){
  const container = document.getElementById('categories');
  const grid = document.getElementById('menuGrid');
  let active = 'all';

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-cat');
    if(!btn) return;
    const cat = btn.getAttribute('data-category');
    if(!cat) return;

    // manage active state
    container.querySelectorAll('.btn-cat').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false') });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed','true');

    active = cat;
    renderMenu(grid, cat);
  });

  // keyboard: space/enter handled by buttons; left/right arrow to move between categories
  container.addEventListener('keydown', (e) => {
    const focusable = Array.from(container.querySelectorAll('.btn-cat'));
    const idx = focusable.indexOf(document.activeElement);
    if(idx === -1) return;
    if(e.key === 'ArrowRight'){
      e.preventDefault(); const next = focusable[idx+1] || focusable[0]; next.focus();
    }
    if(e.key === 'ArrowLeft'){
      e.preventDefault(); const prev = focusable[idx-1] || focusable[focusable.length-1]; prev.focus();
    }
  });

  // initial render: All
  renderMenu(grid, active);
}

// Modal close interactions
function setupModal(){
  const modal = document.getElementById('detailModal');
  const modalClose = document.querySelector('.modal-close');
  modalClose.addEventListener('click', closeModal);
  document.querySelector('.modal-overlay').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  const container = document.getElementById('categories');
  // render category buttons from `categories`
  container.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.className = 'btn-cat active'; allBtn.setAttribute('data-category','all'); allBtn.setAttribute('aria-pressed','true'); allBtn.textContent = 'All';
  container.appendChild(allBtn);
  Object.keys(menuData).forEach(key => {
    const btn = document.createElement('button'); btn.className='btn-cat'; btn.setAttribute('data-category', key); btn.setAttribute('aria-pressed','false'); btn.textContent = (menuData[key].title || 'Category'); container.appendChild(btn);
  });

  renderMenu(document.getElementById('menuGrid'), 'all');
  setupCategoryInteractions();
  setupModal();
});
