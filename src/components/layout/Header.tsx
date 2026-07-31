import Logo from "../navigation/Logo";
import Delivery from "../navigation/Delivery";
import SearchBar from "../navigation/SearchBar";
import Language from "../navigation/Language";
import Account from "../navigation/Account";
import Orders from "../navigation/Orders";
import Cart from "../navigation/Cart";

function Header() {
    return (
        <header className="header">
            <Logo />
            <Delivery />
            <SearchBar />
            <Language />
            <Account />
            <Orders />
            <Cart />
        </header>
    );
}

export default Header;