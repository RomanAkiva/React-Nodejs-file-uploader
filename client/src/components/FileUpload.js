import React, {Fragment, useState} from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const FileUpload = () => {

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose file..');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: ProgressEvent => {
                    setUploadPercentage(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))
                }
            });

            const {fileName, filePath} = res.data;

            setUploadedFile({fileName, filePath});
            setMessage('File Uploaded :)')
        } catch(err) {
            if(err.response.status === 500){
                console.log('There was a server problem');
            } else {
                console.log('err: ',err)
            }
        }
    }
    return (
        <Fragment>
            { message ? <Message msg={message}/> : null}
            <form className="md-form" onSubmit={onSubmit}>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>
                <Progress percentage={uploadPercentage}/>
                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
            </form>

            {uploadedFile ? 
                <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <h3 className="text-center">{uploadedFile.fileName}</h3>
                    </div>
                </div> : null}
        </Fragment>
    )
}

export default FileUpload
