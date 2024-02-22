import { Alert, Box, Typography } from "@mui/material";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const styles = {
  typo: {
    fontSize: 14,
    fontStyle: "italic",
    variant: "caption text",
    color: "#cc571f",
  },
  boxCover: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
};

function SearchingInfo() {
  const [searchInfo, setSearchInfo] = useState();
  const [sortInfo, setSortInfo] = useState();

  const { search, sort } = useParams();

  useEffect(() => {
    if (search) {
      setSearchInfo(search);
    } else {
      if (sort === "createdAt: -1") {
        setSortInfo("The Newest");
      } else if (sort === "price: -1") {
        setSearchInfo("Price: High - Low");
      } else {
        setSearchInfo("Price: Low - High");
      }
    }
  }, [search, sort]);

  return (
    <>
      <Alert sx={{ m: 1 }}>
        <Box sx={styles.boxCover}>
          Searching result for keywords:
          <Box sx={{ ml: 1 }}>
            {searchInfo && (
              <Typography sx={styles.typo}>"{searchInfo}"</Typography>
            )}
            {sortInfo && <Typography sx={styles.typo}>"{sortInfo}"</Typography>}
          </Box>
        </Box>
      </Alert>
    </>
  );
}

export default SearchingInfo;
