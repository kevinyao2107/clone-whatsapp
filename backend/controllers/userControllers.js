import User from '../modals/userModals.js';
import { hashPassword, verifyPssword } from '../utilities/hashPassword.js';
import generateToken from '../utilities/jsonWebToken.js';
import Message from '../modals/messageModals.js';

const register = async (req, res) => {
  const { username, phone, password, image } = req.body;
  try {
    const userExist = await User.findOne({ phone });
    if (userExist) {
      res.status(400);
      throw new Error('Email deja utilisé');
    }

    const passhash = await hashPassword(password);

    const user = await User.create({
      username,
      phone,
      password: passhash,
      image,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.username,
        phone: user.phone,
        image: user.image,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const auth = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ phone });
    console.log(user);
    if (user && (await verifyPssword(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.username,
        phone: user.phone,
        image: user.image,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `Une erreur s'est produite`,
    });
  }
};

const UserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const UsersList = async (req, res) => {
  try {
    const users = await User.find({ _id: { $nin: req.user.id } });

    const usersWithLastMessage = await Promise.all(
      users.map(async (user) => {
        const lastMessage = await Message.findOne(
          {
            $or: [
              {
                $and: [{ receverId: user._id }, { senderId: req.user.id }],
              },
              {
                $and: [{ receverId: req.user.id }, { senderId: user._id }],
              },
            ],
          },
          {},
          { sort: { createdAt: -1 } }
        ).limit(1);

        return { user, lastMessage };
      })
    );

    return res.status(200).json(usersWithLastMessage);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUsersById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { register, auth, UserProfile, UsersList, getUsersById };
