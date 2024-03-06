// Определяем класс Book с полями name, author и title
class Book {
  constructor(name, author, title) {
    this.name = name;
    this.author = author;
    this.title = title;
  }
}

// Асинхронная функция для получения списка книг
async function getBooks() {
  try {
    // Делаем запрос к API и ждем ответа
	//ссылка на сценарий https://app.nodul.ru/scenarios/65e83abb400fb1d82396b934
    const response = await axios.get('https://webhook.nodul.ru/766/dev/33e6096a-3648-457f-af7f-aa93a4321b71');
    // Начинаем формировать HTML-код для списка книг
    let output = `
      <div class="row header">
        <div class="col-sm">
          Название
        </div>
        <div class="col-sm">
          Автор
        </div>
        <div class="col-sm">
          Глава
        </div>
      </div>`;
    // Для каждой книги в ответе от API
    response.data.forEach(item => {
      // Создаем новый объект Book
      let book = new Book(item.name, item.author, item.title);
      // Добавляем информацию о книге в HTML-код
      output += `
        <div class="row">
          <div class="col-sm">
            ${book.name}
          </div>
          <div class="col-sm">
            ${book.author}
          </div>
          <div class="col-sm">
            ${book.title}
          </div>
        </div>`;
    });
    // Вставляем HTML-код в элемент с id 'books'
    document.getElementById('books').innerHTML = output;
    // Скрываем индикатор загрузки
    document.getElementById('loading').classList.add('d-none');
    // Показываем список книг
    document.getElementById('books').classList.remove('d-none');
  } catch (error) {
    // Если произошла ошибка, выводим ее в консоль
    console.error(error);
  }
}

// Вызываем функцию getBooks
getBooks();
