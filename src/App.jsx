import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);

  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");
  const inputRef = useRef(null);

  const genratepassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (numberAllowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberAllowed, charallowed]);

  useEffect(() => {
    genratepassword();
  }, [length, numberAllowed, charallowed]);

  const copytoclip = () => {
    window.navigator.clipboard.writeText(password);
    inputRef.current?.select();
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={inputRef}
          ></input>
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copytoclip}
          >
            copy
          </button>
        </div>
        <div className="lex items-center gap-x-1">
          <input
            type="range"
            name=""
            id=""
            min={6}
            max={20}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
            ref={inputRef}
          ></input>
          <label htmlFor="length">Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            name=""
            id=""
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          ></input>
          <label htmlFor="number">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            name=""
            id=""
            defaultChecked={charallowed}
            onChange={() => {
              setcharallowed((prev) => !prev);
            }}
          ></input>
          <label htmlFor="number">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
