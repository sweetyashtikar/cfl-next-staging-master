import {
  PhotographIcon,
  VideoCameraIcon,
  XIcon,
} from '@heroicons/react/outline';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import useUser from '@/hooks/useUser';

import { API_URL, NEXT_URL } from '@/config';
import { IPOST } from '@/pages/feed';
import pollIconBlue from '@/public/assets/images/poll-icon-blue.svg';
import PollIcon from '@/public/assets/images/pollIcon.png';

interface IProps {
  token: string;
  onSubmit(): void;
}

interface IOption {
  id: number;
  placeholder: string;
  value: string;
}

const special = [
  'zeroth',
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
  'eleventh',
  'twelfth',
  'thirteenth',
  'fourteenth',
  'fifteenth',
  'sixteenth',
  'seventeenth',
  'eighteenth',
  'nineteenth',
];
const deca = [
  'twent',
  'thirt',
  'fort',
  'fift',
  'sixt',
  'sevent',
  'eight',
  'ninet',
];

function stringifyNumber(n: number) {
  if (n < 20) return special[n];
  if (n % 10 === 0) return deca[Math.floor(n / 10) - 2] + 'ieth';
  return deca[Math.floor(n / 10) - 2] + 'y-' + special[n % 10];
}

const NewPost = ({ onSubmit, token }: IProps) => {
  const inputRef = useRef(null);
  const router = useRouter();
  const [newPostText, setNewPostText] = useState<string>('');
  const [pollText, setPollText] = useState<string>('');
  const [posting, setPosting] = useState(false);
  const [showPollForm, setShowPollForm] = useState(false);
  const { user, loggedOut } = useUser();
  const profilePictureUrl =
    user?.profile?.profilePicture?.formats?.thumbnail.url;
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);
  const [options, setOptions]: [IOption[], Function] = useState([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      const filesList = Array.from(target.files).map((file) => ({
        preview: URL.createObjectURL(file),
        file,
      }));

      setFiles(filesList);
    }
  };

  const savePost = async () => {
    if (loggedOut) {
      router.push('/login');
      return;
    }

    if (!pollText && !newPostText) {
      return;
    }

    try {
      setPosting(true);

      const poll = {
        text: pollText,
        options: options,
      };

      const { data: responseData } = await axios.post<IPOST>(
        `${NEXT_URL}/api/session/feed-posts`,
        { text: newPostText, poll: poll, group: router.query?.group }
      );

      if (files.length > 0) {
        let formData = new FormData();
        const data = { text: newPostText };
        formData.append('data', JSON.stringify(data));

        for (let i = 0; i < files.length; i++) {
          const file = files[i]?.file;
          if (file) {
            formData.append(`files`, file, file.name);
          }
        }

        formData.append('refId', responseData._id);
        formData.append('ref', 'feed-post');
        formData.append('field', 'media');

        await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        setFiles([]);
      }

      // toast('Posted');
      setNewPostText('');
      setShowPollForm(false);
      setOptions([]);
      setPollText('');
      onSubmit();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setPosting(false);
    }
  };

  const onAddOptions = () => {
    const id = options.length + 1;
    const updatedOptions = [...options];
    updatedOptions.push({
      id,
      placeholder: `Enter ${stringifyNumber(id)} option`,
      value: '',
    });
    setOptions(updatedOptions);
  };

  const onChangeOption = (id: number, value: string) => {
    const updatedOption = options.find((option) => option.id === id);
    if (updatedOption) {
      updatedOption.value = value;
      setOptions((prev: IOption[]) =>
        prev.map((option) => {
          if (option.id === id) {
            return updatedOption;
          }
          return option;
        })
      );
    }
  };

  return (
    <div className="mb-7 rounded-lg bg-white p-4 shadow sm:p-6">
      <div className="flex gap-5">
        {profilePictureUrl && (
          <div className="relative h-14 w-16 overflow-hidden rounded-full">
            <Image src={profilePictureUrl} alt="User" layout="fill" />
          </div>
        )}

        {/* <img
          className="h-14 w-16 rounded-full"
          src={profilePictureUrl}
          alt="profile"
        /> */}

        <textarea
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          className="w-full rounded-lg bg-gray-100 py-4 px-5 text-lg"
          placeholder="What's happening?"
        />
      </div>
      {files.length > 0 && (
        <div className="mt-10 flex flex-wrap">
          {files.map((file) => (
            <div
              key={file.preview}
              className="relative mr-5 mb-5 flex w-44 rounded border-2 p-1"
            >
              <span
                onClick={() => {
                  setFiles((fs) =>
                    fs.filter((f) => f.preview !== file.preview)
                  );
                }}
                className="absolute -top-3 -right-3 h-5 w-5 cursor-pointer rounded-full border bg-slate-200"
              >
                <XIcon />
              </span>
              {file.file.type.includes('image/') && (
                <img
                  src={file.preview}
                  alt="img"
                  className="w-full self-center"
                />
              )}

              {file.file.type.includes('video/') && (
                <video
                  src={file.preview}
                  controls
                  className="h-full w-full self-center"
                />
              )}
            </div>
          ))}
        </div>
      )}
      <div className="mt-5 flex items-end justify-between">
        <div className="flex items-center gap-2 md:gap-5">
          <label className="cursor-pointer">
            <div className="flex items-center gap-1 ">
              <PhotographIcon className="h-6 w-6" />{' '}
              <span className="md:text-xl">Photo</span>
            </div>

            <input
              multiple
              ref={inputRef}
              onChange={(e) => handleFileChange(e)}
              type="file"
              className="hidden"
              accept="image/x-png,image/gif,image/jpeg"
            />
          </label>

          <label className="cursor-pointer">
            <div className="flex items-center gap-1">
              <VideoCameraIcon className="h-6 w-6" />{' '}
              <span className="md:text-xl">Video</span>
            </div>

            <input
              multiple
              ref={inputRef}
              onChange={(e) => handleFileChange(e)}
              type="file"
              className="hidden"
              accept="video/mp4,video/x-m4v,video/*"
            />
          </label>

          <label className="cursor-pointer">
            <div
              className="flex items-center gap-1"
              onClick={() => setShowPollForm(true)}
            >
              <span className="h-6 w-6">
                <Image src={showPollForm ? pollIconBlue : PollIcon} alt="" />
              </span>
              <span className={`md:text-xl ${showPollForm && 'text-blue-600'}`}>
                Poll
              </span>
            </div>
          </label>
        </div>
        <button
          className="ml-auto flex rounded-md bg-blue-600 py-2 px-5 text-white"
          onClick={savePost}
        >
          {!posting ? (
            'Post'
          ) : (
            <div role="status">
              <svg
                className="mr-2 inline h-8 w-8 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </button>
      </div>
      {showPollForm && (
        <>
          <div className="pt-[30px]">
            <input
              value={pollText}
              onChange={(e) => setPollText(e.target.value)}
              className="w-full rounded-lg bg-gray-100 py-4 px-5 text-lg"
              placeholder="Enter poll name"
            />
            <div className="mt-6">
              {options.map((option) => (
                <input
                  key={option.id}
                  value={option.value}
                  onChange={(e) => onChangeOption(option.id, e.target.value)}
                  className="mb-3 w-full rounded-lg bg-gray-100 py-4 px-5 text-lg"
                  placeholder={option.placeholder}
                />
              ))}
            </div>
          </div>
          <div className="mt-[15px] flex justify-between">
            <button
              className="rounded-md bg-blue-600 py-2 px-5 text-white"
              onClick={onAddOptions}
            >
              + Add option
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPost;
