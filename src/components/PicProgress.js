import React, { useEffect } from 'react'
import { ProgressBar } from "react-bootstrap"
import useStorage from '../DataHooks/useFireStorage'

function PicProgress({file, setFile}) {
    const { progress, url } = useStorage(file);

    useEffect(() => {
        if (url) {
        setFile(null);
        }
    }, [url, setFile]);
    return (
        <>
            <ProgressBar now={progress} label={`${progress}%`} />;
        </>
    )
}

export default PicProgress
