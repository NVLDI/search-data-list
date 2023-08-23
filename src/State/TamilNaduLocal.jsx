import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar'
import TopBar from '../Components/Appbar'
import './State.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell ,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'; 
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CSVLink } from 'react-csv';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet} from '@react-pdf/renderer';
import InputMask from 'react-input-mask';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  landscapePage: {
    width: '100%',
    height: '100%',
    flexDirection: 'row', // Set the page orientation to landscape
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping to create columns
    width: '100%',
  },
  listItem: {
    marginBottom: 10,
    width: '25%', // Distribute across 4 columns
    fontSize: 8, // Adjust the font size
    border: 1, // Add a border
    borderColor: '#000', // Border color
    padding: 3.5, // Add padding for better spacing
  },
});


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
 

function PDFDocument({ searchResults }) {
  return (
    <Document>
    {/* Set the orientation to landscape */}
    <Page style={styles.page}>
    <Text>Search Data</Text>
      <View style={styles.listContainer}>
        {searchResults.map((result, index) => (
          <View key={index} style={styles.listItem}>
            <Text>Mobile: {result.mobile}</Text>
            <Text>Customer Name: {result.cname}</Text>
            <Text>Age: {result.age}</Text>
            <Text>D.O.B: {result.dob}</Text>
            <Text>Father's Name: {result.fname}</Text>
            <Text>Gender: {result.gender}</Text>
            <Text>Address 1: {result.c_house_no}</Text>
            <Text>Address 2: {result.c_house_no_v1}</Text>
            <Text>Voter-ID: {result.adr}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
  );
}
const DateMask = React.forwardRef((props, ref) => {
  return (
    <InputMask
      {...props}
      mask="9999-99-99"
      ref={ref}
    />
  );
});
export default function TamilNaduLocal() {
  
  const [isTextFieldVisibleVoter, setTextFieldVisibleVoter] = useState(false);
  const [isTextFieldVisibleAddress, setTextFieldVisibleAddress] = useState(false);
  const [isTextFieldVisibleFather, setTextFieldVisibleFather] = useState(false);
  const [isTextFieldVisibleDob, setTextFieldVisibleDob] = useState(false);
  const [isTextFieldVisibleName, setTextFieldVisibleName] = useState(false);
  const [isTextFieldVisibleMobile, setTextFieldVisibleMobile] = useState(false);

    const [selectedOption, setSelectedOption] = useState(null);
    const [cust_name, setCust_name] = useState('');
    const [mobile,setMobile] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [father_name, setFather_name] = useState('');
    const [voter_id, setVoter_ID] = useState('');

    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10); // Number of results to display per page
    const resultsPerPageOptions = [10, 20, 30]; // Options for results per page
    const [noRecordsFound, setNoRecordsFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(searchResults.length / resultsPerPage);

    const handleSearch = async () => {
    
    try {
      setIsLoading(true);
      setNoRecordsFound(false);
      if(selectedOption === "cname-c_house_no")
      {
        const response = await axios.get(`http://localhost:5001/TN-api/cname_AddressSearch?cname=${cust_name}&address=${address}`);
        setSearchResults(response.data);
        setCurrentPage(1);
        setNoRecordsFound(response.data.length === 0);
      }
      else if(selectedOption === "voter")
      {
        const response = await axios.get(`http://localhost:5001/TN-api/voterSearch?voter=${voter_id}`);
        setSearchResults(response.data);
        setCurrentPage(1);
        setNoRecordsFound(response.data.length === 0);
      }
      else if(selectedOption === "fname_c_house_no")
      {
        const response = await axios.get(`http://localhost:5001/TN-api/fname_c_house_no?fatherName=${father_name}&address=${address}`);
        setSearchResults(response.data);
        setCurrentPage(1);
        setNoRecordsFound(response.data.length === 0);
      }
      else if(selectedOption==="cname_fname")
      {
        const response = await axios.get(`http://localhost:5001/TN-api/c_fnameSearch?cname=${cust_name}&fatherName=${father_name}`);
        setSearchResults(response.data);
        setCurrentPage(1);
        setNoRecordsFound(response.data.length === 0);
      }
      else if(selectedOption==="c_house_no")
      {
        const response = await axios.get(`http://localhost:5001/TN-api/c_house_no?address=${address}`);
        setSearchResults(response.data);
        setCurrentPage(1);
        setNoRecordsFound(response.data.length === 0);
      }
      else if(selectedOption==="cname_dob")
      {
        const response = await axios.get(`http://localhost:5001/TN-api/cname_dob?cname=${cust_name}&DOB=${dob}`);
        setSearchResults(response.data);
        setCurrentPage(1);
        setNoRecordsFound(response.data.length === 0);
      }
      else if(selectedOption==="mobile")
      {
        const response = await axios.get(`http://localhost:5001/TN-api/mobile?Mobile=${mobile}`);
        setSearchResults(response.data);
        setCurrentPage(1);
        setNoRecordsFound(response.data.length === 0);
      }
      else{
        alert('You havent select what kind of search need to go...')
      }
    } catch (error) {
        console.error('Other Error:', error);
    }
    finally {
      setIsLoading(false);
    }
  };
  

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };
  const handleResultsPerPageChange = event => {
    const newResultsPerPage = parseInt(event.target.value);
    setResultsPerPage(newResultsPerPage);
    setCurrentPage(1); // Reset to the first page when changing results per page
  };
  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if(selectedValue === "voter")
    {
      setNoRecordsFound(false);
      setTextFieldVisibleVoter(true);
      setTextFieldVisibleAddress(false);
      setTextFieldVisibleName(false);
      setTextFieldVisibleFather(false)
      setTextFieldVisibleDob(false);
      setTextFieldVisibleMobile(false);
    }
    else if(selectedValue === "cname-c_house_no")
    {
      setNoRecordsFound(false);
      setTextFieldVisibleAddress(true);
      setTextFieldVisibleName(true);
      setTextFieldVisibleVoter(false);
      setTextFieldVisibleFather(false)
      setTextFieldVisibleDob(false);
      setTextFieldVisibleMobile(false);
    }
    else if(selectedValue === "fname_c_house_no")
    {
      setNoRecordsFound(false);
      setTextFieldVisibleAddress(true);
      setTextFieldVisibleName(false);
      setTextFieldVisibleVoter(false);
      setTextFieldVisibleFather(true)
      setTextFieldVisibleDob(false);
      setTextFieldVisibleMobile(false);
    }
    else if(selectedValue === "cname_fname")
    {
      setNoRecordsFound(false);
      setTextFieldVisibleAddress(false);
      setTextFieldVisibleName(true);
      setTextFieldVisibleVoter(false);
      setTextFieldVisibleFather(true)
      setTextFieldVisibleDob(false);
      setTextFieldVisibleMobile(false);
    }
    else if(selectedValue === "c_house_no")
    {
      setNoRecordsFound(false);
      setTextFieldVisibleAddress(true);
      setTextFieldVisibleName(false);
      setTextFieldVisibleVoter(false);
      setTextFieldVisibleFather(false)
      setTextFieldVisibleDob(false);
      setTextFieldVisibleMobile(false);
    }
    else if(selectedValue === "cname_dob")
    {
      setNoRecordsFound(false);
      setTextFieldVisibleAddress(false);
      setTextFieldVisibleName(true);
      setTextFieldVisibleVoter(false);
      setTextFieldVisibleFather(false)
      setTextFieldVisibleDob(true);
      setTextFieldVisibleMobile(false);
    }
    else if(selectedValue === "mobile")
    {
      setNoRecordsFound(false);
      setTextFieldVisibleAddress(false);
      setTextFieldVisibleName(false);
      setTextFieldVisibleVoter(false);
      setTextFieldVisibleFather(false)
      setTextFieldVisibleDob(false);
      setTextFieldVisibleMobile(true);
    }
  };
  const csvHeaders = [
    { label: 'Mobile', key: 'mobile' },
    { label: 'Customer Name', key: 'cname' },
    { label: 'Age', key: 'age' },
    { label: 'Date Of Birth', key: 'dob' },
    { label: 'Father Name', key: 'fname' },
    { label: 'Gender', key: 'gender' },
    { label: 'Address 1', key: 'c_house_no' },
    { label: 'Address 2', key: 'c_house_no_v1' },
    { label: 'Voter ID', key: 'adr' },
    // Add more headers for other columns
  ];
  return (
    <div >
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      )}
         <TopBar/>
        <Sidebar/>
        <div className='container'>
            <h1>TamilNadu Search Engine</h1>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group">
        <FormControlLabel value="mobile" control={<Radio />} label="Mobile" onChange={handleRadioChange}/>
        <FormControlLabel value="fname_c_house_no" control={<Radio />} label="Father's Name & Address" onChange={handleRadioChange}/>
        <FormControlLabel value="c_house_no" control={<Radio />} label="Address" onChange={handleRadioChange}/>
        <FormControlLabel value="cname_dob" control={<Radio />} label="Customer Name & DOB" onChange={handleRadioChange}/>
        <FormControlLabel value="cname_fname" control={<Radio />} label="Customer Name & Father Name" onChange={handleRadioChange}/>
        <FormControlLabel value="cname-c_house_no" control={<Radio />} label="Customer Name & Address" onChange={handleRadioChange}/>
        <FormControlLabel value="voter" control={<Radio />} label="Voter-ID" onChange={handleRadioChange}/>
      </RadioGroup>
      <Box
      component="form"
      sx={{ display: 'flex',justifyContent: 'center',
        '& > :not(style)': { m: 1, width: '20ch',mt:3 },
      }}
      noValidate
      autoComplete="off"
    >
       {isTextFieldVisibleMobile && (
       <TextField id="outlined-basic" label="Mobile" size="small" variant="outlined" value={mobile}
        onChange={(e) => {setMobile(e.target.value);
          setNoRecordsFound(false);}}/>
      )}
      {isTextFieldVisibleName && (
       <TextField id="outlined-basic" label="Customer Name" size="small" variant="outlined" value={cust_name}
        onChange={(e) => {setCust_name(e.target.value);
          setNoRecordsFound(false);}}/>
      )}
       {isTextFieldVisibleDob && (
       <TextField id="outlined-basic" label="DOB (YYYY-MM-DD)" size="small" variant="outlined" InputProps={{
        inputComponent: DateMask,
      }} value={dob}
        onChange={(e) => {setDob(e.target.value);
          setNoRecordsFound(false);}}
        />
       )}
      {isTextFieldVisibleFather && (
       <TextField id="outlined-basic" label="Father's Name" size="small" variant="outlined" value={father_name}
        onChange={(e) => {setFather_name(e.target.value);
          setNoRecordsFound(false);}}/>
      )}
      {isTextFieldVisibleAddress && (
       <TextField id="outlined-basic" label="Address" size="small" variant="outlined" value={address}  
        onChange={(e) => {setAddress(e.target.value);
          setNoRecordsFound(false);}}/>
      )}
        {isTextFieldVisibleVoter && (
        <TextField id="outlined-basic" label="Voter-ID" size="small" variant="outlined" value={voter_id}  
        onChange={(e) => {setVoter_ID(e.target.value);
          setNoRecordsFound(false);}}/>
        )}
         <Button variant="contained" onClick={handleSearch}>Search</Button>
    </Box>
      <div className='Table-Container'>
      <div className="pagination">
      {noRecordsFound && <p className="blinking-text">No record found.</p>}
      </div>
      <div className="pagination">
        <Button size="small" onClick={handlePrevPage}>&#8592;</Button>
        <div className="page-label">
          Page {currentPage} of {totalPages}
        </div>
        <Select  size="small" value={resultsPerPage} onChange={handleResultsPerPageChange}>
          {resultsPerPageOptions.map(option => (
            <MenuItem key={option} value={option}>
              {option} per page
            </MenuItem>
          ))}
        </Select>
        <div className="total-rows">
          Total Rows: {searchResults.length}
        </div>
        <Button size="small" onClick={handleNextPage}>&#8594;</Button>
        <div className="total-rows">
    <CSVLink data={searchResults} headers={csvHeaders} filename="search_results.csv">
        Export to CSV
      </CSVLink>&nbsp;&nbsp;&nbsp;
      <PDFDownloadLink document={<PDFDocument searchResults={searchResults} />} fileName="search_results.pdf">
            Export to PDF
          </PDFDownloadLink>
          </div>
      </div>
      <TableContainer component={Paper}>
      <Table aria-label="simple table" >
      <TableHead >
          <TableRow>
            <StyledTableCell style={{ width: 160 }}>Mobile</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Customer Name</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Age</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>D.O.B</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Father Name</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Gender</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Address 1</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Address 2</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Voter-ID</StyledTableCell>
            </TableRow>
      </TableHead>
        <TableBody >
        {currentResults.map((result, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{result.mobile}</StyledTableCell>
              <StyledTableCell>{result.cname}</StyledTableCell>
              <StyledTableCell>{result.age}</StyledTableCell>
              <StyledTableCell>{result.dob}</StyledTableCell>
              <StyledTableCell>{result.fname}</StyledTableCell>
              <StyledTableCell>{result.gender}</StyledTableCell>
              <StyledTableCell>{result.c_house_no}</StyledTableCell>
              <StyledTableCell>{result.c_house_no_v1}</StyledTableCell>
              <StyledTableCell>{result.adr}</StyledTableCell>
            </StyledTableRow>
          ))}
          </TableBody>
          </Table>
          </TableContainer>
         
          <div className="pagination">
        <Button size="small" onClick={handlePrevPage}>&#8592;</Button>
        <div className="page-label">
          Page {currentPage} of {totalPages}
        </div>
        <Select  size="small" value={resultsPerPage} onChange={handleResultsPerPageChange}>
          {resultsPerPageOptions.map(option => (
            <MenuItem key={option} value={option}>
              {option} per page
            </MenuItem>
          ))}
        </Select>
        <div className="total-rows">
          Total Rows: {searchResults.length}
        </div>
        <Button size="small" onClick={handleNextPage}>&#8594;</Button>
        <div className="total-rows">
    <CSVLink data={searchResults} headers={csvHeaders} filename="search_results.csv">
        Export to CSV
      </CSVLink>&nbsp;&nbsp;&nbsp;
      <PDFDownloadLink document={<PDFDocument searchResults={searchResults} />} fileName="search_results.pdf">
            Export to PDF
          </PDFDownloadLink>
          </div>
      </div>
      </div>
      </div>
    </div>
  )
}