'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { Arrow } from '../assets/icons';
import axios from 'axios';

const Abstract = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [gptResult, setGptResult] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [abstract, setAbstract] = useState<string>('');
  const [keywords, setKeywords] = useState<any>();

  const submitPrompt = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/get-title', { data: prompt })
      .then((res) => {
        const data = res.data;
        setGptResult(data);

        // Parse the response and set the title and abstract state
        if (data) {
          const result = JSON.parse(data.result);
          const message = result.choices[0].message;
          const content = message.content;

          const [extractedTitle, extractedAbstract] =
            content.split('\n\nAbstract:\n\n');
          setTitle(extractedTitle);
          setAbstract(extractedAbstract);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log('Title:', title); // Ensure the title is correctly set
    console.log('Abstract:', abstract); // Ensure the abstract is correctly set
  }, [title, abstract]); // Add title and abstract as dependencies

  const getKeywords = (e: React.FormEvent) => {
    console.log(title);
    axios
      .post('http://localhost:8080/get-keywords', { abstractData: title })
      .then((res) => {
        console.log(res.data.result);
        setKeywords(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex justify-center py-10">
        <div className="w-50 mx-auto">
          <h1 className="text-2xl font-bold flex justify-center pb-5">
            How it works?
          </h1>
          <div>
            <div className="px-4 py-2 bg-yellow-300 text-md font-bold my-2 rounded-xl text-center">
              Enter your research idea in about 50-100 words and hit submit
            </div>
            <div className="flex justify-center">
              <Arrow />
            </div>
            <div className="px-4 py-2 bg-yellow-300 text-md font-bold my-2 rounded-xl text-center">
              You will have ideas for title and abstract
            </div>
            <div className="flex justify-center">
              <Arrow />
            </div>
            <div className="px-4 py-2 bg-yellow-300 text-md font-bold my-2 rounded-xl text-center">
              Need more?
            </div>
            <div className="flex justify-center">
              <Arrow />
            </div>
            <div className="px-4 py-2 bg-yellow-300 text-md font-bold my-2 rounded-xl text-center">
              Click the Get Keywords button
            </div>
            <div className="flex justify-center">
              <Arrow />
            </div>
            <div className="px-4 py-2 bg-yellow-300 text-md font-bold my-2 rounded-xl text-center">
              Not happy with the results? Hit the reset button and start all
              over again
            </div>
          </div>
        </div>
        <form onSubmit={submitPrompt} className="flex-col justify-center px-10">
          <div>
            <label
              htmlFor="Input prompt"
              className="block py-5 text-xl font-medium">
              Please write down a summary of what your project does.
            </label>
            <textarea
              className="border-2 border-black"
              cols={60}
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required></textarea>
          </div>
          <button
            type="submit"
            className="py-5 px-10 bg-yellow-300 font-bold text-xl rounded-xl">
            Sumbit
          </button>
        </form>
      </div>
      {/* Abstract Result comes here */}
      <div className="w-70 mx-auto">
        <h1 className="flex justify-center text-3xl py-5 font-bold underline">
          Generated Title and Abstract
        </h1>
        <h2 className="flex justify-center text-xl font-medium mx-40 p-5 rounded-xl border-2 border-yellow-300">
          &quot;{title}&quot;
        </h2>
      </div>

      <div className="flex justify-center">
        <button
          onClick={getKeywords}
          className="my-5 py-5 px-2 bg-yellow-300 font-bold text-xl rounded-xl">
          Generate Keywords
        </button>
      </div>

      <div className="flex justify-center">
        {/* @ts-ignore */}
        {keywords?.map((keyword, index) => (
          <div
            key={index}
            className="mx-4 border-2 border-yellow-300 px-4 py-2 rounded-xl mb-10">
            {keyword.keyword}
          </div>
        ))}
      </div>
    </>
  );
};

export default Abstract;
