import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { money } from "../assets";
import { CustomButton, FormField } from "../components";
import { checkIfImage } from "../utils";
import { useStateContext } from "../context";

function CreateCharity() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: 0,
    deadline: "",
    image: "",
  });
  const { createCharity } = useStateContext();

  function handleFormFieldChange(
    field: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (field === "target") {
      setForm({ ...form, [field]: parseFloat(e.target.value) }); // Convert string to number
    } else {
      setForm({ ...form, [field]: e.target.value });
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCharity({ ...form, target: form.target });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("provide valid image");
        setForm({ ...form, image: "" });
      }
    });

    console.log(form);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center item-center flex-col rounded-[10px] sm:p-10 p-4 mt-[20px] md:m-[30px]">
      {isLoading && "Loading..."}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leanding-[38px] text-white">
          Start a Charity.
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)} // Fix the field name here
          />
          <FormField
            labelName="Charity Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>
        <FormField
          labelName="Story *"
          placeholder="Write your story why you want to raise a charity."
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="w-full flex justify-center items-center p-4 bg-[#8c6dfd] h-120px rounded-[10px]">
          <img
            src={money}
            alt="Money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the charity amount :
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px] text-white">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="number"
            value={form.target.toString()}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <FormField
          labelName="Charity Image *"
          placeholder="Place url of your Charity"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <div className="flex justify-center item-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new charity"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateCharity;
