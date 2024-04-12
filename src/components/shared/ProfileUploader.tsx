import { convertFileToUrl } from "@/lib/utils";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type IUploader = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const ProfileUploader = ({ fieldChange, mediaUrl }: IUploader) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" type="text" />

      <div className="cursor-pointer flex-center gap-4">
        <img className="w-24 h-24 rounded-full object-cover object-top" src={fileUrl || "/assets/icons/profile-placeholder.svg"} alt="Creator image" />
        <p className="text-primary-500 small-regular md:base-semibold">Change profile photo</p>
      </div>
    </div>
  );
};

export default ProfileUploader;
