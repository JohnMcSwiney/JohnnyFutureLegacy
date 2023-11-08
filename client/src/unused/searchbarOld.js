// const navigate = useNavigate();
// const location = useLocation();

// const [error, setError] = useState(null);
// const [isLoaded, setIsLoaded] = useState(false);
// const [items, setItems] = useState([]);
// const [currentPage, setCurrentPage] = useState([]);

// const { searchValue, setSearchValue} = useMyContext();
// //     set search query to empty string
const [q, setQ] = useState("");
// //     set search parameters
// // const [searchParam] = useState(["AssetName", "AssetID", "UserID", "UserName"]);
// //Param1 (optional): search item
// const redirectSearch = () => {
//   if (currentPage){
    
//     navigate(`/search/${q}`)
//     setSearchValue(q)
//   }
// };
// useEffect(() => {

//   // Grabs Current page for page specific searching
//   const { pathname } = location;
//   // console.log("Current location: " + pathname)
  
// }, [q]);

// // Used to enable the text & position on the home screen
const getPageClass = () => {
  const { pathname } = location;
  // Add logic to determine the class based on the current pathname
  if(currentPage !== pathname){
    setCurrentPage(pathname);
  }
  if (pathname === '/') {
    return 'search--home--cont';
  }
  else if(pathname.includes('search')){
  }
  // Default class when no matching path is found
  return 'search--cont';
};
const divClass = getPageClass();
const isHomePage = location.pathname === '/'; // Check if it's the home page

// const handleSubmit = () => {
//   redirectSearch();
// }
// // const { searchValue, setSearchValue } = useMyContext();
// const [ searchAssets, setSearchAssets] = useState(null);
// const [ searchCollections, setSearchCollections] = useState(null);
// const [ searchUsers, setSearchUsers] = useState(null);

// const [modelName, setModelName] = useState('');
// // const [query, setQuery] = useState('');
// const [results, setResults] = useState([]);
// useEffect(() => {
//   if (searchValue) {
    
//       handleSearch();
//     };
    
//   } 
// }, []);
