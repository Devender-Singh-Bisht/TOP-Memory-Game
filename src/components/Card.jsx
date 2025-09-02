
import "../styles/Card.css"
import pokeball from "../assets/pokeball.png"



export default function Card({name, src}) {

    return (
        <div className="card">
            <div className="card-img-container">
                <img src={(!src)?(pokeball):(src)} alt={name} />
            </div>
            <div className="card-name">{(!name)?("Loading"):(name.toUpperCase())}</div>
        </div>
    );
}