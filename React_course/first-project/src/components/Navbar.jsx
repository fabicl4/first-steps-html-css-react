import logo from "../assets/react.svg"

function Navbar()
{
    return (
        <header>
            <nav className="nav-header">
                <img className="nav-logo" src={logo} alt="react logo"/>
                <span className="nav-title">ReactFacts</span>
            </nav>
        </header>
    )
}

export default Navbar