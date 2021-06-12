let library = [];

//book class
class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}
//add book
function addToLibrary(newBook) {
    if (library.some((book) => book.title === newBook.title)) { return false; }
    library.push(newBook);
    saveLocal();
    return true;
}
//remove book
function removeFromLibrary(bookTitle) {
    library = library.filter((book) => book.title !== bookTitle);
    saveLocal();
}

function getBook(bookTitle) {
    for (let book of library) {
        if (book.title === bookTitle) {
            return book;
        }
    }
    return null;
}

//popup
const newBookButton = document.querySelector(".new-book-button");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");

newBookButton.addEventListener("click", openPopup);
overlay.addEventListener("click", closePopup);


function openPopup() {
    popup.classList.add("popup-active");
    overlay.classList.add("overlay-active");
}

function closePopup() {
    popup.classList.remove("popup-active");
    overlay.classList.remove("overlay-active");
}



const form = document.querySelector(".popup-form");
form.addEventListener("submit", addBook);

function getBookFromInput() {
    const title = `"${document.querySelector("#title").value}"`;
    const author = `${document.querySelector("#author").value}`;
    const pages = `${document.querySelector("#pages").value}`;
    const isRead = `${document.querySelector("#read").checked}`;
    return new Book(title, author, pages, isRead);
}

function addBook(e) {
    e.preventDefault();
    if (addToLibrary(getBookFromInput())) {
        updateBooksGrid();
        closePopup();
    }
    else {
        alert("This book already exist in your library");
    }
}


const booksGrid = document.querySelector(".book-grid");
booksGrid.addEventListener("click", checkBooksGridInput);

function checkBooksGridInput(e) {
    if (e.target.classList.contains("remove-button")) {
        removeFromLibrary(e.target.parentNode.firstChild.innerHTML);
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    } else if (e.target.classList.contains("read-button")) {
        if (e.target.innerHTML === "Read") {
            getBook(e.target.parentNode.firstChild.innerHTML).isRead = "false";
            e.target.innerHTML = "Not read";
            e.target.classList.remove("button-green");
            e.target.classList.add("button-red");
        } else {
            getBook(e.target.parentNode.firstChild.innerHTML).isRead = "true";
            e.target.innerHTML = "Read";
            e.target.classList.remove("button-red");
            e.target.classList.add("button-green");
        }
        saveLocal();
    }
}

function updateBooksGrid() {
    resetGrid();
    for (let book of library) {
        createBookCard(book);
    }
}

function resetGrid() {
    booksGrid.innerHTML = "";
}

function createBookCard(book) {
    const bookCard = document.createElement("div");
    const title = document.createElement("h3");
    const author = document.createElement("h3");
    const pages = document.createElement("h3");
    const readButton = document.createElement("button");
    const removeButton = document.createElement("button");

    bookCard.classList.add("book-card");
    title.classList.add("book-text");
    author.classList.add("book-text");
    pages.classList.add("book-text");
    readButton.classList.add("button");
    readButton.classList.add("read-button");
    removeButton.classList.add("button");
    removeButton.classList.add("button-red");
    removeButton.classList.add("remove-button");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    removeButton.textContent = "Remove";

    if (book.isRead === "true") {
        readButton.textContent = `Read`;
        readButton.classList.add("button-green");
    } else {
        readButton.textContent = "Not read";
        readButton.classList.add("button-red");
    }

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readButton);
    bookCard.appendChild(removeButton);
    booksGrid.appendChild(bookCard);
}

function saveLocal() {
    localStorage.setItem("library", JSON.stringify(library));
}

function restoreLocal() {
    library = JSON.parse(localStorage.getItem("library"));
    if (library === null) library = [];
    updateBooksGrid();
}

restoreLocal();




