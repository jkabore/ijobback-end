const mongoose = require("mongoose");
const Job = require("../models/jobModel");
const User = require("../models/userModel");
const moment = require("moment");
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: "desc" }).exec();
    res.json(jobs);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
const postJob = async (req, res) => {
  try {
    const newjob = new Job(req.body);
    await newjob.save();
    res.send("Job Posted Successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

const editJob = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id.trim())) {
      return res.status(404).json({ message: `No job exist with id: ${id}` });
    }
    await Job.findByIdAndUpdate(id, req.body, { new: true });

    res.send("Job Updated Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
};
const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      res.status(404).json({ message: "Job not found" });
    }
    await Job.findByIdAndDelete(id);
    const jobs = await Job.find();

    res.json(jobs);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const applyJob = async (req, res) => {
  const { userid, job } = req.body;

  try {
    const jobDetails = await Job.findById(job._id);

    const appliedCandidate = {
      userid,
      appliedDate: moment().format("MMM DD yyyy"),
    };

    jobDetails.appliedCandidates.push(appliedCandidate);

    await jobDetails.save();

    const userDetails = await User.findById(userid);

    const appliedJob = {
      jobid: job._id,
      appliedDate: moment().format("MMM DD yyyy"),
    };

    userDetails.appliedJobs.push(appliedJob);

    await userDetails.save();

    res.send("Job Applied Successfully");
  } catch (error) {
    res.send(error);
  }
};

const searchJob = async (req, res) => {
  const query = req.params.title;
  console.log("query:", query);
  const searchQuery = new RegExp(query, "i"); // i for case insensitive
  console.log("searchquery:", searchQuery);
  if (searchQuery !== null) {
    try {
      const jobs = await Job.find({ title: { $regex: searchQuery } });

      res.status(200).json(jobs);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Job Not Found" });
    }
  } else {
    res.status(404).json({ message: "Please try again" });
  }
};
module.exports = {
  postJob,
  applyJob,
  editJob,
  getAllJobs,
  searchJob,
  deleteJob,
};
