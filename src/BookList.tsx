import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PullToRefresh from "react-pull-to-refresh";
import BookCard from "./BookCard";
import api from "./services/api";

interface Book {
  id: number;
  title: string;
  description: string;
  discountrate: number;
  coverimage: string;
  price: number;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBooks = async () => {
    try {
      // Fetch data from your API
      const { data } = await api.get("/books");
      const newBooks = data;
      if (newBooks.length === 0) {
        setHasMore(false);
      }
      setBooks((prevBooks) => [...prevBooks, ...newBooks]);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  const handleRefresh = async () => {
    setIsRefreshing(true);

    setTimeout(() => {
      fetchBooks();
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page to load more data
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      {isRefreshing && (
        <div className="refresh-indicator">
          <div className="refresh-icon">⇣</div>Refreshing...
        </div>
      )}
      <div className="book-list">
        <div className="header">
          <h1>Books</h1>
        </div>
        <div>
          <InfiniteScroll
            dataLength={books.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <div className="books">
              {books.map((book) => (
                <BookCard
                  key={Math.random()}
                  title={book.title}
                  discountRate={book.discountrate}
                  coverImage={book.coverimage}
                  price={book.price.toLocaleString()}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </PullToRefresh>
  );
};

export default BookList;
