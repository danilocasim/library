"use strict";

const dialog = document.querySelector("dialog");
const btnCloseDialog = document.querySelector(".close");
const booksContainer = document.querySelector(".books-container");
const addBook = document.querySelector(".add");

const myLibrary = [
  { title: "Meditation", author: "Marcus Aurelius" },
  { title: "Letter from a Stoic", author: "Lucius Seneca" },
  { title: "The War Of Art", author: "Steven Pressfield" },
];

function Book(title, author, pages) {
  (this.title = title), (this.author = author);
}

const fetchBooks = () => {
  const books = document.querySelectorAll(".books-container > div");
  books.forEach((book) => {
    book.remove();
  });

  myLibrary.forEach((book) => {
    const newBook = document.createElement("div");
    const title = document.createElement("h1");
    const author = document.createElement("h4");

    title.textContent = `${book.title}`;
    author.textContent = `${book.author}`;

    newBook.appendChild(title);
    newBook.appendChild(author);
    booksContainer.appendChild(newBook);
  });
};

function addBooksToLibrary() {
  let title = prompt("Title:");
  let author = prompt("Author:");
  const book = new Book(title, author);

  myLibrary.push(book);
  fetchBooks();
}

addBook.addEventListener("click", () => {
  dialog.showModal();
  document.querySelector(".container").classList.add("blur");
});

btnCloseDialog.addEventListener("click", () => {
  dialog.close();
  document.querySelector(".container").classList.remove("blur");
});

fetchBooks();
