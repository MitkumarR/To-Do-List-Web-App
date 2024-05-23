//   const handleOutsideClick = (event) => {

//     if( value != "Search" && value == "")
//     {
//         setValue("Search");
//     }
//     else
//     {
//         setValue(value);
//     }
    
//     setIsClicked(!isClicked);
// };

// const handleClick = () => {
    
//     if( value == "Search" && value != "")
//     {
//         setValue("");
//     }
//     else
//     {
//         setValue(value);
//     }
//     setValue("");
//     setIsClicked(!isClicked);
//   };

//   useEffect(() => {
//     document.removeEventListener("click", handleOutsideClick);
//     return () => {
//       document.removeEventListener("click", handleOutsideClick);
//     };
//   });