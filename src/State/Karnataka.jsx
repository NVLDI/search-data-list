import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar'
import axios from 'axios';
import TopBar from '../Components/Appbar'
import './State.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell ,{ tableCellClasses }from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CSVLink } from 'react-csv';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet} from '@react-pdf/renderer';
import InputMask from 'react-input-mask';
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

export default function Karnataka() {

  
  
  const [isTextFieldVisiblePAddress, setTextFieldVisiblePAddress] = useState(false);
  const [isTextFieldVisibleAddress, setTextFieldVisibleAddress] = useState(false);
  const [isTextFieldVisibleFather, setTextFieldVisibleFather] = useState(false);
  const [isTextFieldVisibleDob, setTextFieldVisibleDob] = useState(false);
  const [isTextFieldVisibleName, setTextFieldVisibleName] = useState(false);
  const [isTextFieldVisibleMobile, setTextFieldVisibleMobile] = useState(false);
  const [isTextFieldVisibleAltMobile, setTextFieldVisibleAltMobile] = useState(false);
  const [isTextFieldVisibleEmail, setTextFieldVisibleEmail] = useState(false);
  const [isTextFieldVisibleUid, setTextFieldVisibleUid] = useState(false);
  const [isTextFieldVisiblePAN, setTextFieldVisiblePAN] = useState(false);
  const [isTextFieldVisiblePinCode, setTextFieldVisiblePinCode] = useState(false);
  const [isTextFieldVisibleDistrict, setTextFieldVisibleDistrict] = useState(false);
  const [isTextFieldVisibleTaluk, setTextFieldVisibleTaluk] = useState(false);
  const [isTextFieldVisibleVillage, setTextFieldVisibleVillage] = useState(false);

    const [selectedOption, setSelectedOption] = useState(null);
    const [cust_name, setCust_name] = useState('');
    const [email, setEmail] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [mobile,setMobile] = useState('');
    const [uid,setUid] = useState('');
    const [pan,setPAN] = useState('');
    const [altMobile,setAltMobile] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [pAddress, setPAddress] = useState('');
    const [father_name, setFather_name] = useState('');
    const [district, setDistrict] = useState('');
    const [village, setVillage] = useState('');
    const [taluk, setTaluk] = useState('');

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

    const handleRadioChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedOption(selectedValue);
      if(selectedValue === "mobile")
      {
        setNoRecordsFound(false);
      setTextFieldVisibleAddress(false);
      setTextFieldVisiblePAddress(false);
      setTextFieldVisibleName(false);
      setTextFieldVisibleFather(false)
      setTextFieldVisibleDob(false);
      setTextFieldVisibleMobile(true);
      setTextFieldVisibleAltMobile(false);
      setTextFieldVisibleEmail(false);
      setTextFieldVisibleUid(false);
        setTextFieldVisiblePAN(false);
        setTextFieldVisiblePinCode(false);
        setTextFieldVisibleDistrict(false);
        setTextFieldVisibleTaluk(false);
        setTextFieldVisibleVillage(false);
      }
      else if(selectedValue === "cname_address")
      {
        setNoRecordsFound(false);
        setTextFieldVisibleAddress(true);
        setTextFieldVisiblePAddress(false);
        setTextFieldVisibleName(true);
        setTextFieldVisibleFather(false)
        setTextFieldVisibleDob(false);
        setTextFieldVisibleMobile(false);
        setTextFieldVisibleAltMobile(false);
        setTextFieldVisibleEmail(false);
        setTextFieldVisibleUid(false);
        setTextFieldVisiblePAN(false);
        setTextFieldVisiblePinCode(false);
        setTextFieldVisibleDistrict(false);
        setTextFieldVisibleTaluk(false);
        setTextFieldVisibleVillage(false);
      }
      else if(selectedValue === "cname_paddress")
      {
        setNoRecordsFound(false);
        setTextFieldVisibleAddress(false);
        setTextFieldVisiblePAddress(true);
        setTextFieldVisibleName(true);
        setTextFieldVisibleFather(false)
        setTextFieldVisibleDob(false);
        setTextFieldVisibleMobile(false);
        setTextFieldVisibleAltMobile(false);
        setTextFieldVisibleEmail(false);
        setTextFieldVisibleUid(false);
        setTextFieldVisiblePAN(false);
        setTextFieldVisiblePinCode(false);
        setTextFieldVisibleDistrict(false);
        setTextFieldVisibleTaluk(false);
        setTextFieldVisibleVillage(false);
      }
      else if(selectedValue === "cname_dob")
      {
        setNoRecordsFound(false);
        setTextFieldVisibleAddress(false);
        setTextFieldVisiblePAddress(false);
        setTextFieldVisibleName(true);
        setTextFieldVisibleFather(false)
        setTextFieldVisibleDob(true);
        setTextFieldVisibleMobile(false);
        setTextFieldVisibleAltMobile(false);
        setTextFieldVisibleEmail(false);
        setTextFieldVisibleUid(false);
        setTextFieldVisiblePAN(false);
        setTextFieldVisiblePinCode(false);
        setTextFieldVisibleDistrict(false);
        setTextFieldVisibleTaluk(false);
        setTextFieldVisibleVillage(false);
      }
      else if(selectedValue === "cname_fname")
      {
        setNoRecordsFound(false);
        setTextFieldVisibleAddress(false);
        setTextFieldVisiblePAddress(false);
        setTextFieldVisibleName(true);
        setTextFieldVisibleFather(true)
        setTextFieldVisibleDob(false);
        setTextFieldVisibleMobile(false);
        setTextFieldVisibleAltMobile(false);
        setTextFieldVisibleEmail(false);
        setTextFieldVisibleUid(false);
        setTextFieldVisiblePAN(false);
        setTextFieldVisiblePinCode(false);
        setTextFieldVisibleDistrict(false);
        setTextFieldVisibleTaluk(false);
        setTextFieldVisibleVillage(false);
      }
      else if(selectedValue === "cname_altno")
      {
        setNoRecordsFound(false);
        setTextFieldVisibleAddress(false);
        setTextFieldVisiblePAddress(false);
        setTextFieldVisibleName(true);
        setTextFieldVisibleFather(false)
        setTextFieldVisibleDob(false);
        setTextFieldVisibleMobile(false);
        setTextFieldVisibleAltMobile(true);
        setTextFieldVisibleEmail(false);
        setTextFieldVisibleUid(false);
        setTextFieldVisiblePAN(false);
        setTextFieldVisiblePinCode(false);
        setTextFieldVisibleDistrict(false);
        setTextFieldVisibleTaluk(false);
        setTextFieldVisibleVillage(false);
      }
      else if(selectedValue === "email")
      {
        setNoRecordsFound(false);
        setTextFieldVisibleAddress(false);
        setTextFieldVisiblePAddress(false);
        setTextFieldVisibleName(false);
        setTextFieldVisibleFather(false)
        setTextFieldVisibleDob(false);
        setTextFieldVisibleMobile(false);
        setTextFieldVisibleAltMobile(false);
        setTextFieldVisibleEmail(true);
        setTextFieldVisibleUid(false);
        setTextFieldVisiblePAN(false);
        setTextFieldVisiblePinCode(false);
        setTextFieldVisibleDistrict(false);
        setTextFieldVisibleTaluk(false);
        setTextFieldVisibleVillage(false);
      }
      else if(selectedValue === "uid")
      {
        setNoRecordsFound(false);
        setTextFieldVisibleAddress(false);
        setTextFieldVisiblePAddress(false);
        setTextFieldVisibleName(false);
        setTextFieldVisibleFather(false)
        setTextFieldVisibleDob(false);
        setTextFieldVisibleMobile(false);
        setTextFieldVisibleAltMobile(false);
        setTextFieldVisibleEmail(false);
        setTextFieldVisibleUid(true);
        setTextFieldVisiblePAN(true);
        setTextFieldVisiblePinCode(false);
        setTextFieldVisibleDistrict(false);
        setTextFieldVisibleTaluk(false);
        setTextFieldVisibleVillage(false);
      }
      else if(selectedValue === "address")
      {
        setNoRecordsFound(false);
        setTextFieldVisibleAddress(false);
        setTextFieldVisiblePAddress(false);
        setTextFieldVisibleName(false);
        setTextFieldVisibleFather(false)
        setTextFieldVisibleDob(false);
        setTextFieldVisibleMobile(false);
        setTextFieldVisibleAltMobile(false);
        setTextFieldVisibleEmail(false);
        setTextFieldVisibleUid(false);
        setTextFieldVisiblePAN(false);
        setTextFieldVisiblePinCode(true);
        setTextFieldVisibleDistrict(false);
        setTextFieldVisibleTaluk(false);
        setTextFieldVisibleVillage(false);
      }
      else if(selectedValue === "paddress")
      {
        setNoRecordsFound(false);
        setTextFieldVisibleAddress(false);
        setTextFieldVisiblePAddress(false);
        setTextFieldVisibleName(false);
        setTextFieldVisibleFather(false)
        setTextFieldVisibleDob(false);
        setTextFieldVisibleMobile(false);
        setTextFieldVisibleAltMobile(false);
        setTextFieldVisibleEmail(false);
        setTextFieldVisibleUid(false);
        setTextFieldVisiblePAN(false);
        setTextFieldVisiblePinCode(false);
        setTextFieldVisibleDistrict(true);
        setTextFieldVisibleTaluk(true);
        setTextFieldVisibleVillage(true);
      }

    };
    const handleSearch = async () => {
    
      try {
        setIsLoading(true);
        setNoRecordsFound(false);
        if(selectedOption === "mobile")
        {
          const response = await axios.get(`http://localhost:5001/KA-api/mobile?Mobile=${mobile}`);
          setSearchResults(response.data);
          setCurrentPage(1);
          setNoRecordsFound(response.data.length === 0);
        }
        else if(selectedOption === "cname_address")
        {
          const response = await axios.get(`http://localhost:5001/KA-api/cname_AddressSearch?cname=${cust_name}&address=${address}`);
          setSearchResults(response.data);
          setCurrentPage(1);
          setNoRecordsFound(response.data.length === 0);
        }
        else if(selectedOption === "cname_paddress")
        {
          const response = await axios.get(`http://localhost:5001/KA-api/cname_PAddressSearch?cname=${cust_name}&address=${pAddress}`);
          setSearchResults(response.data);
          setCurrentPage(1);
          setNoRecordsFound(response.data.length === 0);
        }
        else if(selectedOption === "cname_dob")
        {
          const response = await axios.get(`http://localhost:5001/KA-api/cname_dob?cname=${cust_name}&DOB=${dob}`);
          setSearchResults(response.data);
          setCurrentPage(1);
          setNoRecordsFound(response.data.length === 0);
        }
        else if(selectedOption === "cname_fname")
        {
          const response = await axios.get(`http://localhost:5001/KA-api/c_fnameSearch?cname=${cust_name}&fatherName=${father_name}`);
          setSearchResults(response.data);
          setCurrentPage(1);
          setNoRecordsFound(response.data.length === 0);
        }
        else if(selectedOption === "cname_altno")
        {
          const response = await axios.get(`http://localhost:5001/KA-api/cname_altMobileSearch?cname=${cust_name}&altNo=${altMobile}`);
          setSearchResults(response.data);
          setCurrentPage(1);
          setNoRecordsFound(response.data.length === 0);
        }
        else if(selectedOption === "email")
        {
          const response = await axios.get(`http://localhost:5001/KA-api/email?Email=${email}`);
          setSearchResults(response.data);
          setCurrentPage(1);
          setNoRecordsFound(response.data.length === 0);
        }
        else if(selectedOption === "uid")
        {
          const response = await axios.get(`http://localhost:5001/KA-api/uid_pan?UID=${uid}&Pancard=${pan}`);
          setSearchResults(response.data);
          setCurrentPage(1);
          setNoRecordsFound(response.data.length === 0);
        }
        else if(selectedOption === "address")
        {
          const response = await axios.get(`http://localhost:5001/KA-api/Pin_Code?pincode=${pinCode}`);
          setSearchResults(response.data);
          setCurrentPage(1);
          setNoRecordsFound(response.data.length === 0);
        }
        else if(selectedOption === "paddress")
        {
          const response = await axios.get(`http://localhost:5001/KA-api/Distr_Taluk_Village?District=${district}&Taluk=${taluk}&Village=${village}`);
          setSearchResults(response.data);
          setCurrentPage(1);
          setNoRecordsFound(response.data.length === 0);
        }
        else{
          alert('You havent select what kind of search need to go...')
        }
      }
      catch(error){
        console.error('Other Error:', error);
      }
      finally{
        setIsLoading(false);
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
  return (
    <div>
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
            <h1>Karnataka Search Engine</h1>
            <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="mobile" control={<Radio />} label="Mobile" onChange={handleRadioChange}/>
        <FormControlLabel value="cname_address" control={<Radio />} label="Customer Name & Address" onChange={handleRadioChange}/>
        <FormControlLabel value="cname_paddress" control={<Radio />} label="Customer Name & Per.Address" onChange={handleRadioChange}/>
        <FormControlLabel value="cname_dob" control={<Radio />} label="Customer Name & DOB" onChange={handleRadioChange}/>
        <FormControlLabel value="cname_fname" control={<Radio />} label="Customer Name & Father's Name" onChange={handleRadioChange}/>
        <FormControlLabel value="cname_altno" control={<Radio />} label="Customer Alternative No" onChange={handleRadioChange}/>
        <FormControlLabel value="email" control={<Radio />} label="E-Mail" onChange={handleRadioChange}/>
        <FormControlLabel value="uid" control={<Radio />} label="PAN Voter & Aadhar" onChange={handleRadioChange}/>
        <FormControlLabel value="address" control={<Radio />} label="Pin Code" onChange={handleRadioChange}/>
        <FormControlLabel value="paddress" control={<Radio />} label="District & Taluk or Village" onChange={handleRadioChange}/>
      </RadioGroup>
            <Box
      component="form"
      sx={{ display: 'flex',justifyContent: 'center',
        '& > :not(style)': { m: 1, width: '20ch',mt:3 },
      }}
      noValidate
      autoComplete="off"
    >
      {isTextFieldVisibleDistrict && (
       <TextField id="outlined-basic" label="District" size="small" variant="outlined" value={district}
        onChange={(e) => {setDistrict(e.target.value);
          setNoRecordsFound(false);}}/>
      )}
       {isTextFieldVisibleTaluk && (
       <TextField id="outlined-basic" label="Taluk" size="small" variant="outlined" value={taluk}
        onChange={(e) => {setTaluk(e.target.value);
          setNoRecordsFound(false);}}/>
      )}
       {isTextFieldVisibleVillage && (
       <TextField id="outlined-basic" label="Village" size="small" variant="outlined" value={village}
        onChange={(e) => {setVillage(e.target.value);
          setNoRecordsFound(false);}}/>
      )}

       {isTextFieldVisibleMobile && (
       <TextField id="outlined-basic" label="Mobile" size="small" variant="outlined" value={mobile}
        onChange={(e) => {setMobile(e.target.value);
          setNoRecordsFound(false);}}/>
      )}
      {isTextFieldVisiblePinCode && (
       <TextField id="outlined-basic" label="Pin Code" size="small" variant="outlined" value={pinCode}
        onChange={(e) => {setPinCode(e.target.value);
          setNoRecordsFound(false);}}/>
      )}
       {isTextFieldVisibleUid && (
       <TextField id="outlined-basic" label="U-ID" size="small" variant="outlined" value={uid}
        onChange={(e) => {setUid(e.target.value);
          setNoRecordsFound(false);}}/>
      )}
       {isTextFieldVisiblePAN && (
       <TextField id="outlined-basic" label="PAN" size="small" variant="outlined" value={pan}
        onChange={(e) => {setPAN(e.target.value);
          setNoRecordsFound(false);}}/>
      )}
      {isTextFieldVisibleAltMobile && (
       <TextField id="outlined-basic" label="Mobile" size="small" variant="outlined" value={altMobile}
        onChange={(e) => {setAltMobile(e.target.value);
          setNoRecordsFound(false);}}/>
      )}
      {isTextFieldVisibleName && (
       <TextField id="outlined-basic" label="Customer Name" size="small" variant="outlined" value={cust_name}
        onChange={(e) => {setCust_name(e.target.value);
          setNoRecordsFound(false);}}/>
      )}
       {isTextFieldVisibleEmail && (
       <TextField id="outlined-basic" label="Email" size="small" variant="outlined" value={email}
        onChange={(e) => {setEmail(e.target.value);
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
      {isTextFieldVisiblePAddress && (
       <TextField id="outlined-basic" label="Per. Address" size="small" variant="outlined" value={pAddress}  
        onChange={(e) => {setPAddress(e.target.value);
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
            <StyledTableCell style={{ width: 160 }}>Father's Name</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>DOB</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Address</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Per.Address</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Altno</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Email</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Pan</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Photo ID</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Aadhar</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Aadhar-1</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>id Proof</StyledTableCell>
            <StyledTableCell style={{ width: 160 }}>Address Proof</StyledTableCell>
            </TableRow>
      </TableHead>
        <TableBody >
        {currentResults.map((result, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{result.mobile}</StyledTableCell>
              <StyledTableCell>{result.cname}</StyledTableCell>
              <StyledTableCell>{result.fname}</StyledTableCell>
              <StyledTableCell>{result.dob}</StyledTableCell>
              <StyledTableCell>{result.address}</StyledTableCell>
              <StyledTableCell>{result.paddress}</StyledTableCell>
              <StyledTableCell>{result.altno}</StyledTableCell>
              <StyledTableCell>{result.email}</StyledTableCell>
              <StyledTableCell>{result.pan}</StyledTableCell>
              <StyledTableCell>{result.photo_id}</StyledTableCell>
              <StyledTableCell>{result.uid}</StyledTableCell>
              <StyledTableCell>{result.uid_no}</StyledTableCell>
              <StyledTableCell>{result.idproof}</StyledTableCell>
              <StyledTableCell>{result.addproof}</StyledTableCell>
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
