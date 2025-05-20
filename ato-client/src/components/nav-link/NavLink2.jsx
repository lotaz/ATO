import { Small } from "components/Typography";
import Link from "next/link";

// ==============================================================
const NavLink2 = ({
  url,
  title = "SHOP NOW",
  color,
  borderColor = "primary.600",
}) => {
  return url ? (
    <Link href={url}>
      <Small
        fontWeight="900"
        borderBottom={2}
        color={color}
        borderColor={borderColor}
      >
        {title}
      </Small>
    </Link>
  ) : (
    <Small
      fontWeight="900"
      borderBottom={2}
      color={color}
      borderColor={borderColor}
    >
      {title}
    </Small>
  );
};

export default NavLink2;
