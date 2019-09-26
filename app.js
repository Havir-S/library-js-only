let myLibrary = [];

function Book(author,year,title,rating,isbn,isRead,img) {

  this.author = author;
  this.year = year;
  this.title = title;
  this.rating = rating;
  this.isbn = isbn;
  this.isRead = isRead;
  console.log(arguments);
  this.img = img;
}

Book.prototype.readingProcessChange = () => {
  this.isRead = !(this.isRead);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  render();
}

let mainColumn = document.getElementsByClassName('main-column')[0];

let createBookTab = (n) => {
  var book_tab = document.createElement('div');
  book_tab.className = 'book-tab';

  var book_tab_inside = document.createElement('div');
  book_tab_inside.className = 'book-tab-inside'
  book_tab.appendChild(book_tab_inside);

  var data_index = document.createAttribute('data-index');
  data_index.value = n;
  book_tab.setAttributeNode(data_index);

  var delete_button = document.createElement('div');
  delete_button.innerHTML = 'Click me to delete this';
  book_tab.appendChild(delete_button);

  delete_button.addEventListener('click', function() {
    console.log(n);
    deleteBook(n);
  });

  mainColumn.appendChild(book_tab);


}
var bookToDelete;
let deleteBook = (n) => {
 bookToDelete = document.querySelector('[data-index="'+n+'"]');
 mainColumn.removeChild(bookToDelete);
 myLibrary.splice(n,1);
render();
}

function render() {
  while(mainColumn.firstChild) {
    mainColumn.removeChild(mainColumn.firstChild);
  }
  var n = 0;
  for(book in myLibrary) {
    createBookTab(n);
    n++;
  }
}

/* NEW BOOK */


let newBookButton = document.getElementById('newBookButton');
let form = document.forms[0];
newBookButton.onclick = function() {
  var author = form['author'].value;
  var year = form['year'].value;
  var title = form['title'].value;
  var rating = form['rating'].value;
  var isbn = form['isbn'].value;
  var isRead = false;
  var img = form['img'].value;
  var book = new Book(author,year,title,rating,isbn,isRead,img);
  addBookToLibrary(book);
}

/* MODAL */
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.close-modal');
let newBook = document.getElementsByClassName('new-book')[0];
newBook.addEventListener('click',function() {
  modal.style.display = 'block';
})

closeModal.addEventListener('click', function() {
  modal.style.display = 'none';
})


/* POPULATE FUNCTION */
// author,year,title,rating,isbn,isRead,img

let populate = () => {
  var a = Book('JRR Tolkien','2005','The Fellowship of The Ring','9/10','978-0-00-720354-3',false,'./books/tolkien-tfotr.jpg');
  var b = Book('Eiji Yoshikawa','2012','Musashi: An Epic Novel of the Samurai Era','9/10','9781568364278',false,'./books/musashi.jpg');
  var c = Book('Sun Tzu','2015','The Art Of War: Slip-Case Edition','8/10','1784048178',false,'./books/art-of-war.jpg');
  var d = Book('')
  addBookToLibrary(a);
  addBookToLibrary(b);
  addBookToLibrary(c);
}


// populate();
