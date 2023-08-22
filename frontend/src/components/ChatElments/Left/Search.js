import React, { useState } from 'react';

const Search = () => {
  const [onFocus, setOnFocus] = useState(false);
  return (
    <div className='p-2 h-[50%]'>
      <div className='  bg-[#f0f2f5] rounded-md flex px-2 items-center'>
        <span>
          {!onFocus ? (
            <svg
              viewBox='0 0 24 24'
              height='24'
              width='24'
              preserveAspectRatio='xMidYMid meet'
              version='1.1'
              x='0px'
              y='0px'
              enableBackground='new 0 0 24 24'
              xmlSpace='preserve'
            >
              <path
                fill='currentColor'
                d='M15.009,13.805h-0.636l-0.22-0.219c0.781-0.911,1.256-2.092,1.256-3.386 c0-2.876-2.332-5.207-5.207-5.207c-2.876,0-5.208,2.331-5.208,5.207s2.331,5.208,5.208,5.208c1.293,0,2.474-0.474,3.385-1.255 l0.221,0.22v0.635l4.004,3.999l1.194-1.195L15.009,13.805z M10.201,13.805c-1.991,0-3.605-1.614-3.605-3.605 s1.614-3.605,3.605-3.605s3.605,1.614,3.605,3.605S12.192,13.805,10.201,13.805z'
              ></path>
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-[#00a884]   '
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
              />
            </svg>
          )}
        </span>
        <input
          type='text'
          placeholder={
            onFocus ? '' : 'Rechercher ou demarrer une nouvelle discussion'
          }
          className=' bg-transparent w-full p-2 outline-none '
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
        />
      </div>
    </div>
  );
};

export default Search;
