import React from 'react';

interface BookCardProps {
  title: string;
  discountRate: number;
  coverImage: string;
  price: string;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  discountRate,
  coverImage,
  price,
}) => {
  return (
    <div className='book-card'>
      <img src={coverImage} alt={title} />
      <div className='details'>
        <h3>{title}</h3>
        <div>
          <p className='offer'>{discountRate}%</p>
          <p className='price'>
            {price}
            <span> 원</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
