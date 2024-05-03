import { createContext, useContext, useState } from "react";
import LoadingBar from 'react-top-loading-bar'

const LoaderContext = createContext();

const LoaderProvider = ({ children }) => {
    const [progress, setProgress] = useState(0);


    const manageProgress = () => {
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 0;
                }
                return prevProgress + 10;
            });
        }, 100);
    }

    return (
        <LoaderContext.Provider value={{ manageProgress, progress, setProgress }}>
            {children}
        </LoaderContext.Provider>
    );
}

const useLoaderContext = () => {
    return useContext(LoaderContext)
}

export { LoaderProvider, useLoaderContext }