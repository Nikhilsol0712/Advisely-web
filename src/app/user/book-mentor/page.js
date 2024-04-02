"use client";
import React, { useEffect, useState } from "react";
// components
import MentorCard from "@/app/components/MentorCard/MentorCard";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import SubCategoriesList from "@/app/components/SubCategoriesList/SubCategoriesList";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import subCategoryServices from "@/app/services/subCategoryService";
import userServices from "@/app/services/userService";
import {
  fetchAllSubCategoriesRequest,
  fetchAllSubCategoriesSuccess,
  fetchAllSubCategoriesFailure,
} from "../../Actions/subCategoryActions";
import {
  fetchAllMatchingSMERequest,
  fetchAllMatchingSMESuccess,
  getAllSmeRequest,
  getAllSmeSuccess,
} from "../../Actions/userActions";

const Page = () => {
  const { allMathcingSME } = useSelector((state) => state.user);
  const { selectedSubCategory } = useSelector((state) => state.subCategory);
  const { AllSme } = useSelector((state) => state.user);
  const smeDataToMap = selectedSubCategory !== null ? allMathcingSME : AllSme;

  const [filteredSmeData, setFilteredSmeData] = useState([]);

  useEffect(() => {
    // Set filteredSmeData to initial smeDataToMap when component mounts
    setFilteredSmeData(selectedSubCategory !== null ? allMathcingSME : AllSme);
  }, [selectedSubCategory, allMathcingSME, AllSme]);

  const dispatch = useDispatch();
  const fetchAllSubCategories = async () => {
    try {
      dispatch(fetchAllSubCategoriesRequest());
      const response = await subCategoryServices.getAllsubCategories();
      if (response.success === true) {
        dispatch(fetchAllSubCategoriesSuccess(response.result));
      }
    } catch (err) {
      console.log(err);
    }
  };


  const fetchAllSme = async () => {
    try {
      dispatch(getAllSmeRequest());
      const response = await userServices.findAllSme();
      if (response.success === true) {
        dispatch(getAllSmeSuccess(response.result));
      }
    } catch (err) {
      // dispatch(getAllSmeFailure(response.error));
    }
  };
  
  const fetchAllSmeBySubCatId = async () => {
    try {
      dispatch(fetchAllMatchingSMERequest());
      if (selectedSubCategory !== null) {
        const response = await userServices.findSmeBySubCatID(
          selectedSubCategory
        );
        if (response.success === true) {
          dispatch(fetchAllMatchingSMESuccess(response.result));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllSme();
    fetchAllSubCategories();
  }, []);

 

  useEffect(() => {
    fetchAllSmeBySubCatId();
  }, [selectedSubCategory]);

  return (
    <div className="flex  mt-16  sm:h-screen text-black flex-row  ">
      <div className="flex w-full  flex-col">
        <div className="w-full mt-2 flex items-center justify-center">
          <SearchBar
            smeDataToMap={smeDataToMap}
            setFilteredSmeData={setFilteredSmeData}
          />
        </div>
        <div className="w-full bg-pink-300  mt-1">
          <SubCategoriesList />
          <hr />
        </div>
        <div className=" p-2 mt-1 overflow-y-auto no-scrollbar max-h-screen sm:max-h-screen ">
          <div className="flex flex-wrap mb-56 sm:mb-56 gap-10 items-center justify-center">
            {filteredSmeData.map((smeData) => (
              <Link href={`/user/${smeData._id}`} key={smeData._id}>
                <div
                  onClick={(e) => {
                    e.preventDefault(); // Prevents navigation to the link URL
                    window.open(`/user/${smeData._id}`, "_blank"); // Opens link in a new tab
                  }}
                >
                  <MentorCard
                    profileImg={smeData.profilePic}
                    firstName={smeData.firstName}
                    lastName={smeData.lastName}
                    bio={smeData.bio}
                    reviews={smeData.reviews}
                    sessions={smeData.sessions}
                    smeData={smeData}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
