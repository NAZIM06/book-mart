import  { useState } from 'react';

const Tools = ({ text, children }) => {

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    }
    const handleMouseLeave = () => {
        setHover(false);
    }

    return (
        <div className="relative">
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {children}
            </div>
            {hover &&
                <div className="absolute top-full text-xs text-center font-normal transform  -translate-x-1/2 bg-white text-gray-700 p-2 rounded-md">
                    {text}
                </div>
            }
        </div>
    );
};

export default Tools;