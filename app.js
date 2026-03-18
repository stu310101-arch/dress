// 換裝遊戲前端（純 HTML/CSS/JS）
// - 只支援正面（front）
// - 純靜態版：素材清單內建於 app.js（不使用 config.js）

(() => {
  const ACCESSORY_CATEGORY = "配件";
  const MULTI_SELECT_CATEGORIES = new Set([ACCESSORY_CATEGORY]);

  // 內建素材清單（請把對應 PNG 放在 public/ 下的路徑）
  // - customTransform: 可選，用來覆寫 styles.css 內針對該分類的預設對齊
  const WARDROBE_DATA = {
    baseModel: {
      front: "./模特兒/model.png",
    },
    items: [
      {
        id: "衣服",
        name: "衣服",
        category: "上衣",
        front: "./裝扮/上衣/上衣1.png",
      },
      {
        id: "衣服2",
        name: "衣服2",
        category: "上衣",
        front: "./裝扮/上衣/上衣2.png",
      },
      {
        id: "衣服5",
        name: "衣服5",
        category: "上衣",
        front: "./裝扮/上衣/上衣5.png",
        customTransform: "scale(0.82) translate(11px, 105px)",
      },
      {
        id: "衣服6",
        name: "衣服6",
        category: "上衣",
        front: "./裝扮/上衣/上衣6.png",
        customTransform: "scale(0.82) translate(11px, 112px)",
      },
      {
        id: "衣服7",
        name: "衣服7",
        category: "上衣",
        front: "./裝扮/上衣/上衣7.png",
        customTransform: "scale(0.82) translate(11px, 112px)",
      },
      {
        id: "衣服4",
        name: "衣服4",
        category: "上衣",
        front: "./裝扮/上衣/上衣4.png",
        customTransform: "scale(0.97) translate(0px, 48px)",
      },
      {
        id: "褲子1",
        name: "褲子",
        category: "下身裝扮",
        front: "./裝扮/下身裝扮/褲子1.png",
      },
      {
        id: "鞋子",
        name: "鞋子",
        category: "鞋子",
        front: "./裝扮/鞋子/鞋子1.png",
      },
      {
        id: "鞋子4",
        name: "鞋子4",
        category: "鞋子",
        front: "./裝扮/鞋子/鞋子4.png",
        customTransform: "scale(0.85) translate(9px, 46.5px)",
      },
      {
        id: "鞋子5",
        name: "鞋子5",
        category: "鞋子",
        front: "./裝扮/鞋子/鞋子5.png",
        customTransform: "scale(0.85) translate(9px, 46.5px)",
      },
      {
        id: "鞋子6",
        name: "鞋子6",
        category: "鞋子",
        front: "./裝扮/鞋子/鞋子6.png",
        customTransform: "scale(0.85) translate(9px, 46.5px)",
      },
      {
        id: "襪子",
        name: "襪子",
        category: "襪子",
        front: "./裝扮/襪子/襪子1.png",
      },
      {
        id: "上衣3",
        name: "上衣3",
        category: "上衣",
        front: "./裝扮/上衣/上衣3.png",
        customTransform: "scale(0.85) translate(7px, 79px)",
      },
      {
        id: "裙子1",
        name: "裙子1",
        category: "下身裝扮",
        front: "./裝扮/下身裝扮/裙子1.png",
        customTransform: "scale(0.85) translate(10px, 110px)",
      },
      {
        id: "頭飾1",
        name: "頭飾1",
        category: ACCESSORY_CATEGORY,
        front: "./裝扮/配件/頭飾1.png",
        customTransform: "scale(0.85) translate(10px, 0px)",
      },
      {
        id: "配件1",
        name: "配件1",
        category: ACCESSORY_CATEGORY,
        front: "./裝扮/配件/配件1.png",
        customTransform: "scale(2) translate(0px, -180px)",

      },
      {
        id: "配件2",
        name: "配件2",
        category: ACCESSORY_CATEGORY,
        front: "./裝扮/配件/配件2.png",
        customTransform: "scale(0.8) translate(-80px, 40px)",
      },
      {
        id: "鞋子2",
        name: "鞋子2",
        category: "鞋子",
        front: "./裝扮/鞋子/鞋子2.png",
        customTransform: "scale(0.97) translate(7px, 20px)",
      },
      {
        id: "鞋子3",
        name: "鞋子3",
        category: "鞋子",
        front: "./裝扮/鞋子/鞋子3.png",
      },
      {
        id: "裙子2",
        name: "裙子2",
        category: "下身裝扮",
        front: "./裝扮/下身裝扮/裙子2.png",
      },
      {
        id: "裙子3",
        name: "裙子3",
        category: "下身裝扮",
        front: "./裝扮/下身裝扮/裙子3.png",
      },
      {
        id: "褲子2",
        name: "褲子2",
        category: "下身裝扮",
        front: "./裝扮/下身裝扮/褲子2.png",
      },
      {
        id: "褲子5",
        name: "褲子5",
        category: "下身裝扮",
        front: "./裝扮/下身裝扮/褲子5.png",
        customTransform: "scale(0.85) translate(10px, 100px)",
      },
      {
        id: "褲子6",
        name: "褲子6",
        category: "下身裝扮",
        front: "./裝扮/下身裝扮/褲子6.png",
        customTransform: "scale(0.85) translate(10px, 100px)",
      },
      {
        id: "褲子7",
        name: "褲子7",
        category: "下身裝扮",
        front: "./裝扮/下身裝扮/褲子7.png",
        customTransform: "scale(0.85) translate(10px, 100px)",
      },
      {
        id: "褲子3",
        name: "褲子3",
        category: "下身裝扮",
        front: "./裝扮/下身裝扮/褲子3.png",
      },
      {
        id: "褲子4",
        name: "褲子4",
        category: "下身裝扮",
        front: "./裝扮/下身裝扮/褲子4.png",
        customTransform: "scale(0.97) translate(0px, 48px)",
      },
      {
        id: "襪子2",
        name: "襪子2",
        category: "襪子",
        front: "./裝扮/襪子/襪子2.png",
        customTransform: "scale(0.97) translate(9px, 14px)",
      },
    ],
  };

  const CATEGORIES = [ACCESSORY_CATEGORY, "上衣", "下身裝扮", "鞋子", "襪子"];
  const SINGLE_SELECT_CATEGORIES = CATEGORIES.filter((cat) => !MULTI_SELECT_CATEGORIES.has(cat));

  // 圖層：衣服 > 褲子 > 襪子，鞋子 > 襪子
  const CATEGORY_Z_INDEX = {
    襪子: 10,
    下身裝扮: 20,
    鞋子: 15,
    上衣: 40,
    [ACCESSORY_CATEGORY]: 50,
  };

  const state = {
    wardrobe: {
      baseModel: { front: "" },
      items: [],
    },

    // category -> itemId | null（僅單選分類）
    equippedSingle: new Map(),

    // Set<itemId>（僅配件）
    equippedAccessories: new Set(),

    // itemId -> item
    itemsById: new Map(),

    // category -> button element
    categoryButtons: new Map(),

    activeCategory: CATEGORIES[0],
    lastBaseFrontSrc: "",
  };

  function setStatus(text) {
    const el = document.getElementById("status");
    if (!el) return;
    el.textContent = text || "";
  }

  function ensureKnownCategory(category) {
    return CATEGORIES.includes(category) ? category : null;
  }

  function normalizeItem(raw, idx) {
    const obj = raw && typeof raw === "object" ? raw : {};

    const category = ensureKnownCategory(String(obj.category || "").trim());
    if (!category) return null;

    const front =
      obj.front ||
      obj.frontImage ||
      (obj.images && (obj.images.front || obj.images.Front)) ||
      "";

    const name = String(obj.name || obj.title || obj.label || "物件").trim();

    return {
      id: String(obj.id || `${category}__${name || "item"}_${idx}`),
      name: name || "物件",
      category,
      images: { front },
      customTransform: obj.customTransform || null,
    };
  }

  function normalizeWardrobe(raw) {
    const obj = raw && typeof raw === "object" ? raw : {};
    const base = obj.baseModel || obj.base || obj.model || {};

    const items = Array.isArray(obj.items)
      ? obj.items
      : Array.isArray(obj.wardrobe)
        ? obj.wardrobe
        : [];

    return {
      baseModel: {
        front: base.front || base.frontImage || base.frontSrc || "",
      },
      items: items.map((it, idx) => normalizeItem(it, idx)).filter(Boolean),
    };
  }

  function initEquipped() {
    state.equippedSingle = new Map();
    SINGLE_SELECT_CATEGORIES.forEach((cat) => state.equippedSingle.set(cat, null));

    state.equippedAccessories = new Set();
  }

  function rebuildIndex() {
    state.itemsById = new Map();
    state.wardrobe.items.forEach((item) => {
      state.itemsById.set(item.id, item);
    });
  }

  function applyBaseImage(src) {
    const viewEl = document.querySelector('#modelStage .model-view[data-view="front"]');
    if (!viewEl) return;

    const frameEl = viewEl.querySelector(".model-frame");
    if (!frameEl) return;

    const img = frameEl.querySelector(".model-base");
    const placeholder = frameEl.querySelector('.model-placeholder[data-kind="base"]');

    if (!img || !placeholder) return;

    img.onerror = null;

    if (!src) {
      img.removeAttribute("src");
      img.style.display = "none";
      placeholder.style.display = "grid";
      const text = placeholder.querySelector(".model-placeholder__text");
      if (text) text.textContent = "尚未放入人物底圖（正面）";
      state.lastBaseFrontSrc = "";
      return;
    }

    if (state.lastBaseFrontSrc === src && img.getAttribute("src") && img.style.display !== "none") {
      return;
    }

    img.style.display = "block";
    placeholder.style.display = "none";

    img.onerror = () => {
      img.style.display = "none";
      placeholder.style.display = "grid";
      const text = placeholder.querySelector(".model-placeholder__text");
      if (text) text.textContent = "人物底圖讀取失敗（正面）";
    };

    img.src = src;
    state.lastBaseFrontSrc = src;
  }

  function getOverlayImgSelector(category, itemId = null) {
    const escapeValue = (value) => {
      if (window.CSS && typeof window.CSS.escape === "function") {
        return window.CSS.escape(String(value));
      }

      return String(value);
    };

    const categorySelector = `img[data-category="${escapeValue(category)}"]`;
    if (!itemId) return categorySelector;

    return `${categorySelector}[data-item-id="${escapeValue(itemId)}"]`;
  }

  function updateModelOverlays() {
    const viewEl = document.querySelector('#modelStage .model-view[data-view="front"]');
    if (!viewEl) return;

    const overlays = viewEl.querySelector(".model-overlays");
    if (!overlays) return;

    // 單選分類：每分類最多一張疊圖
    SINGLE_SELECT_CATEGORIES.forEach((cat) => {
      const existing = overlays.querySelector(getOverlayImgSelector(cat));
      const itemId = state.equippedSingle.get(cat);

      if (!itemId) {
        if (existing) existing.remove();
        return;
      }

      const item = state.itemsById.get(itemId);
      const src = item && item.images && item.images.front;

      if (!src) {
        if (existing) existing.remove();
        return;
      }

      const img = existing || document.createElement("img");
      if (!existing) {
        img.alt = "";
        img.dataset.category = cat;
        img.addEventListener("error", () => img.remove());
        overlays.appendChild(img);
      }

      if (img.getAttribute("src") !== src) {
        img.src = src;
      }

      img.style.zIndex = String(CATEGORY_Z_INDEX[cat] ?? 0);
      img.style.transform = item.customTransform || "";
    });

    // 配件（多選）：同分類多張疊圖
    const equippedAccessories = Array.from(state.equippedAccessories)
      .map((itemId) => state.itemsById.get(itemId))
      .filter(Boolean)
      .filter((item) => item.category === ACCESSORY_CATEGORY)
      .filter((item) => item.images && typeof item.images.front === "string" && item.images.front.trim().length > 0)
      .sort((a, b) => safeLocaleCompare(a.name, b.name));

    const shouldKeep = new Set(equippedAccessories.map((item) => item.id));

    overlays.querySelectorAll(getOverlayImgSelector(ACCESSORY_CATEGORY)).forEach((img) => {
      const itemId = img.dataset.itemId;
      if (!itemId || !shouldKeep.has(itemId)) {
        img.remove();
      }
    });

    const accessoryBaseZ = CATEGORY_Z_INDEX[ACCESSORY_CATEGORY] ?? 0;

    equippedAccessories.forEach((item, idx) => {
      const selector = getOverlayImgSelector(ACCESSORY_CATEGORY, item.id);
      const existing = overlays.querySelector(selector);
      const src = item.images.front;

      const img = existing || document.createElement("img");
      if (!existing) {
        img.alt = "";
        img.dataset.category = ACCESSORY_CATEGORY;
        img.dataset.itemId = item.id;
        img.addEventListener("error", () => img.remove());
        overlays.appendChild(img);
      }

      if (img.getAttribute("src") !== src) {
        img.src = src;
      }

      img.style.zIndex = String(accessoryBaseZ + idx);
      img.style.transform = item.customTransform || "";
    });
  }

  function updateCategoryFiltersActiveState() {
    state.categoryButtons.forEach((btn, cat) => {
      const active = state.activeCategory === cat;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function setActiveCategory(category) {
    state.activeCategory = category;
    updateCategoryFiltersActiveState();
    renderShelf();
  }

  function initCategoryFilters() {
    const root = document.getElementById("categoryFilters");
    if (!root) return;

    root.innerHTML = "";
    state.categoryButtons = new Map();

    CATEGORIES.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "subcategory-button category-filter-button";
      btn.textContent = cat;
      btn.dataset.category = cat;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", "false");

      btn.addEventListener("click", () => setActiveCategory(cat));

      root.appendChild(btn);
      state.categoryButtons.set(cat, btn);
    });
  }

  function createSlotThumb(src, fallbackText = "空") {
    const thumb = document.createElement("div");
    thumb.className = "slot-thumb";

    if (!src) {
      const fallback = document.createElement("div");
      fallback.className = "slot-thumb__fallback";
      fallback.textContent = fallbackText;
      thumb.appendChild(fallback);
      return thumb;
    }

    const img = document.createElement("img");
    img.alt = "";
    img.src = src;
    img.loading = "lazy";
    img.addEventListener("error", () => {
      img.remove();
      const fallback = document.createElement("div");
      fallback.className = "slot-thumb__fallback";
      fallback.textContent = fallbackText;
      thumb.appendChild(fallback);
    });

    thumb.appendChild(img);
    return thumb;
  }

  function safeLocaleCompare(a, b) {
    try {
      return a.localeCompare(b, "zh-Hant");
    } catch {
      return a.localeCompare(b);
    }
  }

  function getCategoryItems(category) {
    return state.wardrobe.items
      .filter((item) => item.category === category)
      .sort((a, b) => safeLocaleCompare(a.name, b.name));
  }

  function renderShelf() {
    const root = document.getElementById("wardrobeItems");
    if (!root) return;

    const category = state.activeCategory;
    const items = getCategoryItems(category);

    const isMultiSelect = MULTI_SELECT_CATEGORIES.has(category);
    const equippedSingleId = state.equippedSingle.get(category);

    root.innerHTML = "";

    const shelf = document.createElement("section");
    shelf.className = "shelf";

    const header = document.createElement("div");
    header.className = "shelf-header";

    const title = document.createElement("div");
    title.className = "shelf-title";

    const titleName = document.createElement("div");
    titleName.className = "shelf-title__name";
    titleName.textContent = category;

    const titleMeta = document.createElement("div");
    titleMeta.className = "shelf-title__meta";
    titleMeta.textContent = `共 ${items.length} 件`;

    title.appendChild(titleName);
    title.appendChild(titleMeta);
    header.appendChild(title);

    const slots = document.createElement("div");
    slots.className = "shelf-slots";

    items.forEach((item) => {
      const selected = isMultiSelect ? state.equippedAccessories.has(item.id) : equippedSingleId === item.id;

      const card = document.createElement("button");
      card.type = "button";
      card.className = "slot-card" + (selected ? " is-selected" : "");
      card.setAttribute("aria-pressed", selected ? "true" : "false");

      card.appendChild(createSlotThumb(item.images.front));

      const name = document.createElement("div");
      name.className = "slot-name";
      name.textContent = item.name;
      card.appendChild(name);

      card.addEventListener("click", () => {
        toggleEquip(item.category, item.id);
      });

      slots.appendChild(card);
    });

    shelf.appendChild(header);
    shelf.appendChild(slots);
    root.appendChild(shelf);
  }

  function toggleEquip(category, itemId) {
    if (MULTI_SELECT_CATEGORIES.has(category)) {
      if (state.equippedAccessories.has(itemId)) {
        state.equippedAccessories.delete(itemId);
      } else {
        state.equippedAccessories.add(itemId);
      }
    } else {
      const current = state.equippedSingle.get(category);
      state.equippedSingle.set(category, current === itemId ? null : itemId);
    }

    renderEquippedChips();

    if (state.activeCategory === category) {
      renderShelf();
    }

    updateModelOverlays();
  }

  function renderEquippedChips() {
    const root = document.getElementById("equippedChips");
    if (!root) return;

    root.innerHTML = "";

    const entries = [];

    SINGLE_SELECT_CATEGORIES.forEach((cat) => {
      const itemId = state.equippedSingle.get(cat);
      if (itemId) {
        entries.push({ cat, itemId });
      }
    });

    const accessoryItems = Array.from(state.equippedAccessories)
      .map((itemId) => state.itemsById.get(itemId))
      .filter(Boolean)
      .filter((item) => item.category === ACCESSORY_CATEGORY)
      .sort((a, b) => safeLocaleCompare(a.name, b.name));

    accessoryItems.forEach((item) => {
      entries.push({ cat: ACCESSORY_CATEGORY, itemId: item.id });
    });

    if (!entries.length) {
      const empty = document.createElement("div");
      empty.className = "equipped-empty";
      empty.textContent = "尚未穿戴";
      root.appendChild(empty);
      return;
    }

    entries.forEach(({ cat, itemId }) => {
      const item = state.itemsById.get(itemId);

      const chip = document.createElement("div");
      chip.className = "equipped-chip";
      chip.tabIndex = 0;
      chip.setAttribute("role", "button");

      const label = document.createElement("span");
      label.className = "equipped-chip__label";
      label.textContent = `${cat}:`;

      const value = document.createElement("span");
      value.className = "equipped-chip__value";
      value.textContent = item ? item.name : itemId;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "equipped-chip__remove";
      remove.setAttribute("aria-label", item ? `移除 ${cat} ${item.name}` : `移除 ${cat}`);
      remove.textContent = "×";

      remove.addEventListener("click", (evt) => {
        evt.stopPropagation();

        if (MULTI_SELECT_CATEGORIES.has(cat)) {
          state.equippedAccessories.delete(itemId);
        } else {
          state.equippedSingle.set(cat, null);
        }

        renderEquippedChips();

        if (state.activeCategory === cat) {
          renderShelf();
        }

        updateModelOverlays();
      });

      const focusCategory = () => setActiveCategory(cat);

      chip.addEventListener("click", focusCategory);
      chip.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter" || evt.key === " ") {
          evt.preventDefault();
          focusCategory();
        }
      });

      chip.appendChild(label);
      chip.appendChild(value);
      chip.appendChild(remove);
      root.appendChild(chip);
    });
  }

  function clearAll() {
    SINGLE_SELECT_CATEGORIES.forEach((cat) => state.equippedSingle.set(cat, null));
    state.equippedAccessories.clear();

    renderEquippedChips();
    renderShelf();
    updateModelOverlays();
  }

  function randomWear() {
    const requiredCategories = new Set(["上衣", "下身裝扮", "鞋子"]);

    const hasFrontImage = (item) => {
      const src = item && item.images && item.images.front;
      return typeof src === "string" && src.trim().length > 0;
    };

    // 單選分類
    SINGLE_SELECT_CATEGORIES.forEach((cat) => {
      const candidates = getCategoryItems(cat).filter(hasFrontImage);

      if (!candidates.length) {
        state.equippedSingle.set(cat, null);
        return;
      }

      if (requiredCategories.has(cat)) {
        const pick = Math.floor(Math.random() * candidates.length);
        state.equippedSingle.set(cat, candidates[pick].id);
        return;
      }

      // 0 = 不穿；1..n = 穿候選之一
      const pick = Math.floor(Math.random() * (candidates.length + 1));
      if (pick === 0) {
        state.equippedSingle.set(cat, null);
        return;
      }

      state.equippedSingle.set(cat, candidates[pick - 1].id);
    });

    // 配件（多選）：抽 0..N 件
    const accessoryCandidates = getCategoryItems(ACCESSORY_CATEGORY).filter(hasFrontImage);
    state.equippedAccessories.clear();

    if (accessoryCandidates.length) {
      const candidates = [...accessoryCandidates];
      for (let i = candidates.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
      }

      const count = Math.floor(Math.random() * (candidates.length + 1));
      for (let i = 0; i < count; i += 1) {
        state.equippedAccessories.add(candidates[i].id);
      }
    }

    renderEquippedChips();
    renderShelf();
    updateModelOverlays();
  }

  function initButtons() {
    const clearAllBtn = document.getElementById("clearAllBtn");
    if (clearAllBtn) clearAllBtn.addEventListener("click", clearAll);

    const randomWearBtn = document.getElementById("randomWearBtn");
    if (randomWearBtn) randomWearBtn.addEventListener("click", randomWear);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initEquipped();

    state.wardrobe = normalizeWardrobe(WARDROBE_DATA);
    setStatus("已載入衣櫃資料");

    state.wardrobe.items = Array.isArray(state.wardrobe.items) ? state.wardrobe.items : [];
    rebuildIndex();

    initButtons();
    initCategoryFilters();
    updateCategoryFiltersActiveState();

    applyBaseImage(state.wardrobe.baseModel.front);

    renderEquippedChips();
    renderShelf();
    updateModelOverlays();
  });
})();
