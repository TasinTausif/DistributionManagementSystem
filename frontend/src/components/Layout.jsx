import Navbar from './Navbar';

function Layout({ children }) {
    return (
        <div className="app">
            <Navbar />
            <div className="content">
                {children}
            </div>
        </div>
    );
}

export default Layout;
