const form = document.getElementById("formClima");
const resultado = document.getElementById("resultado");

const apiKey = "fc12fd5e38e3901d8f4d3a71db5ab330"; 

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const ciudad = document.getElementById("ciudad").value;

  if (!ciudad) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Ciudad no encontrada");
    const data = await res.json();

    mostrarClima(data);
  } catch (error) {
    resultado.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
  }
});

function mostrarClima(data) {
  const { name, main, weather } = data;
  resultado.innerHTML = `
    <div class="card p-4 shadow">
      <h2>${name}</h2>
      <h3>${main.temp}°C</h3>
      <p>${weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="icono clima">
    </div>
  `;
}