import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';
import { Button } from '../ui/button';
import { setSearchedQuery } from '@/redux/jobSlice'; // Adjust path as needed

const category = [
  // Tech Roles
  "Frontend Developer",
  "Backend Developer",
  "FullStack Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Mobile App Developer",
  "UI/UX Designer",
  // Non-Tech Roles
  "Graphic Designer",
  "Content Writer",
  "Digital Marketing",
  "Sales Executive",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full ">
      <Carousel className="w-full max-w-5xl mx-auto mt-6 mb-10 px-4">
        <CarouselContent className="flex items-center -ml-2 md:-ml-4">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full px-4 py-2 text-xs sm:text-sm font-medium
                           hover:bg-purple-600 hover:text-white hover:border-purple-600
                           transition-all duration-200 shadow-sm hover:shadow-md
                           whitespace-nowrap w-full max-w-full text-center
                           border-gray-300 text-gray-700"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious 
          className="rounded-full shadow-md hover:bg-gray-100 border-gray-300
                     -left-4 md:-left-6 h-10 w-10" 
        />
        <CarouselNext 
          className="rounded-full shadow-md hover:bg-gray-100 border-gray-300
                     -right-4 md:-right-6 h-10 w-10" 
        />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;