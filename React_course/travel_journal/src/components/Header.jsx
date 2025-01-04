import logo from "../images/globe.png"

function Header() {
    return (
        <header>
            <img className="globe-logo" src={logo} alt="globe logo" />
            <h1>my travel journal.</h1>
        </header>
    )
}

export default Header