import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Commet } from 'react-loading-indicators';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://bookstore-1580.onrender.com/books`, { withCredentials: true })
      .then((response) => {
        setBooks(response.data.data);
        console.log(response.data.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4 mx-[2rem]'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>

      <div className='flex justify-between items-center'>
        <h1 className='md:text-3xl my-8 border-2 border-sky-400 p-2 md:p-4'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>

      <div className='mb-4'>
        <Link to="/books/delAll" className='flex justify-end'>
          <h1 className='md:text-xl border-b-2 border-red-400 p-1'>Delete All Books</h1>
          <MdOutlineDelete size={40} className='text-2xl text-red-600' />
        </Link>

      </div>
      {loading ? (
        <div className='flex justify-center items-center'>
          <div style={{ transform: 'scale(1.5)' }}>
            <Commet color="#32cd32" size="large" text="" textColor="" />
          </div>

        </div>
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;