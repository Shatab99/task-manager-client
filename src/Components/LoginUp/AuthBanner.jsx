import banner from '../../assets/images/SL_0210121_40570_75.jpg'
import { Typewriter } from 'react-simple-typewriter'
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useState } from 'react';

const AuthBanner = () => {

    const [showSignIn , setShowSignIn]= useState(true)

    return (
        <div className="hero text-gray-300 min-h-screen bg-base-200" style={{ backgroundImage: `url(${banner})` }}>
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold lg:w-[700px]">
                        <Typewriter
                            delaySpeed={1000}
                            deleteSpeed={25}
                            loop={0}
                            typeSpeed={75}
                            words={[
                                'Hello There',
                                'Welcome to Online Task Manager',
                                'Feel Free to Sign in / Sign Up',
                                'To continue '
                            ]}
                        />
                    </h1>

                </div>
                {
                    showSignIn ? <SignIn setShowSignIn={setShowSignIn}/>:
                    <SignUp setShowSignIn={setShowSignIn}/>
                }
            </div>
        </div>
    );
};

export default AuthBanner;