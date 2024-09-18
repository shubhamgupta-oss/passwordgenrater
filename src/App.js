import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [schar, setschar] = useState(false);
  const [isnumberAllowed, setisnumberAllowed] = useState(false);
  const [range, setrange] = useState(9);
  const [password, setpassword] = useState("");
  const [copyStatus, setCopyStatus] = useState("Copy");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    let num = "1234567890";
    let special = "!@#$%^&*()+_";

    if (isnumberAllowed) str += num;
    if (schar) str += special;

    for (let i = 0; i < range; i++) { 
      let char = Math.floor(Math.random() * str.length); 
      pass += str.charAt(char);
    }
    setpassword(pass);
    setCopyStatus("Copy");
  }, [schar, isnumberAllowed, range]); 


  const copyPassWordtoClicp = useCallback(() => {
    copyRef.current?.select()
    window.navigator.clipboard.writeText(password)
    setCopyStatus("Copied");
  }, [password])

  useEffect(() => {
    passwordGenerator(); 
  }, [schar, isnumberAllowed, range, passwordGenerator]);

  const copyRef = useRef(null)

  return (
    <>
      <div className='h-screen w-screen bg-gray-500 flex justify-center m-1 rounded-md'>
        <div className='w-full max-w-md mx-auto h-36 shadow-md rounded-lg px-4 py-4 m-auto bg-sky-300'>
          <h1 className='text-center font-mono text-3xl mb-3'>Password Generator</h1>
          <div>
            <input
              type='text'
              className='px-3 py-1 rounded-md outline-none w-4/5'
              placeholder='Password'
              value={password}
              readOnly
              ref={copyRef}
            />

            <button className='bg-green-200 px-3 py-1 rounded-lg'
            onClick={copyPassWordtoClicp}>
              {copyStatus}
            </button>

            <input
              type='range'
              min={6}
              max={49}
              className='mt-3 cursor-pointer'
              value={range}
              onChange={(e) => setrange(e.target.value)}
            />
            <label>Range: ({range})</label>

            <input
              type='checkbox'
              defaultChecked={schar}
              id='charinput'
              className='ml-2'
              onChange={() => setschar((prev) => !prev)}
            />
            <label className='ml-2'>Special Char</label>

            <input
              type='checkbox'
              defaultChecked={isnumberAllowed}
              id='NumberInput'
              className='ml-2'
              onChange={() => setisnumberAllowed((prev) => !prev)}
            />
            <label className='ml-2'>Number</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
