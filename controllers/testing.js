export const testing = async (req, res) => {
  try {
    res.json({
      message: "worked testing",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.error.message });
  }
};
