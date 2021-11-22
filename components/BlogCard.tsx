import { OgpParserResult } from "ogp-parser";
import { css } from "@emotion/react";
import Link from "next/link";

const favicon = (icon) => {
  return `http://www.google.com/s2/favicons?domain=${icon}`;
};

type props = {
  meta: OgpParserResult;
};

const blogCardStyles = css`
  display: flex;
  width: auto;
  height: 100px;
  border: solid 1px #2d2d2d;
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    filter: brightness(110%);
  }
`;

const blogCardContents = css`
  margin: auto 4px;
`;

const blogCardTitle = css`
  font-weight: bold;
  font-size: 12px;
`;

const blogCardBody = css`
  width: 100%;
  font-size: 11px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const blogCardDomain = css`
  font-size: 12px;
`;

const imageStyles = css`
  border-radius: 4px;
`;

const BlogCard = (props: props) => {
  const domain = props.meta.ogp["og:url"][0].match(
    /^https?:\/{2,}(.*?)(?:\/|\?|#|$)/
  )[1];
  return (
    <Link href={props.meta.ogp["og:url"][0]}>
      <div css={blogCardStyles}>
        <img
          css={imageStyles}
          src={props.meta.ogp["og:image"][0]}
          alt={props.meta.ogp["og:title"][0]}
        />
        <div css={blogCardContents}>
          <p css={blogCardTitle}>{props.meta.ogp["og:title"][0]}</p>
          {/*{"og:description" in props.meta && (*/}
          {/*  // @ts-ignore*/}
          {/*  // {props.meta.ogp["og:description"][0]}*/}
          {/*)}*/}
          <p css={blogCardBody}>
            猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー
            猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー
            猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー猫マナー
          </p>
          <p css={blogCardDomain}>{domain}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
