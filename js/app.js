const formulario = document.getElementById('formulario');
const templateEstudiante = document.getElementById('templateEstudiante').content;
const templateProfesor = document.getElementById('templateProfesor').content;
const pintarEstudiantes = document.getElementById('pintarEstudiantes');
const pintarProfesores = document.getElementById('pintarProfesores');
const fragment = document.createDocumentFragment();
const alert = document.getElementById('alert');

const estudiantes = [];
const profesores = [];

formulario.addEventListener('submit', (e) => {
	alert.classList.add('d-none');

	e.preventDefault();
	const valoresDelFormulario = new FormData(formulario);
	const [nombre, apellido, edad, opcion] = [...valoresDelFormulario.values()];

	if (!nombre.trim() || !apellido.trim() || !edad.trim() || !opcion.trim()) {
		alert.classList.remove('d-none');
	}

	if (opcion === 'Estudiante') {
		const estudiante = new Estudiante(nombre, apellido, edad);
		estudiantes.push(estudiante);
		Persona.obtenerPersona(opcion, estudiantes);
	} else if (opcion === 'Profesor') {
		const profesor = new Profesor(nombre, apellido, edad);
		profesores.push(profesor);
		Persona.obtenerPersona(opcion, profesores);
	}
});

class Persona {
	constructor(nombre, apellido, edad) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.edad = edad;
		this.uid = `${Date.now()}`;
	}
	static obtenerPersona(tipo, personas) {
		if (tipo === 'Estudiante') {
			pintarEstudiantes.textContent = '';

			personas.forEach((item) => {
				fragment.appendChild(item.pintarEstudiantes());
			});
			pintarEstudiantes.appendChild(fragment);
		} else if (tipo === 'Profesor') {
			pintarProfesores.textContent = '';

			personas.forEach((item) => {
				fragment.appendChild(item.pintarProfesores());
			});
			pintarProfesores.appendChild(fragment);
		}
	}
}

class Estudiante extends Persona {
	#estudiante = 'Estudiante';
	#estado = false;
	pintarEstudiantes() {
		const cloneEstudiante = templateEstudiante.cloneNode(true);
		cloneEstudiante.querySelector('h5 span').textContent = this.nombre;
		cloneEstudiante.querySelector('.templateSpanP1').textContent = this.nombre;
		cloneEstudiante.querySelector('.templateSpanP2').textContent = this.apellido;
		cloneEstudiante.querySelector('.templateEdad').textContent = this.edad;
		cloneEstudiante.querySelector('.templateUid').textContent = this.uid;
		return cloneEstudiante;
	}
}

class Profesor extends Persona {
	#profesor = 'Profesor';
	pintarProfesores() {
		const cloneProfesor = templateProfesor.cloneNode(true);
		cloneProfesor.querySelector('h5 span').textContent = this.nombre;
		cloneProfesor.querySelector('cite').textContent = this.#profesor;
		cloneProfesor.querySelector('.templateProfesorSpan1').textContent = this.nombre;
		cloneProfesor.querySelector('.templateProfesorSpan2').textContent = this.apellido;
		cloneProfesor.querySelector('.templateProfesorUid').textContent = this.uid;
		cloneProfesor.querySelector('.templateProfesorEdad').textContent = this.edad;
		return cloneProfesor;
	}
}
