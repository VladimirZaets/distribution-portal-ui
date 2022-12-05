import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useFileUpload from './useFileUpload'

function App() {
	const { changeHandler, handleSubmission, isFilePicked, selectedFile } = useFileUpload('http://distribution-portal-lb-740092495.us-east-1.elb.amazonaws.com/package')
  const pkgNameRef = React.useRef(null)
  const pkgVersionRef = React.useRef(null)
  const fileRef = React.useRef(null)
  const [nameFormError, setNameFormError] = React.useState(false)
  const [versionFormError, setVersionFormError] = React.useState(false)
  const [fileFormError, setFileFormError] = React.useState(false)

  const validateForm = () => {
    let hasError = false
    const name = pkgNameRef?.current?.value;
    if (!name) {
      hasError = true
      setNameFormError(true)
    }
    const version = pkgVersionRef?.current?.value
    if (!version) {
      hasError = true
      setVersionFormError(true)
    }

    if (!isFilePicked) {
      hasError = true
      setFileFormError(true)
    }
    return hasError
  }

  const onSubmit = () => {        
    const hasError = validateForm()

    if (hasError) {
      return
    }

    handleSubmission({
      name: pkgNameRef?.current?.value,
      version: pkgVersionRef?.current?.value,
    })
  }

  return (
    <div className="App">
      <div className='header'>Distribution Portal</div>
      <div className='instruction'>Please provide package information and attach zip to submit</div>
      <div className='max-width'>
        <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <div className='padding-20'>
          <TextField
            required
            label="Name"
            fullWidth
            inputRef={pkgNameRef}
            placeholder="Package name"
            error={nameFormError}
            helperText={nameFormError ? 'Field "Name" is required.':''}
            onChange={()=>setNameFormError(false)}
          />
          </div>
          <div className='padding-20'>
          <TextField
            required        
            label="Version"
            fullWidth
            inputRef={pkgVersionRef}
            error={versionFormError}
            onChange={()=>setVersionFormError(false)}
            placeholder="Package version. Example: 0.0.1"
            helperText={versionFormError ? 'Field "Version" is required. Supported format is "0.0.1"':''}
          />
          </div>
          <div className='padding-20'>
            <Button
              size='large'
              variant="outlined"
              component="label"
              color={fileFormError ? 'error' :  isFilePicked ? 'success' : 'primary'}
              fullWidth
            >
              {isFilePicked ? `Package "${selectedFile.name}" is selected` : "Select package to upload"}
              <input
                onChange={(...args) => {changeHandler(...args); setFileFormError(false)}}
                accept=".zip,.rar,.7zip"
                type="file"
                hidden
              />
            </Button>
          </div>
          <div className='padding-20'>
          <Button 
            fullWidth          
            size='large'          
            variant="contained"
            onClick={onSubmit}>
              Submit
          </Button>  
          </div>    
        </Box>
      </div>
    </div>
  );
}

export default App;
