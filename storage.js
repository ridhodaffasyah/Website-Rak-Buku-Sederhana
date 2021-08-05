const STORAGE_KEY = "SHELF_APPS";

let database = [];

function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(database);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadData() {
    const item = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(item);

    if(data !== null)
    database = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateData() {
    if(isStorageExist())
    saveData();
}


function bookPart(textBook, textAuthor, yearBook, isCompleted) {
    return {
        id: +new Date(),
        textBook,
        textAuthor,
        yearBook,
        isCompleted
    };
}

function searchBook(bookId) {
    for(shelfBook of database){
        if(shelfBook.id === bookId)
        return shelfBook;
    }
    return null;
}

function searchBookIndex(bookId) {
    let index = 0
    for (shelfBook of database) {
        if(shelfBook.id === bookId)
        return index;

        index++;
    }
    return -1;
}

function refreshData() {
    const unCompleted = document.getElementById(UNCOMPLETED_LIST_BOOK);

    const completed = document.getElementById(COMPLETED_LIST_BOOK);

    for(shelfBook of database) {
        const newShelf = listBook(shelfBook.textBook, shelfBook.textAuthor, shelfBook.yearBook, shelfBook.isCompleted);
        newShelf[BOOK_ID] = shelfBook.id;

        if(shelfBook.isCompleted) {
            completed.append(newShelf);
        } else {
            unCompleted.append(newShelf);
        }
    }
}

