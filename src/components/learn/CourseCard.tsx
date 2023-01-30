import React from 'react';

export interface ICourseCardProps {
  course: any;
}

export default function CourseCard({ course }: ICourseCardProps) {
  const { title, description, imageSrc, author, price } = course;

  return (
    <>
      <img
        className="overflow-hidden rounded-tl-lg rounded-tr-lg"
        src={imageSrc}
        alt={title}
        style={{
          width: '100%',
          height: '208px',
        }}
      />
      <div
        className="flex flex-col rounded-bl-lg rounded-br-lg bg-gray-50 p-4"
        style={{ height: 'calc(100% - 208px)' }}
      >
        <span className="mb-3 block text-sm font-normal text-[#333]">
          {title}
        </span>
        <span className="mb-8 block text-xs font-normal text-[#555555]">
          {description}
        </span>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="rounded-full"
              src={author?.imageSrc}
              alt={author?.name}
              style={{
                width: '30px',
                height: '30px',
              }}
            />
            <span className="small ml-2 text-xs">{author?.name}</span>
          </div>

          <span className="small text-sm font-bold text-[#0680f9]">
            ${price}
          </span>
        </div>
      </div>
    </>
  );
}
