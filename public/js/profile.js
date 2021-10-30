const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#emailName").value.trim();
  const emailInput = document.querySelector("#emailInput").value.trim();

  if (name && emailInput) {
    const response = await fetch(`/api/emails`, {
      method: "POST",
      body: JSON.stringify({ name, emailInput }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // document.location.replace("/");
    } else {
      alert("Failed to create email");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/emails/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete email");
    }
  }
};

document
  .querySelector("#cleanse-btn")
  .addEventListener("click", newFormHandler);

// document
//   .querySelector(".email-list")
//   .addEventListener("click", delButtonHandler);
