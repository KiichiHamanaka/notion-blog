import ogp from "ogp-parser";

const getMeta = async (url) => {
  // console.log(`urlは${url}`);
  let META;
  await ogp(url)
    .then((data) => {
      META = data;
    })
    .catch((error) => {
      console.error(error);
    });
  // console.dir(META, { depth: null });
  return META;
};

export default getMeta;
