import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
} from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
      />
      <Skeleton sx={{ height: 165 }} animation="wave" variant="rectangular" />
      <CardContent>
        <>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </>
      </CardContent>
      <CardActions>
        <>
          <Skeleton animation="wave" height={10} width="40%" />
          <Skeleton animation="wave" height={10} width="20%" />
        </>
      </CardActions>
    </Card>
  );
}
