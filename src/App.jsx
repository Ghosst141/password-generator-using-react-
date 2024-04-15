import { useCallback, useState, useEffect, useRef} from 'react'

function App() {
  const [password, setpassword] = useState("");
  const [length, setlength] = useState(8);
  const [number, setnumber] = useState(false);
  const [symbol, setsymbol] = useState(false);

  const passwordchange = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "123456789"
    }
    if (symbol) {
      str += "@!#$&+-*/.,"
    }
    for (let i = 0; i < length; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }
    setpassword(pass);
    document.querySelector('.copy').innerText="Copy";

  }, [length, number, symbol, setpassword])//setpassword kewal optimisation ke liye dala

  useEffect(()=>{
    passwordchange();
  }, [length, number, symbol,passwordchange])


  const passwordref= useRef(null);//niche input m ref bhi dena padega

  const copybutton= useCallback((e)=>{
    e.target.innerText="Copied";
    passwordref.current?.select();
    // passwordref.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password);
  },[password])


  return (
    <>
      <div className='passgenerator w-full max-w-md px-4 m-auto py-4 my-8 bg-black text-white'>
        <h1 className='text-4xl text-center mb-4'>Password Generator</h1>
        <div className='flex shadow-2xl rounded-lg mb-4 overflow-hidden'>
          <input type="text" className='outline-none w-full text-lg px-2 py-1 text-black' value={password}
           placeholder='Your Password' ref={passwordref} readOnly />
          <button className='copy bg-blue-800 hover:bg-blue-600 text-white px-4 shrink-0' 
          onClick={copybutton}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={64} value={length} className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }} />
            <label>Length : {length}</label></div>
          <input type="checkbox" onChange={() => setnumber((prev) => !prev)} />
          <label>Numbers</label>
          <input type="checkbox" onChange={() => setsymbol((prev) => !prev)} />
          <label>Symbols</label>
        </div>
      </div>
    </>
  )
}

export default App
