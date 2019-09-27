let myLibrary = [];

function Book(author,year,title,rating,isbn,isRead,img,description) {

  this.author = author;
  this.year = year;
  this.title = title;
  this.rating = rating;
  this.isbn = isbn;
  this.isRead = isRead;
  this.img = img;
  this.description = description;
}

Book.prototype.readingProcessChange = () => {
  this.isRead = !(this.isRead);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  render();
}


// CREATE A BOOK
let mainColumn = document.getElementsByClassName('main-column')[0];

let createBookTab = (n) => {
  var book = myLibrary[n];
  //BASIC MAIN
  var book_tab = document.createElement('div');
  book_tab.className = 'book-tab';

  var book_tab_inside = document.createElement('div');
  book_tab_inside.className = 'book-tab-inside'
  book_tab.appendChild(book_tab_inside);


  // DATA-INDEX
  var data_index = document.createAttribute('data-index');
  data_index.value = n;
  book_tab.setAttributeNode(data_index);

  //IMG
  if(book.img) {
    var book_image = document.createElement('img');
    var book_image_src = document.createAttribute('src');
    book_image_src.value = book.img;
    var book_image_alt = document.createAttribute('alt');
    book_image_alt.value = book.img;
    book_image.setAttributeNode(book_image_src);
    book_image.setAttributeNode(book_image_alt);
    book_tab_inside.appendChild(book_image);
  } else {
    var book_image = document.createElement('img');
    var book_image_src = document.createAttribute('src');
    book_image_src.value = "./books/hobbit.jpg";
    var book_image_alt = document.createAttribute('alt');
    book_image_alt.value = 'Error';
    book_image.setAttributeNode(book_image_src);
    book_image.setAttributeNode(book_image_alt);
    book_tab_inside.appendChild(book_image);
  }

  //BOOK-TAB-INFO
  var book_tab_info = document.createElement('div');
  book_tab_info.className = 'book-tab-info';
  book_tab_info.innerHTML = '<hr><hr>';
  book_tab_inside.appendChild(book_tab_info);


  //DELETE BOOK BUTTON
  var delete_button = document.createElement('div');
  delete_button.innerHTML = 'Click me to delete this';
  book_tab_inside.appendChild(delete_button);




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
  modal.style.display="none";
  addBookToLibrary(book);
}

/* POPULATE FUNCTION */
// author,year,title,rating,isbn,isRead,img

let populate = () => {
  var a =new Book('JRR Tolkien','2005','The Fellowship of The Ring','9/10','978-0-00-720354-3',false,'./books/tolkien-tfotr.jpg','Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ');
  var b =new Book('Eiji Yoshikawa','2012','Musashi: An Epic Novel of the Samurai Era','9/10','9781568364278',false,'./books/musashi.jpg','Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ');
  var c =new Book('Sun Tzu','2015','The Art Of War: Slip-Case Edition','8/10','1784048178',false,'./books/art-of-war.jpg','Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ');
  var d =new Book('JRR Tolkien','2012','The Hobbit','8/10','978-0547928227',false,'./books/hobbit.jpg','Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ');
  addBookToLibrary(a);
  addBookToLibrary(b);
  addBookToLibrary(c);
  addBookToLibrary(d);
}


// populate();
