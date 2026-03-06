
import React from "react";
import { Link } from "react-router-dom";
import SplitText from "./SplitText";
import TiltedCard from "../dashboard/TiltedCard";
import Hyperspeed from "./Hyperspeed";
import CircularGallery from "../dashboard/CircularGallery";
import { motion } from "framer-motion"; 
import dogecoin from "../Images/dogcoin.webp";
import yb2 from "../Images/yb2.jpg";

const keyFeatures = [
  { title: "Real-Time Tracking", description: "Get live cryptocurrency prices and market trends updated every second." },
  { title: "Portfolio Management", description: "Monitor your assets and transactions in an intuitive dashboard." },
  { title: "Historical Data & Charts", description: "View detailed price history and analytics to make informed decisions." },
  { title: "Custom Watchlist", description: "Save your favorite coins and get instant alerts on price movements." },
];
const Dashboard = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-cover bg-center" 
    style={{ backgroundImage: `url(${yb2})`}}>
      {/* Background Animation */}
      <div className="fixed inset-0">
        <Hyperspeed  
          effectOptions={{
            onSpeedUp: () => { },
            onSlowDown: () => { },
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xFFFFFF,
              brokenLines: 0xFFFFFF,
              leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
              rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
              sticks: 0x03B3C3,
            }
          }}
        />
      </div>

      {/* Top-left Animated Text with Wider Width */}
      <div className="relative top-10 left-10 w-[700px]">
        <SplitText
          text="A cryptocurrency portfolio tracker is a digital platform, such as an app or website, that enables you as an investor to keep track of the ever-changing value of your different coins so that you can manage your portfolio properly"
          className="text-4xl font-semibold text-white"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)" }}
          delay={20}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
        />
        
        {/* Center Home Button Right Below Text */}
        <motion.div 
            className="mt-6"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link
            
              to="/home"
              className="px-14 py-3 bg-yellow-500 text-black text-lg font-semibold rounded-lg shadow-lg 
                          transition duration-300 transform hover:bg-black-600 hover:scale-105"
            >
             Go to Home
            </Link>
          </motion.div>
      </div>
      {/* className="px-14 py-3 bg-yellow-500 text-black text-lg font-semibold rounded-lg shadow-lg 
      transition duration-300 transform hover:bg-black-600 hover:scale-105" */}
      {/* Top-right Tilted Card */}
      <motion.div
        className="absolute top-10 right-12 max-w-md"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
      
        <TiltedCard
          imageSrc={dogecoin}
          altText="Track your Crypto"
          captionText="Just Check out the prices breh"
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={12}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={<p className="tilted-card-demo-text">Track your Crypto</p>}
        />
     

      </motion.div>
      

      {/* Circular Gallery at Bottom with Reduced Gap */}
      {/* <div className="absolute bottom-2 w-full" style={{ height: '400px' }}>
        <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
      </div> */}
    <br>
    </br>
      <motion.div 
        className="relative bottom-0 w-full"
        style={{ height: '400px' }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
      </motion.div>

      {/* Key Features Section - Step-by-Step Animation */}
      <div className="relative bottom-1 left-1/2 transform -translate-x-1/2 w-[80%]">
        <h2 className="text-center text-3xl font-semibold text-white mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
          {keyFeatures.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-yellow-500 text-black p-5 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3, ease: "easeOut" }}
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm opacity-80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>


    </div>
  );
};

 export default Dashboard;


