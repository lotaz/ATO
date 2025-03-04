import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// project import
import MainCard from '../../components/MainCard';
import { TMenuItem } from '../../menu-items/types';

export default function Breadcrumbs({ navigation, title, ...others }: any) {
  const location = useLocation();
  const [main, setMain] = useState<any>();
  const [item, setItem] = useState<TMenuItem>();

  // set active item state
  const getCollapse = (menu: any) => {
    if (menu.children) {
      menu.children.filter((collapse: any) => {
        if (collapse.type && collapse.type === 'item') {
          if (location.pathname === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    navigation?.items?.map((menu: any) => {
      if (menu.type && menu.type === 'group') {
        getCollapse(menu);
      }
      return false;
    });
  });

  // only used for component demo breadcrumbs
  if (location.pathname === '/breadcrumbs') {
    location.pathname = '/dashboard/analytics';
  }

  let mainContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';
  let subTitle: string | undefined = '';

  // collapse item
  if (main && main.type === 'collapse') {
    mainContent = (
      <Typography component={Link} to={document.location.pathname} variant="h6" sx={{ textDecoration: 'none' }} color="textSecondary">
        {main.title}
      </Typography>
    );
  }

  // items
  if (item && item.type === 'item') {
    itemTitle = item.title;
    const subItem = item.subItems?.find((x) => x.url === document.location.pathname);
    subTitle = subItem?.title;

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
            <Grid item>
              <MuiBreadcrumbs aria-label="breadcrumb">
                <Typography component={Link} to="/" color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
                  Trang chủ
                </Typography>
                {mainContent}
                {itemTitle && subTitle ? (
                  <Typography component={Link} to={item.url} variant="h6" sx={{ textDecoration: 'none' }} color="textSecondary">
                    {itemTitle}
                  </Typography>
                ) : (
                  <Typography variant="subtitle1" color="textPrimary">
                    {itemTitle}
                  </Typography>
                )}

                {subTitle && (
                  <Typography variant="subtitle1" color="textPrimary">
                    {subTitle}
                  </Typography>
                )}
              </MuiBreadcrumbs>
            </Grid>
            {title && itemTitle && !subTitle ? (
              <Grid item sx={{ mt: 2 }}>
                <Typography variant="h3">{itemTitle}</Typography>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
}

Breadcrumbs.propTypes = {
  card: PropTypes.bool,
  custom: PropTypes.bool,
  divider: PropTypes.bool,
  heading: PropTypes.string,
  icon: PropTypes.bool,
  icons: PropTypes.bool,
  links: PropTypes.array,
  maxItems: PropTypes.number,
  rightAlign: PropTypes.bool,
  separator: PropTypes.any,
  title: PropTypes.bool,
  titleBottom: PropTypes.bool,
  sx: PropTypes.any,
  others: PropTypes.any
};
