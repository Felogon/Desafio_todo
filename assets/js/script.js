// Buscamos los elementos interactivos
const total = document.querySelector('#total');
const tareaInput = document.querySelector('#tarea');
const listaTareas = document.querySelector('#lista-tareas');

// Definimos nuestro arreglo de tareas
let tareas = [];

const agregarTarea = (event) => {
  event.preventDefault();
  console.log(':: > agregarTarea > tareaInput.value', tareaInput.value);
  const value = tareaInput.value;
  const nuevaTarea = {
    id: Date.now(),
    titulo: value,
    completado: false,
  };

  // tareas.push(nuevaTarea);
  tareas = [...tareas, nuevaTarea];
  renderTareas();
};

const renderTareas = () => {
  listaTareas.innerHTML = '';
  tareas.forEach((tarea) => {
    renderTareaHtml(tarea);
  });
};

const renderTareaHtml = (tarea) => {
  // Generamos el elemento fila
  const tareaHtml = document.createElement('li');
  // Generamos la columna de botón de acción
  const tareaAccionHtml = document.createElement('span');

  // Si la tarea está completada, la marcamos como check
  if (tarea.completado) {
    tareaHtml.classList.add('checked');
  }

  // Seteamos el ID a la fila y el texto
  tareaHtml.id = tarea.id;
  tareaHtml.innerText = `${tarea.id} - ${tarea.titulo}`;

  // Generamos botón borrar
  const botonBorrar = document.createElement('button')
  botonBorrar.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  botonBorrar.setAttribute('onclick', `eliminarTarea(${tarea.id});`);

  // Agregamos botón a columna de acción
  tareaAccionHtml.appendChild(botonBorrar);

  // Agregamos la acción de completar en click
  tareaHtml.setAttribute('onclick', `completarTarea(${tarea.id});`);

  // Agregamos los elementos a la fila
  tareaHtml.appendChild(tareaAccionHtml);

  // Agregamos la fila a la tabla
  listaTareas.appendChild(tareaHtml);
};

const eliminarTarea = (id) => {
  // Filtramos las tareas distintas a la que queremos eliminar
  const tareasNuevas = tareas.filter((tarea) => tarea.id !== id);
  tareas = [...tareasNuevas];
  renderTareas();
};

const completarTarea = (id) => {
  const tareasNuevas = tareas.map((tarea) => {
    if (tarea.id === id) {
      return {
        id: tarea.id,
        titulo: tarea.titulo,
        completado: !tarea.completado,
      };
    } else {
      return tarea;
    }
  });
  tareas = [...tareasNuevas];
  renderTareas();
};
