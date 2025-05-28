import { Typography } from "@mui/material";

export default function HtmlParagraph({ html }) {
  return (
    <>
      {html && <Typography dangerouslySetInnerHTML={{ __html: `${html}` }} />}
    </>
  );
}
