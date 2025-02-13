const getPeliculas = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/peliculas'); // Asegúrate que la URL sea la correcta
    const peliculas = await res.json();

    const container = document.getElementById('peliculas-container');
    container.innerHTML = ''; // Limpiar antes de mostrar nuevas películas

    peliculas.forEach((pelicula) => {
      const div = document.createElement('div');
      div.classList.add('pelicula');

      div.innerHTML = `
        <img src="${pelicula.Portada}" alt="${pelicula.Titulo}">
        <h3>${pelicula.Titulo}</h3>
        <p><strong>Género:</strong> ${pelicula.Genero.join(', ')}</p>
        <p>${pelicula.Sinopsis}</p>
      `;

      container.appendChild(div);
    });
  } catch (error) {
    console.error('Error al obtener películas:', error);
  }
};

// Asociar la función al botón
document.getElementById('buscar').addEventListener('click', getPeliculas);

// const getPeliculas = async () => {
//   const input = document.querySelector('button');
//   console.log(button.value);
//   const res = await fetch('http://localhost:3000/api/v1/peliculas');
//   const peliculas = await res.json();
//   console.log(peliculas);
// };
// button.addEventListener('click', getPeliculas);
