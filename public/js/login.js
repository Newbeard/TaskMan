// Авторизация на  fetch post на '/login'
document.login
  ?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const {
      action: url,
      method,
      email: { value: email },
      password: { value: password },
    } = event.target;

    const response = await fetch(url, {
      method,
      body: JSON.stringify({
        email, password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const userAvtorisait = await response.json();
    console.log(userAvtorisait.success, userAvtorisait.errors);
    if (!userAvtorisait.success) {
      document.querySelector('.messageError').innerHTML = userAvtorisait.errors;
    } else {
      window.location.href = '/';
    }
  });
