"use strict";

const form = document.querySelector("form");
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
    const deleteBtn = document.createElement("button");
    const readBtn = document.createElement("button");

    title.textContent = `${book.title}`;

    newBook.dataset.title = `${title.textContent
      .split(" ")
      .join("")
      .toLowerCase()}`;

    author.textContent = `${book.author}`;
    pages.textContent = `${book.pages}`;
    deleteBtn.textContent = "x";
    readBtn.textContent = book.isRead ? "unread" : "read";

    deleteBtn.addEventListener("click", () => {
      let myAttr = newBook.dataset.title;
      console.log(myAttr);

      const books = document.querySelectorAll(".books-container > div");

      books.forEach((bookDiv) => {
        if (myAttr == bookDiv.dataset.title) {
          bookDiv.remove();
          let index = myLibrary.indexOf(book);
          myLibrary.splice(index, 1);
        }
      });
    });

    readBtn.addEventListener("click", () => {
      if (book.isRead == true) {
        book.isRead = false;
        readBtn.textContent = "read";
      } else {
        book.isRead = true;
        readBtn.textContent = "unread";
      }
      isBookRead(newBook, book.isRead);
      console.log(book.isRead);
    });

    newBook.classList.add("book");
    deleteBtn.classList.add("delete");
    readBtn.classList.add("read-unread-btn");
    isBookRead(newBook, book.isRead);

    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(deleteBtn);
    newBook.appendChild(readBtn);
    booksContainer.appendChild(newBook);
  });
};

function isBookRead(book, isRead) {
  if (isRead == true) {
    book.classList.remove("not-read");
    book.classList.add("read");
  } else {
    book.classList.remove("read");
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

  form.reset();
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
