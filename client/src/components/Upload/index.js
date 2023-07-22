import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_PHOTO } from '../../utils/mutations';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLockBodyScroll } from '@uidotdev/usehooks';

function Upload() {
  useLockBodyScroll();

  const navigate = useNavigate();

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

  const [addPhoto, { error }] = useMutation(UPLOAD_PHOTO);

  const handleFileUpload = (event) => {
    setPhotoImage(event.target.files[0]);

    if (!event.target.files[0]) {
      return;
    }
    setImagePreview(URL.createObjectURL(event.target.files[0]));
    setIsReady(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const image = new FormData();
      image.append('file', photoImage);
      // Use the upload preset from the .env file
      image.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
        {
          method: 'POST',
          body: image,
        }
      );

      const file = await res.json();

      await addPhoto({
        variables: {
          title: formState.photoName,
          description: formState.description,
          url: file.secure_url,
        },
      });

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

  // TODO move to imported css file
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div id="uploadModal" className="modalDiv">
      <div className="modal">
        <Box sx={style}>
          <button type="button" onClick={() => navigate(-1)}>
            Close
          </button>
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
                errorMessages={[
                  'this field is required',
                  'minimum 5 characters',
                ]}
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
                errorMessages={[
                  'this field is required',
                  'minimum 5 characters',
                ]}
                onChange={handleChange}
              />
            </div>
            {error ? (
              <div>
                <p className="error-text">
                  The provided credentials are incorrect
                </p>
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
        </Box>
      </div>
    </div>
  );
}

export default Upload;
