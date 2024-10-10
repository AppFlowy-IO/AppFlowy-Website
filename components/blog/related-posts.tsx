import PostItem from '@/components/blog/post-item';
import { PostData } from '@/lib/posts';
import { Grid } from '@mui/material';
import React from 'react';

function RelatedPosts({ relatedPosts }: { relatedPosts: PostData[] }) {
  return (
    <div className={'flex flex-col gap-[50px]'}>
      <div className={'text-[58px]'}>Related</div>
      <Grid
        container
        rowSpacing={{
          xs: 2,
          sm: 4,
        }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        columnSpacing={{ sm: 2, md: 3, lg: 3 }}
      >
        {relatedPosts.map((post, index) => {
          return (
            <Grid key={index} item sm={12} md={6} lg={4}>
              <div className={' h-fit'}>
                <PostItem post={post} showDescription showCategories />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default RelatedPosts;
