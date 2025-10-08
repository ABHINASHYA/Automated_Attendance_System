import React from "react";
import att from '../assets/attendance.png'

const Hero = () => {
    return (
        <>
            <div className="bg-gradient-to-br from-blue-800 to-cyan-200 min-h-screen flex items-center justify-center">
                <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl px-6 mt-[-100px]">
                    {/* Left: Content */}
                    <div className="md:w-1/2 w-full mb-8 md:mb-0">
                        <h1 className="text-white text-6xl md:text-5xl font-bold mb-9">
                            Smart Attendance System for Rural School
                        </h1>
                        <p className="text-white text-2xl">
                            Empowering schools with automated, reliable attendance tracking.
                        </p>
                    </div>
                    {/* Right: Image */}
                    <div className="md:w-1/2 w-full flex justify-center">
                        <img
                            src={att}
                            alt="Attendance System"
                            className="rounded-lg  w-80 h-80 object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;