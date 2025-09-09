import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi ", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 50lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false); // ✅ for mobile filter toggle
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  const clearFilters = () => {
    setSelectedValue("");
  };

  return (
    <div className="w-full">
      {/* ✅ Filter Toggle Button (only visible on mobile) */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          {isOpen ? "Close Filters" : "Open Filters"}
        </button>
      </div>

      {/* ✅ Sidebar (always visible on desktop, toggle on mobile) */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block bg-white p-6 rounded-lg shadow-md font-sans`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-xl text-gray-900">Filter Jobs</h1>
          {selectedValue && (
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:underline font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
              aria-label="Clear all filters"
            >
              Clear
            </button>
          )}
        </div>
        <hr className="mb-5 border-gray-200" />

        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((data, index) => (
            <div key={index} className="mb-6">
              <h2 className="font-semibold text-md mb-3 text-gray-800">
                {data.filterType}
              </h2>
              <div className="space-y-2">
                {data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  const isSelected = selectedValue === item;
                  return (
                    <div
                      key={itemId}
                      className={`flex items-center space-x-3 cursor-pointer rounded-md px-3 py-2 select-none transition-colors duration-200 ${
                        isSelected
                          ? "bg-blue-50 border border-blue-300"
                          : "hover:bg-gray-50 border border-transparent"
                      }`}
                      onClick={() => changeHandler(item)}
                    >
                      <RadioGroupItem
                        value={item}
                        id={itemId}
                        className="ring-offset-white focus:ring-blue-500"
                      />
                      <Label
                        htmlFor={itemId}
                        className={`cursor-pointer select-none ${
                          isSelected
                            ? "font-semibold text-blue-700"
                            : "text-gray-700"
                        }`}
                      >
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
