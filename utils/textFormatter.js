//capitalize the first letter of every word of given title
const titleize = title => {
    let words = title.split(" ");
    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(" ");
};

//capitalize the first letter of the given text
const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

module.exports = {titleize, capitalize};
