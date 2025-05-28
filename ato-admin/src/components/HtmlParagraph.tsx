import { Typography } from '@mui/material';

interface IProps {
  html?: string;
}

export default function HtmlParagraph({ html }: IProps) {
  return <>{html && <Typography dangerouslySetInnerHTML={{ __html: `${html}` }} />}</>;
}
