"use strict";

const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector(".close");
const booksContainer = document.querySelector(".books-container");
const addBook = document.querySelector(".add");

const myLibrary = [];

function Book(title, author, pages, isRead) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.isRead = isRead);
}

const fetchBooks = () => {
  const books = document.querySelectorAll(".books-container > div");
  books.forEach((book) => {
    book.remove();
  });

  myLibrary.forEach((book) => {
    const newBook = document.createElement("div");
    const title = document.createElement("h1");
    const author = document.createElement("h3");
    const pages = document.createElement("h4");
    const isRead = document.createElement("p");
    const deleteBtn = document.createElement("button");

    title.textContent = `${book.title}`;

    newBook.dataset.title = `${title.textContent
      .split(" ")
      .join("")
      .toLowerCase()}`;

    author.textContent = `${book.author}`;
    pages.textContent = `${book.pages}`;
    isRead.textContent = `Read: ${book.isRead}`;
    deleteBtn.textContent = "DELETE";

    deleteBtn.addEventListener("click", () => {
      let myAttr = newBook.dataset.title;
      console.log(myAttr);

      const books = document.querySelectorAll(".books-container > div");

      books.forEach((bookDiv) => {
        if (myAttr == bookDiv.dataset.title) {
          bookDiv.remove();
          let index = myLibrary.indexOf(book);
          console.log(index);
          myLibrary.splice(index, 1);
        }
      });
    });

    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(isRead);
    newBook.appendChild(deleteBtn);
    booksContainer.appendChild(newBook);
  });
};

function isBookRead(book, isRead) {
  if (isRead == true) {
    book.classList.add("read");
  } else {
    book.classList.add("not-read");
  }
}

function addBooksToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#isRead").checked;

  const book = new Book(title, author, pages, isRead);

  myLibrary.push(book);
  fetchBooks();

  const form = document.querySelector("form").reset();
}

addBook.addEventListener("click", (e) => {
  dialog.showModal();
  document.querySelector(".container").classList.add("blur");
});

dialog.addEventListener("submit", (e) => {
  addBooksToLibrary();
});

dialog.addEventListener("close", () => {
  document.querySelector(".container").classList.remove("blur");
});

closeDialog.addEventListener("click", () => {
  dialog.close();
  document.querySelector(".container").classList.remove("blur");
});

fetchBooks();
