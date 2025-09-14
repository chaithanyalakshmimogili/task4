
let products = [
  { name: "Smartphone", price: 15000, rating: 4.5, img: "smartphone.png" },
  { name: "Laptop", price: 55000, rating: 4.8, img: "laptop.png"}, 
  { name: "Headphones", price: 2500, rating: 4.2, img: "headphone.png" },
  { name: "Smartwatch", price: 7000, rating: 4.0, img: "smartwatch.png" },
  { name: "Camera", price: 30000, rating: 4.6, img: "camera.png" },
  { name: "Gaming Console", price: 40000, rating: 4.9, img: "gameingconsol.png" },
  { name: "Bluetooth Speaker", price: 4500, rating: 4.3, img: "bluetoothSpeaker.png" },
  { name: "Tablet", price: 20000, rating: 4.4, img: "tablet.png" }
];

function displayProducts(list) {
  const container = document.getElementById("productList");
  if (!container) return;
  container.innerHTML = "";
  list.forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
        <p class="rating">⭐ ${p.rating}</p>
      </div>
    `;
  });
}

function sortProducts() {
  let option = document.getElementById("sortOption").value;
  let sorted = [...products];
  if (option === "price") sorted.sort((a, b) => a.price - b.price);
  if (option === "rating") sorted.sort((a, b) => b.rating - a.rating);
  displayProducts(sorted);
}

function searchProducts() {
  let query = document.getElementById("searchInput").value.toLowerCase();
  let filtered = products.filter(p => p.name.toLowerCase().includes(query));
  displayProducts(filtered);
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let list = document.getElementById("taskList");
  if (!list) return;

  list.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="done-btn" onclick="toggleTask(${index})">✔</button>
        <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function addTask() {
  let input = document.getElementById("taskInput");
  if (!input) return;

  let task = input.value.trim();
  if (task === "") return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  loadTasks();
}

function toggleTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

window.onload = function () {
  if (document.getElementById("productList")) {
    displayProducts(products);
  }
  if (document.getElementById("taskList")) {
    loadTasks();
  }
};