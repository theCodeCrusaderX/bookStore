import React, { useState, useRef, useEffect } from 'react';
import BackButton from '../components/BackButton';
import { FourSquare } from 'react-loading-indicators';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { ThreeDot } from 'react-loading-indicators';


const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear: Number(publishYear),
      description,
      imageUrl,
    };
    if (!title || !author || !publishYear) {
      enqueueSnackbar('Please fill all required fields', { variant: 'warning' });
      return;
    }
    setLoading(true);
    axios
      .post(`https://bookstore-1580.onrender.com/books`, data, { withCredentials: true })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };


  const handleGenerateDescription = async () => {
    if (!title) {
      enqueueSnackbar('Please enter the book title first.', { variant: 'warning' });
      return;
    }
    setLoadingText(true);
    try {
      const res = await axios.post(
        'https://bookstore-1580.onrender.com/books/generate-description',
        { bookName: title },
        { withCredentials: true }
      );
      setDescription(res.data.description);
      enqueueSnackbar('Description generated!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to generate description.', { variant: 'error' });
    }
    setLoadingText(false);
  };


  // upload image to cloudinary
  const [file, setFile] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleFileUpload = async () => {
    if (!file) return;
    setLoadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('https://bookstore-1580.onrender.com/books/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setImageUrl(response.data.url);
      // console.log('File uploaded successfully:', response.data.url);
      
      enqueueSnackbar('File uploaded!', { variant: 'success' });
      setFile(null);
      setLoadingImage(false);
      setImageUploaded(true);
    } catch (error) {
      enqueueSnackbar('Upload failed.', { variant: 'error' });
      setLoadingImage(false);
    }
  };


  // click upload & drag and drop feature 

  const [dragActive, setDragActive] = useState(false);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const fileInputRef = useRef(null);

  const handleLabelClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <FourSquare color="#32cd32" size="medium" text="" textColor="" /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>description</label>
          <div className="relative w-full">
            <textarea
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full h-32 resize-none'
              disabled={loadingText}
            />
            {loadingText && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 pointer-events-none">
                <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
              </div>
            )}
          </div>
          <button
            className='p-2 bg-green-300 mt-2'
            onClick={handleGenerateDescription}
            disabled={loadingText}
          >
            Generate with AI
          </button>
        </div>

        {/* to upload image */}
        <div
          className={`my-4 flex flex-col items-center justify-center border-2 border-dashed ${dragActive ? "border-purple-600 bg-purple-50" : "border-gray-400"
            } p-4 rounded transition`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <label htmlFor="" className="w-90 cursor-pointer text-center mb-4">
            <div className="truncate font-semibold border border-purple-400 px-4 py-2 rounded color-purple-600 hover:bg-purple-50" onClick={handleLabelClick}>
              {file ? file.name : "Click or Drag & Drop to choose a file"}
            </div>
            <input type="file" onChange={handleFileChange} ref={fileInputRef} disabled={imageUploaded} className="cursor-pointer hidden" accept='image/*' />
          </label>
          <button
            className={`w-full px-4 py-2 rounded-md text-white transition w-64 m-6 ${file
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-purple-300 cursor-not-allowed"
              }`}
            onClick={handleFileUpload}
            disabled={!file || loadingImage
              || imageUploaded
            }
            type="button"
          >
            {loadingImage ? <ThreeDot color="#fff" size="small" text="" textColor="" /> : "Upload Image"}
          </button>
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div >
  );
}

export default CreateBooks