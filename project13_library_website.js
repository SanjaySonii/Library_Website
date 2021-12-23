console.log("we are in the library website");
showTable();
showHistoryTable();


// Book class 

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

// issue book class

class issue {
    constructor(studentName, issueBookName) {
        this.studentName = studentName;
        this.issueBookName = issueBookName;
    }
}

// display class

class Display {
    add(bookObj) {
        // let storageOBj;
        let bookArray = [bookObj.name, bookObj.author, bookObj.type];
        let myBooks = localStorage.getItem("myBooks");
        if (myBooks == null) {
            storageOBj = [];
        }
        else {
            storageOBj = JSON.parse(myBooks);
        }
        storageOBj.push(bookArray);
        // console.log(storageOBj);
        localStorage.setItem("myBooks", JSON.stringify(storageOBj));
        // console.log(localStorage);
        showTable();
        showHistoryTable();
    }
    clear() {
        let library_form = document.getElementById(`library_form`);
        library_form.reset();
    }
    validate(bookObj) {
        if (bookObj.name.length < 3) {
            return false;
        }
        else if (bookObj.author.length < 3) {
            return false;
        }
        else { return true; }
    }
    show(type) {
        // let displayObj = new Display();
        let alert = document.getElementById(`alert`);
        if (type == "error") {
            alert.style.background = "red";
            alert.innerHTML = `<div><strong> Danger </strong> ,
                                Sorry you cannot add this book, Enter again </div>`
        }
        else {
            alert.innerHTML = `<div><strong> Success </strong> ,
            You have successfully added a new book </div>`;
        }
        setTimeout(() => {
            alert.innerHTML = "";
            // displayObj.clear();
        }, 4000);
    }
}


// when user clicks the add book btn

let library_form = document.getElementById(`library_form`);
library_form.addEventListener(`submit`, library_form_submit);

function library_form_submit(e) {
    e.preventDefault();
    console.log("your form has been submitted");
    let name = document.getElementById('BookName').value;
    let author = document.getElementById('AuthorName').value;
    let type;
    let fiction = document.getElementById(`fiction`);
    let computer_programming = document.getElementById(`computer_programming`);
    let cooking = document.getElementById(`cooking`);
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (computer_programming.checked) {
        type = computer_programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let bookObj = new Book(name, author, type);
    // console.log(bookObj);
    let displayObj = new Display();
    if (displayObj.validate(bookObj)) {
        displayObj.add(bookObj);
        displayObj.clear();
        displayObj.show("success");
    }
    else {
        displayObj.show("error");
    }
    
}

// when user clicks the issue_book btn

let issue_form = document.getElementById(`issue_form`);
issue_form.addEventListener(`submit`, issue_form_submit);

function issue_form_submit(e) {
    e.preventDefault();
    let today = new Date();
    console.log(today);
    let yyyy = today.getFullYear();
    console.log(yyyy);
    let mm = today.getMonth();
    console.log(mm);
    let dd = today.getDay();
    console.log(dd);
    let hour = today.getHours();
    let apranh = 'AM';
    if (hour > 12) { hour -= 12; apranh = 'PM' }
    let min = today.getMinutes();
    let date_time = `${dd}/${mm}/${yyyy}  ${hour}:${min} ${apranh}`;
        let studentName = document.getElementById(`studentName`).value;
    let issueBookName = document.getElementById(`issue_book_name`).value;
    // let issueObj = new issue(studentName,issueBookName);
    let issueArray = [studentName, issueBookName,date_time];
    // console.log(issueObj);
    let iBook = localStorage.getItem("iBook");
    if (iBook == null) {
        storageOBj2 = [];
    }
    else {
        storageOBj2 = JSON.parse(iBook);
    }
    console.log(typeof iBook);
    console.log(typeof storageOBj2);
    storageOBj2.push(issueArray);
    localStorage.setItem("iBook", JSON.stringify(storageOBj2));
    // console.log(localStorage);
    showHistoryTable();
}

// function to print the book table 

function showTable() {
    let myBooks = localStorage.getItem("myBooks");
    // console.log(myBooks);
    if (myBooks == null) {
        storageOBj = [];
    }
    else {
        storageOBj = JSON.parse(myBooks);
    }
    localStorage.setItem("myBooks", JSON.stringify(storageOBj));
    // console.log(localStorage);
    let html = "";
    let issue_book_name = document.getElementById(`issue_book_name`);
    issue_book_name.innerHTML = ``;
    storageOBj.forEach(function (element, index) {
        html +=
            `<tr class = "bookList" id = "bookList">
        <td>${index + 1}</td>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td>${element[2]}</td>
        <td><button  class = "remove" id = "${index}" onclick = "removeBook(this.id)">Remove</button></td>
        </tr>`;
        issue_book_name.innerHTML += `<Option>${element[0]}</Option>`;
    });
    let tableBody = document.getElementById(`tableBody`);
    tableBody.innerHTML = html;
}

// function to show history table 

function showHistoryTable() {
    let iBook = localStorage.getItem("iBook");
    // console.log(myBooks);
    if (iBook == null) {
        storageOBj = [];
    }
    else {
        storageOBj = JSON.parse(iBook);
    }
    localStorage.setItem("iBook", JSON.stringify(storageOBj));
    // console.log(localStorage);
    let html = "";
    storageOBj.forEach(function (element, index) {
         html +=
            `<tr class = "bookList" id = "bookList">
        <td>${index + 1}</td>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td>${element[2]}</td>
        <td><button  class = "remove" id = "${index}" onclick = "removeIssueBook(this.id)">Remove</button></td>
        </tr>`;
    });
    let historyTableBody = document.getElementById(`historyTableBody`);
    historyTableBody.innerHTML = html;
}

// function to remove book 

function removeBook(index) {
    if(
    confirm("Are you sure? Do you really want to remove this book from library?")){
        
        console.log("i am removing");
        let myBooks = localStorage.getItem("myBooks");
        // console.log(myBooks);
        if (myBooks == null) {
            storageOBj = [];
        }
        else {
            storageOBj = JSON.parse(myBooks);
        }
        storageOBj.splice(index, 1);
        localStorage.setItem("myBooks", JSON.stringify(storageOBj));
        showTable();
    }
}

// function to remove issue book 

function removeIssueBook(index){
    if(
    confirm("Are you sure? Do you really want to remove this book from library?")){
    console.log("i am removing");
     let iBook = localStorage.getItem("iBook");
     // console.log(myBooks);
     if (iBook == null) {
         storageOBj3 = [];
     }
     else {
         storageOBj3 = JSON.parse(iBook);
     }
     storageOBj3.splice(index, 1);
     localStorage.setItem("iBook", JSON.stringify(storageOBj3));
     showHistoryTable();
}
}

// when user click the search btn 

let search = document.getElementById(`search_box`);
let btnSearch = document.getElementById(`search`);
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    console.log("input event fired", inputVal);
    if (search.value != "") {
        let bookList = document.getElementsByClassName(`bookList`);
        Array.from(bookList).forEach(function (element) {
            let listTitle0 = element.getElementsByTagName("td")[0].innerText;
            let listTitle1 = element.getElementsByTagName("td")[1].innerText;
            let listTitle2 = element.getElementsByTagName("td")[2].innerText;
            let listTitle3 = element.getElementsByTagName("td")[3].innerText;

            if (listTitle0.includes(inputVal) || listTitle2.includes(inputVal) || listTitle1.includes(inputVal) || listTitle3.includes(inputVal)) {
                element.style.display = "block"; return 0;
            }
            else {
                element.style.display = "none";
            }
        });

    }
    else { showTable(); showHistoryTable();}
})

