// const profileCards = document.querySelector('.row');

// profileUser.addEventListener('click', async (event) => {
//   const updateId = event.target.dataset.update;
//   const deleteId = event.target.dataset.delete;

//   if (openId) {
//     const response = await fetch(`/profile/${openId}`, {
//       method: 'GET',
//     });
//     if (response.ok) {
//       const urlCard = await response.json();
//       window.location.href = urlCard.url;
//     } else {
//       console.log('error');
//     }
//   }

//   if (updateId) {
//     const response = await fetch(`/profile/${deleteId}`, {
//       method: 'PUT',
//     });
//     if (response.ok) {
//       container.insertAdjacentHTML('afterbegin', `<div class="col-3">${card}</div>`)
//     } else {
//       console.log('error');
//     }
//   }

//   if (deleteId) {
//     const response = await fetch(`/profile/${deleteId}`, {
//       method: 'DELETE',
//     });
//     if (response.ok) {
//       const card = event.target.closest('.col-3');
//       card.remove();
//     } else {
//       console.log('error');
//     }
//   }
// });
