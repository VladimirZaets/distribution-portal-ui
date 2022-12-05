import { useState } from 'react';

export default function useFileUpload(url) {
    const [selectedFile, setSelectedFile] = useState();	
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const handleSubmission = (metadata) => {
		const formData = new FormData();

		formData.append('file', selectedFile);
		Object.entries(metadata).forEach(item => formData.append(item[0], item[1]))

		fetch(
			url,
			{
				method: 'POST',
				mode: "no-cors",
				body: formData,
			}
		)
			.then((response) => response.text())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

    return { changeHandler, handleSubmission, isFilePicked, selectedFile }
};
