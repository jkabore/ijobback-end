const express = require("express");
const router = express.Router();
const { postJob, applyJob, editJob, getAllJobs,searchJob, deleteJob } = require("../controllers/jobsControllers");

router.get('/getalljobs',getAllJobs);
router.get('/search/:title',searchJob);

router.post('/postjob',postJob);

router.put('/getalljobs/:id',editJob);
router.delete('/deletejob/:id',deleteJob);

router.post('/applyjob',applyJob);

module.exports = router;


