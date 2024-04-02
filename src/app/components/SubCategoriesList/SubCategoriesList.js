import React from "react";
import "./subcategoryList.css";
import { FaSchool } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { GrCloudSoftware } from "react-icons/gr";
import { GiCyberEye } from "react-icons/gi";
import { TbCloudComputing } from "react-icons/tb";
import { BiSolidDirections } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { SiYourtraveldottv } from "react-icons/si";
import { PiStrategyBold } from "react-icons/pi";
import { MdAddHomeWork } from "react-icons/md";
import { FaPeopleCarry } from "react-icons/fa";
import { RiMentalHealthFill } from "react-icons/ri";
import { HiAcademicCap } from "react-icons/hi";
import { RiPresentationFill } from "react-icons/ri";
import { DiCodeBadge } from "react-icons/di";
import { useDispatch, useSelector } from "react-redux";
import { slectedSubcategory } from "../../Actions/subCategoryActions";
import { IoIosFitness } from "react-icons/io";
import { TbRibbonHealth } from "react-icons/tb";
import { IoNutrition } from "react-icons/io5";
import { GiPayMoney } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { GiWallet } from "react-icons/gi";
import { SiHtmlacademy } from "react-icons/si";
import { BsFillWrenchAdjustableCircleFill } from "react-icons/bs";
import { FaLaptopCode } from "react-icons/fa";

const SubCategoriesList = () => {
  const { subCategories } = useSelector((state) => state.subCategory);
  const dispatch = useDispatch();
  const getIconForSubcategory = (subcategoryName) => {
    switch (subcategoryName) {
      case "University Selection":
        return <FaSchool />;
      case "Exam Preparation":
        return <FaBookReader />;
      case "Software Development":
        return <GrCloudSoftware />;
      case "Cybersecurity":
        return <GiCyberEye />;
      case "Cloud Computing":
        return <TbCloudComputing />;
      case "Application Process Guidance":
        return <BiSolidDirections />;
      case "Scholarship and Funding Assistance":
        return <GiReceiveMoney />;
      case "Visa Application Support":
        return <SiYourtraveldottv />;
      case "Language Learning Strategies":
        return <PiStrategyBold />;
      case "Accommodation Guidance":
        return <MdAddHomeWork />;
      case "Career Planning Post-Study":
        return <FaPeopleCarry />;
      case "Mental Health and Well-being Abroad":
        return <RiMentalHealthFill />;
      case "Study Abroad Essentials Checklist":
        return <HiAcademicCap />;
      case "Pre-Departure Preparation":
        return <RiPresentationFill />;
      case "Developer":
        return <DiCodeBadge />;
      case "Fitness Training":
        return <IoIosFitness />;
      case "Mental Health":
        return <TbRibbonHealth />;

      case "Nutrition":
        return <IoNutrition />;

      case "Investment Planning":
        return <GiPayMoney />;

      case "Tax Consultation":
        return <RiMoneyDollarCircleFill />;

      case "Retirement Planning":
        return <GiWallet />;

      case "Academic Support":
        return <SiHtmlacademy />;

      case "Cultural Adjustment and Integration":
        return <BsFillWrenchAdjustableCircleFill />;

      case "Internship and Job Opportunities":
        return <FaLaptopCode />;

      default:
        return null;
    }
  };

  const setSelectedSubCategory = (selectedSubCat) => {
    dispatch(slectedSubcategory(selectedSubCat?._id));
  };

  return (
    <section className="bg-white p-2  flex flex-row gap-x-8 justify-start items-center overflow-x-scroll no-scrollbar">
      {subCategories.map((subcategory) => (
        <div
          onClick={() => setSelectedSubCategory(subcategory)}
          key={subcategory._id}
          style={{ color: "#718096" }}
          className="bg-white min-w-28   p-1 gap-2 ml-4 hover:cursor-pointer flex flex-col items-center justify-center"
        >
          <div className="text-[1.8rem]">
            {getIconForSubcategory(subcategory.name)}
          </div>
          <span className="text-[0.6rem] font-medium text-center">
            {subcategory.name}
          </span>
        </div>
      ))}
    </section>
  );
};

export default SubCategoriesList;
