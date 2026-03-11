import Header from "../Header";
import Footer from "../Footer";

const LayoutProfile = ({children}) => {
    window.changeOverlayStyle = (newStyle) => {
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            Object.assign(overlay.style, newStyle);
        }
    };
    return(
        <div>
            <Header/>
            <main className="main-content">{children}</main>
            <Footer/>
            <div className="overlay"/>
        </div>
    );
};

export default LayoutProfile;