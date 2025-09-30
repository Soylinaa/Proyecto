// ===== ESPERAR A QUE EL DOM ESTÉ LISTO =====
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("demo-form");

    // ===== FUNCIÓN PARA MOSTRAR ERRORES =====
    function showError(input, message) {
        let errorSpan = input.parentElement.querySelector(".error-message");

        if (!errorSpan) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message");
            input.parentElement.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
        input.classList.add("is-invalid");
    }

    // ===== FUNCIÓN PARA LIMPIAR ERRORES =====
    function clearError(input) {
        const errorSpan = input.parentElement.querySelector(".error-message");
        if (errorSpan) {
            errorSpan.textContent = "";
        }
        input.classList.remove("is-invalid");
    }

    // ===== VALIDACIÓN GENERAL =====
    function validateForm() {
        let isValid = true;

        const nombre = form.querySelector("#id_nombre_completo");
        const email = form.querySelector("#id_email");
        const password = form.querySelector("#id_password");
        const confirmPassword = form.querySelector("#id_confirm_password");
        const fechaNacimiento = form.querySelector("#id_fecha_nacimiento");
        const celular = form.querySelector("#id_celular");
        const aceptaTerminos = form.querySelector("#id_acepta_terminos");

        // Validar nombre
        if (nombre && nombre.value.trim() === "") {
            showError(nombre, "El nombre es obligatorio");
            isValid = false;
        } else {
            clearError(nombre);
        }

        // Validar email
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            showError(email, "Ingresa un correo válido");
            isValid = false;
        } else {
            clearError(email);
        }

        // Validar contraseña
        if (password && password.value.length < 6) {
            showError(password, "La contraseña debe tener al menos 6 caracteres");
            isValid = false;
        } else {
            clearError(password);
        }

        // Confirmación de contraseña
        if (confirmPassword && confirmPassword.value !== password.value) {
            showError(confirmPassword, "Las contraseñas no coinciden");
            isValid = false;
        } else {
            clearError(confirmPassword);
        }

        // Validar fecha
        if (fechaNacimiento && fechaNacimiento.value === "") {
            showError(fechaNacimiento, "La fecha de nacimiento es obligatoria");
            isValid = false;
        } else {
            clearError(fechaNacimiento);
        }

        // Validar celular
        if (celular && !/^\d{10}$/.test(celular.value)) {
            showError(celular, "El celular debe tener 10 dígitos");
            isValid = false;
        } else {
            clearError(celular);
        }

        // Validar términos
        if (aceptaTerminos && !aceptaTerminos.checked) {
            showError(aceptaTerminos, "Debes aceptar los términos");
            isValid = false;
        } else {
            clearError(aceptaTerminos);
        }

        return isValid;
    }

    // ===== EVENTO SUBMIT =====
    form.addEventListener("submit", function (e) {
        if (!validateForm()) {
            e.preventDefault(); // Detener el envío si hay errores
        }
    });
});