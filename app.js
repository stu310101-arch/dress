(() => {
  'use strict';

  // v2：對應 index.html + styles.css 的結構（不再動態造整頁 UI）。
  const STORAGE_KEY = 'dressup.state.v2';

  // 依照你的要求：最後只保留 app.js / styles.css / index.html。
  // 因此這裡「不 fetch manifest.json」也「不依賴 assets 圖檔」，改用內嵌 SVG data URL。

  const $ = (id) => document.getElementById(id);

  function setError(ui, message) {
    ui.error.textContent = message || '';
  }

  function safeParseJson(text) {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  function svgDataUrl(svg) {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function makeBaseSvg(view) {
    const title = view === 'back' ? '模特兒（背面）' : '模特兒（正面）';
    const accent = view === 'back' ? '#22d3ee' : '#7c5cff';
    return svgDataUrl(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
  <defs>
    <linearGradient id="bg" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#0b1020"/>
      <stop offset="1" stop-color="#070a14"/>
    </linearGradient>
  </defs>
  <rect width="900" height="1200" fill="url(#bg)"/>
  <circle cx="450" cy="260" r="120" fill="#eaf0ff" opacity="0.18"/>
  <rect x="300" y="380" width="300" height="560" rx="140" fill="#eaf0ff" opacity="0.12"/>
  <text x="50%" y="95" font-size="46" text-anchor="middle" fill="${accent}" font-family="ui-sans-serif, system-ui">${title}</text>
</svg>`);
  }

  function makeItemSvg(label, view, color) {
    const subtitle = view === 'back' ? 'Back' : 'Front';
    return svgDataUrl(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
  <rect width="900" height="1200" fill="none"/>
  <g>
    <rect x="170" y="360" width="560" height="620" rx="90" fill="${color}" opacity="0.20"/>
    <rect x="210" y="420" width="480" height="500" rx="80" fill="${color}" opacity="0.28"/>
    <text x="50%" y="520" font-size="44" text-anchor="middle" fill="#eaf0ff" opacity="0.85" font-family="ui-sans-serif, system-ui">${label}</text>
    <text x="50%" y="585" font-size="28" text-anchor="middle" fill="#eaf0ff" opacity="0.6" font-family="ui-sans-serif, system-ui">${subtitle}</text>
  </g>
</svg>`);
  }

  function makeThumbSvg(label, color) {
    return svgDataUrl(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <rect width="256" height="256" rx="28" fill="${color}" opacity="0.20"/>
  <rect x="22" y="22" width="212" height="212" rx="24" fill="${color}" opacity="0.28"/>
  <text x="50%" y="54%" font-size="22" text-anchor="middle" fill="#eaf0ff" opacity="0.88" font-family="ui-sans-serif, system-ui">${label}</text>
</svg>`);
  }

  const EMBEDDED_MANIFEST_RAW = {
    manifestVersion: 1,
    models: {
      base: {
        id: 'base',
        name: '模特兒',
        front: makeBaseSvg('front'),
        back: makeBaseSvg('back')
      }
    },
    categories: [
      { id: 'accessories', label: '飾品', type: 'accessory' },
      { id: 'top', label: '上身', type: 'single' },
      { id: 'bottom', label: '下身', type: 'single' },
      { id: 'socks', label: '襪子', type: 'single' },
      { id: 'shoes', label: '鞋子', type: 'single' }
    ],
    accessorySlots: [
      { id: 'head', label: '頭飾' },
      { id: 'ear', label: '耳飾' },
      { id: 'neck', label: '項鍊' },
      { id: 'hand', label: '手部' }
    ],
    layers: [
      { id: 'base', label: 'Base', baseZ: 0 },
      { id: 'socks', label: 'Socks', baseZ: 200 },
      { id: 'bottom', label: 'Bottom', baseZ: 300 },
      { id: 'shoes', label: 'Shoes', baseZ: 400 },
      { id: 'top', label: 'Top', baseZ: 500 },
      { id: 'accessory', label: 'Accessory', baseZ: 600 }
    ],
    items: [
      {
        id: 'top_basic_tshirt',
        name: '短袖上衣',
        category: 'top',
        layer: 'top',
        zIndex: 0,
        thumb: makeThumbSvg('上衣', '#7c5cff'),
        images: {
          front: makeItemSvg('短袖上衣', 'front', '#7c5cff'),
          back: makeItemSvg('短袖上衣', 'back', '#7c5cff')
        }
      },
      {
        id: 'bottom_jeans',
        name: '牛仔褲',
        category: 'bottom',
        layer: 'bottom',
        zIndex: 0,
        thumb: makeThumbSvg('牛仔褲', '#60a5fa'),
        images: {
          front: makeItemSvg('牛仔褲', 'front', '#60a5fa'),
          back: makeItemSvg('牛仔褲', 'back', '#60a5fa')
        }
      },
      {
        id: 'socks_white',
        name: '白襪',
        category: 'socks',
        layer: 'socks',
        zIndex: 0,
        thumb: makeThumbSvg('白襪', '#eaf0ff'),
        images: {
          front: makeItemSvg('白襪', 'front', '#eaf0ff'),
          back: makeItemSvg('白襪', 'back', '#eaf0ff')
        }
      },
      {
        id: 'shoes_sneakers',
        name: '球鞋',
        category: 'shoes',
        layer: 'shoes',
        zIndex: 0,
        thumb: makeThumbSvg('球鞋', '#34d399'),
        images: {
          front: makeItemSvg('球鞋', 'front', '#34d399'),
          back: makeItemSvg('球鞋', 'back', '#34d399')
        }
      },
      {
        id: 'acc_head_ribbon',
        name: '蝴蝶結頭飾',
        category: 'accessories',
        slot: 'head',
        layer: 'accessory',
        zIndex: 50,
        thumb: makeThumbSvg('頭飾', '#f472b6'),
        images: {
          front: makeItemSvg('頭飾', 'front', '#f472b6'),
          back: makeItemSvg('頭飾', 'back', '#f472b6')
        }
      },
      {
        id: 'acc_earrings',
        name: '耳環',
        category: 'accessories',
        slot: 'ear',
        layer: 'accessory',
        zIndex: 30,
        thumb: makeThumbSvg('耳環', '#22d3ee'),
        images: {
          front: makeItemSvg('耳環', 'front', '#22d3ee'),
          back: makeItemSvg('耳環', 'back', '#22d3ee')
        }
      },
      {
        id: 'acc_necklace',
        name: '項鍊（示範：只有正面）',
        category: 'accessories',
        slot: 'neck',
        layer: 'accessory',
        zIndex: 10,
        thumb: makeThumbSvg('項鍊', '#fbbf24'),
        images: {
          front: makeItemSvg('項鍊', 'front', '#fbbf24')
        }
      }
    ]
  };

  function normalizeManifest(manifest) {
    if (!manifest || typeof manifest !== 'object') throw new Error('manifest 不是物件');
    if (!manifest.models || !manifest.models.base) throw new Error('manifest.models.base 缺失');
    if (!Array.isArray(manifest.categories)) throw new Error('manifest.categories 必須是 array');
    if (!Array.isArray(manifest.layers)) throw new Error('manifest.layers 必須是 array');
    if (!Array.isArray(manifest.items)) throw new Error('manifest.items 必須是 array');

    const categories = manifest.categories;
    const layers = manifest.layers;
    const slots = Array.isArray(manifest.accessorySlots) ? manifest.accessorySlots : [];

    const categoryById = new Map(categories.map((c) => [c.id, c]));
    const layerById = new Map(layers.map((l) => [l.id, l]));
    const slotById = new Map(slots.map((s) => [s.id, s]));
    const itemById = new Map(manifest.items.map((it) => [it.id, it]));

    return {
      raw: manifest,
      categories,
      layers,
      slots,
      categoryById,
      layerById,
      slotById,
      itemById
    };
  }

  function defaultState(manifest) {
    const selectedByCategory = {};
    for (const cat of manifest.categories) {
      if (cat.type !== 'accessory') selectedByCategory[cat.id] = null;
    }

    const accessoriesBySlot = {};
    for (const s of manifest.slots) accessoriesBySlot[s.id] = null;

    return {
      view: 'front',
      activeCategoryId: manifest.categories[0]?.id || 'accessories',
      activeAccessorySlotId: 'all',
      selectedByCategory,
      accessoriesBySlot
    };
  }

  function loadState(fallback, manifest) {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;

    const parsed = safeParseJson(raw);
    if (!parsed || typeof parsed !== 'object') return fallback;

    const state = {
      ...fallback,
      ...parsed
    };

    if (state.view !== 'front' && state.view !== 'back') state.view = fallback.view;
    if (!manifest.categoryById.has(state.activeCategoryId)) state.activeCategoryId = fallback.activeCategoryId;

    const selectedByCategory = { ...fallback.selectedByCategory };
    if (parsed.selectedByCategory && typeof parsed.selectedByCategory === 'object') {
      for (const [catId, itemId] of Object.entries(parsed.selectedByCategory)) {
        if (!(catId in selectedByCategory)) continue;
        selectedByCategory[catId] = manifest.itemById.has(itemId) ? itemId : null;
      }
    }

    const accessoriesBySlot = { ...fallback.accessoriesBySlot };
    if (parsed.accessoriesBySlot && typeof parsed.accessoriesBySlot === 'object') {
      for (const [slotId, itemId] of Object.entries(parsed.accessoriesBySlot)) {
        if (!(slotId in accessoriesBySlot)) continue;
        accessoriesBySlot[slotId] = manifest.itemById.has(itemId) ? itemId : null;
      }
    }

    state.selectedByCategory = selectedByCategory;
    state.accessoriesBySlot = accessoriesBySlot;

    if (typeof parsed.activeAccessorySlotId !== 'string') {
      state.activeAccessorySlotId = fallback.activeAccessorySlotId;
    } else if (parsed.activeAccessorySlotId !== 'all' && !manifest.slotById.has(parsed.activeAccessorySlotId)) {
      state.activeAccessorySlotId = 'all';
    }

    return state;
  }

  function saveState(state) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function resolveOverlaySrc(item, view) {
    return item?.images?.[view] || null;
  }

  // Optional transform support (kept for compatibility if you later add transforms in the embedded manifest)
  function resolveTransform(item, view) {
    const t = item?.transform?.[view] || item?.transform?.default || null;
    if (!t || typeof t !== 'object') return null;

    const x = Number.isFinite(Number(t.x)) ? Number(t.x) : 0;
    const y = Number.isFinite(Number(t.y)) ? Number(t.y) : 0;
    const scale = Number.isFinite(Number(t.scale)) ? Number(t.scale) : 1;
    const rotate = Number.isFinite(Number(t.rotate)) ? Number(t.rotate) : 0;
    const origin = typeof t.origin === 'string' ? t.origin : 'center center';

    return { x, y, scale, rotate, origin };
  }

  function buildCssTransform(t) {
    if (!t) return '';
    const parts = [];
    if (t.x || t.y) parts.push(`translate(${t.x}%, ${t.y}%)`);
    if (t.scale !== 1) parts.push(`scale(${t.scale})`);
    if (t.rotate) parts.push(`rotate(${t.rotate}deg)`);
    return parts.join(' ');
  }

  function resolveThumbSrc(item, view) {
    return item?.thumb || item?.images?.[view] || item?.images?.front || null;
  }

  function computeOverlayZ(manifest, item) {
    const layerId = item.layer || item.category;
    const layer = layerId ? manifest.layerById.get(layerId) : null;
    const baseZ = layer && typeof layer.baseZ === 'number' ? layer.baseZ : 0;
    const z = typeof item.zIndex === 'number' ? item.zIndex : 0;
    return baseZ + z;
  }

  function getEquippedItemIds(state) {
    const ids = [];
    for (const id of Object.values(state.selectedByCategory)) {
      if (id) ids.push(id);
    }
    for (const id of Object.values(state.accessoriesBySlot)) {
      if (id) ids.push(id);
    }
    return ids;
  }

  function renderViewButtons(ui, state) {
    const isFront = state.view === 'front';
    ui.btnFront.setAttribute('aria-pressed', isFront ? 'true' : 'false');
    ui.btnBack.setAttribute('aria-pressed', isFront ? 'false' : 'true');

    ui.btnFront.classList.toggle('dressup-btn-primary', isFront);
    ui.btnBack.classList.toggle('dressup-btn-primary', !isFront);
  }

  function renderStage(ui, manifest, state) {
    ui.stage.innerHTML = '';

    const base = manifest.raw.models.base;
    const baseSrc = base[state.view] || base.front || null;
    if (baseSrc) {
      const img = document.createElement('img');
      img.className = 'dressup-layer';
      img.alt = base.name || '模特兒';
      img.decoding = 'async';
      img.src = baseSrc;
      img.style.zIndex = '0';
      img.addEventListener('error', () => {
        img.remove();
        setError(ui, '模特兒圖片載入失敗');
      });
      ui.stage.appendChild(img);
    }

    const equipped = getEquippedItemIds(state)
      .map((id) => manifest.itemById.get(id))
      .filter(Boolean)
      .map((item) => ({ item, z: computeOverlayZ(manifest, item) }))
      .sort((a, b) => (a.z - b.z) || String(a.item.id).localeCompare(String(b.item.id)));

    for (const { item, z } of equipped) {
      const src = resolveOverlaySrc(item, state.view);
      if (!src) continue;

      const img = document.createElement('img');
      img.className = 'dressup-layer';
      img.alt = item.name || item.id;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.src = src;
      img.style.zIndex = String(10 + z);

      const t = resolveTransform(item, state.view);
      const cssTransform = buildCssTransform(t);
      if (cssTransform) {
        img.style.transform = cssTransform;
        img.style.transformOrigin = t.origin;
      }

      img.addEventListener('error', () => {
        img.style.display = 'none';
        setError(ui, `圖片載入失敗：${item.name || item.id}`);
      });
      ui.stage.appendChild(img);
    }
  }

  function renderCategoryTabs(ui, manifest, state) {
    ui.tabs.innerHTML = '';

    for (const cat of manifest.categories) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `dressup-tab${state.activeCategoryId === cat.id ? ' is-selected' : ''}`;
      btn.textContent = cat.label || cat.id;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', state.activeCategoryId === cat.id ? 'true' : 'false');
      btn.dataset.categoryId = cat.id;
      ui.tabs.appendChild(btn);
    }
  }

  function renderAccessorySlotTabs(ui, manifest, state) {
    const cat = manifest.categoryById.get(state.activeCategoryId);
    const show = cat && cat.type === 'accessory';

    ui.slotSection.classList.toggle('dressup-hidden', !show);
    if (!show) return;

    ui.slotTabs.innerHTML = '';

    const addBtn = (id, label) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `dressup-tab${state.activeAccessorySlotId === id ? ' is-selected' : ''}`;
      btn.textContent = label;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', state.activeAccessorySlotId === id ? 'true' : 'false');
      btn.dataset.slotId = id;
      ui.slotTabs.appendChild(btn);
    };

    addBtn('all', '全部');
    for (const s of manifest.slots) addBtn(s.id, s.label || s.id);
  }

  function isSelected(state, item) {
    if (item.slot) return state.accessoriesBySlot[item.slot] === item.id;
    return state.selectedByCategory[item.category] === item.id;
  }

  function getVisibleItems(manifest, state) {
    const cat = manifest.categoryById.get(state.activeCategoryId);
    if (!cat) return [];

    if (cat.type === 'accessory') {
      return manifest.raw.items.filter((it) => {
        if (it.category !== cat.id) return false;
        if (!it.slot) return false;
        if (state.activeAccessorySlotId === 'all') return true;
        return it.slot === state.activeAccessorySlotId;
      });
    }

    return manifest.raw.items.filter((it) => it.category === cat.id);
  }

  function renderGrid(ui, manifest, state) {
    ui.grid.innerHTML = '';

    const cat = manifest.categoryById.get(state.activeCategoryId);
    ui.gridTitle.textContent = cat?.label || '物品';

    ui.gridHint.textContent = cat?.type === 'accessory'
      ? '飾品可以多選；同一個 slot（例如頭飾）只能戴一個。'
      : '同一分類互斥（上身/下身/襪子/鞋子）。';

    const items = getVisibleItems(manifest, state);

    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'dressup-subtitle';
      empty.textContent = '這個分類目前沒有物品。';
      ui.grid.appendChild(empty);
      return;
    }

    for (const item of items) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `dressup-item${isSelected(state, item) ? ' is-selected' : ''}`;
      btn.dataset.itemId = item.id;

      const thumbWrap = document.createElement('div');
      thumbWrap.className = 'dressup-item-thumb';

      const img = document.createElement('img');
      img.alt = item.name || item.id;
      img.loading = 'lazy';
      img.decoding = 'async';
      const thumbSrc = resolveThumbSrc(item, state.view);
      if (thumbSrc) img.src = thumbSrc;
      img.addEventListener('error', () => {
        img.removeAttribute('src');
      });

      thumbWrap.appendChild(img);

      const label = document.createElement('div');
      label.className = 'dressup-item-label';
      label.textContent = item.name || item.id;

      btn.appendChild(thumbWrap);
      btn.appendChild(label);
      ui.grid.appendChild(btn);
    }
  }

  function toggleItem(manifest, state, itemId) {
    const item = manifest.itemById.get(itemId);
    if (!item) return;

    if (item.slot) {
      const slotId = item.slot;
      const current = state.accessoriesBySlot[slotId] || null;
      state.accessoriesBySlot[slotId] = current === itemId ? null : itemId;
      return;
    }

    const catId = item.category;
    if (!catId || !(catId in state.selectedByCategory)) return;

    const current = state.selectedByCategory[catId] || null;
    state.selectedByCategory[catId] = current === itemId ? null : itemId;
  }

  function resetState(manifest) {
    return defaultState(manifest);
  }

  async function main() {
    const ui = {
      stage: $('dressup-stage'),
      btnFront: $('dressup-view-front'),
      btnBack: $('dressup-view-back'),
      btnReset: $('dressup-reset'),
      error: $('dressup-error'),
      tabs: $('dressup-tabs'),
      slotSection: $('dressup-slot-section'),
      slotTabs: $('dressup-slot-tabs'),
      gridTitle: $('dressup-grid-title'),
      gridHint: $('dressup-grid-hint'),
      grid: $('dressup-grid')
    };

    for (const [k, v] of Object.entries(ui)) {
      if (!v) throw new Error(`缺少必要的 DOM 節點：${k}`);
    }

    const manifest = normalizeManifest(EMBEDDED_MANIFEST_RAW);
    let state = loadState(defaultState(manifest), manifest);

    function renderAll() {
      setError(ui, '');
      renderViewButtons(ui, state);
      renderCategoryTabs(ui, manifest, state);
      renderAccessorySlotTabs(ui, manifest, state);
      renderGrid(ui, manifest, state);
      renderStage(ui, manifest, state);
      saveState(state);
    }

    ui.btnFront.addEventListener('click', () => {
      state.view = 'front';
      renderAll();
    });

    ui.btnBack.addEventListener('click', () => {
      state.view = 'back';
      renderAll();
    });

    ui.btnReset.addEventListener('click', () => {
      state = resetState(manifest);
      renderAll();
    });

    ui.tabs.addEventListener('click', (e) => {
      const btn = e.target?.closest?.('[data-category-id]');
      const id = btn?.dataset?.categoryId;
      if (!id || !manifest.categoryById.has(id)) return;
      state.activeCategoryId = id;
      if (state.activeAccessorySlotId !== 'all' && !manifest.slotById.has(state.activeAccessorySlotId)) {
        state.activeAccessorySlotId = 'all';
      }
      renderAll();
    });

    ui.slotTabs.addEventListener('click', (e) => {
      const btn = e.target?.closest?.('[data-slot-id]');
      const id = btn?.dataset?.slotId;
      if (!id) return;
      if (id !== 'all' && !manifest.slotById.has(id)) return;
      state.activeAccessorySlotId = id;
      renderAll();
    });

    ui.grid.addEventListener('click', (e) => {
      const btn = e.target?.closest?.('[data-item-id]');
      const id = btn?.dataset?.itemId;
      if (!id) return;
      toggleItem(manifest, state, id);
      renderAll();
    });

    renderAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      main().catch((err) => {
        const el = $('dressup-error');
        if (el) el.textContent = err?.message || String(err);
      });
    });
  } else {
    main().catch((err) => {
      const el = $('dressup-error');
      if (el) el.textContent = err?.message || String(err);
    });
  }
})();
