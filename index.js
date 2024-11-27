"use strict";

const dialog = document.querySelector("dialog");
const btnCloseDialog = document.querySelector(".close");
const addBtn = document.querySelector("#add-btn");
const booksContainer = document.querySelector(".books-container");
const addBook = document.querySelector(".add");

const myLibrary = [
  { title: "Meditation", author: "Marcus Aurelius", pages: 246, isRead: true },
  {
    title: "Letter from a Stoic",
    author: "Lucius Seneca",
    pages: 424,
    isRead: true,
  },
  {
    title: "The War Of Art",
    author: "Steven Pressfield",
    pages: 200,
    isRead: false,
  },
];

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

    title.textContent = `${book.title}`;
    author.textContent = `${book.author}`;
    pages.textContent = `${book.pages}`;
    isRead.textContent = `${book.isRead}`;

    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(isRead);
    booksContainer.appendChild(newBook);
  });
};

function addBooksToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#isRead").value;

  console.log(isRead);

  const book = new Book(title, author, pages, isRead);

  myLibrary.push(book);
  fetchBooks();

  const form = document.querySelector("form").reset();
}

addBook.addEventListener("click", () => {
  dialog.showModal();
  document.querySelector(".container").classList.add("blur");
});

btnCloseDialog.addEventListener("click", () => {
  dialog.close();
  document.querySelector(".container").classList.remove("blur");
});

addBtn.addEventListener("click", () => {
  addBooksToLibrary();
  dialog.close();
  document.querySelector(".container").classList.remove("blur");
});

fetchBooks();
