import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { createContext, useState } from "react";
import { IJwtResponse } from "../dto/IJwtResponse";

export const JwtContext = createContext<{jwtResponse: IJwtResponse | null, setJwtResponse: ((data: IJwtResponse) => void) | null}>({jwtResponse: null, setJwtResponse: null});

const Root = () => {

    const [jwtResponse, setJwtResponse] = useState(null as IJwtResponse | null);
    
    return (
        <JwtContext.Provider value={{jwtResponse, setJwtResponse}}>
            <div className="blur-circle blur-circle-1-color blur-circle-1-location blur-circle-container"></div>
            <div className="blur-circle blur-circle-1-color blur-circle-2-location blur-circle-container"></div>
            <div className="blur-circle blur-circle-2-color blur-circle-3-location blur-circle-container"></div>
            <div className="blur-circle blur-circle-2-color blur-circle-4-location blur-circle-container"></div>
            <Header />
            <div className="container">
                <main role="main" className="pb-3">
                    <Outlet/>
                </main>
            </div>
            <Footer />
        </JwtContext.Provider>
    );
}

export default Root;