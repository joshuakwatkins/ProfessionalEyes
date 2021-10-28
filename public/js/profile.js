const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#draft-name').value.trim();
    const draftInput = document.querySelector('#draft-input').value.trim();
  
    if (name && draftInput) {
      const response = await fetch(`/api/drafts`, {
        method: 'POST',
        body: JSON.stringify({ name, draftInput }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create draft');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/drafts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete draft');
      }
    }
  };
  
  document
    .querySelector('.new-draft-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.draft-list')
    .addEventListener('click', delButtonHandler);