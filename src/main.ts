import './index.css';

interface Tile {
  id: number;
  name: string;
  category: string;
  size: string;
  finish: string;
  image_url: string;
  description: string;
}

const allTiles: Tile[] = [
  { id: 1, name: "Blue Marble Glossy", category: "Wall", size: "300x450mm", finish: "Glossy", image_url: "https://picsum.photos/seed/blue-marble-tile/600/600", description: "Premium blue and white marble pattern glossy wall tiles." },
  { id: 2, name: "Design 31096 Set", category: "Wall", size: "300x450mm", finish: "Glossy", image_url: "https://picsum.photos/seed/marble-set-tile/600/600", description: "Elegant 3-piece wall tile set (31096 L, HL-1, D) with marble texture." },
  { id: 3, name: "Design 113 (E)", category: "Marble", size: "600x1200mm", finish: "Glossy", image_url: "https://picsum.photos/seed/large-marble-tile/600/600", description: "Large format premium glossy marble finish tiles (Design 113 E)." },
  { id: 4, name: "Pearl-11211 Heavy Duty", category: "Parking", size: "400x400mm", finish: "Punch", image_url: "https://picsum.photos/seed/pearl-11211/600/600", description: "Heavy-duty parking tiles with circular punch design, 11mm thickness." },
  { id: 5, name: "Grey Grid Punch", category: "Parking", size: "500x500mm", finish: "Punch", image_url: "https://picsum.photos/seed/grey-grid-tile/600/600", description: "Industrial grey punch finish parking tiles with grid pattern." },
  { id: 6, name: "Grey Stone Waves", category: "Parking", size: "500x500mm", finish: "Punch", image_url: "https://picsum.photos/seed/stone-waves-tile/600/600", description: "Natural grey and tan stone wave texture parking tiles." },
  { id: 7, name: "Brown Textured Stone", category: "Parking", size: "500x500mm", finish: "Punch", image_url: "https://picsum.photos/seed/brown-stone-tile/600/600", description: "Durable brown textured stone finish parking tiles." }
];
let filteredTiles: Tile[] = [];
let selectedCategory = 'All';
let searchQuery = '';

// DOM Elements
const tilesGrid = document.getElementById('tiles-grid')!;
const categoryFilters = document.getElementById('category-filters')!;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const tileModal = document.getElementById('tile-modal')!;
const calcWidth = document.getElementById('calc-width') as HTMLInputElement;
const calcLength = document.getElementById('calc-length') as HTMLInputElement;
const calcResult = document.getElementById('calc-result')!;
const calculateBtn = document.getElementById('calculate-btn')!;
const inquiryForm = document.getElementById('inquiry-form') as HTMLFormElement;

// Initialize
async function init() {
  renderCategories();
  filterAndRenderTiles();
}

function renderCategories() {
  const categories = ['All', ...new Set(allTiles.map(t => t.category))];
  categoryFilters.innerHTML = categories.map(cat => `
    <button
      class="category-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
        selectedCategory === cat 
        ? 'bg-[#8b7e6a] text-white' 
        : 'bg-white border border-[#e5e1da] text-[#8b7e6a] hover:border-[#8b7e6a]'
      }"
      data-category="${cat}"
    >
      ${cat}
    </button>
  `).join('');

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      selectedCategory = (e.currentTarget as HTMLElement).dataset.category!;
      renderCategories();
      filterAndRenderTiles();
    });
  });
}

function filterAndRenderTiles() {
  filteredTiles = allTiles.filter(tile => {
    const matchesSearch = tile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tile.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tile.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  tilesGrid.innerHTML = filteredTiles.map(tile => `
    <div class="group cursor-pointer tile-card" data-id="${tile.id}">
      <div class="relative aspect-square overflow-hidden rounded-2xl bg-[#f5f2ed] mb-4">
        <img src="${tile.image_url}" alt="${tile.name}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" referrerPolicy="no-referrer" />
        <div class="absolute top-4 right-4">
          <span class="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            ${tile.category}
          </span>
        </div>
      </div>
      <h3 class="text-lg font-serif italic mb-1">${tile.name}</h3>
      <p class="text-sm text-[#8b7e6a]">${tile.size} • ${tile.finish}</p>
    </div>
  `).join('');

  document.querySelectorAll('.tile-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt((card as HTMLElement).dataset.id!);
      const tile = allTiles.find(t => t.id === id);
      if (tile) openModal(tile);
    });
  });
}

function openModal(tile: Tile) {
  const modalImg = document.getElementById('modal-img') as HTMLImageElement;
  const modalCat = document.getElementById('modal-cat')!;
  const modalTitle = document.getElementById('modal-title')!;
  const modalSize = document.getElementById('modal-size')!;
  const modalFinish = document.getElementById('modal-finish')!;
  const modalDesc = document.getElementById('modal-desc')!;
  const modalWhatsapp = document.getElementById('modal-whatsapp')!;

  modalImg.src = tile.image_url;
  modalCat.textContent = `${tile.category} Collection`;
  modalTitle.textContent = tile.name;
  modalSize.textContent = tile.size;
  modalFinish.textContent = tile.finish;
  modalDesc.textContent = tile.description;

  modalWhatsapp.onclick = () => {
    const whatsappMsg = `*Inquiry for ${tile.name}* (${tile.size})%0A%0AI would like to know more about this design.`;
    window.open(`https://wa.me/917016753977?text=${whatsappMsg}`, '_blank');
  };

  tileModal.classList.remove('hidden');
  tileModal.classList.add('flex');
}

// Event Listeners
const openCatalogBtn = document.getElementById('open-catalog-btn');
const heroCatalogBtn = document.getElementById('hero-catalog-btn');
const catalogSection = document.getElementById('catalog');

const scrollToCatalog = () => {
  catalogSection?.scrollIntoView({ behavior: 'smooth' });
};

openCatalogBtn?.addEventListener('click', scrollToCatalog);
heroCatalogBtn?.addEventListener('click', scrollToCatalog);

searchInput.addEventListener('input', (e) => {
  searchQuery = (e.target as HTMLInputElement).value;
  filterAndRenderTiles();
});

document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    tileModal.classList.add('hidden');
    tileModal.classList.remove('flex');
  });
});

calculateBtn.addEventListener('click', () => {
  const width = parseFloat(calcWidth.value);
  const length = parseFloat(calcLength.value);
  if (width > 0 && length > 0) {
    const area = width * length;
    const tilesNeeded = Math.ceil(area / 0.36); // Default 60x60cm
    const withWastage = Math.ceil(tilesNeeded * 1.1);
    calcResult.textContent = withWastage.toString();
  }
});

inquiryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(inquiryForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const whatsappMsg = `*New Inquiry from Brandix Ceramic Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}`;
  window.open(`https://wa.me/917016753977?text=${whatsappMsg}`, '_blank');
});

init();
