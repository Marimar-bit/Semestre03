// ===============================
// STORAGE
// ===============================










// Transacciones
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Usuarios
let users = JSON.parse(localStorage.getItem("users")) || [];

// ===============================
// AUTH
// ===============================

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Buscar usuario
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  // Guardar usuario actual
  localStorage.setItem("currentUser", user.username);

  document.getElementById("login").classList.add("d-none");
  document.getElementById("register").classList.add("d-none");
  document.getElementById("app").classList.remove("d-none");

  render();
}

// ===============================
// REGISTER
// ===============================

function register() {
  const email = document.getElementById("regEmail").value;
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;

  if (!email || !username || !password) {
    alert("Completa todos los campos");
    return;
  }

  // Verificar si usuario ya existe
  if (users.some(u => u.username === username)) {
    alert("El usuario ya existe");
    return;
  }

  const newUser = {
    email,
    username,
    password
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Usuario registrado correctamente");

  // Limpiar campos
  document.getElementById("regEmail").value = "";
  document.getElementById("regUsername").value = "";
  document.getElementById("regPassword").value = "";

  toggleRegister(false);
}

// ===============================
// UI TOGGLE
// ===============================

function toggleRegister(showRegister) {
  const loginDiv = document.getElementById("login");
  const registerDiv = document.getElementById("register");

  if (showRegister) {
    loginDiv.classList.add("d-none");
    registerDiv.classList.remove("d-none");
  } else {
    registerDiv.classList.add("d-none");
    loginDiv.classList.remove("d-none");
  }
}

// ===============================
// TRANSACTIONS
// ===============================




// Categorías predeterminadas
const categories = {
  ingreso: ["Salario", "Freelance", "Inversiones", "Bonos"],
  gasto: ["Comida", "Transporte", "Renta", "Entretenimiento"]
};

// Función para actualizar categorías
function updateCategories() {
  const type = document.getElementById("type").value;
  const categorySelect = document.getElementById("category");

  if (!categorySelect) return;

  categorySelect.innerHTML = '<option value="">Selecciona categoría</option>';

  categories[type].forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// Esperar que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  const typeSelect = document.getElementById("type");

  if (typeSelect) {
    typeSelect.addEventListener("change", updateCategories);
  }

  updateCategories(); // Inicializar al cargar
});


// Función para actualizar categorías
function updateCategories() {
  const type = document.getElementById("type").value;
  const categorySelect = document.getElementById("category");

  // Limpiar opciones
  categorySelect.innerHTML = '<option value="">Selecciona categoría</option>';

  // Agregar nuevas opciones
  categories[type].forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}



function addTransaction() {
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  if (!amount || !category) {
    alert("Completa los campos");
    return;
  }

  const currentUser = localStorage.getItem("currentUser");

  const transaction = {
    amount,
    type,
    category,
    date: new Date(),
    user: currentUser
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  render();
}

// ===============================
// RENDER
// ===============================

function render() {
  const list = document.getElementById("transactions");
  list.innerHTML = "";

  const currentUser = localStorage.getItem("currentUser");
  // Filtros
  const filterFrom = document.getElementById("filterFrom")?.value;
  const filterTo = document.getElementById("filterTo")?.value;
  const filterCategory = document.getElementById("filterCategory")?.value;

  // Filtrar transacciones solo del usuario actual
  let userTransactions = transactions.filter(
    t => t.user === currentUser
  );

  // Filtro por fecha
  if (filterFrom) {
    userTransactions = userTransactions.filter(t => {
      const tDate = new Date(t.date);
      return tDate >= new Date(filterFrom);
    });
  }
  if (filterTo) {
    userTransactions = userTransactions.filter(t => {
      const tDate = new Date(t.date);
      // Sumar 1 día para incluir el día seleccionado
      const toDate = new Date(filterTo);
      toDate.setDate(toDate.getDate() + 1);
      return tDate < toDate;
    });
  }
  // Filtro por categoría
  if (filterCategory) {
    userTransactions = userTransactions.filter(t => t.category === filterCategory);
  }

  let balance = 0;

  userTransactions.forEach(t => {
    balance += t.type === "ingreso" ? t.amount : -t.amount;
    list.innerHTML += `
      <li class="list-group-item">
        ${t.type} - ${t.category} - $${t.amount} - ${new Date(t.date).toLocaleDateString()}
      </li>
    `;
  });

  document.getElementById("balance").innerText = balance;

  // Poblar select de filtro de categorías
  const filterCategorySelect = document.getElementById("filterCategory");
  if (filterCategorySelect) {
    // Limpiar y agregar opción por defecto
    filterCategorySelect.innerHTML = '<option value="">Todas las categorías</option>';
    // Obtener todas las categorías únicas de las transacciones del usuario
    const uniqueCategories = [...new Set(transactions.filter(t => t.user === currentUser).map(t => t.category))];
    uniqueCategories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      filterCategorySelect.appendChild(option);
    });
    // Mantener selección si ya había
    if (filterCategory) filterCategorySelect.value = filterCategory;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  updateCategories();
});
