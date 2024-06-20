import React, { useState, useEffect } from "react";
import axios from "axios";
import IntensityChart from "./IntensityChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Navbar from "./Navbar";
import RegionChart from "./RegionChart";
import AdminDashboard from "./Sidebar";
import { ChakraProvider, Flex, Box, Grid, Select } from "@chakra-ui/react";
import RelevanceBubbleChart from "./Relevance";
import TopicsRadarChart from "./TopicChart";
import PieChart from "./SectorChart";
import CountryChart from "./Country";
import LikelihoodRadarChart from "./LikelihoodChart";
import Footer from "./Footer";

Chart.register(CategoryScale);

const Main = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [year, setYear] = useState("2016"); // Default year set to 2016

  useEffect(() => {
    const fetchDataFromJson = async () => {
      try {
        const response = await axios.get("/jsondata.json");
        setData(response.data);
        setFilteredData(response.data); // Initialize filteredData with all data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromJson();
  }, []);

  useEffect(() => {
    if (year === "All") {
      setFilteredData(data);
    } else {
      const yearInt = parseInt(year);
      const newData = data.filter(item => item.start_year === yearInt || item.end_year === yearInt);
      console.log("Filtered Data:", newData); // Debugging: Log the filtered data
      setFilteredData(newData);
    }
  }, [year, data]);

  const years = Array.from({ length: 2024 - 2016 + 1 }, (_, i) => 2016 + i); // Years from 2016 to 2024

  return (
    <ChakraProvider>
      <Navbar />
      <AdminDashboard />
      <Box m={4}>
        <Select value={year} placeholder="Select year" onChange={(e) => setYear(e.target.value)}>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
          <option value="All">All</option>
        </Select>
      </Box>
      <IntensityChart data={filteredData} />
      <Flex direction={{ base: "column", md: "row" }} m={50}>
        <Box
          flex={{ base: "1", md: "0.5" }}
          maxW="50%"
          p={5}
          m={2}
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          borderRadius={20}
        >
          <RegionChart data={filteredData} />
        </Box>
        <Box
          flex={{ base: "1", md: "0.5" }}
          maxW="50%"
          p={5}
          m={2}
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          borderRadius={20}
        >
          <TopicsRadarChart data={filteredData} />
        </Box>
      </Flex>
      <RelevanceBubbleChart data={filteredData} />
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box>
          <PieChart data={filteredData} />
        </Box>
        <Box>
          <LikelihoodRadarChart data={filteredData} />
        </Box>
      </Grid>
      <CountryChart data={filteredData} />
      <Footer />
    </ChakraProvider>
  );
};

export default Main;
