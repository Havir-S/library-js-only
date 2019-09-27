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

Book.prototype.readingProcessChange = function() {
  this.isRead = (!this.isRead);
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
  book_tab_info.innerHTML = '<hr><p>' + book.title + '</p>';
  book_tab_info.innerHTML += '<p>' + book.author + '</p>';
  book_tab_inside.appendChild(book_tab_info);

  //ICONS
  var book_icon = document.createElement('div');
  book_icon.className = 'icon clickable';
  if (book.isRead) {
    book_icon.innerHTML = '<i class="fas fa-bookmark" aria-hidden="true"></i>';
    book_icon.innerHTML += '<i class="fas fa-book-open book-icon book-icon-from" aria-hidden="true"></i>';
    book_icon.innerHTML += '<i class="fas fa-book book-icon book-icon-to" aria-hidden="true"></i>';

  } else {
    book_icon.innerHTML = '<i class="fas fa-bookmark" aria-hidden="true"></i>';
    book_icon.innerHTML += '<i class="fas fa-book-open book-icon book-icon-to" aria-hidden="true"></i>';
    book_icon.innerHTML += '<i class="fas fa-book book-icon book-icon-from" aria-hidden="true"></i>';

  }

  book_icon.addEventListener('click', function() {
    book.readingProcessChange();
    if (book.isRead) {
      while(book_icon.firstChild) {
        book_icon.removeChild(book_icon.firstChild);
      }
      book_icon.innerHTML = '<i class="fas fa-bookmark" aria-hidden="true"></i>';
      book_icon.innerHTML += '<i class="fas fa-book-open book-icon book-icon-from" aria-hidden="true"></i>';
      book_icon.innerHTML += '<i class="fas fa-book book-icon book-icon-to" aria-hidden="true"></i>';
    } else {
      while(book_icon.firstChild) {
        book_icon.removeChild(book_icon.firstChild);
      }
      book_icon.innerHTML = '<i class="fas fa-bookmark" aria-hidden="true"></i>';
      book_icon.innerHTML += '<i class="fas fa-book-open book-icon book-icon-to" aria-hidden="true"></i>';
      book_icon.innerHTML += '<i class="fas fa-book book-icon book-icon-from" aria-hidden="true"></i>';
    }
  })

  book_tab_inside.appendChild(book_icon);

  //DELETE BOOK BUTTON
  var book_icon_delete = document.createElement('div');
  book_icon_delete.className = 'delete-button clickable';
  book_icon_delete.innerHTML = '<i class="fa fa-trash-alt" aria-hidden="true"</i>';
  book_tab_inside.appendChild(book_icon_delete);

  //BLOCK INFO
  var book_tab_invisible_info = document.createElement('div');
  book_tab_invisible_info.className = 'book-info';

  var desc = book.description.slice(0,90) + '...';

  book_tab_invisible_info.innerHTML = '<div class="book-info-inside">'+ '<h3>' + book.title + '</h3>' +
  '<div class="line"></div>' +
  '<p data-infoIndex="1">Author: ' + book.author + '</p>' +
  '<p data-infoIndex="2">Year published: ' + book.year + '</p>' +
  '<p data-infoIndex="3">ISBN: ' + book.isbn + '</p>' +
  '<p data-infoIndex="4">Description: </p>' +
  '<p data-infoIndex="5">' + desc + '</p>' +
  '<div class="line"></div>' +
  '<p class="rating">' + book.rating + '</p>' +
  '</div>';

  book_tab.appendChild(book_tab_invisible_info);



  book_icon_delete.addEventListener('click', function() {
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

modal.addEventListener('click',function(e) {
  if (e.target == modal) {
    this.style.display = 'none';
  }
})

/* NEW BOOK */

let newBookButton = document.getElementById('newBookButton');
let form = document.forms[0];
newBookButton.onclick = function() {
  var i;
  var author = form['author'].value;
  var year = form['year'].value;
  var title = form['title'].value;
  var rating = form['rating'].value;
  var isbn = form['isbn'].value;
  var isRead = false;
  var img = form['img'].value;
  var description = form['description'].value;
  var book = new Book(author,year,title,rating,isbn,isRead,img,description);
  modal.style.display="none";
  addBookToLibrary(book);

  for (i=0; i < form.childElementCount; i++) {
    if (form.children[i].nodeName == 'INPUT') {
      form.children[i].value = "";
    }
  }
}

/* POPULATE FUNCTION */
// author,year,title,rating,isbn,isRead,img

let populate = () => {
  var a =new Book('JRR Tolkien','2005','The Fellowship of The Ring','9/10','978-0-00-720354-3',false,'./books/tolkien-tfotr.jpg','Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ');
  var b =new Book('Eiji Yoshikawa','2012','Musashi: An Epic Novel of the Samurai Era','9/10','9781568364278',false,'./books/musashi.jpg','Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ');
  var c =new Book('Sun Tzu','2015','The Art Of War: Slip-Case Edition','8/10','1784048178',false,'./books/art-of-war.jpg','Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ');
  var d =new Book('JRR Tolkien','2012','The Hobbit','8/10','978-0547928227',false,'./books/hobbit.jpg','Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ');
  var e =new Book('Jules Verne','1873','Around the world in eighty days','7/10','978-1503215153',false,'./books/eightydays.jpg','Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ');
  addBookToLibrary(a);
  addBookToLibrary(b);
  addBookToLibrary(c);
  addBookToLibrary(d);
  addBookToLibrary(e);
}

populate();

// TEST enough space
// var last = mainColumn.children[4].children[1];
// var parent = mainColumn.parentElement.parentElement;
// var d = (parent.offsetWidth - mainColumn.offsetWidth)/2;
// if (250 < d) {
//   console.log('c ma miejsce');
// } else {
//   console.log('c nie ma miejsca');
// }


// LOCAL STORAGE --------- Forgot You can't transport objects through localStorage, I'm aborting the mission, I'd rather do that with backend
//
// if (sessionStorage) {
//   if (sessionStorage.visited == 'true') {
//     myLibrary = sessionStorage.getItem('library');
//   } else {
//     populate();
//     sessionStorage.visited = true;
//   }
// } else {
// }
