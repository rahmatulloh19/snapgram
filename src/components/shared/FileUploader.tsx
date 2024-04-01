import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      console.log(URL.createObjectURL(acceptedFiles[0]));
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });

  return (
    <div className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer" {...getRootProps()}>
      <input className="cursor-pointer " {...getInputProps()} />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img className="file_uploader-img" src={fileUrl} alt="Uploading image" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img src="/assets/icons/file-upload.svg" width={96} height={77} alt="File upload image" />
          <h3 className="base-medium text-light-2 mb-2 mt-6">Drag photo here</h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          <Button className="shad-button_dark_4" type="button">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
