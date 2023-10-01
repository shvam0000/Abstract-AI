import React from 'react';
import Image from 'next/image';

import ConfusedMan from '../assets/images/confused man trying to write a research paper.png';

const Hero = () => {
  return (
    <div>
      <h1 className="flex justify-center text-4xl py-10 font-bold">
        Abstract AI
      </h1>
      <div className="flex justify-center items-center">
        <div className="px-28 text-5xl py-10">
          Have a research paper to write and dont know where to start?
          <br />
          <span className="text-4xl">We got you covered.</span>
        </div>
        <figure className="px-28">
          <Image
            className="rounded-full"
            src={ConfusedMan}
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </figure>
      </div>
    </div>
  );
};

export default Hero;
