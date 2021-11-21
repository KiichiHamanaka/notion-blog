import ogp from "ogp-parser";

const getMeta = async (url) => {
  let META;
  await ogp(url)
    .then((data) => {
      META = data;
    })
    .catch((error) => {
      console.error(error);
    });
  return META;
};

export default getMeta;
