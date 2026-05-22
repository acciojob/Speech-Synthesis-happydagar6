const form = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const isbnInput = document.getElementById("isbn");
const bookList = document.getElementById("book-list");

// Listen for form submission, not just a click
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const isbn = isbnInput.value.trim();

  // Basic validation (though HTML 'required' handles most of this)
  if(title === "" || author === "" || isbn === ""){
    return;
  }

  // Create a new row
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${title}</td>
    <td>${author}</td>
    <td>${isbn}</td>
    <td><button class="delete">X</button></td>
  `;

  // Append row to the table body
  bookList.appendChild(row);

  // Clear inputs after submission
  titleInput.value = "";
  authorInput.value = "";
  isbnInput.value = "";
});

// Event delegation for the delete button
bookList.addEventListener("click", (e) => {
  if(e.target.classList.contains("delete")) {
    // closest('tr') ensures the whole row is removed, not just the button's parent td
    e.target.closest('tr').remove(); 
  }
});