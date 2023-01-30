import axios from 'axios';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactCrop, { Crop } from 'react-image-crop';
import { toast } from 'react-toastify';

import 'react-image-crop/dist/ReactCrop.css';

import { API_URL } from '@/config/index';
import getCroppedImg from '@/helpers/getCroppedImg';
import { classNames } from '@/helpers/index';

interface IPageProps {
  user?: any;
  token?: string;
  nextStep?: string;
}

export default function ProfilePicture({ user, token, nextStep }: IPageProps) {
  const router = useRouter();

  // cropper setup
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [image, setImage] = useState<any>();
  const [crop, setCrop] = useState<Partial<Crop>>({
    unit: '%',
    width: 100,
    aspect: 1,
  });
  const onCropChange = (c: Crop, percentageCrop: Crop) => setCrop(c);
  const onImageLoaded = (img: HTMLImageElement) => {
    imageRef.current = img;
  };

  // dropzone setup
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImage(reader.result);
      });
      // @ts-ignore
      reader.readAsDataURL(acceptedFiles[0]);
    }
  };
  const {
    open,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop: handleDrop,
    noClick: true,
    noKeyboard: true,
  });

  const [uploading, setUploading] = useState(false);
  const uploadProfilePicture = async () => {
    setUploading(true);
    try {
      if (imageRef.current && crop.width && crop.height) {
        const croppedImageUrl = await getCroppedImg(
          imageRef.current,
          crop as Crop
        );

        const body = new FormData();
        body.append('files', croppedImageUrl);
        body.append('refId', user?.profile?.id);
        body.append('ref', 'profile');
        body.append('field', 'profilePicture');

        await axios.post(`${API_URL}/upload`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        setUploading(false);
        router.push(nextStep || '/onboarding');
        toast("That's a great looking photo!");
      } else {
        setUploading(false);
        throw new Error('Invalid image');
      }
    } catch (e: any) {
      setUploading(false);
      toast.error(e.message);
    }
  };

  const renderCrop = () => (
    <>
      <ReactCrop
        src={image}
        crop={crop}
        onChange={onCropChange}
        onImageLoaded={onImageLoaded}
        ruleOfThirds
      />
      <div className="mt-2 flex items-center">
        <button
          type="submit"
          onClick={uploadProfilePicture}
          disabled={uploading}
          className="mr-5 flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-default disabled:bg-gray-400"
        >
          Save
        </button>
        <button
          type="submit"
          onClick={open}
          disabled={uploading}
          className="flex justify-center rounded-md border border-transparent bg-gray-100 py-2 px-6 text-sm font-medium text-gray-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-default disabled:bg-gray-100"
        >
          Choose another photo
        </button>
      </div>
    </>
  );

  const renderDrop = () => (
    <div
      className={classNames(
        !isDragActive && 'border-gray-300',
        isDragAccept && 'border-blue-500',
        isDragReject && 'border-red-500',
        'flex max-w-lg justify-center rounded-md border-2 border-dashed px-6 pt-5 pb-6'
      )}
    >
      <div className="space-y-1 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex text-sm text-gray-600">
          <button
            onClick={open}
            className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
          >
            <span>Upload a file</span>
          </button>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-sm lg:w-96">
      <div {...getRootProps()}>
        {image ? renderCrop() : renderDrop()}
        <input {...getInputProps()} />
      </div>
    </div>
  );
}
