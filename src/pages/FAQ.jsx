import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);

  const navigate = useNavigate();
  const handleSignupCustClick = () => {
    navigate("/signupCust");
  };

  useEffect(() => {
    fetch("https://backend-taskmate.onrender.com/faqs")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("data", data); // Log to check data structure

        // Assuming the data is an object with a property containing the array
        const faqArray = data.faqs || [];
        const generalFaqs = faqArray.filter(
          (faq) => faq.audience === "general"
        );

        setFaqs(generalFaqs);
        console.log("Filtered general FAQs:", generalFaqs);
      })
      .catch((error) => console.error("Error fetching FAQs:", error));
  }, []);

  return (
    <>
      <div className="faq-container bg-white">
        <div className="relative h-64 md:h-96 overflow-hidden items-stretch text-center ">
          <img
            src="src/assets/images/FAQ.png"
            alt="Banner"
            className="w-auto h-full object-cover inline-flex items-center"
          />
        </div>
        <div className="flex items-center justify-center mt-8">
          <h1 className=" font-primary text-2xl  font-bold text-primary">
            Frequently Asked Questions
          </h1>
        </div>
        <div className="inline-flex items-start ml-10">
          <Link to="/faqCustomer" className="text-lg font-tertiary mt-2 mr-4">
            <span className="text-primary">FAQ</span>
            <span className="text-secondary">Customer</span>
          </Link>
          <Link to="/faqProfessional" className="text-lg font-tertiary mt-2">
            <span className="text-primary">FAQ</span>
            <span className="text-secondary">Professional</span>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto  space-y-4 mt-8">
          {faqs.map((faq) => (
            <div key={faq._id} className="border-b border-gray-200">
              <details className="group py-4">
                <summary className="font-semibold font-primary  text-primary text-lg cursor-pointer flex justify-between items-center">
                  {faq.question}
                  <span className="text-xl transform transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2  font-normal font-primary  text-primary group-open:block">
                  {faq.answer}
                </p>
              </details>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            className="bg-tertiary  bg-opacity-50 border text-center border-secondary font-secondary font-semibold text-primary py-2 px-6 rounded-xl shadow-lg mb-8 inline-flex items-center"
            onClick={handleSignupCustClick}
          >
            <span class="mr-2 text-xl">Get Started</span>
            <span>
              <img
                src="src/assets/images/buttonArrow.png"
                alt="arrowButton"
                width="20"
              ></img>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
export default FAQ;
