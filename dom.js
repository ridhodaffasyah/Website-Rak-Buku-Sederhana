const UNCOMPLETED_LIST_BOOK = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK = "completeBookshelfList";
const BOOK_ID = "itemId";

function listBook(data, author, year, statusBook) {

    const bookTitle = document.createElement("h2");
    bookTitle.innerText = data;

    const bookAuthor = document.createElement("h5");
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.innerText = year;

    const bookContainer = document.createElement("div");
    bookContainer.classList.add("inner");
    bookContainer.append(bookTitle, bookAuthor, bookYear);

    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(bookContainer);
    
    if(statusBook){
        container.append(createUndoButton(), createTrashButton());
    } else {
        container.append(createCheckButton(), createTrashButton());
    }

    return container;
}

function addBookToShelf(event) {
    const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK);
    const completeBookshelfList = document.getElementById(COMPLETED_LIST_BOOK);

    const titleBook = document.getElementById("inputBookTitle").value;
    const authorBook =  document.getElementById("inputBookAuthor").value;
    const yearBook = document.getElementById("inputBookYear").value;

    const statusBook = document.getElementById("inputBookIsComplete");
    let shelfBook = "";

    if (statusBook.checked){
        shelfBook = listBook(titleBook, authorBook, yearBook, true);
        completeBookshelfList.append(shelfBook);
    } else {
        shelfBook = listBook(titleBook, authorBook, yearBook, false);
        uncompletedBookList.append(shelfBook);
    }

    const shelfBookObject = bookPart(titleBook, authorBook, yearBook, false);

    shelfBook[BOOK_ID] = shelfBookObject.id;
    database.push(shelfBookObject);
    updateData();
}

function createButton(buttonTypeClass, eventListener){
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBookToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK);
    const bookTitle = taskElement.querySelector(".inner > h2").innerText;
    const bookAuthor = taskElement.querySelector(".inner > h5").innerText;
    const bookYear = taskElement.querySelector(".inner > p").innerText;

    const newBook1 = listBook(bookTitle, bookAuthor, bookYear, true);
    const book = searchBook(taskElement[BOOK_ID]);
    book.isCompleted = true;
    newBook1[BOOK_ID] = book.id;

    listCompleted.append(newBook1);
    taskElement.remove();
    updateData();
}

function removeBookFromCompleted(taskElement) {
    const bookPos = searchBookIndex(taskElement[BOOK_ID]);
    database.splice(bookPos, 1);

    taskElement.remove();
    updateData();
}

function createTrashButton() {
    return createButton("trash-button", function(event){
        let answer = prompt("Apakah anda ingin menghapus buku ini? (Yes/No)");
        if (answer == "Yes"){
            removeBookFromCompleted(event.target.parentElement);
            alert("Anda telah menghapus buku ini!");
        } else {
            return null;
        }
    });
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function(event) {
        addBookToCompleted(event.target.parentElement);
    });
}

function undoTaskFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK);
    const bookTitle = taskElement.querySelector(".inner > h2").innerText;
    const bookAuthor = taskElement.querySelector(".inner > h5").innerText;
    const bookYear = taskElement.querySelector(".inner > p").innerText;
    const newBook = listBook(bookTitle, bookAuthor, bookYear, false);

    const book = searchBook(taskElement[BOOK_ID]);
    book.isCompleted = false;
    newBook[BOOK_ID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();
    updateData();
}

