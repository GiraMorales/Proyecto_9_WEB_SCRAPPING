const getPeliculas = async () => {
  // const input = document.querySelector('#buscar');
  // console.log(button.value);
  try {
    const res = await fetch(`http://localhost:3000/api/v1/peliculas`);
    if (!res.ok) throw new Error('Error al obtener las películas');
    const peliculas = await res.json();
    console.log(peliculas);
    pintarPeliculas(peliculas);
  } catch (error) {
    console.error('❌ Error en la petición:', error);
  }
};

const pintarPeliculas = (peliculas) => {
  const divPeliculas = document.querySelector('.peliculas');
  if (!divPeliculas) {
    console.error('⚠️ No se encontró el contenedor de películas en el HTML');
    return;
  }
  // Limpiar antes de agregar nuevas películas
  divPeliculas.innerHTML = '';
  for (const pelicula of peliculas) {
    divPeliculas.innerHTML += `
    <div class= "pelicula">
    <h3>${pelicula.Titulo}</h3>
    <img src="${pelicula.Portada}" alt="${pelicula.Titulo}">
    <p><strong>Género:</strong> ${
      pelicula.Genero ? pelicula.Genero.join(', ') : 'No disponible'
    }</p>
     <p>${pelicula.Sinopsis}</p>
    </div>
    `;
  }
};

document.getElementById('buscar').addEventListener('click', getPeliculas);
