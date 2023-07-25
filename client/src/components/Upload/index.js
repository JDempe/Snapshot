import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_PHOTO } from '../../utils/mutations';
import {
  Alert,
  Collapse,
  IconButton,
  FormControl,
  Button,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useLockBodyScroll } from '@uidotdev/usehooks';
import { useStoreContext } from '../../utils/GlobalState';
import './style.scss';
import { UPDATE_USER } from '../../utils/actions';

function Upload() {
  useLockBodyScroll();

  const [state, dispatch] = useStoreContext();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    photoName: '',
    description: '',
  });
  const [photoImage, setPhotoImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // this is the image preview that will be displayed on the page
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(false); // this is the success message that will be displayed on the page
  const [failed, setFailed] = useState(false); // this is the error message that will be displayed on the page

  const [titleError, setTitleError] = useState(false);
  const [titleReady, setTitleReady] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionReady, setDescriptionReady] = useState(false);

  const [addPhoto, { error }] = useMutation(UPLOAD_PHOTO);

  const handleFileUpload = (event) => {
    setPhotoImage(event.target.files[0]);

    if (!event.target.files[0]) {
      setImagePreview(null);
      return;
    }
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  // if path is /upload, scroll to top of page
  useEffect(() => {
    if (document.location.pathname === '/upload') {
      window.scrollTo(0, 0);
    }
  }, []);

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

      const { data } = await addPhoto({
        variables: {
          title: formState.photoName,
          description: formState.description,
          url: file.secure_url,
          createdBy: localStorage.getItem('userId'),
        },
      });

      console.log(data);
      // dispatch the action to add the photo to the global state for the user via  the id

      dispatch({
        type: UPDATE_USER,
        user: data.addPhoto,
      });

      setIsLoading(false);
      setSuccess(true);
      setFormState({
        photoName: '',
        description: '',
      });
      setPhotoImage(null);
      setImagePreview(null);
      setTitleReady(false);
      setDescriptionReady(false);
      // reset the form
      document.getElementById('uploadForm').reset();
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setFailed(true);
    }
  };
  const handleChangeTitle = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    if (value.length === 0) {
      setTitleError(false);
      setTitleReady(false);
    } else if (value.length < 3) {
      setTitleError(true);
      setTitleReady(false);
    } else {
      setTitleError(false);
      setTitleReady(true);
    }
  };

  const handleChangeDescription = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    if (value.length === 0) {
      setDescriptionError(false);
      setDescriptionReady(false);
    } else if (value.length < 5) {
      setDescriptionError(true);
      setDescriptionReady(false);
    } else {
      setDescriptionError(false);
      setDescriptionReady(true);
    }
  };

  return (
    <div id="uploadModal" className="modalDiv">
      <div className="modal">
        <div className="modalBody">
          <IconButton
            aria-label="close"
            color="inherit"
            size="medium"
            className="closeButton"
            onClick={() => {
              navigate(-1);
            }}>
            <CloseIcon fontSize="inherit" />
          </IconButton>

          <form id="uploadForm" onSubmit={handleFormSubmit}>
            <h2>Upload</h2>
            <FormControl height="100%" fullWidth>
              {/* Upload photo Button */}
              <input
                placeholder="Upload Photo"
                name="upload"
                type="file"
                id="upload"
                accept="image/*"
                required
                onChange={handleFileUpload}
              />

              <div id="previewImageBox">
                {imagePreview && (
                  <img id="previewImage" src={imagePreview} alt="" />
                )}
              </div>

              {/* Photo Name Box */}
              <TextField
                placeholder="Name your photo..."
                id="uploadTitle"
                name="photoName"
                label="Title"
                required
                margin="dense"
                multiline
                inputProps={{ maxLength: 20 }}
                error={titleError}
                value={formState.photoName}
                onChange={handleChangeTitle}
              />

              {/* Photo description Textbox */}

              <TextField
                placeholder="Describe the photo..."
                label="Description"
                name="description"
                multiline
                rows={2}
                required
                margin={'dense'}
                inputProps={{ maxLength: 120 }}
                error={descriptionError}
                id="uploadDescription"
                value={formState.description}
                onChange={handleChangeDescription}
              />

              {/* submit button that is disabled if isLoading is true */}
              <Button
                variant="contained"
                id="uploadButton"
                disabled={
                  isLoading || !titleReady || !descriptionReady || !photoImage
                }
                type="submit">
                {isLoading ? 'Loading...' : 'Upload Photo'}
              </Button>
            </FormControl>
          </form>

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
      </div>
    </div>
  );
}

export default Upload;
