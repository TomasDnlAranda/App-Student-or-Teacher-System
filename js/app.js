const formulario = document.getElementById('formulario');
const templateEstudiante = document.getElementById('templateEstudiante').content;
const templateProfesor = document.getElementById('templateProfesor').content;
const pintarEstudiantes = document.getElementById('pintarEstudiantes');
const pintarProfesores = document.getElementById('pintarProfesores');
const fragment = document.createDocumentFragment();
const alert = document.getElementById('alert');

const estudiantes = [];

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
		pintarEstudiantes.textContent = '';

		if (tipo === 'Estudiante') {
			personas.forEach((item) => {
				fragment.appendChild(item.pintarEstudiantes());
			});
			pintarEstudiantes.appendChild(fragment);
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
}
