const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Muestra el mensaje de input error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Muestra éxito
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email no valido');
  }
}
// Obtiene el nombre del campo
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Chequea campos requeridos

function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} requerido`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });
  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `El ${getFieldName(input)} debe tener como mínimo ${min} carácteres`,
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `El ${getFieldName(input)} debe tener como máximo ${max} carácteres`,
    );
  } else {
    showSuccess(input);
  }
}

// COmprueba si los passwords hacen match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Los passwords no coinciden');
  }
}

// Event listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!checkRequired([username, email, password, password2])) {
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
  }
});
