const ButonIndex = () => {
    const handleClick = () => {
        window.location.href = "/";
      }
      return (
        <button  className="button-index" onClick={handleClick}>
          Volver
        </button>
      );
    }
    
export default ButonIndex;