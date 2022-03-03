// Регистрация fetch post на '/registration'
document.registration
  ?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
      action: url,
      method,
      name: { value: name },
      email: { value: email },
      password: { value: password },
      confirmPassword: { value: confirmPassword },
    } = event.target;
    const response = await fetch(url, {
      method,
      body: JSON.stringify({
        name, email, password, confirmPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const userRegistration = await response.json();
    if (!userRegistration.success) {
      document.querySelector('.messageError').innerHTML = userRegistration.errors;
    } else {
      window.location.href = userRegistration.url;
    }
  });
