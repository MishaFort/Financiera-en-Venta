document.addEventListener('DOMContentLoaded', () => {
  const validator = new JustValidate('#contact-section-form', {
    errorFieldCssClass: 'input__control--error',
    successFieldCssClass: 'input__control--success',
    errorLabelCssClass: 'just-validate-error-label',
    focusInvalidField: true,
  });

  validator
    .addField('#user-name-contact', [
      { rule: 'required', errorMessage: '&#8613 Se requiere el nombre' },
      {
        rule: 'customRegexp',
        value:
          /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,30}([ -][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,30})*$/u,
        errorMessage: '&#8613 Introduce un nombre válido',
      },
    ])
    .addField('#user-email-contact', [
      { rule: 'required', errorMessage: '&#8613 Correo requerido' },
      { rule: 'email', errorMessage: '&#8613 Correo inválido' },
    ])
    .addField('#user-message-contact', [
      {
        rule: 'minLength',
        value: 10,
        errorMessage: '&#8613 Mensaje demasiado corto',
      },
      {
        rule: 'maxLength',
        value: 1000,
        errorMessage: '&#8613 Mensaje excesivamente largo',
      },
    ]);

  const autofillHackWhileFocused = selector => {
    const el = document.querySelector(selector);
    if (!el) return;

    let intervalId = null;

    const startWatching = () => {
      if (intervalId) return;
      intervalId = setInterval(() => {
        if (document.activeElement === el && el.value.trim().length > 1) {
          const original = el.value;
          el.value = original + ' ';
          el.value = original;
          el.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, 500);
    };

    const stopWatching = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    el.addEventListener('focus', startWatching);
    el.addEventListener('click', startWatching);
    el.addEventListener('blur', stopWatching);
  };

  ['#user-name-contact', '#user-email-contact'].forEach(
    autofillHackWhileFocused
  );

  validator.onSuccess(event => {
    event.preventDefault();
    const formElement = document.querySelector('#contact-section-form');
    const formData = new FormData(formElement);
    document.getElementById('preloader').style.display = 'block';
    // Make the AJAX request
    fetch('send_email.php', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text()) // Get the response as text
      .then(() => {
        formElement.reset();
        document.getElementById('preloader').style.display = 'none';
        document.getElementById('contact-section-form').style.display = 'none';
        document.getElementById('thank-you-message').style.display = 'block';
      })
      .catch(error => {
        console.error('Error:', error);
        alert(
          'Se produjo un error al enviar su mensaje. Por favor, inténtelo nuevamente.'
        );
        document.getElementById('preloader').style.display = 'none';
      });
  });
});
