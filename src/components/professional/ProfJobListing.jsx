import React, { useState, useEffect } from "react";
import AddJob from "./AddJob";
import userimg from "/src/assets/images/user.png"; 
import { FaThumbtack } from "react-icons/fa"; 

const PROFESSIONAL_JOBS_API_URL = "https://backend-taskmate.onrender.com/newJob/professional";
const DELETE_JOB_API_URL = "https://backend-taskmate.onrender.com/newJob";

const ProfJobListing = ({ onPinJob }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [pinnedJobs, setPinnedJobs] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFirstName(user.firstName || "Unknown");
      setProfilePicture(user.profileImage || userimg);
    }
  }, []);

  const fetchJobs = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    if (!token) {
      setError("User is not logged in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(PROFESSIONAL_JOBS_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        setError("Failed to fetch job listings");
      }
    } catch (error) {
      setError("An error occurred while fetching jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePinJob = (job) => {
    const updatedPinnedJobs = pinnedJobs.includes(job._id)
      ? pinnedJobs.filter((id) => id !== job._id)
      : [...pinnedJobs, job._id];
    setPinnedJobs(updatedPinnedJobs);
    onPinJob(jobs.filter((j) => updatedPinnedJobs.includes(j._id))); // Pass full job objects to the dashboard
  };

  const isJobPinned = (jobId) => pinnedJobs.includes(jobId);

  const handleDeleteJob = async (jobId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    if (!token) {
      setError("User is not logged in.");
      return;
    }

    try {
      const response = await fetch(`${DELETE_JOB_API_URL}/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setJobs(jobs.filter((job) => job._id !== jobId));
      } else {
        setError("Failed to delete job.");
      }
    } catch (error) {
      setError("An error occurred while deleting the job.");
    }
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  if (loading) {
    return <p>Loading job listings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl text-primary font-primary">Job Listings</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white font-medium font-primary py-2 px-4 rounded-lg shadow-md hover:bg-secondary"
        >
          <i className="fas fa-plus mr-2 text-secondary"></i>
          Add Job
        </button>
      </div>

      <AddJob
        isModalOpen={isModalOpen}
        handleCloseModal={() => setIsModalOpen(false)}
        job={selectedJob}
        clearFormOnAdd={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="text-white rounded-lg pb-3 shadow-lg max-w-xs bg-primary relative">
              {/* Pin Button */}
              <button
                onClick={() => handlePinJob(job)}
                className={`absolute top-2 right-2 text-2xl ${
                  isJobPinned(job._id) ? "text-secondary" : "text-gray-300"
                }`}
              >
                <FaThumbtack />
              </button>

              <div className="text-white rounded-lg p-4 shadow-lg max-w-xs text-center bg-tertiary">
                <div className="flex justify-center ">
                  <img
                    src={profilePicture || userimg}
                    alt={`${firstName}'s Profile`}
                    className="w-40 h-40 rounded-full "
                  />
                </div>
                <h3 className="text-lg font-primary">{firstName || "Unknown Professional"}</h3>
              </div>

              <div className="p-4 ">
                <p className="text-sm mb-1 ">
                  <span className="text-secondary">Service : </span>
                  <span>{job.service_id?.name || "N/A"}</span>
                </p>
                <p className="text-sm mb-1">
                  <span className="text-secondary">Country : </span>
                  <span>{job.country || "N/A"}</span>
                </p>
                <p className="text-sm mb-1">
                  <span className="text-secondary">City : </span>
                  <span>{job.city || "N/A"}</span>
                </p>
                <p className="text-sm mb-1">
                  <span className="text-secondary">Charges per hour : </span>
                  <span>{job.chargesPerHour || "N/A"}€</span>
                </p>
                <p className="text-sm mb-1">
                  <span className="text-secondary">Working Date : </span>
                  <span>{new Date(job.date).toLocaleDateString("en-GB")}</span>
                </p>
              </div>

              {/* Edit and Remove Buttons */}
              <div className="pr-4">
              <div className="mt-3 flex justify-end space-x-3">
                <button
                  className="bg-tertiary   text-primary py-2 px-4 rounded-lg text-sm hover:bg-secondary hover:text-white"
                  onClick={() => handleEditJob(job)}
                >
                  Edit Job
                </button>
                <button
                  className="bg-tertiary  text-primary py-2 px-4 rounded-lg text-sm hover:bg-secondary hover:text-white"
                  onClick={() => handleDeleteJob(job._id)}
                >
                  Remove
                </button>
              </div>
              </div>
            </div>
          ))
        ) : (
          <p>No job listings available. Start by adding your first job!</p>
        )}
      </div>
    </div>
  );
};

export default ProfJobListing;
