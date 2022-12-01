import { Alert, Box, Typography } from "@mui/material";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SearchingInfo() {
  const [searchInfo, setSearchInfo] = useState();
  const [sortInfo, setSortInfo] = useState();

  const { search, sort } = useParams();

  useEffect(() => {
    if (search) {
      setSearchInfo(search);
    } else if (sort) {
      if (sort === "createdAt: -1") {
        setSortInfo("The Newest");
      } else if (sort === "price: -1") {
        setSearchInfo("Price: High - Low");
      } else if (sort === "price: 1") {
        setSearchInfo("Price: Low - High");
      }
    }
  }, [search, sort]);

  return (
    <>
      <Alert sx={{ m: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          Searching result for keywords:
          <Box sx={{ ml: 1 }}>
            {searchInfo && (
              <Typography
                fontSize={14}
                fontStyle="italic"
                variant="caption text"
                color="#cc571f"
              >
                "{searchInfo}"
              </Typography>
            )}
            {sortInfo && (
              <Typography
                color="#cc571f"
                fontSize={14}
                fontStyle="italic"
                variant="caption text"
              >
                "{sortInfo}"
              </Typography>
            )}
          </Box>
        </Box>
      </Alert>
    </>
  );
}

export default SearchingInfo;
