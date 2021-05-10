const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Muestra el mensaje de input error y enlaza con css para verificar el input
function mostrarError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Muestra el exito y enlaza con el css para verificar el input

function mostrarExito(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Comprueba la validez del email
function compruebaMail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    mostrarExito(input);
  } else {
    mostrarError(input, 'Email no valido');
  }
}
// Obtiene el nombre del campo
function obtenerNombreCampo(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Chequea campos requeridos

function compruebaRequerido(inputArr) {
  let isRequired = false;
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      mostrarError(input, `${obtenerNombreCampo(input)} requerido`);
      isRequired = true;
    } else {
      mostrarExito(input);
    }
  });
  return isRequired;
}

// Chequea la longitud del input

function compruebaLongitud(input, min, max) {
  if (input.value.length < min) {
    mostrarError(
      input,
      `El ${obtenerNombreCampo(input)} debe tener como mínimo ${min} carácteres`,
    );
  } else if (input.value.length > max) {
    mostrarError(
      input,
      `El ${obtenerNombreCampo(input)} debe tener como máximo ${max} carácteres`,
    );
  } else {
    mostrarExito(input);
  }
}

// Cmprueba si los passwords hacen match
function compruebaPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    mostrarError(input2, 'Los passwords no coinciden');
  }
}

// Event listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!compruebaRequerido([username, email, password, password2])) {
    compruebaLongitud(username, 3, 15);
    compruebaLongitud(password, 6, 25);
    compruebaMail(email);
    compruebaPasswordsMatch(password, password2);
  }
});
