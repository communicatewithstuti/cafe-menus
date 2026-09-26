/* Cart for the static QR menus. This file is the same for every restaurant.
   Keep it plain ASCII (write symbols as \u escapes or HTML entities) so it reads correctly under any encoding.

   What the menu page provides:
   - window.MENU_CONFIG: restaurantId, restaurantName, currency, serviceChargePercent,
     serviceChargeNote, orderingEnabled, orderWebhookUrl (cartExpiryHours is optional, default 12)
   - window.MENU_CATALOGUE: every orderable item by id, either { name, price } or
     { name, variants: [{ label, price }] }. Add available: false to mark an item sold out.
   - data-item-id="<id>" on each rendered item, and a "menu:rendered" event on document
     after every redraw, so the add buttons can be put back.

   With orderingEnabled false this file does nothing and the menu stays view-only. */
(() => {
  const config = window.MENU_CONFIG || {};
  const catalogue = window.MENU_CATALOGUE || {};
  if (!config.orderingEnabled) return;

  const STORE_KEY = `cart:${config.restaurantId || location.pathname}`;
  const EXPIRY_MS = (config.cartExpiryHours || 12) * 3600 * 1000;
  const MAX_QTY = 99;

  let lines = []; // [{ id, variant, qty }] in the order they were added; variant is "" for single-price items
  let notes = "";
  let sending = false;

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const money = n => (config.currency || "\u20B9") + n.toLocaleString("en-IN");
  const plural = n => `${n} item${n === 1 ? "" : "s"}`;
  const who = (id, variant) => catalogue[id].name + (variant ? ` (${variant.toLowerCase()})` : "");

  // Price comes from the live menu, never from storage, so a price change can't leave an old price in a saved cart
  function priceOf(id, variant) {
    const it = catalogue[id];
    if (!it || it.available === false) return null;
    if (it.variants) {
      const v = it.variants.find(v => v.label === variant);
      return v ? v.price : null;
    }
    return variant ? null : it.price;
  }
  const findLine = (id, variant) => lines.find(l => l.id === id && l.variant === variant);
  const qtyOf = (id, variant) => (findLine(id, variant) || { qty: 0 }).qty;
  const count = () => lines.reduce((n, l) => n + l.qty, 0);

  function totals() {
    const subtotal = lines.reduce((sum, l) => sum + priceOf(l.id, l.variant) * l.qty, 0);
    const serviceCharge = Math.round(subtotal * (Number(config.serviceChargePercent) || 0) / 100);
    return { subtotal, serviceCharge, total: subtotal + serviceCharge };
  }

  /* Storage: every read and write is guarded, so the cart still works in private mode or with storage blocked */
  function load() {
    lines = [];
    notes = "";
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (!saved || !(Date.now() - saved.savedAt < EXPIRY_MS)) return;
      lines = (saved.lines || [])
        .map(l => ({ id: String(l.id), variant: l.variant || "", qty: Math.min(MAX_QTY, Math.floor(l.qty) || 0) }))
        .filter(l => l.qty > 0 && priceOf(l.id, l.variant) != null);
      notes = typeof saved.notes === "string" ? saved.notes : "";
    } catch (_) {}
  }
  function save() {
    try {
      if (!lines.length && !notes) localStorage.removeItem(STORE_KEY);
      else localStorage.setItem(STORE_KEY, JSON.stringify({ savedAt: Date.now(), lines, notes }));
    } catch (_) {}
  }

  function setQty(id, variant, qty) {
    if (priceOf(id, variant) == null) return 0;
    qty = Math.max(0, Math.min(MAX_QTY, qty));
    const line = findLine(id, variant);
    if (!qty) lines = lines.filter(l => l !== line);
    else if (line) line.qty = qty;
    else lines.push({ id, variant, qty });
    save();
    announce(qty ? `${who(id, variant)}: ${qty} in your order` : `${who(id, variant)} removed from your order`);
    return qty;
  }

  /* Markup */
  const dataAttrs = (id, variant) => `data-id="${esc(id)}" data-variant="${esc(variant)}"`;

  function stepperHTML(id, variant, qty) {
    const name = esc(who(id, variant));
    return `<span class="cart-step" role="group" aria-label="${name}">`
      + `<button type="button" data-act="dec" ${dataAttrs(id, variant)} aria-label="One less ${name}">&minus;</button>`
      + `<span class="cart-qty">${qty}<span class="cart-sr"> in your order</span></span>`
      + `<button type="button" data-act="inc" ${dataAttrs(id, variant)} aria-label="One more ${name}">+</button>`
      + `</span>`;
  }

  function controlHTML(id) {
    const it = catalogue[id];
    if (it.available === false) return `<span class="cart-soldout">Sold out</span>`;
    const options = it.variants || [{ label: "", price: it.price }];
    return options.map(({ label }) => {
      const qty = qtyOf(id, label);
      const inner = qty
        ? (label ? `<span class="cart-vlabel" aria-hidden="true">${esc(label)}</span>` : "") + stepperHTML(id, label, qty)
        : `<button type="button" class="cart-add" data-act="inc" ${dataAttrs(id, label)} aria-label="Add ${esc(who(id, label))} to your order"><span aria-hidden="true">+</span> ${esc(label || "Add")}</button>`;
      return `<span class="cart-opt">${inner}</span>`;
    }).join("");
  }

  function lineHTML(l) {
    const unit = priceOf(l.id, l.variant);
    return `<li class="cart-line">`
      + `<div class="cart-line-name">${esc(catalogue[l.id].name)}`
      + (l.variant ? `<span class="cart-line-var">${esc(l.variant)}</span>` : "")
      + `<span class="cart-line-unit">${money(unit)} each</span></div>`
      + `<div class="cart-line-total">${money(unit * l.qty)}</div>`
      + `<div class="cart-line-ctl">${stepperHTML(l.id, l.variant, l.qty)}`
      + `<button type="button" class="cart-remove" data-act="remove" ${dataAttrs(l.id, l.variant)} aria-label="Remove ${esc(who(l.id, l.variant))} from your order">Remove</button></div>`
      + `</li>`;
  }

  /* Page furniture: live region, floating bar, order sheet */
  function make(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return document.body.appendChild(t.content.firstChild);
  }

  const live = make(`<div class="cart-sr" aria-live="polite"></div>`);
  function announce(msg) {
    // Clearing first makes screen readers repeat a message that happens to match the last one
    live.textContent = "";
    setTimeout(() => { live.textContent = msg; }, 50);
  }

  const bar = make(`<div class="cart-bar" hidden><button type="button" class="cart-bar-btn" aria-haspopup="dialog">`
    + `<span class="cart-bar-sum"></span><span class="cart-bar-go">View order</span></button></div>`);

  const sheet = make(`<dialog class="cart-sheet" aria-labelledby="cart-title">
    <div class="cart-sheet-in">
      <div class="cart-head">
        <h2 id="cart-title" tabindex="-1">Your order</h2>
        <button type="button" class="cart-close" data-close aria-label="Close your order">&#x2715;</button>
      </div>
      <div class="cart-body">
        <div class="cart-review">
          <ul class="cart-lines" aria-label="Items in your order"></ul>
          <div class="cart-empty" hidden>
            <p>Your order is empty.</p>
            <button type="button" class="cart-add" data-close>Back to the menu</button>
          </div>
          <div class="cart-extras">
            <label class="cart-notes-label" for="cart-notes">Notes for the kitchen <span>optional</span></label>
            <textarea id="cart-notes" rows="2" maxlength="300" placeholder="For example: less spicy, no onion"></textarea>
            <dl class="cart-totals"></dl>
            <p class="cart-fine">Taxes apply. Your final bill comes from the restaurant.</p>
          </div>
        </div>
        <div class="cart-sent" hidden>
          <p class="cart-sent-title" tabindex="-1">Order sent!</p>
          <p>Your server will confirm shortly.</p>
          <button type="button" class="cart-add" data-close>Back to the menu</button>
        </div>
      </div>
      <div class="cart-foot">
        <p class="cart-error" role="alert" hidden></p>
        <button type="button" class="cart-place">Place order</button>
      </div>
    </div>
  </dialog>`);

  const q = s => sheet.querySelector(s);
  const list = q(".cart-lines"), notesBox = q("#cart-notes"), placeBtn = q(".cart-place"), errorBox = q(".cart-error");

  /* Drawing */
  function decorate() {
    document.querySelectorAll("[data-item-id]").forEach(el => {
      const id = el.dataset.itemId;
      if (!catalogue[id]) return;
      let box = el.querySelector(":scope > .cart-ctl");
      if (!box) {
        box = document.createElement("div");
        box.className = "cart-ctl" + (catalogue[id].variants ? " cart-multi" : "");
        el.append(box);
      }
      box.innerHTML = controlHTML(id);
    });
  }

  function drawBar() {
    const n = count();
    bar.hidden = !n;
    document.body.classList.toggle("cart-has-items", n > 0);
    bar.querySelector(".cart-bar-sum").textContent = `${plural(n)} \u00B7 ${money(totals().subtotal)}`;
  }

  function drawSheet() {
    const t = totals(), pct = Number(config.serviceChargePercent) || 0;
    list.innerHTML = lines.map(lineHTML).join("");
    q(".cart-empty").hidden = lines.length > 0;
    q(".cart-extras").hidden = !lines.length;
    q(".cart-totals").innerHTML =
      `<div><dt>Subtotal</dt><dd>${money(t.subtotal)}</dd></div>`
      + (pct ? `<div><dt>Service charge (${pct}%)${config.serviceChargeNote ? `<small>${esc(config.serviceChargeNote)}</small>` : ""}</dt><dd>${money(t.serviceCharge)}</dd></div>` : "")
      + `<div class="cart-grand"><dt>Estimated total</dt><dd>${money(t.total)}</dd></div>`;
    placeBtn.disabled = sending || !lines.length;
  }

  function drawAll() {
    decorate();
    drawBar();
    if (sheet.open) drawSheet();
  }

  /* Order: the order object is built in one place, so extra fields (table number, daily code) slot in here later */
  function buildOrder() {
    return {
      restaurant: config.restaurantId,
      items: lines.map(l => {
        const unitPrice = priceOf(l.id, l.variant);
        return { id: l.id, name: catalogue[l.id].name, variant: l.variant || null, qty: l.qty, unitPrice, lineTotal: unitPrice * l.qty };
      }),
      notes: notes.trim(),
      ...totals(),
      createdAt: new Date().toISOString()
    };
  }

  // The only place an order leaves the page. With no webhook set it just logs, so the flow can be tested end to end.
  async function submitOrder(order) {
    if (!config.orderWebhookUrl) {
      console.log("[cart] No orderWebhookUrl set, so this order was not sent anywhere:", order);
      return;
    }
    const res = await fetch(config.orderWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
      signal: AbortSignal.timeout ? AbortSignal.timeout(15000) : undefined
    });
    if (!res.ok) throw new Error(`Order webhook answered ${res.status}`);
  }

  async function placeOrder() {
    if (sending || !lines.length) return;
    sending = true;
    placeBtn.disabled = true;
    placeBtn.textContent = "Sending\u2026";
    errorBox.hidden = true;
    try {
      await submitOrder(buildOrder());
      lines = [];
      notes = "";
      notesBox.value = "";
      save();
      showView("sent");
      drawAll();
    } catch (err) {
      console.error("[cart]", err);
      errorBox.textContent = "We couldn't send your order. Please check your connection and try again, or ask your server. Your order is still here.";
      errorBox.hidden = false;
    } finally {
      sending = false;
      placeBtn.textContent = "Place order";
      placeBtn.disabled = !lines.length;
    }
  }

  function showView(view) {
    q(".cart-review").hidden = view !== "review";
    q(".cart-sent").hidden = view !== "sent";
    q(".cart-foot").hidden = view !== "review";
    if (view === "sent") q(".cart-sent-title").focus();
  }

  function openSheet() {
    showView("review");
    errorBox.hidden = true;
    notesBox.value = notes;
    drawSheet();
    sheet.showModal();
    document.documentElement.classList.add("cart-open");
    q("#cart-title").focus();
  }

  /* Events */
  // After a redraw the pressed button is gone, so move focus to its replacement (or the nearest sensible control)
  function refocus(scope, id, variant, act) {
    const btns = [...scope.querySelectorAll("button[data-act]")].filter(b => b.dataset.id === id && b.dataset.variant === variant);
    const target = btns.find(b => b.dataset.act === act) || btns.find(b => b.dataset.act === "inc") || btns[0];
    if (target) target.focus({ preventScroll: true });
    return !!target;
  }

  document.addEventListener("click", e => {
    const b = e.target.closest("button[data-act]");
    if (!b || !b.closest(".cart-ctl, .cart-sheet")) return;
    const { id, variant = "", act } = b.dataset;
    const inSheet = !!b.closest(".cart-sheet");
    const index = inSheet ? [...list.children].indexOf(b.closest(".cart-line")) : -1;
    const now = qtyOf(id, variant);
    setQty(id, variant, act === "inc" ? now + 1 : act === "dec" ? now - 1 : 0);
    drawAll();
    if (inSheet) {
      if (!refocus(list, id, variant, act)) {
        const rows = list.querySelectorAll(".cart-line");
        const row = rows[Math.min(index, rows.length - 1)];
        (row ? row.querySelector("button") : q(".cart-empty button")).focus();
      }
    } else {
      refocus(document, id, variant, act);
    }
  });

  bar.querySelector("button").addEventListener("click", openSheet);
  placeBtn.addEventListener("click", placeOrder);
  notesBox.addEventListener("input", () => { notes = notesBox.value; save(); });
  sheet.addEventListener("click", e => {
    // A tap on the backdrop (the dialog itself, outside its content) or any data-close button closes the sheet
    if (e.target === sheet || e.target.closest("[data-close]")) sheet.close();
  });
  sheet.addEventListener("close", () => {
    document.documentElement.classList.remove("cart-open");
    if (!bar.hidden) bar.querySelector("button").focus({ preventScroll: true });
  });
  document.addEventListener("menu:rendered", decorate);
  // Another tab on the same phone changed the cart
  window.addEventListener("storage", e => { if (e.key === STORE_KEY) { load(); drawAll(); } });

  document.body.classList.add("cart-on");
  load();
  drawAll();
})();
