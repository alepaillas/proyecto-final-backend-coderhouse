import { userModel } from "../models/user.model.mjs";

const getAll = async (query, options) => {
  const users = await userModel.paginate(query, options);
  return users;
};

const getById = async (id) => {
  const user = await userModel.findById(id);
  return user;
};

const getByEmail = async (email) => {
  const user = await userModel.findOne({ email });
  return user;
};

const create = async (data) => {
  // Directly create the user without checking existence here
  const user = await userModel.create(data);
  return user;
};

const update = async (id, data) => {
  const updatedUser = await userModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedUser;
};

const deleteOne = async (id) => {
  const user = await userModel.deleteOne({ _id: id });
  if (user.deletedCount === 0) return false;
  return true;
};

const deleteMany = async (filter) => {
  // Find the users that match the filter criteria
  const usersToDelete = await userModel.find(filter);

  // Extract the IDs of the users to be deleted
  const userIds = usersToDelete.map((user) => user._id);

  // Delete the users using their IDs
  const result = await userModel.deleteMany({ _id: { $in: userIds } });

  // Return the IDs of the deleted users
  return { deletedCount: result.deletedCount, userIds };
};

const findMany = async (filter) => {
  const users = await userModel.find(filter);
  return users;
};

export default {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  deleteOne,
  deleteMany,
  findMany,
};
