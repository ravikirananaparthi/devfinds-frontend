import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import ss from "../assets/ss.jpg";
import jh from "../assets/Jn.jpg";
import jonfrt from "../assets/jonfrt.jpg";
import jngo from "../assets/jngo.png"
import { FaRegCommentAlt } from "react-icons/fa";
import { TbShare3 } from "react-icons/tb";
import { BarList } from '@tremor/react';
import wter from "../assets/wter.jpeg";
import ttt from "../assets/ttt.jpeg";
import fl from "../assets/flutter.jpg";
import { FcLike } from "react-icons/fc";
import dv from "../assets/finaldev.jpg";
import dvp from "../assets/m1.png";
import dsvp from "../assets/kk.png";
import dsvpk from "../assets/ggm1.png";
import f from "../assets/fed.png";
import r from "../assets/rt.png";
import d from "../assets/dm.png";
import mc from "../assets/ml.jpg";
import s from "../assets/sn.jpg";
import { motion } from "framer-motion";
import { animateScroll } from "react-scroll";
import { useInView } from "react-intersection-observer";
import vidd from "../assets/vidd.mp4";

export default function Landing() {
  const [selectedFeature, setSelectedFeature] = useState(1);
  const [videoEnded, setVideoEnded] = useState(false);
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.2, // Adjust threshold as needed
  });
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2, // Adjust threshold as needed
  });

  useEffect(() => {
    const videoElement = document.getElementById("preloader-video");

    const handleVideoEnd = () => {
      setVideoEnded(true);
    };

    videoElement.addEventListener("ended", handleVideoEnd);

    return () => {
      videoElement.removeEventListener("ended", handleVideoEnd);
    };
  }, []);

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 });

    return () => {
      animateScroll.scrollToTop({ duration: 0 });
    };
  }, []);

  const features = [
    {
      id: 1,
      name: "Curated Learning Feed",
      description:
        "Discover and follow fellow programmers to see their latest coding projects, challenges, and learning experiences. Stay inspired and learn from the community.",
      image: f,
    },
    {
      id: 2,
      name: "Realtime Collaboration",
      description:
        "Interact with your peers! Give and receive instant feedback on projects through likes, comments, and mentions. Discuss code snippets and problem-solve together in real-time.",
      image: r,
    },
    {
      id: 3,
      name: "Direct Messaging",
      description:
        "Connect with classmates or coding buddies privately. Share ideas, ask questions, and collaborate on projects seamlessly within the platform.",
      image: d,
    },
    {
      id: 4,
      name: "Smart Notifications",
      description:
        "Stay up-to-date on what matters! Get notified about replies to your posts, comments on your projects, and messages from friends. Never miss a beat in your programming journey.",
      image: s,
    },
    {
      id: 5,
      name: "Rich Text & Multimedia ",
      description:
        "Showcase your work in style! Create detailed posts combining text, code snippets, images, and even videos to document your programming experiences and learning progress.",
      image: mc,
    },
  ];
  const datahero = [
    { name: 'Aws', value: 456 },
    { name: 'Azure', value: 351 },
    {name:'Google Cloud Platform',value:98},
  
  ]
  return (
    <motion.div
      className="bg-black text-white min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {!videoEnded && (
        <div className="preloader flex justify-center items-center h-lvh">
          <video
            id="preloader-video"
            autoPlay
            muted
            
            className="object-cover w-[45rem] h-[20rem] "
          >
            <source src={vidd} type="video/mp4" />
          </video>
        </div>
      )}
  
      {videoEnded && (
        <div className="content">
          {/* Rest of your webpage content */}
          <header
            ref={headerRef}
            className="py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-blue-400 to-purple-600"
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.5 }}
          >
            <div className="container flex flex-col items-center justify-center gap-6 px-4 text-center md:gap-8 md:px-6">
              <div className="max-w-screen-lg ">
                <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl ">
                  Welcome to <span className="text-black">DevFinds</span> - Where
                  Programming Experiences Connect!
                </h1>
                <p className="mt-4 text-lg text-gray-200 md:text-xl lg:text-base">
                  Welcome to DevFinds – where programmers document their journey in
                  the realm of code! Share your coding escapades through text,
                  images, and videos, inspiring and learning from fellow
                  enthusiasts. Join us in weaving a tapestry of experiences that
                  enrich our collective programming odyssey!
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <Link to="/app/register" className="btn-primary btn-primary:hover">
                  Sign Up
                </Link>
                <Link to="/app/login" className="btn-secondary">
                  Log In
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mt-4[cdcd">
                {/* First Image */}
                <div className="mx-auto max-w-full md:max-w-[700px] overflow-hidden">
                  <img
                    src={dsvp}
                    alt="Description of the first image"
                    className="object-cover w-full h-[350px] md:h-[300px] rounded-lg"
                  />
                </div>
                {/* Second Image */}
                <div className="mx-auto max-w-full md:max-w-[700px] overflow-hidden">
                  <img
                    src={dvp}
                    alt="Description of the second image"
                    className="object-cover w-full h-[350px] md:h-[300px] rounded-lg"
                  />
                </div>
                {/* Third Image */}
                <div className="mx-auto max-w-full md:max-w-[700px] overflow-hidden">
                  <img
                    src={dsvpk}
                    alt="Description of the third image"
                    className="object-cover w-full h-[350px] md:h-[300px] rounded-lg"
                  />
                </div>
              </div>
            </div>
          </header>
  
          <main className="flex-1">
            <section
              ref={sectionRef}
              className="py-12 md:py-24 lg:py-32"
              initial={{ opacity: 0, y: 50 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.5 }}
            >
              <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10 lg:grid-cols-2">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Capture your experiences
                  </h2>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl lg:text-base dark:text-gray-400">
                    Share your journey with the world. Let others learn from your
                    experiences.
                  </p>
                  <div className="flex flex-col gap-2 min-[400px] md:flex-row justify-center">
                    <Link
                      to="/app/login"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    >
                      Get the App
                    </Link>
                    <ScrollLink
                      to="connect"
                      spy={true}
                      smooth={true}
                      duration={500}
                      className="inline-flex h-10 items-center justify-center rounded-md border  border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    >
                      Learn more
                    </ScrollLink>
                  </div>
                </div>
                <div className="mx-auto max-w-full md:max-w-[700px] overflow-hidden">
                  <img
                    src={dv}
                    alt="Description of the third image"
                    className="object-cover w-full sm:h-[350px] md:h-[450px] rounded-lg"
                  />
                </div>
              </div>
            </section>
            <section class="flex flex-col lg:flex-row">
              <nav class="bg-gray-800 w-full lg:w-1/4 overflow-y-auto rounded-2xl py-4 px-4 flex flex-col">
                <h2 class="text-lg font-semibold text-gray-300 mb-4">Features</h2>
                <ul class="space-y-2">
                  {features.map((feature) => (
                    <li
                      key={feature.id}
                      class="py-2 px-4 rounded-md hover:bg-gray-600 text-gray-200"
                    >
                      <button onClick={() => setSelectedFeature(feature.id)}>
                        {feature.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
  
              <main class="lg:w-3/4 bg-teal-100 flex-grow overflow-y-auto px-4 py-4">
                {selectedFeature ? (
                  <div class="bg-white shadow-md rounded-lg px-8 py-6 flex items-center md:h-[300px]">
                    <img
                      src={
                        features.find((feature) => feature.id === selectedFeature)
                          .image
                      }
                      alt={
                        features.find((feature) => feature.id === selectedFeature)
                          .name
                      }
                      class="w-24 h-24 mr-4 object-cover rounded-full"
                    />
                    <div>
                      <h2 class="text-2xl font-semibold text-teal-700 mb-4">
                        {
                          features.find((feature) => feature.id === selectedFeature)
                            .name
                        }
                      </h2>
                      <p class="text-gray-700">
                        {
                          features.find((feature) => feature.id === selectedFeature)
                            .description
                        }
                      </p>
                    </div>
                  </div>
                ) : (
                  <h1 class="text-2xl font-semibold text-teal-700">
                    Check out Features
                  </h1>
                )}
              </main>
            </section>
  
            <section
              id="connect"
              className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-puk via-slate-400 to-puk"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Connect with others
                  </h2>
                  <p className="mx-auto max-w-[700px] text-black md:text-xl lg:text-base">
                    Join the community. Share your work based experiences and learn
                    from others.
                  </p>
                </div>
                <div className="md:flex justify-between">
                <div className="w-full md:w-1/3 bg-gray-200 p-4 rounded-lg flex items-start mb-4 md:mr-4"> 
    <img src={jonfrt} className="w-10 h-10 rounded-full mr-2" alt="Profile Picture" />
    <div>
      <div className="flex items-center">
        <span className="text-black font-sans font-semibold">John Doe</span>
      </div>
      <p className="text-black mt-0 mr-40">Software Engineer</p>
      <div className="text-gray-700 whitespace-normal mt-2">
        <p className="text-left">
          In the vibrant world of Flutter, I've sculpted sleek interfaces and
          breathed life into dynamic mobile apps, relishing the harmony of Dart's
          simplicity and Flutter's power. Flutter's hot reload is my creative pulse,
          allowing rapid iteration and seamless debugging. Embrace the Flutter
          community; forums, blogs, and GitHub repositories are treasure troves of
          wisdom. Dive into official documentation and tutorials for a structured
          learning path. Flutter's widget-based architecture empowers creativity;
          experiment fearlessly to unlock its full potential. Flutter's journey is
          as much about learning as it is about building; celebrate every milestone
          and setback as steps towards mastery. Flutter isn't just a framework;
          it's a passport to crafting delightful user experiences that resonate across
          platforms and devices.
        </p>
        <div className="mt-6 flex items-center">
  <FcLike className="mr-1 md:mr-2" />
  <p className="">1.1m</p>
  <FaRegCommentAlt className="ml-12 md:ml-14" />
  <TbShare3  className="ml-20 md:ml-20"/>
</div>


      </div>
    </div>
  </div>
  <div className="w-full md:w-1/3 bg-gray-200 p-4 rounded-lg flex items-start mb-4 md:mr-4">
  <img src={ttt} className="w-10 h-10 rounded-full mr-2" alt="Profile Picture" />
  <div>
      <div className="flex items-center">
        <span className="text-black font-sans font-semibold">Hwa Young</span>
      </div>
      <p className="text-black mt-0 mr-40">Data Analyst</p>
      <div className="text-gray-700 whitespace-normal mt-2">
        <p className="text-left">
        In the realm of Django for just a month, I've journeyed through a maze of models, views, and templates, each unveiling a new layer of web development magic. Embrace the errors, they're breadcrumbs leading to mastery. Django's documentation is a treasure map; follow it diligently. Build not just websites, but ecosystems where data flows gracefully and user experiences shine. With Django, every line of code is a brushstroke in crafting digital art; wield it with intention and creativity.
        </p>
        <img src={jngo} className="w-max rounded-xl h-44 mt-4" />
      </div>
      <div className="mt-6 flex items-center">
  <FcLike className="mr-1 md:mr-2" />
  <p className="">796K</p>
  <FaRegCommentAlt className="ml-12 md:ml-14" />
  <TbShare3  className="ml-20 md:ml-20"/>
</div>
    </div>
  </div>
  <div className="w-full md:w-1/3 bg-gray-200 p-4 rounded-lg flex items-start mb-4 md:mr-4">
  <img src={wter} className="w-10 h-10 rounded-full mr-2" alt="Profile Picture" />
  <div>
      <div className="flex items-center">
        <span className="text-black font-sans font-semibold">Amelia</span>
      </div>
      <p className="text-black mr-40">Cloud Engineer</p>
      <div className="text-gray-700 whitespace-normal mt-2">
        <p className="text-left">
        As a Cloud Engineer deeply entrenched in the realm of cloud technology, I've seen firsthand the transformative power it holds for businesses of all sizes. Today, I want to open up a discussion and poll regarding two titans in the cloud computing arena: AWS (Amazon Web Services) and Azure (Microsoft Azure).
        </p>       
      </div>
      <div className="mt-3">
      <BarList data={datahero} barColor="turp" className="mx-auto max-w-sm h-52 text-black p-4 rounded-lg shadow-md" /></div>
      <div className="mt-20 flex items-center">
  <FcLike className="mr-1 md:mr-2" />
  <p className="">500k</p>
  <FaRegCommentAlt className="ml-12 md:ml-14" />
  <TbShare3  className="ml-20 md:ml-20"/>
</div>



    </div>
   
  </div>
</div>


              </div>
            </section>
          </main>
          <footer className="py-10 lg:py-14 xl:py-18">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:gap-6 md:px-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2023 DEV FINDS. All rights reserved.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <a
                  href="#"
                  className="rounded-full border border-gray-200 bg-white w-8 h-8 flex items-center justify-center shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                >
                  <StarIcon className="h-4 w-4" />
                  <span className="sr-only">Go to Twitter</span>
                </a>
                <a
                  href="#"
                  className="rounded-full border border-gray-200 bg-white w-8 h-8 flex items-center justify-center shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                >
                  <StarIcon className="h-4 w-4" />
                  <span className="sr-only">Go to Facebook</span>
                </a>
                <a
                  href="#"
                  className="rounded-full border border-gray-200 bg-white w-8 h-8 flex items-center justify-center shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                >
                  <StarIcon className="h-4 w-4" />
                  <span className="sr-only">Go to Instagram</span>
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}
    </motion.div>
  );
}  

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
