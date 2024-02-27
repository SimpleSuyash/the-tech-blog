const dayjs=  require("dayjs");
const formatDate= date => dayjs(date).format("DD/MM/YYYY");

module.exports = formatDate;