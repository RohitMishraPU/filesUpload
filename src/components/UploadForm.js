import React, {useState} from 'react'
import { Form } from "react-bootstrap"
import PicProgress from './PicProgress';


function UploadForm() {

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.pdf|\.doc|\.docx|\.txt|\.zip|\.7z)$/i;

  // const types = ['image/png', 'image/jpeg','application/']; // application/pdf //

  const handleChange = (e) => {
    let selected = e.target.files[0];
    
    if (selected && allowedExtensions.exec(selected.name)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };
    return (
        <>
            <Form.Group id="upload">
              <Form.Control type="file" className='text-white' onChange={handleChange}/>
            </Form.Group>
            <br></br>
            <div className="output">
                { error && <div className="text-danger">{ error }</div>}
                { file && <div className="text-success">{ file.name }</div> }
                { file && <PicProgress file={file} setFile={setFile} /> }
                
            </div>
        </>
    )
}

export default UploadForm
