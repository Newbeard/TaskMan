// const form = document.forms.addPost;
// const commentForm = document.forms.addComment;
// const container = document.getElementById('container');

// const ERROR_TIME = 2000;

// const createCard = ({
//   title,
//   id,
//   image,
//   description,
// }) => {

// };

// form?.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const {
//     action,
//     method
//   } = event.target;

//   const formData = new FormData(event.target);
//   const data = Object.fromEntries(formData);

//   const response = await fetch(action, {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });

//   const result = await response.json();

//   if (response.ok) {
//     container.insertAdjacentHTML('afterbegin', createCard(result));
//     form.reset();
//   } else {
//     form.insertAdjacentHTML('afterend', `<p style="color: red;" id="errorMessage">${result.errorMessage}
//     Try again</p>`);
//     const errorMessage = document.getElementById('errorMessage');
//     setTimeout(() => {
//       errorMessage.remove();
//     }, ERROR_TIME);
//   }
// });

// const profileboards = document.querySelector('.row');

// // profileboards.addEventListener('click', async (event) => {
// //   const openId = event.target.dataset.open;
// //   const updateId = event.target.dataset.update;
// //   const deleteId = event.target.dataset.delete;

// //   if (openId) {
// //     const response = await fetch(`/post/${openId}`, {
// //       method: 'GET',
// //     });
// //     if (response.ok) {
// //       const urlCard = await response.json();
// //       window.location.href = urlCard.url;
// //     } else {
// //       console.log('error');
// //     }
// //   }

// // if (updateId) {
// //   const response = await fetch(`/post/${deleteId}`, {
// //     method: 'PUT',
// //   });
// //   if (response.ok) {
// //     container.insertAdjacentHTML('afterbegin', `<div class="col-3">${card}</div>`);
// //   } else {
// //     console.log('error');
// //   }
// // }

// if (deleteId) {
//   const response = await fetch(`/post/${deleteId}`, {
//     method: 'DELETE',
//   });
//   if (response.ok) {
//     const card = event.target.closest('.col-3');
//     card.remove();
//   } else {
//     console.log('error');
//   }
// }
// });
