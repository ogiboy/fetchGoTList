import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const apiURL = "https://www.anapioficeandfire.com/api/books?pageSize=30";

  const [books, setBooks] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(apiURL);
      if (!res.ok && res.status !== 200) throw new Error("Connection Error");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatReleaseDates = (oldDate) => {
    const date = new Date(oldDate);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div className="App">
      <h1>Game of Thrones Kitapları</h1>
      <h2>API'den liste alın ve görüntüleyin</h2>

      {/* Fetch data  API */}
      <div>
        <button onClick={fetchData} className="fetch-button">
          Fetch Data
        </button>
        <br />
      </div>

      {/* API'den gelen veriyi gösterin */}

      {/* Her kitap için aşağıdaki JSX'i kullanın*/}
      {books.map((book, index) => (
        <div key={book.isbn} className="books">
          <div className="book">
            <h3>{index + 1}</h3>
            <h2>{book.name}</h2>

            <div className="details">
              <p>👨: {book.authors}</p>
              <p>📖: {book.numberOfPages}</p>
              <p>🏘️: {book.country}</p>
              <p>⏰: {formatReleaseDates(book.released)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
