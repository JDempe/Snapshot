import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_PHOTO } from '../utils/mutations';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function Upload(props) {
  const [formState, setFormState] = useState({
    photoName: '',
    description: '',
  });
  const [photoImage, setPhotoImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // this is the image preview that will be displayed on the page
  const [isLoading, setIsLoading] = useState(null);
  const [isReady, setIsReady] = useState(false); // this is if the image is ready to be uploaded
  const [success, setSuccess] = useState(false); // this is the success message that will be displayed on the page
  const [failed, setFailed] = useState(false); // this is the error message that will be displayed on the page

  const [uploadPhoto, { error }] = useMutation(UPLOAD_PHOTO);

  const handleFileUpload = (event) => {
    setPhotoImage(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
    setIsReady(true);
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

      setIsLoading(false);
      setSuccess(true);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setFailed(true);
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
      <ValidatorForm onSubmit={handleFormSubmit}>
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
        <div height="300" width="300">
          {imagePreview && <img src={imagePreview} alt="Uploaded Image" />}
        </div>

        {/* Photo Name Box */}
        <div className="flex-row space-between my-2">
          <label htmlFor="photoname">Photo Name:</label>
          <TextValidator
            label="Title"
            type="text"
            name="photoName"
            id="photoName"
            value={formState.photoName}
            validators={['required', 'minStringLength:5']}
            errorMessages={['this field is required', 'minimum 5 characters']}
            onChange={handleChange}
          />
        </div>
        {/* Photo description Textbox */}
        <div className="flex-row space-between my-2">
          <label htmlFor="description">Description:</label>
          <TextValidator
            placeholder="Describe the photo..."
            label="Description"
            name="description"
            type="textarea"
            multiline
            rows={4}
            id="description"
            value={formState.description}
            validators={['required', 'minStringLength:5']}
            errorMessages={['this field is required', 'minimum 5 characters']}
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          {/* submit button that is disabled if isLoading is true */}
          <button
            className="btn btn-block btn-primary"
            disabled={isLoading || !isReady}
            type="submit">
            {isLoading ? 'Loading...' : 'Submit'}
          </button>

          <Collapse in={success}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setSuccess(false);
                  }}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}>
              Successfully uploaded!
            </Alert>
          </Collapse>

          <Collapse in={failed}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setFailed(false);
                  }}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}>
              Something went wrong! Please try again.
            </Alert>
          </Collapse>
        </div>
      </ValidatorForm>
    </div>
  );
}

export default Upload;
