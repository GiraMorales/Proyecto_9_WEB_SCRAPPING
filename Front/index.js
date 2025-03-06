const button = document.querySelector('button');
const getPeliculas = async () => {
  try {
    const input = document.querySelector('.buscar');
    const generoSelect = document.querySelector('.genero-select');
    const nombrePelicula = input.value.trim();
    const genero = generoSelect.value;

    console.log('🔍 Buscando:', input.value);
    console.log('🎬 Género seleccionado:', genero);

    let url = `http://localhost:3000/api/v1/peliculas`;
    if (genero) {
      url += `/${genero}`;
    } else if (nombrePelicula) {
      url += `/${nombrePelicula}`;
    }

    console.log('🌐 URL de la solicitud:', url);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error en la petición: ${res.status}`);

    const peliculas = await res.json();
    console.log('📥 Películas recibidas:', peliculas);

    pintarPeliculas(peliculas);
  } catch (error) {
    console.error('❌ Error al obtener las películas:', error);
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
    <div class="pelicula">
      <h3>${pelicula.title || 'Título no disponible'}</h3>
      <img src="${pelicula.portada}" alt="${pelicula.title}">
      <p><strong>Género:</strong> ${
        pelicula.generos ? pelicula.generos.join(', ') : 'No disponible'
      }</p>
      <p>${pelicula.sipnosis || 'Descripción no disponible'}</p>
    </div>
    `;
  }
};

button.addEventListener('click', getPeliculas);
