import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_PHOTO } from '../utils/mutations';

function Upload(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [photoImage, setPhotoImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // this is the image preview that will be displayed on the page [1
  const [isLoading, setIsLoading] = useState(null);

  const [uploadPhoto, { error }] = useMutation(UPLOAD_PHOTO);

  const handleFileUpload = (event) => {
    setPhotoImage(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const image = new FormData();
      image.append('file', photoImage);
      image.append('upload_preset', 'p0i4flkx');

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dvifr0ga6/image/upload',
        {
          method: 'POST',
          body: image,
        }
      );

      const file = await res.json();
      console.log(file);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <h2>Upload</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Upload photo Button */}
        <div>
          <label htmlFor="upload">Upload Photo:</label>
          <input
            placeholder="Upload Photo"
            name="upload"
            type="file"
            id="upload"
            onChange={handleFileUpload}
          />
        </div>
        {imagePreview && (
          <img src={imagePreview} alt="Uploaded Image" height="300" />
        )}

        {/* Photo Name Box */}
        <div className="flex-row space-between my-2">
          <label htmlFor="photoname">Photo Name:</label>
          <input
            placeholder="Photo Name"
            name="photoName"
            type="text"
            id="photoname"
            onChange={handleChange}
          />
        </div>
        {/* Photo description Textbox */}
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Description:</label>
          <textarea
            placeholder="Describe the photo..."
            name="description"
            type="text"
            id="description"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
