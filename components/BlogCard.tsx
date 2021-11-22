import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { OgpParserResult } from "ogp-parser";

const favicon = (icon) => {
  return `http://www.google.com/s2/favicons?domain=${icon}`;
};

type props = {
  meta: OgpParserResult;
};

const BlogCard = (props: props) => {
  const domain = props.meta.ogp["og:url"][0].match(
    /^https?:\/{2,}(.*?)(?:\/|\?|#|$)/
  )[1];
  return (
    <Card>
      <CardActionArea sx={{ display: "flex" }}>
        <CardMedia
          sx={{
            maxWidth: "100px",
          }}
          component="img"
          image={props.meta.ogp["og:image"][0]}
          alt={props.meta.ogp["og:title"][0]}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {props.meta.ogp["og:title"][0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {"og:description" in props.meta && (
              <span>{props.meta.ogp["og:description"][0]}</span>
            )}
          </Typography>
          <Typography component="div">{domain}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
