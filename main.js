document.addEventListener("DOMContentLoaded", function(){
    const inputBook = document.getElementById("inputBook");
    inputBook.addEventListener("submit", function(event) {
        event.preventDefault();
        addBookToShelf();
    });

    if(isStorageExist()) {
        loadData();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshData();
});