// Define Constants
const nameValue = document.querySelector("#nameInput");
const authorValue = document.querySelector("#authorInput");
const urlValue = document.querySelector("#urlInput");
const ratingValue = document.querySelector("#ratingInput");
const addButton = document.querySelector("#addButton");
const bookList = document.querySelector("#cardHolder");
//Event Listeners

document.addEventListener("DOMContentLoaded", loadAllBooksToUI);
addButton.addEventListener("click", () => {
  let book = {
    name: nameValue.value.toLowerCase(),
    author: authorValue.value.trim(),
    url: urlValue.value.trim(),
    rating: ratingValue.value,
  };
  addBook(book);
});
bookList.addEventListener("click", (e) => {
  if (
    e.target.classList == "deleteBadge badge badge-danger" ||
    e.target.classList == "fa-solid fa-trash"
  ) {
    deleteFilm(e);
  }
});

// Functions

function control(url) {
  let books = JSON.parse(localStorage.getItem("books"));
  if (books.length > 0) {
    books.forEach((elem) => {
      if (elem.url == url) {
        return false;
      } else {
        return true;
      }
    });
  } else {
    return true;
  }
}

function loadAllBooksToUI() {
  let books = JSON.parse(localStorage.getItem("books"));
  books.forEach((elem) => {
    addBookToUI(elem);
  });
}

function deleteFilm(e) {
  if (e.target.parentElement.parentElement.classList == "col") {
    deleteBookFromStorage(e.target.previousElementSibling.src);
    console.log(e.target.previousElementSibling.src);
    e.target.parentElement.parentElement.remove();
  } else {
    deleteBookFromStorage(e.target.parentElement.previousElementSibling.src);
    e.target.parentElement.parentElement.parentElement.remove(); //i
  }
}
function deleteBookFromStorage(filmurl) {
  let books = JSON.parse(localStorage.getItem("books"));
  books.forEach((elem) => {
    if (elem.url == filmurl) {
      books.splice(books.indexOf(elem), 1);
    }
  });
  localStorage.setItem("books", JSON.stringify(books));
}

function addBook(book) {
  addBookToUI(book);
  addBookToStorage(book);
}

function addBookToStorage(book) {
  let books;
  if (localStorage.getItem("books") == null) {
    localStorage.setItem("books", JSON.stringify([book]));
  } else {
    books = JSON.parse(localStorage.getItem("books"));
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
}

function addBookToUI(book) {
  bookList.innerHTML += `
    
            <div class="col">
                <div class="card ">
                    <img src="${book.url}" class="card-img-top"
                        alt="Book Image"> 
                        <a style="color:white;padding:1rem;background-color:red" href="#"
                        class="deleteBadge badge badge-danger"><i class="fa-solid fa-trash"></i></a>
                    <div class="card-body">
                        <h5 class="text-capitalize bookName card-title">${
                          book.name
                        }</h5>
                        <hr>
                        <p class="text-uppercase card-text"><span class="badge bg-primary px-3 py-2  ">Author</span>${
                          book.author
                        }</p>
                        <hr>
                        <p class="card-text"><span class="badge bg-warning px-3 py-2  ">Rating</span><span>${appendStars(
                          book.rating / 2
                        )}</span></p>
                    </div>
                </div>
            </div>
    `;
}
function appendStars(num) {
  let emptyStar = 0;
  if (Number.isInteger(num)) {
    let result = "";
    emptyStar = 5 - num;
    for (let i = num; i > 0; i--) {
      result += "<i class='fa-solid fa-star'></i>";
    }
    for (let i = 0; i < emptyStar; i++) {
      result += "<i class='fa-regular fa-star'></i>";
    }
    return result;
  } else {
    emptyStar = 5 - num.toFixed(0);
    let result = "";
    for (let i = num.toFixed(0) - 1; i > 0; i--) {
      result += "<i class='fa-solid fa-star'></i>";
    }
    result += `<i class="fa-regular fa-star-half-stroke"></i>`;
    for (let i = 0; i < emptyStar; i++) {
      result += "<i class='fa-regular fa-star'></i>";
    }
    return result;
  }
}
