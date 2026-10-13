
const wardrobe = {
  hair: [
    { name: "Tóc dài", emoji: "💇", color: "#553329", style: "long" },
    { name: "Tóc vàng", emoji: "👱", color: "#f5c76e", style: "blonde" },
    { name: "Tóc hồng", emoji: "🎀", color: "#f18ac5", style: "pink" },
    { name: "Tóc tím", emoji: "💜", color: "#9665c8", style: "purple" },
    { name: "Tóc xanh", emoji: "🩵", color: "#66bccc", style: "blue" },
    { name: "Tóc đỏ", emoji: "❤️", color: "#bd5148", style: "red" }
  ],
  top: [
    { name: "Áo hồng", emoji: "👚", color: "#ff8fb1" },
    { name: "Áo xanh", emoji: "👕", color: "#74c7e8" },
    { name: "Áo tím", emoji: "👚", color: "#b99aff" },
    { name: "Áo vàng", emoji: "🌼", color: "#ffd36e" },
    { name: "Áo đỏ", emoji: "❤️", color: "#f16d86" },
    { name: "Áo trắng", emoji: "🤍", color: "#ffffff" }
  ],
  bottom: [
    { name: "Váy tím", emoji: "👗", color: "#b99aff" },
    { name: "Váy hồng", emoji: "💗", color: "#ff8fb1" },
    { name: "Váy xanh", emoji: "🩵", color: "#74c7e8" },
    { name: "Váy vàng", emoji: "🌟", color: "#ffd36e" },
    { name: "Váy đỏ", emoji: "❤️", color: "#ef637d" },
    { name: "Váy đen", emoji: "🖤", color: "#514456" }
  ],
  shoes: [
    { name: "Giày hồng", emoji: "👠", color: "#ff6098" },
    { name: "Giày tím", emoji: "👡", color: "#a77be8" },
    { name: "Giày trắng", emoji: "👟", color: "#ffffff" },
    { name: "Giày đỏ", emoji: "👠", color: "#e84c62" },
    { name: "Giày vàng", emoji: "✨", color: "#f5c75e" },
    { name: "Giày xanh", emoji: "👟", color: "#55b8cf" }
  ]
};

const defaults = {
  hair: 0,
  top: 0,
  bottom: 0,
  shoes: 0
};

let selected = { ...defaults };
let category = "hair";
let score = 0;

const itemsElement = document.getElementById("items");
const colorPicker = document.getElementById("colorPicker");

function renderItems() {
  itemsElement.innerHTML = "";

  wardrobe[category].forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "item";

    if (selected[category] === index) {
      button.classList.add("selected");
    }

    button.innerHTML = `
      <span class="emoji">${item.emoji}</span>
      <span class="item-name">${item.name}</span>
    `;

    button.addEventListener("click", () => {
      selected[category] = index;
      applyOutfit();
      renderItems();
      score += 10;
      document.getElementById("score").textContent = score;
    });

    itemsElement.appendChild(button);
  });

  colorPicker.value = wardrobe[category][selected[category]].color;
}

function applyOutfit() {
  const hair = wardrobe.hair[selected.hair];
  const top = wardrobe.top[selected.top];
  const bottom = wardrobe.bottom[selected.bottom];
  const shoes = wardrobe.shoes[selected.shoes];

  document.getElementById("hair").style.backgroundColor = hair.color;
  document.getElementById("hair-back").style.backgroundColor = hair.color;
  document.getElementById("top-clothes").style.backgroundColor = top.color;
  document.getElementById("bottom-clothes").style.backgroundColor =
    bottom.color;

  document.querySelectorAll(".shoe").forEach(shoe => {
    shoe.style.backgroundColor = shoes.color;
  });

  // Tóc dài hơn khi chọn kiểu tóc dài
  const hairBack = document.getElementById("hair-back");
  hairBack.style.height = hair.style === "long" ? "145px" : "112px";

  document.getElementById("character").style.animation =
    "none";
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    category = tab.dataset.category;

    document.querySelectorAll(".tab").forEach(button => {
      button.classList.toggle("active", button === tab);
    });

    renderItems();
  });
});

colorPicker.addEventListener("input", event => {
  const item = wardrobe[category][selected[category]];
  item.color = event.target.value;
  applyOutfit();
  renderItems();
});

document.getElementById("randomBtn").addEventListener("click", () => {
  Object.keys(wardrobe).forEach(key => {
    selected[key] = Math.floor(Math.random() * wardrobe[key].length);
  });

  category = "top";

  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.category === category);
  });

  applyOutfit();
  renderItems();

  score += 50;
  document.getElementById("score").textContent = score;
});

document.getElementById("resetBtn").addEventListener("click", () => {
  selected = { ...defaults };
  category = "hair";
  score = 0;

  document.getElementById("score").textContent = score;

  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.category === category);
  });

  applyOutfit();
  renderItems();
});

applyOutfit();
renderItems();
