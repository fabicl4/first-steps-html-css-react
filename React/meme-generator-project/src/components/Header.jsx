import logo from "../images/troll-face.png"

export default function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Meme generator logo"/>
            <h1>Meme Generator</h1>
        </header>
    )
}