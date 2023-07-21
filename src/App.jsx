import { useState, useEffect } from "react";
import { Tablero } from "./components/Tablero/Tablero";
import "./App.css";
import { MemoBlock } from "./components/MemoBlock/MemoBlock";
import { Reiniciar } from "./components/Reiniciar/Reiniciar";

const emojiList = [..."🤡👻👽🐷🐸🎃🎲🍕"];

function App() {
  const [memooBloquesBarajados, setMemooBloquesBarajados] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);

  useEffect(() => {
    const barajadoEmojiLista = barajarArray([...emojiList, ...emojiList]);
    setMemooBloquesBarajados(
      barajadoEmojiLista.map((emoji, i) => ({
        index: i,
        emoji,
        flipped: false,
      }))
    );
  }, []);
  const barajarArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
      console.log(a);
    }
    return a;
  };

  const handleMemoClick = memoBlock => {
    const memoBlockInvertido = {...memoBlock, flipped:true}

    let memoBloquesBarajadosCopy = [...memooBloquesBarajados];
    memoBloquesBarajadosCopy.splice(memoBlock.index,1,memoBlockInvertido)

    setMemooBloquesBarajados(memoBloquesBarajadosCopy);
    if(selectedMemoBlock === null){
      setSelectedMemoBlock(memoBlock)
    }else if(selectedMemoBlock.emoji === memoBlock.emoji){
      setSelectedMemoBlock(null);
    } else {
      setAnimating(true)
      setTimeout(() => {
        memoBloquesBarajadosCopy.splice(memoBlock.index,1,memoBlock);
        memoBloquesBarajadosCopy.splice(selectedMemoBlock.index,1,selectedMemoBlock);
        setMemooBloquesBarajados(memoBloquesBarajadosCopy);
        setSelectedMemoBlock(null);
        setAnimating(false);
      },1000)
    }
  }

  return (
    <main>
      <Tablero memoBlocks={memooBloquesBarajados}
      handleMemoClick={handleMemoClick}
      animating={animating} />
      <div className="reiniciar-container">
       <Reiniciar />
      </div>
    </main>
  );
}

export default App;
