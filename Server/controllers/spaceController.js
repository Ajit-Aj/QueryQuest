import Space from "../models/Space.js";

export const createSpace = async (req, res) => {
  const { name, description } = req.body;

  try {
    const space = await Space.create({
      name,
      description,
      createdBy: req.user._id,
      members: [req.user._id],
    });

    req.user.spacesCreated.push(space._id);
    req.user.spacesJoined.push(space._id);
    await req.user.save();

    res.status(201).json(space);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const joinSpace = async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);

    if (!space.members.includes(req.user._id)) {
      space.members.push(req.user._id);
      req.user.spacesJoined.push(space._id);

      await space.save();
      await req.user.save();

      res.status(200).json({ message: "Joined space successfully" });
    } else {
      res
        .status(400)
        .json({ message: "You are already a member of this space" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllSpaces = async (req, res) => {
  try {
    const spaces = await Space.find()
      .populate("createdBy", "name")
      .populate("members", "name");
    res.status(200).json(spaces);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSpaceById = async (req, res) => {
  try {
    const space = await Space.findById(req.params.id)
      .populate("createdBy", "name")
      .populate("members", "name");

    if (!space) {
      return res.status(404).json({ message: "Space not found" });
    }

    res.status(200).json(space);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSpacesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find spaces created by the user
    const createdSpaces = await Space.find({ createdBy: userId })
      .populate("createdBy", "name")
      .populate("members", "name");

    // Find spaces the user has joined
    const joinedSpaces = await Space.find({ members: userId })
      .populate("createdBy", "name")
      .populate("members", "name");

    // Combine both arrays and remove duplicates
    const allSpaces = [...new Set([...createdSpaces, ...joinedSpaces])];

    res.status(200).json(allSpaces);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a space (e.g., add members)
export const updateSpace = async (req, res) => {
  const { name, description, members } = req.body;

  try {
    const space = await Space.findById(req.params.id);

    if (!space) {
      return res.status(404).json({ message: "Space not found" });
    }

    if (name) space.name = name;
    if (description) space.description = description;
    if (members) space.members = members;

    const updatedSpace = await space.save();
    res.status(200).json(updatedSpace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a space
export const deleteSpace = async (req, res) => {
  console.log(req.params);

  try {
    const space = await Space.findById(req.params.id);

    if (!space) {
      return res.status(404).json({ message: "Space not found" });
    }

    await space.remove();
    res.status(200).json({ message: "Space removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
