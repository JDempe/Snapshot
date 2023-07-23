import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_PHOTO } from '../../utils/mutations';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  InputLabel,
  Input,
  Button,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useLockBodyScroll } from '@uidotdev/usehooks';
import './style.scss';

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
  const [submitDisabled, setSubmitDisabled] = useState(true); // this is if the submit button is disabled or not
  const [success, setSuccess] = useState(false); // this is the success message that will be displayed on the page
  const [failed, setFailed] = useState(false); // this is the error message that will be displayed on the page

  const [addPhoto, { error }] = useMutation(UPLOAD_PHOTO);

  const handleFileUpload = (event) => {
    setPhotoImage(event.target.files[0]);

    if (!event.target.files[0]) {
      setImagePreview(null);
      return;
    }
    setImagePreview(URL.createObjectURL(event.target.files[0]));
    handleFormReady();
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

  const handleFormReady = () => {
    // check if the form is ready to be submitted by checking the length of the 3 fields (photoName, description, and photoImage)
    if (
      formState.photoName.length > 0 &&
      formState.description.length > 0 &&
      photoImage
    ) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    handleFormReady();
  };

  const handleChangeTitle = (e) => {
    let titleValid = e.target.value ? true : false; // basic title validation
    let submitValid = this.state.textValid && titleValid; // validate total form
    this.setState({
      title: e.target.value,
      titleValid: titleValid,
      submitDisabled: !submitValid,
    });
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
                margin="normal"
                color="primary"
                value={formState.photoName}
                onChange={handleChangeTitle}
              />

              {/* Photo description Textbox */}

              <TextField
                placeholder="Describe the photo..."
                label="Description"
                name="description"
                multiline
                rows={4}
                required
                margin="normal"
                error={formState.description.length < 5}
                id="uploadDescription"
                value={formState.description}
                onChange={handleChange}
              />

              {/* submit button that is disabled if isLoading is true */}
              <Button
                variant="contained"
                id="uploadButton"
                // disabled={isLoading || !isReady}
                type="submit">
                {isLoading ? 'Loading...' : 'Upload Photo'}
              </Button>

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
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Upload;
