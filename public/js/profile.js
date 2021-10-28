const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#email-name').value.trim();
    const emailInput = document.querySelector('#email-input').value.trim();
  
    if (name && emailInput) {
      const response = await fetch(`/api/emails`, {
        method: 'POST',
        body: JSON.stringify({ name, emailInput }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create email');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/emails/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete email');
      }
    }
  };
  
  document
    .querySelector('.new-email-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.email-list')
    .addEventListener('click', delButtonHandler);