
import "../styles/Card.css"
import pokeball from "../assets/pokeball.png"



export default function Card({name, src, handleCardClick}) {

    const handleClick = () => {
        handleCardClick(name)
    }

    return (
        <div className="card" onClick={handleClick}>
            <div className="card-img-container">
                {
                    (src)? 
                    (<img src={src} alt={name}/>):
                    (<img className="pokeball-spin" src={pokeball} alt={name}/>)
                }
            </div>
            <div className="card-name">{(name)?(name.toUpperCase()):("Loading")}</div>
        </div>
    );
}