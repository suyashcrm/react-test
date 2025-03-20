const MeetingHistory = require('../../model/schema/meeting')
const mongoose = require('mongoose');

/**
 * @desc Add a new meeting
 * @route POST /api/meetings
 */
const add = async (req, res) => {
  try {
    const newMeeting = new Meeting(req.body);
    await newMeeting.save();
    res.status(201).json({ message: 'Meeting added successfully', meeting: newMeeting });
  } catch (error) {
    res.status(500).json({ message: 'Error adding meeting', error });
  }
};

/**
 * @desc Get all meetings
 * @route GET /api/meetings
 */
const index = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meetings', error });
  }
};

/**
 * @desc Get a single meeting by ID
 * @route GET /api/meetings/:id
 */
const view = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findById(id);

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meeting', error });
  }
};

/**
 * @desc Delete a single meeting by ID
 * @route DELETE /api/meetings/:id
 */
const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findByIdAndDelete(id);

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.status(200).json({ message: 'Meeting deleted successfully', deletedMeeting: meeting });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meeting', error });
  }
};

/**
 * @desc Delete multiple meetings based on a filter
 * @route POST /api/meetings/deleteMany
 */
const deleteMany = async (req, res) => {
  try {
    const { filter } = req.body; // Example: { date: { $lt: '2024-01-01' } }
    const result = await Meeting.deleteMany(filter);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No meetings found matching the criteria' });
    }

    res.status(200).json({ message: `${result.deletedCount} meetings deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meetings', error });
  }
};

module.exports = { add, index, view, deleteData, deleteMany };
