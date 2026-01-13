const menuData = {
  proteins: {
    title: 'PROTEINS',
    items: [
      { name: 'Beef', price: '₦1,200' },
      { name: 'Pomo', price: '₦1,000' },
      { name: 'Shaki', price: '₦1,500' },
      { name: 'Roundabout', price: '₦1,500' },
      { name: 'Liver', price: '₦1,500' },
      { name: 'Cow Head', price: '₦1,500' },
      { name: 'Cow Leg', price: '₦2,000' },
      { name: 'Chicken Wing', price: '₦1,000' },
      { name: 'Chicken', price: '₦3,500' },
      { name: 'Turkey', price: '₦6,000' },
      { name: 'Titus Fish', price: '₦3,000' },
      { name: 'Hake Fish', price: '₦3,000' },
      { name: 'Crispy Chicken', price: '₦2,500' },
      { name: 'Small Crispy Chicken', price: '₦1,800' },
      { name: 'Goat Meat', price: '₦5,000' },
      { name: 'Snail', price: '₦2,500' },
      { name: 'Boiled Egg', price: '₦400' }
    ]
  },
  rice: {
    title: 'RICE & MAIN MEALS',
    items: [
      { name: 'Jollof Rice', price: '₦1,500' },
      { name: 'Fried Rice', price: '₦1,500' },
      { name: 'Asọ Rice', price: '₦2,800' },
      { name: 'Village Rice', price: '₦2,800' },
      { name: 'Special Rice', price: '₦2,800' },
      { name: 'Stir Fry Spaghetti', price: '₦2,800' },
      { name: 'Gizzard Rice', price: '₦2,800' },
      { name: 'Veggie Fried Rice', price: '₦2,800' },
      { name: 'Rice & Beans', price: '₦1,200' },
      { name: 'Beans Stew', price: '₦1,000' },
      { name: 'Ofada Rice', price: '₦1,000' },
      { name: 'White Rice', price: '₦900' },
      { name: 'Jollof Macaroni', price: '₦2,800' },
      { name: 'Moi Moi', price: '₦1,000' },
      { name: 'Amala', price: '₦300' },
      { name: 'Assorted Meats', price: '₦300' }
    ]
  },
  boiled: {
    title: 'BOILED & SAUCES',
    items: [
      { name: 'Boiled Yam & Sauce', price: '₦3,500' },
      { name: 'Boiled Plantain & Sauce', price: '₦3,500' },
      { name: 'Egg Sauce', price: '₦1,000' },
      { name: 'Fish Sauce', price: '₦1,000' },
      { name: 'Ofada Sauce', price: '₦2,000' },
      { name: 'Salad', price: '₦500' }
    ]
  },
  soups: {
    title: 'SOUPS',
    items: [
      { name: 'Egusi (Ugu or Bitterleaf)', price: '₦1,000' },
      { name: 'Afang', price: '₦1,000' },
      { name: 'Oha', price: '₦1,000' },
      { name: 'Ogbono', price: '₦1,000' },
      { name: 'Efo Riro', price: '₦1,000' },
      { name: 'Edikai Kong', price: '₦1,000' }
    ]
  },
  sides: {
    title: 'SIDES & SWALLOWS',
    items: [
      { name: 'Fried Plantain', price: '₦500' },
      { name: 'Yamarita', price: '₦1,500' },
      { name: 'Yam Porridge', price: '₦900' },
      { name: 'Semovita', price: '₦400' },
      { name: 'Eba', price: '₦400' }
    ]
  },
  pastries: {
    title: 'PASTRIES & SNACKS',
    items: [
      { name: 'Egg Roll', price: '₦800' },
      { name: 'Hotdog', price: '₦800' },
      { name: 'Jam Doughnut', price: '₦800' },
      { name: 'Special Doughnut', price: '₦1,000' },
      { name: 'Meat Pie', price: '₦1,000' },
      { name: 'Chicken Pie', price: '₦1,000' }
    ]
  },
  fastfood: {
    title: 'FAST FOOD',
    items: [
      { name: 'Sandwich', price: '₦1,500' },
      { name: 'Pizza (Small)', price: '₦8,000' },
      { name: 'Pizza (Medium)', price: '₦10,000' },
      { name: 'Pizza (Large)', price: '₦12,000' },
      { name: 'Shawarma (1 Sauce)', price: '₦3,000' },
      { name: 'Shawarma (2 Sauces)', price: '₦4,000' },
      { name: 'Bread', price: '₦1,400' },
      { name: 'Chicken & Chips', price: '₦7,700' },
      { name: 'Popcorn', price: '₦1,500' },
      { name: 'Ice Cream (Small)', price: '₦800' },
      { name: 'Ice Cream (Large)', price: '₦1,500' }
    ]
  },
  drinks: {
    title: 'DRINKS & BEVERAGES',
    items: [
      { name: 'Coca-Cola', price: '₦600' },
      { name: 'Pepsi', price: '₦600' },
      { name: 'Sprite', price: '₦600' },
      { name: 'Fanta', price: '₦600' },
      { name: 'Eva Water (Small)', price: '₦400' },
      { name: 'Eva Water (Large)', price: '₦500' },
      { name: 'Chivita', price: '₦2,000' },
      { name: 'Chivita Exotic', price: '₦2,000' },
      { name: 'Hollandia Yogurt', price: '₦2,000' },
      { name: 'Ferrous', price: '₦850' },
      { name: 'Mortar Guinness', price: '₦900' },
      { name: 'Suzubu', price: '₦1,000' },
      { name: 'Coffee', price: '₦700' }
    ]
  },
  combos: {
    title: 'COMBO MEALS',
    items: [
      { name: 'Naija Classic Combo', price: '₦2,800', desc: 'Jollof Rice, Fried Plantain, Beef, Bottle Water' },
      { name: 'Village Vibes', price: '₦3,800', desc: 'Village Rice, Cow Leg, Moi Moi, Pepsi' },
      { name: 'Corporate Lunch Box', price: '₦4,200', desc: 'Fried Rice, Chicken, Salad, Eva Water' },
      { name: 'Sunday Special Pack', price: '₦6,000', desc: 'White Rice & Ofada Sauce, Fried Plantain, Turkey, Hollandia Yogurt' },
      { name: 'Street Delight', price: '₦4,500', desc: 'Stir Fry Spaghetti, Crispy Chicken, Egg Roll, Sprite' },
      { name: 'FitFam Feast', price: '₦4,000', desc: 'Veggie Fried Rice, Titus Fish, Salad, Water' },
      { name: 'Pounded Power Pack', price: '₦2,500', desc: 'Amala or Eba, Egusi with Assorted Meat, Water' },
      { name: 'Sweet Tooth Combo', price: '₦3,000', desc: 'Meat Pie, Jam Doughnut, Ice Cream, Fanta' },
      { name: 'Swallow King Combo', price: '₦5,500', desc: 'Semovita, Edikai Kong, Goat Meat, Mortar Guinness' },
      { name: 'Big Baller Special', price: '₦8,500', desc: 'Asọ Rice, Chicken & Chips, Snail, Chivita Exotic' }
    ]
  }
};

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
  if(item.image) return item.image;

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

    const media = document.createElement('div');
    media.className = 'media';
    const img = document.createElement('img');
    img.src = getImageUrl(item);
    img.alt = item.name;
    media.appendChild(img);

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

    card.appendChild(media);
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
      <img src="${getImageUrl(item)}" alt="${item.name}" style="width:100%;height:200px;object-fit:cover;border-radius:12px" />
      <div style="display:flex;justify-content:space-between;align-items:center"><strong>${item.price}</strong></div>
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
document.addEventListener('DOMContentLoaded', () => {
  renderCategories(document.getElementById('categories'));
  setupCategoryInteractions();
  setupModal();
});
