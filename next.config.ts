import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    domains: ["res.cloudinary.com", "placehold.co"],
  },

  port : {
    default : 3000,
    https : 443,
  },
  experimental  : {
    ppr : "incremental" , 
    after : true 
  },
  devIndicators : {
    appIsrStatus : true , 
    buildActivity : true ,
    buildActivityPosition  : 'bottom-right'
  }
};

export default nextConfig;
