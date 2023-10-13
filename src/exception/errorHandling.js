const errorHandling = (res, data) => {
  if (data.length === 0) {
    res.status(404).json({
      status: "fail",
      message: "data not Found",
    });
  } else if (data === false) {
    res.status(500).json({
      status: "fail",
      message: "internal server error",
    });
  } else if (data[0] === true) {
    res.status(409).json({
      status: "fail",
      message: "data already in database (conflict)",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: data,
    });
  }
};

module.exports = { errorHandling };
