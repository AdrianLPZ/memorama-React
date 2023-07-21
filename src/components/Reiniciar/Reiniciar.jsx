import'./Reiniciar.css'

const reiniciar = () => {
  setTimeout(() => {
    window.location.reload()
  }, 200);
  
}

export function Reiniciar(){
  return(
    <button className="reiniciar"
    onClick={reiniciar} >
      REINICIAR
    </button>
  );
}