import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [charactersAllowed, setCharactersAllowed] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = () => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "123456789"
    }
    if (charactersAllowed) {
      str += "!@#$%^&*()_+-=[]{}|;',./:<>?`~"
    }
    let pass = "";
    for (let i = 0; i < length; i++) {
      let char_index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char_index);
    }

    setPassword(pass);
  }

  const copyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charactersAllowed])

  return (
    <>
      <div className="bg-gray-300 h-screen flex flex-col justify-center items-center w-full">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Password Generator</h1>

          <div className="mb-4">
            <label
              htmlFor="passwordLength"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Length: {length}
            </label>
            <input
              type="range"
              id="passwordLength"
              min="8"
              max="128"
              onChange={(e) => {setLength(e.target.value)}}
              className="w-full rounded-md bg-gray-200 px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <input type="checkbox" id="includeNumbers" className="mr-2" defaultChecked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} />
            <label
              htmlFor="includeNumbers"
              className="text-sm font-medium text-gray-700"
            >
              Include Numbers
            </label>
          </div>

          <div className="mb-4">
            <input type="checkbox" id="includeSpecialChars" className="mr-2" defaultChecked={charactersAllowed} onChange={() => setCharactersAllowed((prev) => !prev)} />
            <label
              htmlFor="includeSpecialChars"
              className="text-sm font-medium text-gray-700"
            >
              Include Special Characters
            </label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="generatedPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
            </label>
            <input
              type="text"
              id="generatedPassword"
              value={password}
              readOnly
              ref={passwordRef}
              className="w-full rounded-md bg-gray-200 px-3 py-2"
            />
          </div>

          <button
            id="copyPassword"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={copyPassword}
          >
            Copy Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
