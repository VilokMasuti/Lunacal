import { useState, useEffect } from 'react';
import {  Tab, } from '@headlessui/react';
import { PlusCircleIcon, ChevronLeftIcon, ChevronRightIcon, TrashIcon, QuestionMarkCircleIcon,  } from '@heroicons/react/24/outline';

const App = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch real images from the API on mount
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('https://picsum.photos/v2/list?page=1&limit=5');
      const data = await response.json();
      const imageUrls = data.map((img) => img.download_url);
      setImages(imageUrls);
    };
    
    fetchImages();
  }, []);

  const addImage = async () => {
    const response = await fetch('https://picsum.photos/200');
    const newImageUrl = response.url;
    setImages([...images, newImageUrl]);
  };

  const deleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    if (currentIndex >= updatedImages.length) {
      setCurrentIndex(updatedImages.length - 1);
    }
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="min-h-screen  bg-[#1f2227] flex items-center justify-center p-4 sm:p-8">
      <div className="flex w-full max-w-6xl space-y-6 md:space-x-6">
        {/* Empty left side on larger screens */}
        <div className="hidden md:block w-1/2"></div>

        {/* Right side containing the content */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="bg-[#363C43] rounded-lg p-6 shadow-lg relative">
          <div className=' absolute left-[5px]  top-[9px]'>
<QuestionMarkCircleIcon className=' w-5 h-5  text-white bg-gray-500 outline-none rounded-full    opacity-70 shadow-slate-300  shadow-sm' />
          </div>
          
            <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
              <Tab.List className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 py-1 items-center justify-center sm:space-y-0 w-[500px] max-sm:w-[400px] ml-2 rounded-lg bg-black     mb-6 pl-2">
                {['About Me', 'Experiences', 'Recommended'].map((tab, ) => (
                  <Tab
                  key={tab}
                  className={({ selected }) =>
                    `group relative px-5 py-2 text-sm font-medium rounded-md focus:outline-none text-white shadow-black shadow-lg overflow-hidden ${
                      selected
                        ? 'bg-gray-800 text-white'
                        : ' hover:bg-slate-900 transition-all duration-500 group-hover:h-full'
                    }`
                  }
                >
   
                  
                  {/* Tab content */}
                  <span className="relative z-10">{tab}</span>
                </Tab>
                ))}
              </Tab.List>
              <Tab.Panels >
             
                <Tab.Panel>
                  <p className="text-gray-500 ">
                    Hello! Im Dave, your sales rep here from Salesforce. Ive been working at this awesome company for 3 years now.
                  </p>
                  <p className="text-gray-500 mt-4">
                    I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with my wife Tiffany and my 4-year-old twin daughters—Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9-10 AM. This is a...
                  </p>
                </Tab.Panel>
                <Tab.Panel>
                  <p className="text-gray-500">Experiences content goes here.</p>
                </Tab.Panel>
                <Tab.Panel>
                  <p className="text-gray-500">Recommended content goes here.</p>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
    <div className=' border border-gray-600'></div>
          {/*from here Gallery code------------------------------------------------------------------------------------------------------*/}

          <div className="bg-[#363C43] rounded-lg p-6 shadow-lg">
          
          
            <div className="flex justify-between items-center mb-6 relative">
            <div className=' absolute left-[-20px]  top-[-10px]'>
            <QuestionMarkCircleIcon className=' w-5 h- shadow-sm  shadow-slate-300  bg-gray-500 outline-none rounded-full  text-white opacity-70' />
                      </div>
   
              <h2 className="text-white px-7 py-2 rounded-full font-semibold ml-2  bg-zinc-950 shadow-sm ">Gallery</h2>
              <button
                onClick={addImage}
                className=" text-white px-3 py-3    shadow-black shadow-md  rounded-full bg-gray-900 text-sm flex items-center"
              >
                <PlusCircleIcon className="w-5 h-5 mr-1 " />
                Add Image
              </button>
            </div>
            <div className="relative">
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {images.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`Gallery image ${index + 1}`}
                      className={`w-32 h-32 object-cover rounded-lg transition-transform duration-300  hover:scale-125  hover:duration-1000 ${
                        index === currentIndex ? 'transform scale-110' : ''
                      }`}
                    />
                    <button
                      onClick={() => deleteImage(index)}
                      className="absolute top-0 right-0 bg-red-600 p-1 rounded-full"
                    >
                      <TrashIcon className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
              {images.length > 0 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-[-10px]  top-[150px] shadow-stone-500   shadow-lg transform -translate-y-1/2 bg-gray-700 p-1 rounded-full"
                  >
                    <ChevronLeftIcon className="w-5 h-5  text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute  right-[-10px]  shadow-stone-500   shadow-lg  top-[150px] transform -translate-y-1/2 bg-gray-700 p-1 rounded-full"
                  >
                    <ChevronRightIcon className="w-5 h-5 text-white" />
                  </button>
                </>
              )}
            </div>
          
          </div>
              <div className=' border border-gray-600'></div>
        </div>
      </div>
    </div>
  );
};

export default App;
