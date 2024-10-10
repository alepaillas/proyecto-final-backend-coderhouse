import customErrors from "../errors/customErrors.mjs";
import usersServices from "../services/users.services.mjs";

const getAll = async (req, res, next) => {
  try {
    const { limit, page, sort } = req.query;
    const options = {
      limit: parseInt(limit, 10) || 10,
      page: parseInt(page, 10) || 1,
      sort: {
        first_name: sort === "asc" ? 1 : -1,
      },
      lean: true,
    };

    if (
      isNaN(options.page) ||
      options.page < 1 ||
      options.page > Number.MAX_SAFE_INTEGER / options.limit
    ) {
      throw customErrors.badRequestError(
        "La página buscada debe ser un número entero positivo dentro de un rango válido.",
      );
    }

    const users = await usersServices.getAll({}, options);

    if (users.totalPages < options.page || options.page <= 0) {
      throw customErrors.badRequestError("Página fuera de rango.");
    }

    res.status(200).json({ status: "success", users });
  } catch (error) {
    next(error);
  }
};

const getByID = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await usersServices.getByID(uid);
    res.status(200).json({ status: "success", payload: user });
  } catch (error) {
    next(error);
  }
};

const getByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await usersServices.getByEmail(email);
    res.status(200).json({ status: "success", payload: user });
  } catch (error) {
    next(error);
  }
};

const createMockUsers = async (req, res, next) => {
  try {
    const { amount } = req.query; // Get the amount from query parameters
    const users = await usersServices.createMockUsers(
      parseInt(amount, 10) || 5,
    ); // Default to 5 if not provided
    res.status(200).json({ status: "success", users });
  } catch (error) {
    next(error);
  }
};

const generatePasswordResetToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = await usersServices.generatePasswordResetToken(email);
    res.status(200).json({ status: "success", token });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { email, newPassword, token } = req.body;
    if (!token) {
      throw customErrors.badRequestError(
        "Must provide a password reset token.",
      );
    }
    const verifiedToken = usersServices.verifyPasswordResetToken(token);
    //console.log(verifiedToken);
    await usersServices.updatePassword(email, newPassword);
    res
      .status(200)
      .json({ status: "success", message: "Password updated succesfully." });
  } catch (error) {
    next(error);
  }
};

const changeUserRole = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await usersServices.changeUserRole(uid);
    res.status(200).json({ status: "ok", response });
  } catch (error) {
    next(error);
  }
};

const addDocuments = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const files = req.files;
    const response = await usersServices.addDocuments(uid, files);
    res.status(200).json({ status: "ok", response });
  } catch (error) {
    error.path = "[GET] /api/user/:uid/documents";
    next(error);
  }
};

const deleteInactiveUsers = async (req, res, next) => {
  try {
    const response = await usersServices.deleteInactiveUsers();
    res.status(200).json({ status: "ok", response });
  } catch (error) {
    error.path = "[DELETE] /api/users/";
    next(error);
  }
};

const deleteByID = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await usersServices.deleteByID(uid);
    res.status(200).json({ status: "success", payload: user });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getByID,
  getByEmail,
  createMockUsers,
  generatePasswordResetToken,
  updatePassword,
  changeUserRole,
  addDocuments,
  deleteInactiveUsers,
  deleteByID,
};
