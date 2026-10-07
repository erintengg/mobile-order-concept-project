/* ---------- Data ---------- */
  const LOCATIONS = {
    EA: { name: "Epicuria at Ackerman", place: "Ackerman Union · A Level", walk: "3 min", pickup: "~8 min", hours: "Open until 8 PM", tags: ["No nuts", "Under 10 min"] },
    LV: { name: "Lu Valle Commons", place: "Lu Valle · North Campus", walk: "6 min", pickup: "~12 min", hours: "Open until 7 PM", tags: ["No nuts"] },
    SH: { name: "The Study at Hedrick", place: "Hedrick Summit · The Hill", walk: "9 min", pickup: "Unavailable", hours: "Opens at 5 PM", tags: ["Vegetarian"] },
  };
  const MEALS = [
    { name: "Turkey caprese sandwich", loc: "Epicuria at Ackerman", time: "8–12 min", price: "$12.50", tag: "High protein", icon: "🥪", filters: ["No nuts"] },
    { name: "Poke bowl", loc: "Lu Valle Commons", time: "12–16 min", price: "$10.75", tag: "Gluten-free option", icon: "🍚", filters: ["No nuts"] },
    { name: "Garden pesto pasta", loc: "The Study at Hedrick", time: "7–10 min", price: "$9.95", tag: "Vegetarian", icon: "🍝", filters: ["Vegetarian", "Under 10 min"] },
  ];

  /* ---------- Navigation ---------- */
  function go(tab) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("on"));
    document.getElementById("screen-" + tab).classList.add("on");
    document.querySelectorAll(".tabbar button").forEach(b => b.classList.toggle("on", b.dataset.tab === tab));
    closeSheet();
  }

  /* ---------- Home search ---------- */
  function homeSearch() {
    const q = document.getElementById("homeQuery").value.trim().toLowerCase();
    const box = document.getElementById("homeSearch");
    const results = document.getElementById("homeResults");
    const feed = document.getElementById("homeFeed");
    box.classList.toggle("focus", q.length > 0);
    if (!q) { results.style.display = "none"; feed.style.display = "block"; return; }
    results.style.display = "block"; feed.style.display = "none";
    const meals = MEALS.filter(m => m.name.toLowerCase().includes(q));
    const locs = Object.entries(LOCATIONS).filter(([k, l]) => l.name.toLowerCase().includes(q));
    let html = "";
    locs.forEach(([k, l]) => html += `<button class="card loc-card" onclick="openLocation('${k}')"><span class="loc-chip">${k}</span><span><h3>${l.name}</h3><p>${l.place}</p></span><span class="eta">${l.walk}</span></button>`);
    meals.forEach(m => html += `<button class="card meal-card" onclick="${m.name.startsWith("Turkey") ? "openSheet('food')" : "toast('" + m.name + " added to order')"}"><span class="meal-img">${m.icon}</span><span><h3>${m.name}</h3><p>${m.loc} · ${m.time}</p></span><span class="price">${m.price}</span></button>`);
    document.getElementById("homeResultsList").innerHTML = html || `<p class="empty">No matches found</p>`;
  }
  function clearHomeSearch() { document.getElementById("homeQuery").value = ""; homeSearch(); }

  /* ---------- Dining search + filters ---------- */
  let filter = "All";
  function setFilter(f) {
    filter = f;
    document.querySelectorAll("#chips .chip").forEach(c => c.classList.toggle("on", c.dataset.f === f));
    diningSearch();
  }
  function diningSearch() {
    const q = document.getElementById("diningQuery").value.trim().toLowerCase();
    document.getElementById("diningSearch").classList.toggle("focus", q.length > 0);
    const locs = Object.entries(LOCATIONS).filter(([k, l]) =>
      l.name.toLowerCase().includes(q) && (filter === "All" || l.tags.includes(filter)));
    const meals = MEALS.filter(m =>
      m.name.toLowerCase().includes(q) && (filter === "All" || m.filters.includes(filter)));
    document.getElementById("diningLocations").innerHTML = locs.map(([k, l]) =>
      `<button class="card loc-card" onclick="openLocation('${k}')"><span class="loc-chip">${k}</span><span><h3>${l.name}</h3><p>${l.place} · ${l.hours}</p></span><span class="eta">${l.walk}<small>${l.pickup} pickup</small></span></button>`
    ).join("") || `<p class="empty">No locations match</p>`;
    document.getElementById("diningMeals").innerHTML = meals.map(m =>
      `<button class="card meal-card" onclick="${m.name.startsWith("Turkey") ? "openSheet('food')" : "toast('" + m.name + " added to order')"}"><span class="meal-img">${m.icon}</span><span><h3>${m.name}</h3><p>${m.loc} · ${m.time}</p><span class="tag">${m.tag}</span></span><span class="price">${m.price}</span></button>`
    ).join("") || `<p class="empty">No meals match</p>`;
  }
  function clearDiningSearch() { document.getElementById("diningQuery").value = ""; diningSearch(); }
  diningSearch();

  /* ---------- Panels ---------- */
  function openSheet(id) {
    document.getElementById("overlay").classList.add("on");
    document.querySelectorAll(".sheet").forEach(s => s.style.display = "none");
    document.getElementById("sheet-" + id).style.display = "block";
  }
  function closeSheet() { document.getElementById("overlay").classList.remove("on"); }
  function openLocation(key) {
    const l = LOCATIONS[key];
    document.getElementById("locChip").textContent = key;
    document.getElementById("locName").textContent = l.name;
    document.getElementById("locPlace").textContent = l.place;
    document.getElementById("locWalk").textContent = l.walk;
    document.getElementById("locPickup").textContent = l.pickup;
    document.getElementById("locHours").textContent = l.hours;
    openSheet("location");
  }

  /* ---------- Cart ---------- */
  let qty = 1;
  function setQty(d) {
    qty = Math.max(1, qty + d);
    const item = 12.50 * qty, total = item + 1.14;
    document.getElementById("qty").textContent = qty;
    document.getElementById("cartItemTotal").textContent = "$" + item.toFixed(2);
    document.getElementById("subtotal").textContent = "$" + item.toFixed(2);
    document.getElementById("total").textContent = "$" + total.toFixed(2);
    document.getElementById("placeBtn").textContent = "Place order · $" + total.toFixed(2);
  }
  function placeOrder() {
    document.getElementById("cartBody").style.display = "none";
    document.getElementById("cartDone").style.display = "block";
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("on"), 2200);
  }

function homeMode(mode) {
  document.getElementById("homeList").style.display = mode ? "none" : "block";
  document.getElementById("homeMap").style.display = mode ? "block" : "none";
  document.getElementById("tList").classList.toggle("on", !mode);
  document.getElementById("tMap").classList.toggle("on", Boolean(mode));
}
