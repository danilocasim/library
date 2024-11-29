"use strict";

const form = document.querySelector("form");
const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector(".close");
const booksContainer = document.querySelector(".books-container");
const addBook = document.querySelector(".add");

const myLibrary = [
  { title: "Meditation", author: "Marcus Aurelius", pages: 143, isRead: true },
  {
    title: "Letter From A Stoic",
    author: "Lucius Seneca",
    pages: 143,
    isRead: false,
  },
  {
    title: "Grit and Perseverance",
    author: "Angela Duckworth",
    pages: 143,
    isRead: false,
  },
];

function Book(title, author, pages, isRead) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.isRead = isRead);
}

function readStatus(element, isRead) {
  let el = element.tagName.toLowerCase();
  console.log(element);

  switch (el) {
    case "button":
      if (isRead == true) {
        element.classList.remove("unread-btn");
        element.classList.add("read-btn");
      } else {
        element.classList.remove("read-btn");
        element.classList.add("unread-btn");
      }
      break;
    case "div":
      if (isRead == true) {
        element.classList.remove("not-read");
        element.classList.add("read");
      } else {
        element.classList.remove("read");
        element.classList.add("not-read");
      }
      break;
  }
}

const fetchBooks = () => {
  const books = document.querySelectorAll(".books-container > .book");
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
    pages.textContent = `Pages: ${book.pages}`;
    deleteBtn.textContent = "x";
    readBtn.textContent = book.isRead ? "Unread" : "Read";

    deleteBtn.addEventListener("click", () => {
      let myAttr = newBook.dataset.title;

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
        readBtn.textContent = "Read";
        readBtn.style.background = "red";
      } else {
        book.isRead = true;
        readBtn.textContent = "Unread";
        readBtn.style.background = "green";
      }
      readStatus(newBook, book.isRead);
    });

    readStatus(readBtn, book.isRead);
    readStatus(newBook, book.isRead);

    newBook.classList.add("book");
    deleteBtn.classList.add("delete");
    readBtn.classList.add("read-unread-btn");

    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(deleteBtn);
    newBook.appendChild(readBtn);
    booksContainer.appendChild(newBook);
  });
};

const addBooksToLibrary = () => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#isRead").checked;

  const book = new Book(title, author, pages, isRead);

  myLibrary.push(book);
  fetchBooks();

  form.reset();
};

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
